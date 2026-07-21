import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Car, X } from "lucide-react";
import heck from "@/assets/fahrzeug-heck.jpg.asset.json";
import neon from "@/assets/fahrzeug-neon.jpg.asset.json";
import front from "@/assets/fahrzeug-front.jpg.asset.json";
import tunnel from "@/assets/fahrzeug-tunnel.jpg.asset.json";
import stadt from "@/assets/fahrzeug-stadt.jpg.asset.json";
import graffiti from "@/assets/fahrzeug-graffiti.jpg.asset.json";

type FleetImage = { src: string; caption: string; kicker: string; alt: string };

const IMAGES: FleetImage[] = [
  { src: neon.url, caption: "Mercedes A-Klasse · Nachtaufnahme", kicker: "Fuhrpark", alt: "MIRO-DRIVE Fahrschulauto Mercedes A-Klasse bei Nacht unter Neon-Schrift in Bochum" },
  { src: front.url, caption: "LED-Scheinwerfer", kicker: "Design", alt: "Mercedes A-Klasse Fahrschulwagen von vorne mit LED-Tagfahrlicht" },
  { src: stadt.url, caption: "Unterwegs in Bochum", kicker: "Stadt", alt: "MIRO-DRIVE Fahrschulauto auf einer Kreuzung in Bochum" },
  { src: tunnel.url, caption: "AMG Line Optik", kicker: "Ausstattung", alt: "Mercedes A-Klasse Fahrschulwagen in AMG Line Optik" },
  { src: graffiti.url, caption: "Modernes Interieur", kicker: "Komfort", alt: "MIRO-DRIVE Mercedes A-Klasse Fahrschulauto vor Graffiti-Wand" },
  { src: heck.url, caption: "Heckansicht", kicker: "Fahrzeug", alt: "Mercedes A-Klasse Fahrschulwagen von hinten mit MIRO-DRIVE Branding" },
];

function Tile({ img, aspect, onClick }: { img: FleetImage; aspect: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-neutral-900 text-left shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${aspect}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 sm:p-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">{img.kicker}</div>
        <div className="mt-0.5 font-display text-sm text-white sm:text-base">{img.caption}</div>
      </div>
    </button>
  );
}

function Lightbox({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const touchStartX = useRef<number | null>(null);
  const img = IMAGES[index];
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
  if (!img) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8" onClick={onClose}>
      <button type="button" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Schließen" className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
        <X className="h-6 w-6" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Vorheriges Bild" className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Nächstes Bild" className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6">
        <ChevronRight className="h-6 w-6" />
      </button>
      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) (dx < 0 ? onNext : onPrev)();
          touchStartX.current = null;
        }}
      >
        <img src={img.src} alt={img.alt} className="max-h-[80vh] w-auto max-w-full select-none object-contain" draggable={false} />
        <div className="mt-4 text-center text-white">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">{img.kicker} · {index + 1} / {IMAGES.length}</div>
          <div className="mt-1 font-display text-lg">{img.caption}</div>
        </div>
      </div>
    </div>
  );
}

export function FleetSection() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i == null ? i : (i - 1 + IMAGES.length) % IMAGES.length)), []);
  const next = useCallback(() => setOpen((i) => (i == null ? i : (i + 1) % IMAGES.length)), []);

  return (
    <section className="bg-neutral-50 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Car className="h-3.5 w-3.5" /> Unser Fuhrpark
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Lerne in modernen Mercedes-Modellen</h2>
          <p className="mt-3 text-muted-foreground">
            Deine Fahrstunden in gepflegten Mercedes A-Klasse Fahrzeugen mit LED-Licht, AMG Line Optik und moderner Assistenz – für ein sicheres, angenehmes Fahrgefühl von der ersten Stunde an.
          </p>
        </div>

        {/* Bento-Grid: 1 groß + 5 kleiner. Mobil 2 Spalten, Desktop 4 Spalten. */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-2 lg:row-span-2">
            <Tile img={IMAGES[0]} aspect="aspect-[4/5] lg:aspect-auto lg:h-full" onClick={() => setOpen(0)} />
          </div>
          <Tile img={IMAGES[1]} aspect="aspect-square" onClick={() => setOpen(1)} />
          <Tile img={IMAGES[2]} aspect="aspect-square" onClick={() => setOpen(2)} />
          <Tile img={IMAGES[3]} aspect="aspect-square" onClick={() => setOpen(3)} />
          <Tile img={IMAGES[4]} aspect="aspect-square" onClick={() => setOpen(4)} />
          <div className="col-span-2 lg:col-span-4">
            <Tile img={IMAGES[5]} aspect="aspect-[16/7]" onClick={() => setOpen(5)} />
          </div>
        </div>
      </div>

      {open !== null && <Lightbox index={open} onClose={close} onPrev={prev} onNext={next} />}
    </section>
  );
}
