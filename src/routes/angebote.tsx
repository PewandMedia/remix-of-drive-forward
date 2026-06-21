import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBox } from "@/components/site/QueryFallbacks";
import { Check, Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { LOCATIONS } from "@/lib/locations";
import { OfferFlyer, type OfferFlyerData } from "@/components/site/OfferFlyer";

const offersQuery = queryOptions({
  queryKey: ["offers"],
  queryFn: async () => {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("active", true)
      .or(`valid_from.is.null,valid_from.lte.${nowIso}`)
      .or(`valid_until.is.null,valid_until.gte.${nowIso}`)
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const Route = createFileRoute("/angebote")({
  head: () => ({
    meta: [
      { title: "Angebote – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Individuelle Angebote und Pakete: Starter, Komplettpaket, Erste-Hilfe-Kombi – jetzt anfragen." },
      { property: "og:title", content: "Angebote – MIRO-DRIVE" },
      { property: "og:url", content: "/angebote" },
    ],
    links: [{ rel: "canonical", href: "/angebote" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(offersQuery),
  component: OffersPage,
  errorComponent: ErrorBox,
});

function OffersPage() {
  const { data: offers } = useSuspenseQuery(offersQuery);
  return (
    <SiteLayout>
      <PageHero eyebrow="Angebote" title="Individuelle Angebote für deine Anmeldung." subtitle="Du möchtest dich anmelden oder brauchst ein persönliches Paket? Komm in einer unserer Filialen vorbei oder frag uns kurz per WhatsApp." />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {offers.length === 0 ? (
          <p className="rounded-xl border bg-muted/30 p-8 text-center text-sm text-muted-foreground">Aktuell sind keine Angebote aktiv. Schreib uns gern direkt per WhatsApp – wir erstellen dir ein persönliches Paket.</p>
        ) : (
          <div className="mx-auto grid max-w-4xl gap-10">
            {offers.map((o) => (
              <OfferFlyer key={o.id} offer={o as unknown as OfferFlyerData} />
            ))}
          </div>
        )}

        <div className="mt-16 rounded-3xl bg-[#0a0a0a] p-8 text-white sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl">Individuelles Angebot? Komm vorbei.</h2>
              <p className="mt-3 text-white/70">Die Anmeldung und persönliche Beratung erfolgen ausschließlich in unseren Filialen. Online buchen ist nicht möglich – dafür bekommst du bei uns vor Ort ein wirklich passendes Paket.</p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Persönliche Beratung in der Filiale</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Maßgeschneiderte Pakete</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-primary" /> Schnelle Rückmeldung per WhatsApp</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white">
                  <MessageCircle className="h-4 w-4" /> WhatsApp schreiben
                </a>
                <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
                  <Phone className="h-4 w-4" /> Anrufen
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} className="rounded-2xl bg-white p-5 text-foreground">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary">{loc.label}</div>
                  <div className="mt-1 font-display text-sm uppercase">{loc.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{loc.street}, {loc.zip} {loc.city}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}