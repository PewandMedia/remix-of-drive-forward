import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import filialeAussen from "@/assets/filiale-aussen.jpg.asset.json";
import theorieraum from "@/assets/theorieraum.jpg.asset.json";
import empfang from "@/assets/empfang.jpg.asset.json";

export const FILIALE_IMAGES = [
  { src: filialeAussen.url, caption: "Außenansicht", kicker: "Filiale", alt: "Fahrschule MIRO-DRIVE Bochum – Außenansicht der Filiale" },
  { src: theorieraum.url, caption: "Theorieraum", kicker: "Unterricht", alt: "MIRO-DRIVE Bochum – moderner Theorieraum mit Großbildschirm" },
  { src: empfang.url, caption: "Empfang & Beratung", kicker: "Willkommen", alt: "MIRO-DRIVE Bochum – Empfang und Beratungsbereich" },
] as const;

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

function Tile({
  img,
  aspect,
  onClick,
}: {
  img: (typeof FILIALE_IMAGES)[number];
  aspect: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-neutral-100 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${aspect}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 sm:p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
          {img.kicker}
        </div>
        <div className="mt-0.5 font-display text-base text-white sm:text-lg">
          {img.caption}
        </div>
      </div>
    </button>
  );
}

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const img = FILIALE_IMAGES[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? onNext : onPrev)();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Schließen"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Vorheriges Bild"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Nächstes Bild"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="max-h-[80vh] w-auto max-w-full select-none object-contain"
          draggable={false}
        />
        <div className="mt-4 text-center text-white">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
            {img.kicker} · {index + 1} / {FILIALE_IMAGES.length}
          </div>
          <div className="mt-1 font-display text-lg">{img.caption}</div>
        </div>
      </div>
    </div>
  );
}

export function FilialeGallery({
  eyebrow = "Unsere Filiale",
  title = "So sieht deine Fahrschule in Bochum aus",
  subtitle = "Modern, hell und mitten in Bochum – schau dir schon vorab an, wo du deine Theorie lernst und beraten wirst.",
  compact = false,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hero, top, bottom] = FILIALE_IMAGES;

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i == null ? i : (i - 1 + FILIALE_IMAGES.length) % FILIALE_IMAGES.length)),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i == null ? i : (i + 1) % FILIALE_IMAGES.length)),
    [],
  );

  return (
    <section className={`bg-white ${compact ? "py-10" : "py-16 sm:py-20"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!compact && (
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {/* Mobile: Mosaik, alle Bilder sofort sichtbar, gleiche Ratios */}
        <div className="grid grid-cols-2 gap-2 sm:hidden">
          <div className="col-span-2">
            <Tile img={hero} aspect="aspect-[4/3]" onClick={() => open(0)} />
          </div>
          <Tile img={top} aspect="aspect-square" onClick={() => open(1)} />
          <Tile img={bottom} aspect="aspect-square" onClick={() => open(2)} />
          <div className="col-span-2 mt-1 text-center text-[11px] text-muted-foreground">
            Tippen zum Vergrößern
          </div>
        </div>

        {/* Desktop: Collage – links Hero 4/5, rechts zwei Kacheln 5/4 = gleiche Gesamthöhe */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-5">
          <Tile img={hero} aspect="aspect-[4/5]" onClick={() => open(0)} />
          <div className="grid grid-rows-2 gap-4 lg:gap-5">
            <Tile img={top} aspect="h-full" onClick={() => open(1)} />
            <Tile img={bottom} aspect="h-full" onClick={() => open(2)} />
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}
