import { CONTACT } from "@/lib/contact";
import { MapPin, Phone, MessageCircle, Calendar } from "lucide-react";

export type PriceBlock = { label?: string; old_price?: string; new_price?: string; suffix?: string };
export type OfferFlyerData = {
  id: string;
  image_url?: string | null;
  headline?: string | null;
  subline?: string | null;
  extra_line?: string | null;
  price_blocks?: PriceBlock[] | null;
  valid_from?: string | null;
  valid_until?: string | null;
};

const fmt = (v?: string | null) => (v ? new Date(v).toLocaleDateString("de-DE") : null);

export function OfferFlyer({ offer, compact = false }: { offer: OfferFlyerData; compact?: boolean }) {
  const blocks = (offer.price_blocks ?? []).filter((b) => b.label || b.new_price);
  const from = fmt(offer.valid_from);
  const until = fmt(offer.valid_until);
  return (
    <article className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#1a0a0a] via-[#2a0f0f] to-[#0a0a0a] text-white shadow-xl">
      {offer.image_url && (
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9]">
          <img src={offer.image_url} alt={offer.headline ?? "Angebot"} loading="eager" className="h-full w-full object-cover" />
        </div>
      )}
      <div className={compact ? "p-6" : "p-8 sm:p-10"}>
        {offer.subline && (
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-primary">{offer.subline}</p>
        )}
        {offer.headline && (
          <h3 className={`mt-2 text-center font-display uppercase leading-tight ${compact ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
            {offer.headline}
          </h3>
        )}

        {blocks.length > 0 && (
          <div className={`mt-6 grid gap-4 ${blocks.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {blocks.map((b, i) => (
              <div key={i} className="rounded-2xl border border-primary/40 bg-black/40 p-5 text-center">
                {b.label && <div className="text-sm font-bold uppercase text-white/90">{b.label}</div>}
                {b.old_price && <div className="mt-1 text-sm text-white/50 line-through">Statt {b.old_price}</div>}
                {b.new_price && <div className="mt-1 font-display text-4xl text-primary sm:text-5xl">{b.new_price}</div>}
                {b.suffix && <div className="mt-1 text-xs text-white/70">{b.suffix}</div>}
              </div>
            ))}
          </div>
        )}

        {offer.extra_line && (
          <p className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 text-center text-base font-bold uppercase">
            {offer.extra_line}
          </p>
        )}

        {(from || until) && (
          <p className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-white/70">
            <Calendar className="h-3.5 w-3.5" />
            Angebot gültig {from ? `vom ${from}` : ""}{until ? ` – bis ${until}` : ""}
          </p>
        )}

        {!compact && (
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
              <Phone className="h-4 w-4" /> Anrufen
            </a>
            <a href="/kontakt" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold hover:bg-white/10">
              <MapPin className="h-4 w-4" /> Filiale besuchen
            </a>
          </div>
        )}
      </div>
    </article>
  );
}