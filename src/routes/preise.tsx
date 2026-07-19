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
      "12 Grundstoff + 2 Zusatzstoff Theorie",
      "Sonderfahrten: 5 Überland · 4 Autobahn · 3 Dunkelheit",
      "Führerschein gilt für Schalt- und Automatik-Fahrzeuge",
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
      "Zusätzlich mind. 10 Schaltkompetenz-Fahrten",
      "Interne Testfahrt statt zweiter TÜV-Prüfung",
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
      "Keine Schaltkompetenz-Fahrten nötig",
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

  const tuev = prices.filter((p) => p.category === "Externe TÜV-Gebühren");

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="border-b border-slate-200/70 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <img
                src="/images/miro-drive-logo.svg"
                alt="MIRO-DRIVE Logo"
                className="h-10 w-auto sm:h-12"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary sm:text-xs">
                Fahrschule Bochum
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              MIRO-DRIVE Preise
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Transparent. Fair. Ohne versteckte Kosten. Die gleichen Preise für Klasse B, B197 und B78 –
              nur die Ausbildung unterscheidet sich.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Keine versteckten Kosten
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> TÜV-geprüfte Ausbildung
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1">
                <Info className="h-3.5 w-3.5 text-primary" /> Beratung persönlich vor Ort
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Central price table */}
        <section className="relative">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                Preisübersicht
              </p>
              <h2 className="mt-1 font-display text-2xl text-foreground sm:text-3xl">
                Gültig für Klasse B, B197 und B78
              </h2>
            </div>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-muted-foreground">
              Stand: aktuell
            </span>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
            <ul className="divide-y divide-slate-100">
              {standardRows.map(({ row, price }) => {
                const live = price ? isOfferLive(price as any) : false;
                const remaining = live ? formatRemaining((price as any).offer_valid_until) : null;
                return (
                  <li
                    key={row.key}
                    className="flex items-center justify-between gap-6 px-5 py-5 sm:px-8 sm:py-6"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-base text-foreground sm:text-lg">{row.label}</p>
                      {row.hint && (
                        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{row.hint}</p>
                      )}
                      {live && (price!.offer_label || remaining) && (
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {price!.offer_label && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary-foreground shadow-sm sm:text-[10px]">
                              <Flame className="h-3 w-3" /> {price!.offer_label}
                            </span>
                          )}
                          {remaining && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-foreground/90 px-2 py-0.5 text-[9px] font-bold text-white sm:text-[10px]">
                              <Timer className="h-3 w-3" /> {remaining}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end">
                      {live && price!.old_price && (
                        <span className="text-xs font-semibold text-muted-foreground line-through sm:text-sm">
                          {price!.old_price}
                        </span>
                      )}
                      <span
                        className={[
                          "font-display tabular-nums",
                          live
                            ? "text-2xl font-black text-primary sm:text-3xl"
                            : "text-2xl text-foreground sm:text-3xl",
                        ].join(" ")}
                      >
                        {price!.price}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 text-xs text-muted-foreground sm:px-8">
              <span className="font-semibold text-foreground">Hinweis:</span> Sonderfahrten (Überland,
              Autobahn, Dunkelheit) werden wie eine Übungsstunde à 45 Minuten abgerechnet. Bei Klasse B197
              zusätzlich mind. 10 Schaltkompetenz-Fahrten zum gleichen Preis.
            </div>
          </div>
        </section>

        {/* Class comparison */}
        <section className="mt-16">
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
              Klassen im Vergleich
            </p>
            <h2 className="mt-1 font-display text-2xl text-foreground sm:text-3xl">
              Welche Klasse passt zu dir?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Die Preise sind identisch – der Unterschied liegt in der Ausbildung und im späteren Umfang
              der Fahrerlaubnis.
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
                        c.featured
                          ? "bg-primary/10 text-primary"
                          : "bg-slate-100 text-foreground",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Führerschein
                      </div>
                      <h3 className="font-display text-xl leading-none">{c.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{c.tagline}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
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

        {/* External TÜV fees */}
        {tuev.length > 0 && (
          <section className="mt-16">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-foreground/70" />
                <h3 className="font-display text-lg">Externe TÜV-Gebühren</h3>
                <span className="ml-auto text-xs text-muted-foreground">
                  Werden direkt an den TÜV gezahlt
                </span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {tuev.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">{it.title}</p>
                      {it.description && (
                        <p className="text-xs text-muted-foreground">{it.description}</p>
                      )}
                    </div>
                    <span className="font-display text-base tabular-nums text-foreground">
                      {it.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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
