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

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => registrationSchema.parse(data))
  .handler(async ({ data }) => {
    // Use admin client to bypass anon RLS constraints on optional fields cleanly.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const { error } = await supabaseAdmin.from("inquiries").insert({
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
    });
    if (error) throw new Error(error.message);

    // TODO: Sobald die Domain eingerichtet ist, E-Mail an info@mirodrive.de senden.
    // await sendRegistrationEmail("info@mirodrive.de", { ...data });

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
