import { Star, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/contact";

const SAMPLE_REVIEWS = [
  {
    name: "Shahin Rahman",
    initials: "SR",
    when: "vor 2 Wochen",
    text: "5 Sterne – sehr professionelle Fahrschule, geduldige Fahrlehrer und moderne Fahrzeuge. Absolute Empfehlung!",
  },
  {
    name: "U. Mur.",
    initials: "UM",
    when: "vor 2 Wochen",
    text: "Ich möchte meine aufrichtige Zufriedenheit mit der Fahrschule ausdrücken. Die professionelle Betreuung durch meinen Fahrlehrer war außergewöhnlich.",
  },
  {
    name: "S.",
    initials: "S",
    when: "vor einem Monat",
    text: "Ich möchte mich wirklich von Herzen bei der Fahrschule bedanken. Ich bin von meiner alten Fahrschule zu Miro-Drive gewechselt und es war für mich die beste Entscheidung.",
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

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SAMPLE_REVIEWS.map((r) => (
            <article
              key={r.name}
              className="group relative flex flex-col rounded-3xl border border-black/5 bg-white p-7 shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-[#7a0a14] font-display text-sm text-white">
                  {r.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.when}</p>
                </div>
                <GoogleLogo className="h-5 w-5" />
              </div>
              <div className="mt-4">
                <Stars size={14} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                "{r.text}"
              </p>
            </article>
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