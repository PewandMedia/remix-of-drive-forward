import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT } from "@/lib/contact";
import { ErrorBox, NotFoundBox } from "@/components/site/QueryFallbacks";
import { Info, Car, Cog, Sparkles, MapPin, MessageCircle, ShieldCheck, ArrowRight, Route as RouteIcon, Moon, Gauge, BookOpen, UserCheck, CheckCircle2 } from "lucide-react";

const pricesQuery = queryOptions({
  queryKey: ["prices"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("prices")
      .select("*")
      .eq("active", true)
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const Route = createFileRoute("/preise")({
  head: () => ({
    meta: [
      { title: "Preise Fahrschule Bochum | MIRO-DRIVE" },
      { name: "description", content: "Transparente Preise für deinen Führerschein in Bochum. Klasse B, B197, Auffrischungsstunden und Erste-Hilfe-Kurs bei MIRO-DRIVE anfragen." },
      { property: "og:title", content: "Preise Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Transparente Preise deiner Fahrschule in Bochum – Klasse B, B197, Auffrischungsstunden & Erste-Hilfe-Kurs." },
      { property: "og:url", content: "/preise" },
    ],
    links: [{ rel: "canonical", href: "/preise" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pricesQuery),
  component: PricesPage,
  errorComponent: ErrorBox,
  notFoundComponent: () => <NotFoundBox label="Keine Preise verfügbar." />,
});

type CategoryMeta = {
  key: string;
  short: string;
  tagline: string;
  icon: typeof Car;
  featured?: boolean;
  badge?: string;
  sonderfahrten: { ueberland: number; autobahn: number; dunkel: number };
  theorie: string;
  mindestalter: string;
  pruefung: string;
  extraNote?: string;
  requirements: string[];
};

const CATEGORIES: CategoryMeta[] = [
  {
    key: "Klasse B",
    short: "B",
    tagline: "Klassischer Führerschein mit Schaltgetriebe – volle Flexibilität.",
    icon: Car,
    sonderfahrten: { ueberland: 5, autobahn: 4, dunkel: 3 },
    theorie: "12 Grundstoff + 2 Zusatzstoff (Doppelstunden à 90 Min.)",
    mindestalter: "18 Jahre (17 bei BF17)",
    pruefung: "Theorie- & Praxisprüfung beim TÜV",
    requirements: ["Lichtbildausweis", "Sehtest", "Erste-Hilfe-Kurs"],
  },
  {
    key: "Klasse B197",
    short: "B197",
    tagline: "Ausbildung auf Automatik – Führerschein gilt trotzdem für Schalter.",
    icon: Sparkles,
    featured: true,
    badge: "Am beliebtesten",
    sonderfahrten: { ueberland: 5, autobahn: 4, dunkel: 3 },
    theorie: "12 Grundstoff + 2 Zusatzstoff (Doppelstunden à 90 Min.)",
    mindestalter: "18 Jahre (17 bei BF17)",
    pruefung: "Theorie- & Praxisprüfung beim TÜV (auf Automatik)",
    extraNote: "Zusätzlich: mind. 10 Schaltstunden + interne Testfahrt beim Fahrlehrer – kein extra TÜV-Termin.",
    requirements: ["Lichtbildausweis", "Sehtest", "Erste-Hilfe-Kurs"],
  },
  {
    key: "Klasse B78",
    short: "B78",
    tagline: "Reine Automatik-Klasse – schneller und entspannter ans Ziel.",
    icon: Cog,
    sonderfahrten: { ueberland: 5, autobahn: 4, dunkel: 3 },
    theorie: "12 Grundstoff + 2 Zusatzstoff (Doppelstunden à 90 Min.)",
    mindestalter: "18 Jahre (17 bei BF17)",
    pruefung: "Theorie- & Praxisprüfung beim TÜV",
    extraNote: "Führerschein gilt ausschließlich für Automatik-Fahrzeuge.",
    requirements: ["Lichtbildausweis", "Sehtest", "Erste-Hilfe-Kurs"],
  },
];

function PricesPage() {
  const { data: prices } = useSuspenseQuery(pricesQuery);
  const cards = CATEGORIES
    .map((meta) => ({ meta, items: prices.filter((p) => p.category === meta.key) }))
    .filter((g) => g.items.length > 0);
  const tuev = prices.filter((p) => p.category === "Externe TÜV-Gebühren");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Preise"
        title="Preise für deinen Führerschein in Bochum"
        subtitle="Transparente Preise bei MIRO-DRIVE – deiner Fahrschule in Bochum. Klasse B, B197 (Automatik mit Schaltberechtigung) und B78. Für individuelle Angebote einfach per WhatsApp anfragen."
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]" />

        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground/80">
            <span className="font-bold">Persönliches Angebot?</span> MIRO-DRIVE erstellt individuelle Angebote
            für deine Anmeldung, Ausbildungspakete oder Kombi-Angebote in Bochum. Frag dein Angebot einfach
            direkt per WhatsApp an – wir helfen dir schnell und unkompliziert weiter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:items-stretch">
          {cards.map(({ meta, items }) => {
            const Icon = meta.icon;
            const featured = meta.featured;
            return (
              <article
                key={meta.key}
                className={[
                  "group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300",
                  featured
                    ? "border-primary/40 bg-white shadow-[0_30px_60px_-30px_theme(colors.primary/50)] ring-1 ring-primary/30 lg:-translate-y-3 lg:scale-[1.02]"
                    : "border-border bg-white hover:-translate-y-1 hover:shadow-2xl",
                ].join(" ")}
              >
                {/* Removed continuous conic-gradient overlay for scroll perf */}

                <div
                  className={[
                    "relative px-3 pt-4 pb-3 sm:px-7 sm:pt-7 sm:pb-6",
                    featured
                      ? "bg-gradient-to-br from-primary via-primary to-[#7a0010] text-white"
                      : "bg-gradient-to-br from-foreground via-foreground to-[#1a1a1a] text-white",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:14px_14px]" />
                  <div className="relative flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Premium icon: gradient ring + glow */}
                      <div className="relative shrink-0">
                        <div
                          className={[
                            "pointer-events-none absolute inset-0 -m-1.5 rounded-2xl blur-md opacity-70 animate-pulse",
                            featured ? "bg-white/40" : "bg-primary/50",
                          ].join(" ")}
                        />
                        <div
                          className={[
                            "relative grid h-11 w-11 place-items-center rounded-2xl p-[1.5px] sm:h-14 sm:w-14",
                            featured
                              ? "bg-gradient-to-br from-white via-white/70 to-white/20"
                              : "bg-gradient-to-br from-primary via-primary/60 to-white/30",
                          ].join(" ")}
                        >
                          <div className="grid h-full w-full place-items-center rounded-[14px] bg-black/40 backdrop-blur-md ring-1 ring-white/20">
                            <Icon className="h-5 w-5 drop-shadow-[0_0_8px_rgba(255,255,255,0.55)] sm:h-7 sm:w-7" />
                          </div>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70 sm:text-[11px]">
                          Führerschein
                        </div>
                        <h3 className="font-display text-xl leading-none sm:text-2xl">Klasse {meta.short}</h3>
                        <p className="mt-1 line-clamp-1 text-[11px] text-white/70 sm:hidden">{meta.tagline}</p>
                      </div>
                    </div>
                    {meta.badge && (
                      <span className="rounded-full bg-white px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary shadow sm:px-3 sm:py-1 sm:text-[10px]">
                        {meta.badge}
                      </span>
                    )}
                  </div>
                  <p className="relative mt-2 hidden text-sm leading-relaxed text-white/80 sm:mt-4 sm:block">{meta.tagline}</p>
                </div>

                <div className="flex flex-1 flex-col px-3 pb-4 pt-3 sm:px-7 sm:pb-7 sm:pt-5">
                  <div className="mb-3 space-y-2 rounded-2xl border border-border/60 bg-muted/30 p-3 sm:mb-5 sm:space-y-3 sm:p-4">
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      <div className="flex flex-col items-center gap-0.5 rounded-lg bg-white px-1 py-1.5 text-center shadow-sm sm:gap-1 sm:rounded-xl sm:px-2 sm:py-2">
                        <RouteIcon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                        <span className="font-display text-sm leading-none text-foreground sm:text-base">{meta.sonderfahrten.ueberland}</span>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">Überland</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 rounded-lg bg-white px-1 py-1.5 text-center shadow-sm sm:gap-1 sm:rounded-xl sm:px-2 sm:py-2">
                        <Gauge className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                        <span className="font-display text-sm leading-none text-foreground sm:text-base">{meta.sonderfahrten.autobahn}</span>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">Autobahn</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 rounded-lg bg-white px-1 py-1.5 text-center shadow-sm sm:gap-1 sm:rounded-xl sm:px-2 sm:py-2">
                        <Moon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                        <span className="font-display text-sm leading-none text-foreground sm:text-base">{meta.sonderfahrten.dunkel}</span>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[10px]">Dunkel</span>
                      </div>
                    </div>
                    <ul className="space-y-1 text-[11px] leading-snug text-foreground/80 sm:space-y-1.5 sm:text-xs">
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <BookOpen className="mt-0.5 h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                        <span><span className="font-semibold">Theorie:</span> {meta.theorie}</span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <UserCheck className="mt-0.5 h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                        <span><span className="font-semibold">Alter:</span> {meta.mindestalter}</span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                        <span><span className="font-semibold">Prüfung:</span> {meta.pruefung}</span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-primary sm:h-3.5 sm:w-3.5" />
                        <span><span className="font-semibold">Voraussetzungen:</span> {meta.requirements.join(", ")}</span>
                      </li>
                    </ul>
                    {meta.extraNote && (
                      <div className="rounded-lg border border-primary/30 bg-primary/5 px-2 py-1.5 text-[10px] leading-snug text-foreground/80 sm:px-3 sm:py-2 sm:text-[11px]">
                        <span className="font-bold text-primary">Hinweis: </span>{meta.extraNote}
                      </div>
                    )}
                  </div>
                  <ul className="flex-1 divide-y divide-border/60">
                    {items.map((it) => (
                      <li
                        key={it.id}
                        className="flex items-start justify-between gap-3 py-2 sm:gap-4 sm:py-3.5"
                      >
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold leading-snug sm:text-sm">{it.title}</p>
                          {it.description && (
                            <p className="mt-0.5 line-clamp-1 text-[10px] leading-snug text-muted-foreground sm:line-clamp-none sm:text-xs">{it.description}</p>
                          )}
                          {it.offer_active && it.offer_label && (
                            <span className="mt-1 inline-block rounded-full bg-primary px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-primary-foreground sm:px-2 sm:text-[9px]">
                              {it.offer_label}
                            </span>
                          )}
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-0.5">
                          {it.offer_active && it.old_price && (
                            <span className="text-[9px] text-muted-foreground line-through sm:text-xs">{it.old_price}</span>
                          )}
                          <span
                            className={[
                              "rounded-full px-2 py-0.5 font-display text-[11px] sm:px-3 sm:py-1 sm:text-sm",
                              it.offer_active
                                ? "bg-primary text-primary-foreground"
                                : featured
                                ? "bg-primary/10 text-primary"
                                : "bg-foreground/5 text-foreground",
                            ].join(" ")}
                          >
                            {it.price}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-row gap-2 sm:mt-6">
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener"
                      className={[
                        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-black transition-colors sm:gap-2 sm:px-4 sm:py-3 sm:text-sm",
                        featured
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-foreground text-white hover:bg-primary",
                      ].join(" ")}
                    >
                      <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>WhatsApp</span>
                    </a>
                    <Link
                      to="/kontakt"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-foreground/15 px-3 py-2.5 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary sm:gap-2 sm:px-4 sm:py-3 sm:text-sm"
                    >
                      <MapPin className="h-4 w-4" />
                      Filiale
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {tuev.length > 0 && (
          <div className="mt-12 rounded-3xl border bg-muted/30 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-foreground/70" />
              <h3 className="font-display text-lg">Externe TÜV-Gebühren</h3>
              <span className="ml-auto text-xs text-muted-foreground">Werden direkt an den TÜV gezahlt</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {tuev.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between rounded-2xl border bg-white px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-semibold">{it.title}</p>
                    {it.description && (
                      <p className="text-xs text-muted-foreground">{it.description}</p>
                    )}
                  </div>
                  <span className="font-display text-base text-foreground">{it.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link
            to="/erste-hilfe-kurs"
            className="group flex items-center justify-between rounded-3xl border bg-white p-6 transition-transform hover:-translate-y-0.5"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Pflichtkurs</div>
              <h4 className="mt-1 font-display text-xl">Erste-Hilfe-Kurs</h4>
              <p className="mt-1 text-sm text-muted-foreground">Termine & Preise auf der separaten Seite.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
          <Link
            to="/kontakt"
            className="group flex items-center justify-between rounded-3xl border bg-white p-6 transition-transform hover:-translate-y-0.5"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Standorte</div>
              <h4 className="mt-1 font-display text-xl">Vorbeikommen & anmelden</h4>
              <p className="mt-1 text-sm text-muted-foreground">Bochum Zentrum & Riemke – mit Route-Button.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 text-white">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 hidden lg:block blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary/20 hidden lg:block blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl">Noch Fragen zu den Klassen?</h3>
              <p className="mt-2 max-w-xl text-white/70">
                Schreib uns per WhatsApp – wir beraten dich kurz, welche Klasse für dich passt. Die Anmeldung selbst läuft entspannt vor Ort in der Filiale.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
              >
                <MessageCircle className="h-4 w-4" />
                Per WhatsApp fragen
              </a>
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                <MapPin className="h-4 w-4" />
                Filialen ansehen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}