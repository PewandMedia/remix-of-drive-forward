export type OfferRow = {
  offer_active?: boolean | null;
  old_price?: string | null;
  offer_label?: string | null;
  offer_valid_from?: string | null;
  offer_valid_until?: string | null;
};

export function isOfferLive(p: OfferRow | null | undefined, now: Date = new Date()): boolean {
  if (!p || !p.offer_active) return false;
  const t = now.getTime();
  if (p.offer_valid_from && t < new Date(p.offer_valid_from).getTime()) return false;
  if (p.offer_valid_until && t > new Date(p.offer_valid_until).getTime()) return false;
  return true;
}

export function formatRemaining(untilIso?: string | null, now: Date = new Date()): string | null {
  if (!untilIso) return null;
  const diff = new Date(untilIso).getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days >= 1) return `noch ${days} Tag${days === 1 ? "" : "e"} ${hours} Std.`;
  if (hours >= 1) return `noch ${hours} Std. ${mins} Min.`;
  return `noch ${mins} Min.`;
}