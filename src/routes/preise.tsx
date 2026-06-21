import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT } from "@/lib/contact";
import { ErrorBox, NotFoundBox } from "@/components/site/QueryFallbacks";
import { Info, Car, Cog, Sparkles, MapPin, MessageCircle, ShieldCheck, ArrowRight } from "lucide-react";

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
      { title: "Preise – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Transparente Preise für Klasse B, B197, Auffrischungsstunden und Erste-Hilfe-Kurs. Individuelle Angebote auf Anfrage." },
      { property: "og:title", content: "Preise – MIRO-DRIVE" },
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
};

const CATEGORIES: CategoryMeta[] = [
  {
    key: "Klasse B",
    short: "B",
    tagline: "Klassischer Führerschein mit Schaltgetriebe – volle Flexibilität.",
    icon: Car,
  },
  {
    key: "Klasse B197",
    short: "B197",
    tagline: "Ausbildung auf Automatik – Führerschein gilt trotzdem für Schalter.",
    icon: Sparkles,
    featured: true,
    badge: "Am beliebtesten",
  },
  {
    key: "Klasse B78",
    short: "B78",
    tagline: "Reine Automatik-Klasse – schneller und entspannter ans Ziel.",
    icon: Cog,
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
        title="Klare Preise für Klasse B, B197 und B78."
        subtitle="Wir bilden in drei Klassen aus – Schalter, Automatik-Ausbildung mit Schaltberechtigung (B197) und reine Automatik (B78). Anmeldung ausschließlich vor Ort in unseren Filialen in Bochum."
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]" />

        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground/80">
            Alle Angaben dienen der Übersicht. Preise können vom Inhaber jederzeit angepasst werden – frag im Zweifel kurz per WhatsApp nach.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
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
                {featured && (
                  <div className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_0deg,theme(colors.primary/0),theme(colors.primary/40),theme(colors.primary/0)_50%)] opacity-40 blur-sm" />
                )}

                <div
                  className={[
                    "relative px-7 pt-7 pb-6",
                    featured
                      ? "bg-gradient-to-br from-primary via-primary to-[#7a0010] text-white"
                      : "bg-gradient-to-br from-foreground via-foreground to-[#1a1a1a] text-white",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:14px_14px]" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                          Führerschein
                        </div>
                        <h3 className="font-display text-2xl leading-none">Klasse {meta.short}</h3>
                      </div>
                    </div>
                    {meta.badge && (
                      <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary shadow">
                        {meta.badge}
                      </span>
                    )}
                  </div>
                  <p className="relative mt-4 text-sm leading-relaxed text-white/80">{meta.tagline}</p>
                </div>

                <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                  <ul className="flex-1 divide-y divide-border/60">
                    {items.map((it) => (
                      <li key={it.id} className="flex items-start justify-between gap-4 py-3.5">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold leading-tight">{it.title}</p>
                          {it.description && (
                            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{it.description}</p>
                          )}
                        </div>
                        <span
                          className={[
                            "shrink-0 rounded-full px-3 py-1 font-display text-sm",
                            featured
                              ? "bg-primary/10 text-primary"
                              : "bg-foreground/5 text-foreground",
                          ].join(" ")}
                        >
                          {it.price}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener"
                      className={[
                        "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-colors",
                        featured
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-foreground text-white hover:bg-primary",
                      ].join(" ")}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <Link
                      to="/kontakt"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground/15 px-4 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
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
            className="group flex items-center justify-between rounded-3xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
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
            className="group flex items-center justify-between rounded-3xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
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
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
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