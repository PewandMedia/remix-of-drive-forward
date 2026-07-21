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
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary/[0.03] to-white py-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 hidden lg:block blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-primary/10 hidden lg:block blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Bewertet von unseren Fahrschülern
          </span>
          <div className="mt-6 flex items-center justify-center gap-3">
            <GoogleLogo className="h-9 w-9" />
            <span className="font-display text-5xl tracking-tight text-foreground sm:text-6xl">
              {CONTACT.googleRating}
            </span>
            <Stars size={28} />
          </div>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
            Bochums bestbewertete Fahrschule – mit über{" "}
            <span className="text-primary">{CONTACT.googleReviewCount}</span>{" "}
            Google-Bewertungen.
          </h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            5,0 Sterne sprechen für sich. Unsere Fahrschüler vertrauen uns – und du kannst dich selbst überzeugen.
          </p>
        </div>

        {/* Featured review */}
        <article
          key={featured.name}
          className="mx-auto mt-14 max-w-4xl rounded-3xl border border-black/5 bg-white p-6 shadow-xl shadow-primary/5 transition-all duration-500 sm:p-10"
        >
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <img
              src={featured.image}
              alt={featured.name}
              width={96}
              height={96}
              loading="lazy"
              className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/10 sm:h-24 sm:w-24"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <p className="font-display text-xl text-foreground sm:text-2xl">{featured.name}</p>
                <GoogleLogo className="h-5 w-5" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{featured.when}</p>
              <div className="mt-3">
                <Stars size={22} />
              </div>
            </div>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-foreground/85 sm:text-xl">
            „{featured.text}"
          </p>
        </article>

        {/* Three switchable reviews */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6">
          {others.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => promote(i + 1)}
              aria-label={`Bewertung von ${r.name} nach oben holen`}
              className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6"
            >
              <div className="flex items-center gap-3">
                <img
                  src={r.image}
                  alt={r.name}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-black/5 transition-all group-hover:ring-primary/30"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.when}</p>
                </div>
                <GoogleLogo className="h-4 w-4 shrink-0" />
              </div>
              <div className="mt-3">
                <Stars size={14} />
              </div>
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/80">
                „{r.text}"
              </p>
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={CONTACT.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
          >
            <GoogleLogo className="h-4 w-4" />
            Jetzt bei Google bewerten
          </a>
          <a
            href={CONTACT.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-white"
          >
            Alle {CONTACT.googleReviewCount} Rezensionen lesen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
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
