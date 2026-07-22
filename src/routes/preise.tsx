import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getActivePrices } from "@/lib/public-data.functions";
import { CONTACT } from "@/lib/contact";
import { ErrorBox, NotFoundBox } from "@/components/site/QueryFallbacks";
import {
  Car,
  Cog,
  Sparkles,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Flame,
  Timer,
  CheckCircle2,
  Info,
  Receipt,
} from "lucide-react";
import { isOfferLive, formatRemaining } from "@/lib/offer";
import { useEffect, useState } from "react";

const pricesQuery = queryOptions({
  queryKey: ["prices"],
  queryFn: () => getActivePrices(),
});

export const Route = createFileRoute("/preise")({
  head: () => ({
    meta: [
      { title: "Preise Fahrschule Bochum | MIRO-DRIVE" },
      {
        name: "description",
        content:
          "Transparente Preise für Klasse B, B197 und B78 – Grundbetrag, Lernprogramm, Übungsstunde, Prüfungen. Klar, fair und ohne versteckte Kosten.",
      },
      { property: "og:title", content: "Preise Fahrschule Bochum | MIRO-DRIVE" },
      {
        property: "og:description",
        content:
          "Transparente Preise für Klasse B, B197 und B78 – Grundbetrag, Lernprogramm, Übungsstunde, Prüfungen.",
      },
      { property: "og:url", content: "/preise" },
    ],
    links: [{ rel: "canonical", href: "/preise" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(pricesQuery),
  component: PricesPage,
  errorComponent: ErrorBox,
  notFoundComponent: () => <NotFoundBox label="Keine Preise verfügbar." />,
});

// Canonical price rows shown in the central price table.
// We source them from the "Klasse B" category (same prices apply to B197 & B78).
const STANDARD_ROWS: { key: string; label: string; hint?: string }[] = [
  { key: "Grundbetrag", label: "Grundbetrag", hint: "Einmalig – Anmeldung & Verwaltung" },
  { key: "Lernprogramm", label: "Lernprogramm", hint: "Theorie-App & Lernmaterial" },
  { key: "Übungsstunde", label: "Übungsstunde", hint: "45 Minuten Fahrunterricht" },
  { key: "Vorstellung Theorieprüfung", label: "Theorieprüfung", hint: "Vorstellungsgebühr Fahrschule" },
  { key: "Vorstellung Praxisprüfung", label: "Praxisprüfung", hint: "Vorstellungsgebühr Fahrschule" },
];

type ClassMeta = {
  key: string;
  short: string;
  title: string;
  tagline: string;
  icon: typeof Car;
  featured?: boolean;
  badge?: string;
  facts: string[];
};

const CLASSES: ClassMeta[] = [
  {
    key: "Klasse B",
    short: "B",
    title: "Klasse B",
    tagline: "Der klassische Führerschein mit Schaltgetriebe.",
    icon: Car,
    facts: [
      "Ausbildung auf Schaltfahrzeug",
      "Prüfung auf Schaltfahrzeug",
      "Sonderfahrten: 5 Überland · 4 Autobahn · 3 Dunkelheit",
      "Danach fahrbar: Schalt- & Automatikfahrzeuge",
    ],
  },
  {
    key: "Klasse B197",
    short: "B197",
    title: "Klasse B197",
    tagline: "Automatik lernen – Führerschein gilt trotzdem für Schalter.",
    icon: Sparkles,
    featured: true,
    badge: "Am beliebtesten",
    facts: [
      "Ausbildung & Prüfung auf Automatik",
      "Mindestens 10 Schaltkompetenz-Fahrten müssen absolviert werden",
      "Führerschein gilt für Schalt- und Automatik-Fahrzeuge",
    ],
  },
  {
    key: "Klasse B78",
    short: "B78",
    title: "Klasse B78",
    tagline: "Reine Automatik – entspannt und effizient ans Ziel.",
    icon: Cog,
    facts: [
      "Ausbildung & Prüfung auf Automatik",
      "Sonderfahrten: 5 Überland · 4 Autobahn · 3 Dunkelheit",
      "Führerschein gilt nur für Automatik-Fahrzeuge",
    ],

  },
];

function PricesPage() {
  const { data: prices } = useSuspenseQuery(pricesQuery);
  // countdown tick
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  // Build canonical rows from "Klasse B" pool (same prices for B, B197, B78)
  const pool = prices.filter((p) => p.category === "Klasse B");
  const standardRows = STANDARD_ROWS.map((row) => ({
    row,
    price: pool.find((p) => p.title === row.key) ?? null,
  })).filter((r) => r.price);

  // External TÜV examination fees (separate from driving-school prices)
  const externalFees = prices
    .filter((p) => p.category === "Externe TÜV-Gebühren")
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 500px at 50% -10%, rgba(200,16,46,0.10), transparent 60%), radial-gradient(600px 300px at 90% 10%, rgba(15,23,42,0.06), transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/miro-drive-logo.svg"
              alt="MIRO-DRIVE Fahrschule Bochum"
              className="hidden h-14 w-auto sm:block sm:h-16"
            />
            <div className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-primary sm:text-xs">
              <span className="h-px w-8 bg-primary/40" />
              Preisübersicht
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h1 className="mt-4 font-display text-5xl font-light leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Preise
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Transparent. Fair. Ohne versteckte Kosten. Die gleichen Konditionen für Klasse B, B197 und B78.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Keine versteckten Kosten
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> TÜV-geprüfte Ausbildung
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
              <span className="inline-flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-primary" /> Persönliche Beratung
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Central premium price table */}
        <section className="relative">
          <div className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-primary/60" />
          <div className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 border-r-2 border-t-2 border-primary/60" />
          <div className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-primary/60" />
          <div className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-primary/60" />

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] sm:p-10 lg:p-14">
            <div className="flex flex-col items-center border-b border-slate-200 pb-8 text-center">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500">
                <span className="h-px w-6 bg-slate-300" />
                Preisliste
                <span className="h-px w-6 bg-slate-300" />
              </div>
              <h2 className="mt-3 font-display text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
                Klasse B · B197 · B78
              </h2>
              <p className="mt-2 text-sm text-slate-500">Identische Preise – die Ausbildung unterscheidet sich.</p>
            </div>

            <ul className="mt-4 divide-y divide-slate-100">
              {standardRows.map(({ row, price }, idx) => {
                const live = price ? isOfferLive(price as any) : false;
                const remaining = live ? formatRemaining((price as any).offer_valid_until) : null;
                const isHighlight = row.key === "Übungsstunde";
                return (
                  <li
                    key={row.key}
                    className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 sm:gap-6 sm:py-6"
                  >
                    <span className="font-display text-xs tabular-nums text-slate-400 sm:text-sm">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-lg font-normal text-slate-900 sm:text-xl">
                        {row.label}
                      </p>
                      {row.hint && (
                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">{row.hint}</p>
                      )}
                      {live && (price!.offer_label || remaining) && (
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {price!.offer_label && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary-foreground shadow-sm sm:text-[10px]">
                              <Flame className="h-3 w-3" /> {price!.offer_label}
                            </span>
                          )}
                          {remaining && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[9px] font-bold text-white sm:text-[10px]">
                              <Timer className="h-3 w-3" /> {remaining}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end">
                      {live && price!.old_price && (
                        <span className="text-xs font-medium text-slate-400 line-through sm:text-sm">
                          {price!.old_price}
                        </span>
                      )}
                      <span
                        className={[
                          "font-display tabular-nums leading-none",
                          live || isHighlight
                            ? "text-3xl font-medium text-primary sm:text-4xl"
                            : "text-3xl font-light text-slate-900 sm:text-4xl",
                        ].join(" ")}
                      >
                        {price!.price}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p>
                <span className="font-semibold text-slate-900">Sonderfahrten</span> (Überland, Autobahn,
                Dunkelheit) werden wie eine Übungsstunde à 45 Minuten abgerechnet. Bei Klasse B197 sind
                mind. 10 Schaltkompetenz-Fahrten zum gleichen Preis erforderlich.

              </p>
            </div>
          </div>
        </section>

        {/* External TÜV fees */}
        {externalFees.length > 0 && (
          <section className="relative mt-16">
            <div className="pointer-events-none absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-slate-300" />
            <div className="pointer-events-none absolute -right-3 -top-3 h-8 w-8 border-r-2 border-t-2 border-slate-300" />
            <div className="pointer-events-none absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-slate-300" />
            <div className="pointer-events-none absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-slate-300" />

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col items-center border-b border-slate-200 pb-6 text-center">
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-slate-500">
                  <span className="h-px w-6 bg-slate-300" />
                  Zusatzkosten
                  <span className="h-px w-6 bg-slate-300" />
                </div>
                <h2 className="mt-3 font-display text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
                  Externe TÜV-Gebühren
                </h2>
                <p className="mt-2 max-w-lg text-sm text-slate-500">
                  Diese Gebühren werden direkt an den TÜV entrichtet und sind nicht im Fahrschulpreis enthalten.
                </p>
              </div>

              <ul className="mt-4 divide-y divide-slate-100">
                {externalFees.map((fee, idx) => (
                  <li
                    key={fee.id}
                    className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 sm:gap-6 sm:py-6"
                  >
                    <span className="font-display text-xs tabular-nums text-slate-400 sm:text-sm">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-lg font-normal text-slate-900 sm:text-xl">
                        {fee.title}
                      </p>
                      {fee.description && (
                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">{fee.description}</p>
                      )}
                    </div>
                    <span className="shrink-0 font-display text-3xl font-light tabular-nums leading-none text-slate-900 sm:text-4xl">
                      {fee.price}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 px-5 py-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                <Receipt className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p>
                  <span className="font-semibold text-slate-900">Hinweis:</span> Die TÜV-Gebühren können
                  sich ändern. Aktuelle Preise findest du auf der Webseite des TÜV.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Class comparison */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-primary">
              <span className="h-px w-6 bg-primary/40" />
              Klassen im Vergleich
              <span className="h-px w-6 bg-primary/40" />
            </div>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">
              Welche Klasse passt zu dir?
            </h2>
            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              Preise sind identisch – der Unterschied liegt in der Ausbildung.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CLASSES.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.key}
                  className={[
                    "relative flex flex-col rounded-3xl border bg-white p-6 transition-all",
                    c.featured
                      ? "border-primary/40 shadow-[0_20px_50px_-30px_rgba(200,16,46,0.4)] ring-1 ring-primary/20"
                      : "border-slate-200 hover:-translate-y-0.5 hover:shadow-lg",
                  ].join(" ")}
                >
                  {c.badge && (
                    <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-[9px] font-black uppercase tracking-wider text-primary-foreground shadow">
                      {c.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        "grid h-11 w-11 place-items-center rounded-2xl",
                        c.featured ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-900",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Führerschein
                      </div>
                      <h3 className="font-display text-xl leading-none text-slate-900">{c.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-500">{c.tagline}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>


        {/* Teasers */}
        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link
            to="/erste-hilfe-kurs"
            className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-transform hover:-translate-y-0.5"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Pflichtkurs
              </div>
              <h4 className="mt-1 font-display text-xl">Erste-Hilfe-Kurs</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Termine & Preise auf der separaten Seite.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
          <Link
            to="/kontakt"
            className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-transform hover:-translate-y-0.5"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Standorte
              </div>
              <h4 className="mt-1 font-display text-xl">Vorbeikommen & anmelden</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Bochum Zentrum & Riemke – mit Route-Button.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </section>

        {/* Dark CTA */}
        <section className="relative mt-12 overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 text-white">
          <div className="pointer-events-none absolute -right-20 -top-20 hidden h-72 w-72 rounded-full bg-primary/30 blur-3xl lg:block" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 hidden h-64 w-64 rounded-full bg-primary/20 blur-3xl lg:block" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl">Noch Fragen zu den Klassen?</h3>
              <p className="mt-2 max-w-xl text-white/70">
                Schreib uns per WhatsApp – wir beraten dich kurz, welche Klasse für dich passt. Die
                Anmeldung selbst läuft entspannt vor Ort in der Filiale.
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
        </section>
      </div>
    </SiteLayout>
  );
}
