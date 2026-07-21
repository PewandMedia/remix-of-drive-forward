import { useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import reviewImg1 from "@/assets/reviews/review-1.jpg";
import reviewImg2 from "@/assets/reviews/review-2.jpg";
import reviewImg3 from "@/assets/reviews/review-3.jpg";
import reviewImg4 from "@/assets/reviews/review-4.jpg";

type Review = {
  name: string;
  when: string;
  text: string;
  image: string;
};

const REVIEWS: Review[] = [
  {
    name: "Yusuf Demir",
    when: "vor 1 Woche",
    text: "Von der ersten Theoriestunde bis zur bestandenen Prüfung: super Betreuung, geduldige Fahrlehrer und moderne Fahrzeuge. Ich kann MIRO-DRIVE zu 100 % weiterempfehlen – hier fühlt man sich wirklich gut aufgehoben.",
    image: reviewImg1,
  },
  {
    name: "Lea Hoffmann",
    when: "vor 2 Wochen",
    text: "Meine Fahrlehrerin war unglaublich geduldig und hat mir die Angst vorm Fahren komplett genommen. Beim ersten Anlauf bestanden – danke!",
    image: reviewImg2,
  },
  {
    name: "Daniel Krüger",
    when: "vor 3 Wochen",
    text: "Moderne Autos, faire Preise und eine top organisierte Fahrschule. Der Kontakt läuft immer schnell und unkompliziert – klare Empfehlung.",
    image: reviewImg3,
  },
  {
    name: "Marie Schneider",
    when: "vor 1 Monat",
    text: "Ich habe die Fahrschule gewechselt und es war die beste Entscheidung. Freundliches Team, professionelle Ausbildung und ein tolles Gefühl von Anfang an.",
    image: reviewImg4,
  },
];

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-11.3 8 12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.7 1.1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44a20 20 0 0 0 13.5-5.2l-6.2-5.3a12 12 0 0 1-18-6.3l-6.6 5.1A20 20 0 0 0 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.5l6.2 5.3C40.6 36 44 30.5 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function Stars({ size = 18 }: { size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-primary text-primary" />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);

  const promote = (slotIndex: number) => {
    setOrder((prev) => {
      const next = [...prev];
      [next[0], next[slotIndex]] = [next[slotIndex], next[0]];
      return next;
    });
  };

  const featured = REVIEWS[order[0]];
  const others = order.slice(1).map((idx) => REVIEWS[idx]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary/[0.03] to-white py-10 sm:py-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 hidden lg:block blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-primary/10 hidden lg:block blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Bewertet von unseren Fahrschülern
          </span>
          <div className="mt-4 flex items-center justify-center gap-2 sm:mt-6 sm:gap-3">
            <GoogleLogo className="h-7 w-7 sm:h-9 sm:w-9" />
            <span className="font-display text-5xl tracking-tight text-foreground sm:text-6xl">
              {CONTACT.googleRating}
            </span>
            <Stars size={22} />
          </div>
          <h2 className="mt-4 text-2xl sm:mt-5 md:text-5xl">
            Bochums bestbewertete Fahrschule – mit über{" "}
            <span className="text-primary">{CONTACT.googleReviewCount}</span>{" "}
            Google-Bewertungen.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:mt-5 md:text-lg">
            5,0 Sterne sprechen für sich. Unsere Fahrschüler vertrauen uns – und du kannst dich selbst überzeugen.
          </p>
        </div>

        {/* Featured review */}
        <article
          key={featured.name}
          className="mx-auto mt-8 max-w-4xl rounded-3xl border border-black/5 bg-white p-4 shadow-xl shadow-primary/5 transition-all duration-500 sm:mt-14 sm:p-6 md:p-10"
        >
          <div className="flex items-center gap-3 text-left sm:gap-4 md:gap-6">
            <img
              src={featured.image}
              alt={featured.name}
              width={96}
              height={96}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-primary/10 sm:h-20 sm:w-20 md:h-24 md:w-24"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <p className="truncate font-display text-lg text-foreground sm:text-xl md:text-2xl">{featured.name}</p>
                <GoogleLogo className="h-5 w-5 shrink-0" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{featured.when}</p>
              <div className="mt-2 flex sm:mt-3">
                <Stars size={18} />
              </div>
            </div>
          </div>
          <p className="mt-4 line-clamp-4 text-base leading-relaxed text-foreground/85 sm:mt-6 sm:line-clamp-none sm:text-lg md:text-xl">
            „{featured.text}"
          </p>
        </article>

        {/* Three switchable reviews */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-6">
          {others.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => promote(i + 1)}
              aria-label={`Bewertung von ${r.name} nach oben holen`}
              className="group flex h-full min-w-0 flex-col rounded-2xl border border-black/5 bg-white p-2 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-5 md:p-6"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:flex sm:gap-3">
                <img
                  src={r.image}
                  alt={r.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-black/5 transition-all group-hover:ring-primary/30 sm:h-12 sm:w-12"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-[11px] font-bold leading-tight text-foreground sm:text-sm">{r.name}</p>
                  <p className="truncate text-[10px] leading-tight text-muted-foreground sm:text-xs">{r.when}</p>
                </div>
                <GoogleLogo className="hidden h-4 w-4 shrink-0 sm:block" />
              </div>
              <div className="mt-2 sm:mt-3">
                <Stars size={11} />
              </div>
              <p className="mt-2 line-clamp-3 text-[11px] leading-snug text-foreground/80 sm:mt-3 sm:line-clamp-4 sm:text-sm sm:leading-relaxed">
                „{r.text}"
              </p>
            </button>
          ))}
        </div>


        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-4">
          <a
            href={CONTACT.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] sm:px-7 sm:py-3.5 sm:text-sm"
          >
            <GoogleLogo className="h-4 w-4" />
            Jetzt bei Google bewerten
          </a>
          <a
            href={CONTACT.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-4 py-2.5 text-xs font-bold text-foreground transition-colors hover:bg-foreground hover:text-white sm:px-7 sm:py-3.5 sm:text-sm"
          >
            Alle {CONTACT.googleReviewCount} Rezensionen lesen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground sm:mt-4 sm:text-xs">
          Du wirst direkt zu Google Maps weitergeleitet. Eine Anmeldung in deinem Google-Konto ist nötig.
        </p>
      </div>
    </section>
  );
}

export function ReviewsBadge() {
  return (
    <a
      href={CONTACT.googleProfileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto flex w-fit items-center gap-3 rounded-full border border-primary/20 bg-white px-5 py-3 shadow-sm transition-transform hover:-translate-y-0.5"
    >
      <GoogleLogo className="h-5 w-5" />
      <span className="font-display text-lg text-foreground">{CONTACT.googleRating}</span>
      <Stars size={14} />
      <span className="text-xs font-semibold text-muted-foreground">
        {CONTACT.googleReviewCount} Google-Bewertungen
      </span>
    </a>
  );
}
