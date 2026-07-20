import filialeAussen from "@/assets/filiale-aussen.jpg.asset.json";
import theorieraum from "@/assets/theorieraum.jpg.asset.json";
import empfang from "@/assets/empfang.jpg.asset.json";

export const FILIALE_IMAGES = [
  { src: filialeAussen.url, caption: "Außenansicht", alt: "Fahrschule MIRO-DRIVE Bochum – Außenansicht der Filiale" },
  { src: theorieraum.url, caption: "Theorieraum", alt: "MIRO-DRIVE Bochum – moderner Theorieraum mit Großbildschirm" },
  { src: empfang.url, caption: "Empfang & Beratung", alt: "MIRO-DRIVE Bochum – Empfang und Beratungsbereich" },
] as const;

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export function FilialeGallery({
  eyebrow = "Unsere Filiale",
  title = "So sieht deine Fahrschule in Bochum aus",
  subtitle = "Modern, hell und mitten in Bochum – schau dir schon vorab an, wo du deine Theorie lernst und beraten wirst.",
  compact = false,
}: Props) {
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
        <div className="grid gap-4 sm:grid-cols-3">
          {FILIALE_IMAGES.map((img) => (
            <figure key={img.src} className="group overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-semibold text-foreground">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
