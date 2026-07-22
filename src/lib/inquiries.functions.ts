import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const registrationSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  address: z.string().trim().min(3).max(300),
  postalCode: z.string().trim().min(3).max(20),
  city: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(4).max(50),
  email: z.string().trim().email().max(320),
  licenseClass: z.enum(["B", "B197", "B78", "A", "AM", "Erste-Hilfe"]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

async function generateStoreAndSendContract(
  inquiryId: string,
  data: RegistrationInput,
  createdAt: string,
): Promise<{ path: string | null; error: string | null }> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateContractPdf } = await import("./contract-pdf.server");
    const { sendContractEmail } = await import("./contract-email.server");

    const pdfBytes = await generateContractPdf({
      firstName: data.firstName,
      lastName: data.lastName,
      birthDate: data.birthDate,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      phone: data.phone,
      email: data.email,
      licenseClass: data.licenseClass,
      message: data.message ?? null,
      inquiryId,
      createdAt,
    });

    const safeLast = data.lastName.replace(/[^A-Za-z0-9._-]+/g, "_") || "Anmeldung";
    const path = `${inquiryId}/MIRO-DRIVE_Vertrag_${safeLast}.pdf`;

    const uploadRes = await supabaseAdmin.storage
      .from("contracts")
      .upload(path, pdfBytes, { contentType: "application/pdf", upsert: true });
    if (uploadRes.error) throw new Error(`Upload: ${uploadRes.error.message}`);

    await sendContractEmail({
      to: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      licenseClass: data.licenseClass,
      pdfBytes,
      inquiryId,
    });

    return { path, error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[contract] fail", msg);
    return { path: null, error: msg };
  }
}

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    const { serverPublicClient } = await import("./public-data.server");
    const supabasePublic = serverPublicClient();
    const inquiryId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const { error } = await supabasePublic
      .from("inquiries")
      .insert({
        id: inquiryId,
        type: "anmeldung",
        name: fullName,
        first_name: data.firstName,
        last_name: data.lastName,
        birth_date: data.birthDate,
        address: data.address,
        postal_code: data.postalCode,
        city: data.city,
        phone: data.phone,
        email: data.email,
        license_class: data.licenseClass,
        message: data.message || null,
        first_aid_interest: data.licenseClass === "Erste-Hilfe",
        contact_pref: "email",
        status: "neu",
        created_at: createdAt,
      });
    if (error) throw new Error(error.message);

    // Vertrag erzeugen, speichern & mailen. Fehler blockieren die Anmeldung NICHT.
    const result = await generateStoreAndSendContract(inquiryId, data, createdAt);
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error: updateError } = await supabaseAdmin
        .from("inquiries")
        .update({
          contract_url: result.path,
          contract_sent_at: result.path && !result.error ? new Date().toISOString() : null,
          contract_error: result.error,
        })
        .eq("id", inquiryId);
      if (updateError) console.error("[contract] status update failed", updateError.message);
    } catch (e) {
      console.error("[contract] status update skipped", e instanceof Error ? e.message : String(e));
    }

    return { ok: true } as const;
  });

export const listInquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateInquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["neu", "in_bearbeitung", "erledigt"]),
    }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("inquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true } as const;
  });

export const deleteInquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("inquiries").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true } as const;
  });

// Signierte Download-URL für Admin (60 min gültig)
export const getContractDownloadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("inquiries")
      .select("contract_url")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row?.contract_url) throw new Error("Kein Vertrag hinterlegt");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const signed = await supabaseAdmin.storage.from("contracts").createSignedUrl(row.contract_url, 60 * 60);
    if (signed.error || !signed.data?.signedUrl) {
      throw new Error(signed.error?.message ?? "Signierung fehlgeschlagen");
    }
    return { url: signed.data.signedUrl } as const;
  });

// Vertrag erneut erzeugen & senden
export const resendContract = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("inquiries")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Anmeldung nicht gefunden");
    if (!row.email) throw new Error("Keine E-Mail-Adresse hinterlegt");

    const input: RegistrationInput = {
      firstName: row.first_name ?? row.name?.split(" ")[0] ?? "",
      lastName: row.last_name ?? row.name?.split(" ").slice(1).join(" ") ?? "",
      birthDate: row.birth_date ?? "1970-01-01",
      address: row.address ?? "",
      postalCode: row.postal_code ?? "",
      city: row.city ?? "",
      phone: row.phone ?? "",
      email: row.email,
      licenseClass: (row.license_class as RegistrationInput["licenseClass"]) ?? "B",
      message: row.message ?? "",
    };

    const result = await generateStoreAndSendContract(row.id, input, row.created_at);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("inquiries")
      .update({
        contract_url: result.path ?? row.contract_url,
        contract_sent_at: result.error ? row.contract_sent_at : new Date().toISOString(),
        contract_error: result.error,
      })
      .eq("id", row.id);
    if (result.error) throw new Error(result.error);
    return { ok: true } as const;
  });
