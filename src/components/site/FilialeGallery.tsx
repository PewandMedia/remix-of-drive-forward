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
      className={`group block w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left shadow-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="block h-auto w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.01]"
      />
      <div className="bg-white px-3 py-2.5 sm:px-4 sm:py-3">
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

        {/* Mobile: komplette Bilder in voller Breite mit Swipe */}
        <div className="-mx-4 sm:hidden">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILIALE_IMAGES.map((img, i) => (
              <div key={img.src} className="shrink-0 snap-center" style={{ width: "calc(100vw - 2rem)" }}>
                <Tile img={img} onClick={() => open(i)} />
              </div>
            ))}
          </div>
          <div className="mt-3 px-4 text-[11px] text-muted-foreground">
            Tippen zum Vergrößern · seitlich wischen
          </div>
        </div>

        {/* Desktop: Collage wie Referenz, ohne Bild-Anschnitt */}
        <div className="hidden sm:grid sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] sm:items-start sm:gap-4 lg:gap-5">
          <Tile img={hero} onClick={() => open(0)} />
          <div className="grid gap-4 lg:gap-5">
            <Tile img={top} onClick={() => open(1)} />
            <Tile img={bottom} onClick={() => open(2)} />
          </div>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}
