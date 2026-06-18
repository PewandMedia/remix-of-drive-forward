import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT } from "@/lib/contact";
import { ErrorBox, NotFoundBox } from "@/components/site/QueryFallbacks";
import { Info } from "lucide-react";

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

const CATEGORY_ORDER = ["Klasse B", "Klasse B197", "Auffrischungsstunden", "Erste-Hilfe-Kurs"];
const CATEGORY_CTA: Record<string, { label: string; to?: string; whatsapp?: boolean }> = {
  "Klasse B": { label: "Jetzt anmelden", to: "/kontakt" },
  "Klasse B197": { label: "Beratung anfragen", to: "/kontakt" },
  "Auffrischungsstunden": { label: "Termin anfragen", to: "/kontakt" },
  "Erste-Hilfe-Kurs": { label: "Erste-Hilfe-Kurs anfragen", to: "/erste-hilfe-kurs" },
};

function PricesPage() {
  const { data: prices } = useSuspenseQuery(pricesQuery);
  const grouped = CATEGORY_ORDER.map((c) => ({
    category: c,
    items: prices.filter((p) => p.category === c),
  })).filter((g) => g.items.length > 0);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Preise"
        title="Transparente Preise. Keine Überraschungen."
        subtitle="Alle Preise sind transparent dargestellt. Für individuelle Angebote oder besondere Anmeldungspakete kannst du uns jederzeit über WhatsApp kontaktieren."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-foreground/80">
            Alle Angaben dienen der Übersicht. Preise können vom Inhaber im Admin-Bereich jederzeit angepasst werden.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {grouped.map((g) => {
            const cta = CATEGORY_CTA[g.category];
            return (
              <div key={g.category} className="group relative flex flex-col overflow-hidden rounded-3xl border bg-white p-7 transition-shadow hover:shadow-xl">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
                <div className="text-xs font-bold uppercase tracking-wider text-primary">{g.category}</div>
                <h3 className="mt-2 font-display text-2xl">{g.category}</h3>
                <ul className="mt-6 flex-1 space-y-3">
                  {g.items.map((it) => (
                    <li key={it.id} className="flex items-start justify-between gap-4 border-b pb-3 last:border-0">
                      <div>
                        <p className="text-sm font-semibold">{it.title}</p>
                        {it.description && <p className="text-xs text-muted-foreground">{it.description}</p>}
                      </div>
                      <span className="shrink-0 font-display text-base text-primary">{it.price}</span>
                    </li>
                  ))}
                </ul>
                {cta && (
                  <Link to={cta.to ?? "/kontakt"} className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-bold text-white hover:bg-primary">
                    {cta.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl bg-[#0a0a0a] p-10 text-white">
          <h3 className="text-2xl uppercase sm:text-3xl">Individuelles Angebot gewünscht?</h3>
          <p className="mt-2 max-w-xl text-white/70">Schreib uns kurz per WhatsApp – wir erstellen dir ein persönliches Paket.</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
            Per WhatsApp anfragen
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}