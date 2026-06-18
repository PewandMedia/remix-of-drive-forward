import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBox } from "@/components/site/QueryFallbacks";
import { CONTACT } from "@/lib/contact";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Heart, Calendar, Clock, FileText, GraduationCap, Phone } from "lucide-react";

const faQuery = queryOptions({
  queryKey: ["first_aid_info"],
  queryFn: async () => {
    const { data, error } = await supabase.from("first_aid_info").select("*").eq("active", true).order("updated_at", { ascending: false }).limit(1);
    if (error) throw error;
    return data?.[0] ?? null;
  },
});

export const Route = createFileRoute("/erste-hilfe-kurs")({
  head: () => ({
    meta: [
      { title: "Erste-Hilfe-Kurs – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Erste-Hilfe-Kurs für Führerscheinbewerber – kompakt, verständlich, jederzeit per WhatsApp anfragen." },
      { property: "og:title", content: "Erste-Hilfe-Kurs – MIRO-DRIVE" },
      { property: "og:url", content: "/erste-hilfe-kurs" },
    ],
    links: [{ rel: "canonical", href: "/erste-hilfe-kurs" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(faQuery),
  component: FAPage,
  errorComponent: ErrorBox,
});

function FAPage() {
  const { data: info } = useSuspenseQuery(faQuery);
  const benefits = [
    { icon: Heart, label: "Erste-Hilfe-Kurs für den Führerschein" },
    { icon: GraduationCap, label: "Kompakte und verständliche Schulung" },
    { icon: Calendar, label: "Einfache Anmeldung" },
    { icon: FileText, label: "Beratung zu allen notwendigen Unterlagen" },
    { icon: Clock, label: "Unterstützung beim Start deiner Fahrausbildung" },
  ];
  return (
    <SiteLayout>
      <PageHero eyebrow="Erste-Hilfe-Kurs" title="Erste-Hilfe-Kurs für deinen Führerschein" subtitle="Bei MIRO-DRIVE kannst du dich einfach über Erste-Hilfe-Kurse informieren und direkt eine Anfrage stellen." />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl uppercase sm:text-3xl">Was du bekommst</h2>
          <ul className="mt-6 space-y-3">
            {benefits.map((b) => (
              <li key={b.label} className="flex items-start gap-3 rounded-xl border bg-white p-4">
                <b.icon className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{b.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase sm:text-3xl">Anmeldung & Infos</h2>
          <p className="mt-2 text-sm text-muted-foreground">Die Anmeldung zum Erste-Hilfe-Kurs erfolgt persönlich in einer unserer Filialen. Für Termine und Verfügbarkeit erreichst du uns telefonisch oder per WhatsApp.</p>

          {info && (
            <div className="mt-6 rounded-2xl border bg-muted/30 p-6">
              <h3 className="font-display text-lg">Kursinfo</h3>
              <p className="mt-2 text-sm text-muted-foreground">{info.description}</p>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                {info.price && <div><dt className="text-xs uppercase text-muted-foreground">Preis</dt><dd className="font-bold text-primary">{info.price}</dd></div>}
                {info.duration && <div><dt className="text-xs uppercase text-muted-foreground">Dauer</dt><dd className="font-bold">{info.duration}</dd></div>}
                {info.dates && <div><dt className="text-xs uppercase text-muted-foreground">Termine</dt><dd className="font-bold">{info.dates}</dd></div>}
              </dl>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white">
              Per WhatsApp anfragen
            </a>
            <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-white">
              <Phone className="h-4 w-4" /> Anrufen
            </a>
          </div>
        </div>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase sm:text-3xl">Komm vorbei – unsere Standorte</h2>
          <p className="mt-2 text-sm text-muted-foreground">Anmeldung direkt in einer unserer Filialen während der Bürozeiten.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {LOCATIONS.map((loc) => <LocationCard key={loc.id} location={loc} />)}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}