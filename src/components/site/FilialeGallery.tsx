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
  className = "",
  onClick,
}: {
  img: (typeof FILIALE_IMAGES)[number];
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block overflow-hidden rounded-3xl border border-black/5 bg-neutral-100 shadow-sm ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="h-full w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-white/95 px-4 py-2.5 text-left backdrop-blur">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          {img.kicker}
        </div>
        <div className="font-display text-sm text-foreground sm:text-base">
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

        {/* Mobile: Snap-Karussell, komplette Bilder */}
        <div className="-mx-4 sm:hidden">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILIALE_IMAGES.map((img, i) => (
              <div key={img.src} className="min-w-[85%] shrink-0 snap-center">
                <Tile img={img} className="aspect-[4/3]" onClick={() => open(i)} />
              </div>
            ))}
          </div>
          <div className="mt-3 px-4 text-[11px] text-muted-foreground">
            Tippen zum Vergrößern · seitlich wischen
          </div>
        </div>

        {/* Desktop: Bento-Grid ohne Anschnitt */}
        <div className="hidden sm:grid sm:grid-cols-4 sm:grid-rows-2 sm:gap-4 sm:h-[640px] lg:h-[720px]">
          <Tile img={hero} className="col-span-2 row-span-2" onClick={() => open(0)} />
          <Tile img={top} className="col-span-2 row-span-1" onClick={() => open(1)} />
          <Tile img={bottom} className="col-span-2 row-span-1" onClick={() => open(2)} />
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}
