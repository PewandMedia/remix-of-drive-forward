import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  email: z.string().trim().email("Ungültige E-Mail").max(200).optional().or(z.literal("")),
  license_class: z.string().trim().max(50).optional().or(z.literal("")),
  first_aid_interest: z.boolean().optional(),
  contact_pref: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type FieldKey = "phone" | "email" | "license_class" | "contact_pref" | "first_aid_interest" | "message" | "preferred_period";

type Props = {
  type: "kontakt" | "anmeldung" | "angebot" | "erste_hilfe" | "sonstiges";
  fields?: FieldKey[];
  submitLabel?: string;
  successText?: string;
};

export function InquiryForm({
  type,
  fields = ["phone", "email", "message"],
  submitLabel = "Anfrage senden",
  successText = "Danke für deine Anfrage. Das Team von MIRO-DRIVE meldet sich schnellstmöglich bei dir.",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      license_class: String(form.get("license_class") || ""),
      first_aid_interest: form.get("first_aid_interest") === "on",
      contact_pref: String(form.get("contact_pref") || ""),
      message: [String(form.get("preferred_period") || ""), String(form.get("message") || "")]
        .filter(Boolean).join(" — "),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Bitte Formular prüfen");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert({
      type,
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      license_class: parsed.data.license_class || null,
      first_aid_interest: !!parsed.data.first_aid_interest,
      contact_pref: parsed.data.contact_pref || null,
      message: parsed.data.message || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Etwas ist schiefgelaufen. Bitte erneut versuchen.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-xl font-bold">Anfrage gesendet</h3>
        <p className="mt-2 text-sm text-muted-foreground">{successText}</p>
      </div>
    );
  }

  const has = (k: FieldKey) => fields.includes(k);

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" required maxLength={120} />
        </div>
        {has("phone") && (
          <div>
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input id="phone" name="phone" type="tel" maxLength={50} />
          </div>
        )}
        {has("email") && (
          <div className={has("phone") ? "" : "sm:col-span-2"}>
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" name="email" type="email" maxLength={200} />
          </div>
        )}
        {has("license_class") && (
          <div>
            <Label htmlFor="license_class">Führerscheinklasse</Label>
            <Input id="license_class" name="license_class" placeholder="z. B. B, B197" maxLength={50} />
          </div>
        )}
        {has("contact_pref") && (
          <div>
            <Label htmlFor="contact_pref">Wunschkontakt</Label>
            <select id="contact_pref" name="contact_pref" className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm">
              <option value="">Bitte wählen</option>
              <option>WhatsApp</option>
              <option>Telefon</option>
              <option>E-Mail</option>
            </select>
          </div>
        )}
        {has("preferred_period") && (
          <div className="sm:col-span-2">
            <Label htmlFor="preferred_period">Gewünschter Zeitraum</Label>
            <Input id="preferred_period" name="preferred_period" placeholder="z. B. nächste 4 Wochen" maxLength={120} />
          </div>
        )}
      </div>

      {has("first_aid_interest") && (
        <label className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
          <Checkbox id="first_aid_interest" name="first_aid_interest" />
          <span className="text-sm">Ja, ich interessiere mich auch für den Erste-Hilfe-Kurs.</span>
        </label>
      )}

      {has("message") && (
        <div>
          <Label htmlFor="message">Nachricht</Label>
          <Textarea id="message" name="message" rows={5} maxLength={2000} />
        </div>
      )}

      <Button type="submit" disabled={loading} size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
        {loading ? "Wird gesendet…" : submitLabel}
      </Button>
    </form>
  );
}