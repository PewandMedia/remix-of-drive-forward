import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getFirstAidInfo, getUpcomingFirstAidDates } from "@/lib/public-data.functions";
import { ErrorBox } from "@/components/site/QueryFallbacks";
import { CONTACT } from "@/lib/contact";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Heart, Calendar, Clock, FileText, GraduationCap, Phone, MapPin } from "lucide-react";
import ersteHilfeImg from "@/assets/erste-hilfe-hero.jpg";

const faQuery = queryOptions({
  queryKey: ["first_aid_info"],
  queryFn: () => getFirstAidInfo(),
  staleTime: 0,
  refetchOnMount: "always" as const,
});

const datesQuery = queryOptions({
  queryKey: ["first_aid_dates_upcoming"],
  queryFn: () => getUpcomingFirstAidDates(),
  staleTime: 0,
  refetchOnMount: "always" as const,
});

export const Route = createFileRoute("/erste-hilfe-kurs")({
  head: () => ({
    meta: [
      { title: "Erste-Hilfe-Kurs Bochum für Führerschein | MIRO-DRIVE" },
      { name: "description", content: "Amtlich anerkannter Erste-Hilfe-Kurs in Bochum – regelmäßige Termine, Anmeldung per WhatsApp." },
      { property: "og:title", content: "Erste-Hilfe-Kurs Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Amtlich anerkannter Erste-Hilfe-Kurs in Bochum – regelmäßige Termine, Anmeldung per WhatsApp." },
      { property: "og:url", content: "/erste-hilfe-kurs" },
    ],
    links: [{ rel: "canonical", href: "/erste-hilfe-kurs" }],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(faQuery),
      context.queryClient.ensureQueryData(datesQuery),
    ]),
  component: FAPage,
  errorComponent: ErrorBox,
});

function formatDateRange(startIso: string, endIso: string | null) {
  const start = new Date(startIso);
  const dateStr = start.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const startTime = start.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  if (!endIso) return { dateStr, timeStr: `${startTime} Uhr` };
  const end = new Date(endIso);
  const endTime = end.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return { dateStr, timeStr: `${startTime} – ${endTime} Uhr` };
}

function FAPage() {
  const { data: info } = useSuspenseQuery(faQuery);
  const { data: dates = [] } = useQuery(datesQuery);

  const benefits = [
    { icon: Heart, label: "Amtlich anerkannt für alle Führerscheinklassen" },
    { icon: GraduationCap, label: "Kompakter Tageskurs – lernen, üben, fertig" },
    { icon: Clock, label: "Regelmäßige Termine, monatlich bei uns vor Ort" },
    { icon: FileText, label: "Bescheinigung sofort nach dem Kurs" },
    { icon: Calendar, label: "Anmeldung einfach per WhatsApp oder in der Filiale" },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Erste-Hilfe-Kurs Bochum"
        title="Erste-Hilfe-Kurs in Bochum für deinen Führerschein"
        subtitle={info?.description || "Wir bieten regelmäßig Erste-Hilfe-Kurse direkt bei uns in der Fahrschule an – kompakt an einem Tag und amtlich anerkannt."}
      />
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        {/* Top: Info + Termine side-by-side */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left: Bild + Vorteile */}
          <div className="space-y-6 lg:col-span-7">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={ersteHilfeImg}
                alt="Erste-Hilfe-Koffer mit rotem Kreuz"
                loading="eager"
                width={1280}
                height={720}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="mb-2 inline-block bg-primary px-3 py-1 font-display text-[10px] uppercase tracking-widest">
                  Safe First
                </span>
                <p className="max-w-md text-sm text-white/90">
                  Professionelle Ausrüstung und Experten-Wissen direkt bei uns in der Fahrschule.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h2 className="font-display text-2xl">Was dich erwartet</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <li key={b.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <b.icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <p className="text-sm font-medium leading-snug">{b.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Nächste Termine + Anmeldung */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl bg-foreground p-6 text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="font-display text-[11px] uppercase tracking-widest text-primary">
                    Nächste Termine
                  </span>
                </div>
                <h2 className="mt-2 font-display text-2xl">Sichere dir deinen Platz</h2>

                <div className="mt-5 space-y-3">
                  {dates.length === 0 ? (
                    <p className="rounded-xl bg-white/5 p-4 text-sm text-white/70">
                      Aktuell sind keine Termine online. Schreib uns kurz per WhatsApp –
                      wir sagen dir den nächsten Kurs sofort.
                    </p>
                  ) : (
                    dates.map((d: any) => {
                      const { dateStr, timeStr } = formatDateRange(d.starts_at, d.ends_at);
                      return (
                        <div
                          key={d.id}
                          className="rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                          <p className="font-bold leading-tight">{dateStr}</p>
                          <p className="mt-1 flex items-center gap-2 text-sm text-white/70">
                            <Clock className="h-3.5 w-3.5 text-primary" /> {timeStr}
                          </p>
                          {d.note && (
                            <p className="mt-2 text-xs text-white/60">{d.note}</p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {info?.dates && (
                  <p className="mt-4 rounded-lg bg-white/5 p-3 text-xs text-white/70">
                    {info.dates}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
                  {info?.duration && (
                    <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Dauer: {info.duration}</span>
                  )}
                  {info?.price && (
                    <span className="flex items-center gap-2">Preis: {info.price}</span>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 font-display text-xs uppercase tracking-widest text-white transition-all hover:brightness-110 active:scale-95"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-white bg-white px-5 py-3 font-display text-xs uppercase tracking-widest text-foreground transition-all hover:bg-white/90 active:scale-95"
                  >
                    <Phone className="h-4 w-4" /> Anrufen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Standorte */}
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl sm:text-3xl">Komm vorbei – unsere Standorte</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Anmeldung direkt in einer unserer Filialen während der Bürozeiten.
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
