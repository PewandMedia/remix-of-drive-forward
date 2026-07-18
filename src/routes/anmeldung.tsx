import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { submitRegistration } from "@/lib/inquiries.functions";

const schema = z.object({
  firstName: z.string().trim().min(1, "Pflichtfeld").max(100),
  lastName: z.string().trim().min(1, "Pflichtfeld").max(100),
  birthDate: z.string().min(1, "Pflichtfeld").regex(/^\d{4}-\d{2}-\d{2}$/, "Ungültiges Datum"),
  address: z.string().trim().min(3, "Bitte Straße und Hausnummer angeben").max(300),
  postalCode: z.string().trim().min(4, "Bitte PLZ angeben").max(20),
  city: z.string().trim().min(1, "Pflichtfeld").max(120),
  phone: z.string().trim().min(4, "Bitte Telefonnummer angeben").max(50),
  email: z.string().trim().email("Ungültige E-Mail").max(320),
  licenseClass: z.enum(["B", "B197", "B78", "A", "AM", "Erste-Hilfe"], {
    message: "Bitte auswählen",
  }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  privacy: z.literal(true, { message: "Bitte Datenschutz bestätigen" }),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/anmeldung")({
  head: () => ({
    meta: [
      { title: "Online-Anmeldung Fahrschule Bochum | MIRO-DRIVE" },
      { name: "description", content: "Melde dich in wenigen Minuten online bei der Fahrschule MIRO-DRIVE in Bochum an – schnell, unkompliziert und persönlich." },
      { property: "og:title", content: "Online-Anmeldung Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Melde dich in wenigen Minuten online bei der Fahrschule MIRO-DRIVE in Bochum an." },
      { property: "og:url", content: "/anmeldung" },
    ],
    links: [{ rel: "canonical", href: "/anmeldung" }],
  }),
  component: AnmeldungPage,
});

function AnmeldungPage() {
  const [done, setDone] = useState(false);
  const submit = useServerFn(submitRegistration);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { licenseClass: "B" as const },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const { privacy: _p, ...payload } = values;
      await submit({ data: payload });
      toast.success("Anmeldung erfolgreich abgeschickt");
      setDone(true);
      reset();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Fehler beim Absenden";
      toast.error(msg);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Online-Anmeldung"
        title="Jetzt online bei MIRO-DRIVE anmelden"
        subtitle="Fülle das Formular aus und wir melden uns umgehend mit den nächsten Schritten und deinem Ausbildungsvertrag."
      />

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {done ? (
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
            <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
            <h2 className="mt-4 font-display text-2xl">Vielen Dank!</h2>
            <p className="mt-2 text-muted-foreground">
              Wir haben deine Anmeldung erhalten und melden uns zeitnah per E-Mail mit dem Ausbildungsvertrag.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/">Zur Startseite</Link>
              </Button>
              <Button onClick={() => setDone(false)} className="rounded-full">
                Weitere Anmeldung
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Vorname *" error={errors.firstName?.message}>
                <Input {...register("firstName")} autoComplete="given-name" />
              </Field>
              <Field label="Nachname *" error={errors.lastName?.message}>
                <Input {...register("lastName")} autoComplete="family-name" />
              </Field>
            </div>

            <Field label="Geburtsdatum *" error={errors.birthDate?.message}>
              <Input type="date" {...register("birthDate")} max={new Date().toISOString().slice(0, 10)} />
            </Field>

            <Field label="Straße & Hausnummer *" error={errors.address?.message}>
              <Input {...register("address")} autoComplete="street-address" placeholder="z. B. Musterstraße 12" />
            </Field>

            <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
              <Field label="PLZ *" error={errors.postalCode?.message}>
                <Input {...register("postalCode")} autoComplete="postal-code" inputMode="numeric" />
              </Field>
              <Field label="Ort *" error={errors.city?.message}>
                <Input {...register("city")} autoComplete="address-level2" />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Telefonnummer *" error={errors.phone?.message}>
                <Input type="tel" {...register("phone")} autoComplete="tel" placeholder="z. B. +49 157 …" />
              </Field>
              <Field label="E-Mail-Adresse *" error={errors.email?.message}>
                <Input type="email" {...register("email")} autoComplete="email" />
              </Field>
            </div>

            <Field label="Führerscheinklasse *" error={errors.licenseClass?.message}>
              <select
                {...register("licenseClass")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="B">Klasse B (Pkw)</option>
                <option value="B197">Klasse B197 (Automatik-Ausbildung → Schalter)</option>
                <option value="B78">Klasse B78 (Automatik)</option>
                <option value="A">Klasse A / Motorrad</option>
                <option value="AM">Klasse AM (Mofa/Roller)</option>
                <option value="Erste-Hilfe">Erste-Hilfe-Kurs</option>
              </select>
            </Field>

            <Field label="Nachricht (optional)" error={errors.message?.message}>
              <Textarea rows={4} {...register("message")} placeholder="Wunschtermin, Fragen, etc." />
            </Field>

            <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
              <input
                id="privacy"
                type="checkbox"
                {...register("privacy")}
                className="mt-1 h-4 w-4 rounded border-input"
              />
              <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">
                Ich habe die <Link to="/datenschutz" className="text-primary underline">Datenschutzerklärung</Link> gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anmeldung einverstanden. *
              </Label>
            </div>
            {errors.privacy?.message && (
              <p className="-mt-4 text-sm text-destructive">{errors.privacy.message}</p>
            )}

            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full">
              {isSubmitting ? "Wird gesendet…" : "Anmeldung absenden"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Nach dem Absenden bereiten wir deinen Ausbildungsvertrag vor und schicken ihn per E-Mail.
            </p>
          </form>
        )}
      </div>
    </SiteLayout>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
