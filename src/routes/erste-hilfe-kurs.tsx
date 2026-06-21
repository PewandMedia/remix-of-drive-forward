import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBox } from "@/components/site/QueryFallbacks";
import { CONTACT } from "@/lib/contact";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Heart, Calendar, Clock, FileText, GraduationCap, Phone } from "lucide-react";
import ersteHilfeImg from "@/assets/erste-hilfe-side.jpg";

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
      <PageHero eyebrow="Erste-Hilfe-Kurs" title="Erste-Hilfe-Kurs für deinen Führerschein" subtitle="Mach deinen Erste-Hilfe-Kurs direkt bei MIRO-DRIVE – 8 Stunden an einem Tag (8:00–16:00 Uhr), jeden Monat in der Fahrschule." />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="space-y-10 lg:col-span-7">
            <header className="space-y-4">
              <div className="h-2 w-24 bg-primary" />
              <h2 className="font-display text-4xl leading-none tracking-tighter sm:text-5xl md:text-6xl">
                Was du<br />bekommst
              </h2>
            </header>
            <div className="border-t-4 border-foreground">
              {benefits.map((b) => (
                <div key={b.label} className="group flex items-center gap-6 border-b border-border px-2 py-6 transition-colors hover:bg-muted/40">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                    <b.icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <p className="text-lg font-bold tracking-tight sm:text-xl">{b.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <div className="group relative">
              <div className="absolute -inset-3 rotate-1 rounded-2xl bg-muted transition-transform duration-500 group-hover:rotate-0" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-foreground shadow-2xl">
                <img src={ersteHilfeImg} alt="Erste-Hilfe-Koffer mit rotem Kreuz" loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <span className="mb-4 inline-block bg-primary px-3 py-1 font-display text-[10px] uppercase tracking-widest text-primary-foreground">Safe First</span>
                  <p className="max-w-xs text-sm leading-relaxed text-white/85">Professionelle Ausrüstung und Experten-Wissen direkt vor Ort in unserer Fahrschule.</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-foreground p-8 text-white">
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary opacity-20 blur-[100px]" />
              <div className="relative z-10">
                <h2 className="mb-4 font-display text-2xl leading-none tracking-tight sm:text-3xl">Anmeldung & Infos</h2>
                <p className="mb-8 text-sm leading-relaxed text-white/60">
                  Der Kurs läuft von 8:00 bis 16:00 Uhr und findet jeden Monat in unserer Fahrschule statt. Sichere dir deinen Platz – unkompliziert per WhatsApp oder Anruf.
                </p>
                {info && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 pt-8">
                    {info.price && (
                      <div>
                        <span className="mb-1 block font-display text-[10px] uppercase tracking-widest text-primary">Preis</span>
                        <p className="text-2xl font-bold tracking-tighter">{info.price}</p>
                      </div>
                    )}
                    {info.dates && (
                      <div>
                        <span className="mb-1 block font-display text-[10px] uppercase tracking-widest text-primary">Termine</span>
                        <p className="text-base font-bold leading-tight tracking-tight">{info.dates}</p>
                      </div>
                    )}
                    {info.duration && (
                      <div className="col-span-2">
                        <span className="mb-1 block font-display text-[10px] uppercase tracking-widest text-primary">Dauer</span>
                        <p className="text-lg font-bold tracking-tight">{info.duration}</p>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-6 py-4 font-display text-xs uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-95">
                    WhatsApp
                  </a>
                  <a href={`tel:${CONTACT.phone}`} className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white bg-white px-6 py-4 font-display text-xs uppercase tracking-widest text-foreground transition-all hover:bg-white/90 active:scale-95">
                    <Phone className="h-4 w-4" /> Anrufen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl sm:text-3xl">Komm vorbei – unsere Standorte</h2>
          <p className="mt-2 text-sm text-muted-foreground">Anmeldung direkt in einer unserer Filialen während der Bürozeiten.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {LOCATIONS.map((loc) => <LocationCard key={loc.id} location={loc} />)}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}