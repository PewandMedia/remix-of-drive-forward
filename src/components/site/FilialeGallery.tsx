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
}: {
  img: (typeof FILIALE_IMAGES)[number];
  className?: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm ring-1 ring-black/5 ${className}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
          {img.kicker}
        </div>
        <div className="mt-0.5 font-display text-lg text-white sm:text-xl">
          {img.caption}
        </div>
      </figcaption>
    </figure>
  );
}

export function FilialeGallery({
  eyebrow = "Unsere Filiale",
  title = "So sieht deine Fahrschule in Bochum aus",
  subtitle = "Modern, hell und mitten in Bochum – schau dir schon vorab an, wo du deine Theorie lernst und beraten wirst.",
  compact = false,
}: Props) {
  const [hero, top, bottom] = FILIALE_IMAGES;

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

        {/* Mobile: horizontales Snap-Karussell */}
        <div className="-mx-4 sm:hidden">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILIALE_IMAGES.map((img) => (
              <div key={img.src} className="min-w-[82%] shrink-0 snap-center">
                <Tile img={img} className="aspect-[4/5]" />
              </div>
            ))}
          </div>
          <div className="mt-3 px-4 text-[11px] text-muted-foreground">
            ← seitlich wischen
          </div>
        </div>

        {/* Desktop: Bento-Grid */}
        <div className="hidden sm:grid sm:grid-cols-4 sm:grid-rows-2 sm:gap-4 sm:h-[520px] lg:h-[560px]">
          <Tile img={hero} className="col-span-2 row-span-2" />
          <Tile img={top} className="col-span-2 row-span-1" />
          <Tile img={bottom} className="col-span-2 row-span-1" />
        </div>
      </div>
    </section>
  );
}
