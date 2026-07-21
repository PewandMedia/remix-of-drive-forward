import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Car, ChevronLeft, ChevronRight, ImageIcon, MapPin, X } from "lucide-react";
import filialeAussen from "@/assets/filiale-aussen.jpg.asset.json";
import theorieraum from "@/assets/theorieraum.jpg.asset.json";
import empfang from "@/assets/empfang.jpg.asset.json";

export type FilialeImage = {
  src: string;
  caption: string;
  kicker: string;
  alt: string;
};

export type Filiale = {
  id: "rathaus" | "riemke" | "autos";
  name: string;
  address?: string;
  icon?: "map" | "car";
  images: FilialeImage[];
};

export const FILIALEN: Filiale[] = [
  {
    id: "rathaus",
    name: "Rathaus",
    address: "Brückstraße 53, 44787 Bochum",
    icon: "map",
    images: [
      { src: filialeAussen.url, caption: "Außenansicht", kicker: "Filiale", alt: "Fahrschule MIRO-DRIVE Bochum Rathaus – Außenansicht der Filiale" },
      { src: theorieraum.url, caption: "Theorieraum", kicker: "Unterricht", alt: "MIRO-DRIVE Bochum Rathaus – moderner Theorieraum mit Großbildschirm" },
      { src: empfang.url, caption: "Empfang & Beratung", kicker: "Willkommen", alt: "MIRO-DRIVE Bochum Rathaus – Empfang und Beratungsbereich" },
    ],
  },
  {
    id: "riemke",
    name: "Riemke Markt",
    address: "Herner Straße 365, 44807 Bochum",
    icon: "map",
    images: [],
  },
  {
    id: "autos",
    name: "Unsere Autos",
    icon: "car",
    images: [
      { src: "/media/autos/auto-1.jpg", caption: "Mercedes A-Klasse", kicker: "Fuhrpark", alt: "MIRO-DRIVE Fahrschulwagen Mercedes weiß Frontansicht" },
      { src: "/media/autos/auto-3.jpg", caption: "Frontansicht", kicker: "Fahrzeug", alt: "MIRO-DRIVE Fahrschulauto weiß mit Logo auf der Motorhaube" },
      { src: "/media/autos/auto-2.jpg", caption: "Heckansicht", kicker: "Fahrzeug", alt: "MIRO-DRIVE Fahrschulwagen Heckansicht mit Kennzeichen BO FM 621" },
      { src: "/media/autos/auto-4.jpg", caption: "Seitenprofil", kicker: "Design", alt: "MIRO-DRIVE Fahrschulwagen Seitenansicht" },
      { src: "/media/autos/auto-5.jpg", caption: "Auf der Straße", kicker: "Fahrpraxis", alt: "MIRO-DRIVE Fahrschulauto während der Fahrstunde im Tunnel" },
      { src: "/media/autos/auto-6.jpg", caption: "Neonlicht", kicker: "Style", alt: "MIRO-DRIVE Fahrschulwagen unter roten Neonlichtern" },
    ],
  },
];

// Backwards-Compat: alte Importe zeigen weiter auf die Rathaus-Bilder.
export const FILIALE_IMAGES = FILIALEN[0].images;

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
  img: FilialeImage;
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
        loading="eager"
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
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: FilialeImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const img = images[index];

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

  if (!img) return null;

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
            {img.kicker} · {index + 1} / {images.length}
          </div>
          <div className="mt-1 font-display text-lg">{img.caption}</div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ filiale }: { filiale: Filiale }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-white p-10 text-center sm:p-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(color-mix(in_oklab,var(--foreground)_10%,transparent)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <ImageIcon className="h-7 w-7" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Bilder folgen</span>
        <h3 className="mt-2 font-display text-2xl text-slate-900 sm:text-3xl">
          Filiale {filiale.name}
        </h3>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          Wir bereiten aktuell die Fotos unserer Filiale {filiale.name} für dich vor. Schau bald wieder vorbei –
          bis dahin freuen wir uns auf deinen persönlichen Besuch.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {filiale.address}
        </div>
      </div>
    </div>
  );
}

export function FilialeGallery({
  eyebrow = "Unsere Filialen",
  title = "So sieht deine Fahrschule in Bochum aus",
  subtitle = "Modern, hell und mitten in Bochum – schau dir schon vorab an, wo du deine Theorie lernst und beraten wirst.",
  compact = false,
}: Props) {
  const [activeId, setActiveId] = useState<Filiale["id"]>("rathaus");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const active = useMemo(
    () => FILIALEN.find((f) => f.id === activeId) ?? FILIALEN[0],
    [activeId],
  );
  const images = active.images;

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i == null || images.length === 0 ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i == null || images.length === 0 ? i : (i + 1) % images.length)),
    [images.length],
  );

  const switchTo = (id: Filiale["id"]) => {
    setActiveId(id);
    setOpenIndex(null);
  };

  const [hero, top, bottom] = images;

  return (
    <section className={`bg-white ${compact ? "py-10" : "py-16 sm:py-20"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!compact && (
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">{eyebrow}</span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {/* Filial-Umschalter */}
        <div
          role="tablist"
          aria-label="Filiale wählen"
          className="mb-6 inline-flex w-full flex-wrap gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 shadow-sm sm:w-auto"
        >
          {FILIALEN.map((f) => {
            const isActive = f.id === activeId;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => switchTo(f.id)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-all sm:flex-none sm:px-6 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>

        {images.length >= 3 ? (
          <>
            {/* Mobile Mosaik */}
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

            {/* Desktop Collage */}
            <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-5">
              <Tile img={hero} aspect="aspect-[4/5]" onClick={() => open(0)} />
              <div className="grid grid-rows-2 gap-4 lg:gap-5">
                <Tile img={top} aspect="h-full" onClick={() => open(1)} />
                <Tile img={bottom} aspect="h-full" onClick={() => open(2)} />
              </div>
            </div>
          </>
        ) : (
          <EmptyState filiale={active} />
        )}
      </div>

      {openIndex !== null && images.length > 0 && (
        <Lightbox images={images} index={openIndex} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  );
}
