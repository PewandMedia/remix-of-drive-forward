import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { getHomePrices, getTeamPreview, getFirstAidInfo, getUpcomingFirstAidDates } from "@/lib/public-data.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import ersteHilfeHero from "@/assets/erste-hilfe-hero.jpg";
import imgKlasseB from "@/assets/leistungen/klasse-b.jpg";
import imgB197 from "@/assets/leistungen/b197.jpg";
import imgErsteHilfe from "@/assets/leistungen/erste-hilfe.jpg";
import { Car, Users, Clock, Euro, Heart, Sparkles, MessageCircle, ShieldCheck, GraduationCap, MapPin, ArrowRight, Calendar, FileText, Star, Check, CheckCircle2, Award, Zap, Send, ClipboardCheck, Trophy, Flame, Timer, ChevronDown, User, Eye } from "lucide-react";
import heroVideo from "@/assets/miro-drive-hero-v2.mp4.asset.json";
import heroPoster from "@/assets/miro-drive-hero-v2-poster.jpg.asset.json";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { TeamCard, type TeamMember } from "@/components/site/TeamCard";
import { FilialeGallery } from "@/components/site/FilialeGallery";
import { HeroCanvasVideo } from "@/components/site/HeroCanvasVideo";

import { ReviewsSection } from "@/components/site/ReviewsSection";
import { InstagramSection } from "@/components/site/InstagramSection";
import { isOfferLive, formatRemaining } from "@/lib/offer";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fahrschule Bochum | MIRO-DRIVE – Führerschein Klasse B & B197" },
      { name: "description", content: "Führerschein Klasse B, B197 & B78 in Bochum – moderne Fahrzeuge, faire Preise, persönliche Betreuung." },
      { property: "og:title", content: "Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Führerschein Klasse B, B197 & B78 in Bochum – moderne Fahrzeuge, faire Preise, persönliche Betreuung." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DrivingSchool",
          name: "MIRO-DRIVE Fahrschule",
          address: { "@type": "PostalAddress", streetAddress: "Herner Str. 365", postalCode: "44807", addressLocality: "Bochum", addressCountry: "DE" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "549", bestRating: "5" },
        }),
      },
    ],
  }),
  component: Index,
});


const steps = [
  { n: "01", icon: Send, title: "Online oder per WhatsApp melden", text: "Nutze unser Anmeldeformular oder schreib uns direkt über WhatsApp." },
  { n: "02", icon: ClipboardCheck, title: "Finale Anmeldung in der Filiale", text: "Kurzer Termin in Bochum Zentrum oder Riemke zum Unterschreiben." },
  { n: "03", icon: GraduationCap, title: "Theorie & Praxis", text: "Strukturierter Unterricht, moderne Fahrzeuge und persönliche Betreuung." },
  { n: "04", icon: Trophy, title: "Bestanden – Führerschein erhalten", text: "Wir begleiten dich bis zur bestandenen TÜV-Prüfung." },
];

const reasons = [
  { title: "Stressfrei lernen", text: "Wir begleiten dich Schritt für Schritt bis zur Prüfung – geduldig, verständlich und professionell." },
  { title: "Moderne Ausbildung", text: "Klare Abläufe, digitale Kommunikation und moderne Fahrzeuge sorgen für eine angenehme Fahrausbildung." },
  { title: "Individuelle Beratung", text: "Jeder Fahrschüler ist anders – wir passen Tempo und Schwerpunkte an dich an." },
];



function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-slate-50 to-red-50/40 text-slate-900">
      {/* dezente Deko – hell */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgb(226_232_240/0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226_232_240/0.55)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-primary/70 via-primary/20 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8 lg:py-24">
        {/* LINKS: Text */}
        <div className="max-w-2xl">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.28em] text-slate-700 shadow-sm backdrop-blur" style={{ animationDelay: "0.05s" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            MIRO-DRIVE · Fahrschule in Bochum
          </p>

          <h1 className="animate-fade-up font-display text-[2.25rem] leading-[1.02] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]" style={{ animationDelay: "0.15s" }}>
            MIRO-DRIVE <span className="italic text-primary">Fahrschule Bochum</span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-xl text-base text-slate-600 sm:text-lg" style={{ animationDelay: "0.3s" }}>
            Deine moderne Fahrschule in Bochum. Persönliche Betreuung, moderne Fahrzeuge und flexible Fahrstunden in Bochum und Umgebung.
          </p>



          <div className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center" style={{ animationDelay: "0.45s" }}>
            <Link
              to="/anmeldung"
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[#a30016] px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-primary/40 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Jetzt online anmelden</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 text-sm font-bold text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md"
            >
              Kostenlose Beratung
            </Link>
            <Link
              to="/preise"
              className="group inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-primary sm:ml-1"
            >
              Preise ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Trust-Zeile */}
          <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600" style={{ animationDelay: "0.55s" }}>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-semibold text-slate-900">5.0</span>
              <span>· über 500 Bewertungen</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="font-semibold text-slate-900">TÜV-geprüft</span>
            </div>
          </div>
        </div>

        {/* RECHTS: Video-Karte */}
        <div className="animate-fade-up relative mx-auto w-full max-w-xl lg:max-w-none" style={{ animationDelay: "0.35s" }}>
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl shadow-slate-300/60 ring-1 ring-slate-200 lg:aspect-video">
            <HeroCanvasVideo
              src={heroVideo.url}
              poster={heroPoster.url}
              ariaLabel="MIRO-DRIVE Fahrschulfahrzeug"
              className="pointer-events-none absolute inset-0 h-full w-full"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 lg:from-black/25 lg:via-transparent lg:to-transparent" />
            {/* Klick-Fangschicht: hindert Opera/Safari daran, das Video als Popout/Fullscreen-Target zu erkennen */}
            <div
              className="absolute inset-0 z-30 cursor-default"
              aria-hidden="true"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onContextMenu={(e) => e.preventDefault()}
            />



            {/* Badge oben links */}
            <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              MIRO-DRIVE · Bochum
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


const LANGUAGES: { code: string; label: string; flag?: string }[] = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "Englisch", flag: "🇬🇧" },
  { code: "ku", label: "Kurdisch" },
  { code: "tr", label: "Türkisch", flag: "🇹🇷" },
  { code: "ar", label: "Arabisch", flag: "🇸🇦" },
];

function KurdistanFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" fill="#ED2024" />
      <rect y="13.33" width="30" height="6.67" fill="#278E43" />
      <circle cx="15" cy="10" r="3" fill="#FEBD11" />
    </svg>
  );
}

function LanguageChip({ l }: { l: typeof LANGUAGES[0] }) {
  return (
    <div className="flex min-h-[80px] w-full flex-col items-center justify-start gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 px-1 py-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:shadow-md sm:min-h-[96px] sm:gap-2 sm:px-3 sm:py-4">
      <div className="flex h-6 items-center justify-center sm:h-7">
        {l.flag ? (
          <span className="text-xl leading-none sm:text-3xl">{l.flag}</span>
        ) : (
          <KurdistanFlag className="h-4 w-6 rounded-sm shadow-sm sm:h-[26px] sm:w-[39px]" />
        )}
      </div>
      <span className="block w-full whitespace-normal break-words text-center text-[10px] font-semibold leading-[1.15] text-slate-800 sm:text-sm">
        {l.label}
      </span>
    </div>
  );
}

function LanguageStrip() {
  return (
    <section className="relative border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <p className="text-center text-[11px] font-black uppercase tracking-[0.28em] text-slate-700 sm:text-xs">
              Wir beraten & unterrichten in
            </p>
            <span className="h-px w-8 bg-primary" />
          </div>

          <ul className="grid w-full grid-cols-5 items-stretch justify-items-stretch gap-1.5 sm:gap-4">
            {LANGUAGES.map((l) => (
              <li key={l.code} className="flex w-full min-w-0">
                <LanguageChip l={l} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}








function Index() {
  const [, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((n) => n + 1), 60_000); return () => clearInterval(id); }, []);
  const [pricesQ, teamQ, faQ, faDatesQ] = useQueries({
    queries: [
      {
        queryKey: ["home-prices"],
        queryFn: () => getHomePrices(),
      },
      {
        queryKey: ["home-team"],
        queryFn: () => getTeamPreview(),
      },
      {
        queryKey: ["first_aid_info"],
        queryFn: () => getFirstAidInfo(),
        staleTime: 0,
        refetchOnMount: "always" as const,
      },
      {
        queryKey: ["first_aid_dates_upcoming"],
        queryFn: () => getUpcomingFirstAidDates(),
        staleTime: 0,
        refetchOnMount: "always" as const,
      },
    ],
  });

  const prices = pricesQ.data ?? [];
  const team = teamQ.data ?? [];
  const faInfo = faQ.data;
  const faDates = faDatesQ.data ?? [];


  const hasActiveOffer = prices.some((p: any) => isOfferLive(p));

  const rowFor = (cat: string) => {
    return (
      prices.find((p) => p.category === cat && /grundbetrag/i.test(p.title)) ??
      prices.find((p) => p.category === cat) ??
      null
    );
  };

  return (
    <SiteLayout>
      {/* HERO */}
      <HeroSection />
      <LanguageStrip />


      {/* PROCESS / SO GEHTS */}
      <section className="bg-[#0a0a0a] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">In 4 Schritten zum Führerschein</span>
            <h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">So einfach startest du.</h2>
            <p className="mt-4 text-white/60">
              Von der Online-Anmeldung bis zur bestandenen Prüfung – wir machen es dir so unkompliziert wie möglich.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.06] sm:rounded-3xl sm:p-7"
              >
                <div className="absolute right-3 top-3 font-display text-4xl leading-none text-white/[0.08] transition-colors group-hover:text-primary/40 sm:right-4 sm:top-4 sm:text-6xl">
                  {s.n}
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground sm:h-12 sm:w-12 sm:rounded-2xl">
                  <s.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 font-display text-sm leading-tight text-white sm:mt-6 sm:text-xl">{s.title}</h3>
                <p className="mt-1 text-xs text-white/60 sm:mt-2 sm:text-sm">{s.text}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="pointer-events-none absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-white/20 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREISE TEASER — Clean & seriös */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Preise & Klassen</span>
              <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Transparente Preise
              </h2>
              <p className="mt-3 max-w-xl text-slate-600">
                Gleiche Preise für Klasse B, B197 und B78 – der Unterschied liegt nur im Fahrzeug und in der Prüfung.
              </p>
            </div>
            <Link
              to="/preise"
              className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
            >
              Alle Preise ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {(() => {
            const SNEAK_ROWS: { key: string; label: string; hint: string }[] = [
              { key: "Grundbetrag", label: "Grundbetrag", hint: "Einmalig – Anmeldung & Verwaltung" },
              { key: "Lernprogramm", label: "Lernprogramm", hint: "Theorie-App & Lernmaterial" },
              { key: "Übungsstunde", label: "Übungsstunde", hint: "45 Minuten Fahrunterricht" },
              { key: "Vorstellung Theorieprüfung", label: "Theorieprüfung", hint: "Vorstellungsgebühr Fahrschule" },
              { key: "Vorstellung Praxisprüfung", label: "Praxisprüfung", hint: "Vorstellungsgebühr Fahrschule" },
            ];
            const pool = prices.filter((p: any) => p.category === "Klasse B");
            const rows = SNEAK_ROWS.map((row) => ({ row, price: pool.find((p: any) => p.title === row.key) ?? null })).filter((r) => r.price);
            const grundOffer = rows.find((r) => r.row.key === "Grundbetrag" && isOfferLive(r.price as any));
            const remaining = grundOffer ? formatRemaining((grundOffer.price as any).offer_valid_until) : null;

            return (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">Preisliste 2026</p>
                    <p className="mt-1 text-xs text-slate-500">MIRO-DRIVE Fahrschule · Bochum</p>
                  </div>
                  {grundOffer && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                      Aktion aktiv{remaining ? ` · ${remaining}` : ""}
                    </div>
                  )}
                </div>

                <div className="pt-6 text-center">
                  <h3 className="font-display text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
                    Klasse B <span className="text-slate-300">·</span> B197 <span className="text-slate-300">·</span> B78
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">Identische Preise – individuelle Ausbildung.</p>
                </div>

                <ul className="mt-6 divide-y divide-slate-100">
                  {rows.map(({ row, price }) => {
                    const live = price ? isOfferLive(price as any) : false;
                    const isHighlight = row.key === "Übungsstunde";
                    return (
                      <li
                        key={row.key}
                        className="flex items-center justify-between gap-4 py-4 sm:py-5"
                      >
                        <div className="min-w-0">
                          <p className="font-display text-base font-medium text-slate-900 sm:text-lg">
                            {row.label}
                            {live && (
                              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                                <Flame className="h-2.5 w-2.5" /> Aktion
                              </span>
                            )}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{row.hint}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          {live && (price as any).old_price && (
                            <p className="text-xs font-medium text-slate-400 line-through sm:text-sm">
                              {(price as any).old_price}
                            </p>
                          )}
                          <p
                            className={[
                              "font-display tabular-nums leading-none",
                              live
                                ? "text-2xl font-semibold text-primary sm:text-3xl"
                                : isHighlight
                                  ? "text-xl font-medium text-slate-900 sm:text-2xl"
                                  : "text-xl font-light text-slate-900 sm:text-2xl",
                            ].join(" ")}
                          >
                            {(price as any).price}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 flex flex-col items-center gap-5 border-t border-slate-100 pt-8">
                  <Link
                    to="/preise"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    Vollständige Preisliste ansehen
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Keine versteckten Kosten
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Faire Konditionen
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle className="h-3.5 w-3.5 text-primary" /> Persönliche Beratung
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>



      {/* FÜHRERSCHEINANTRAG */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Führerscheinantrag</span>
          <h2 className="mt-2 text-4xl sm:text-5xl">So einfach ist die Anmeldung.</h2>
          <p className="mt-4 text-muted-foreground">
            Für den Antrag beim Straßenverkehrsamt benötigst du nur drei Unterlagen. Den Rest erledigen wir für dich.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: User, title: "Biometrisches Passbild", text: "Aktuelles Lichtbild für deinen Antrag." },
            { icon: Eye, title: "Sehtest", text: "Gültiger Sehtest von einer anerkannten Stelle." },
            { icon: Heart, title: "Erste-Hilfe-Nachweis", text: "Amtlicher Erste-Hilfe-Kurs, nicht älter als 2 Jahre." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-7">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground sm:h-12 sm:w-12 sm:rounded-2xl">
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg sm:text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border bg-muted/30 p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-foreground text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl">Wir übernehmen den kompletten Service</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Wir reichen die Antragsunterlagen unserer Fahrschüler beim Straßenverkehrsamt ein – für Bochum und Herne.
                </p>
              </div>
            </div>
            <Link to="/anmeldung" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90">
              Jetzt online anmelden <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>



      {/* ERSTE HILFE KURS TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border bg-white">
          <div className="relative grid gap-6 p-5 sm:gap-10 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Erste-Hilfe-Kurs</span>
              <h2 className="mt-2 text-4xl sm:text-5xl">Pflichtkurs für deinen Führerschein.</h2>
              <p className="mt-4 text-muted-foreground">
                {faInfo?.description || "Wir bieten regelmäßig Erste-Hilfe-Kurse direkt bei uns in der Fahrschule an – kompakt an einem Tag und amtlich anerkannt."}
              </p>
              {(faInfo?.duration || faInfo?.price) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {faInfo?.duration && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <Clock className="h-3.5 w-3.5" /> {faInfo.duration}
                    </span>
                  )}
                  {faInfo?.price && (
                    <span className="inline-flex items-center rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground">
                      {faInfo.price}
                    </span>
                  )}
                </div>
              )}
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground/70">Nächste Termine</p>
                {faDates.length === 0 ? (
                  <p className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
                    Aktuell keine Termine online – frag uns kurz per WhatsApp, wir nennen dir sofort den nächsten Kurs.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {faDates.slice(0, 3).map((d: any) => {
                      const start = new Date(d.starts_at);
                      const dateStr = start.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "long" });
                      const startTime = start.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
                      const end = d.ends_at ? new Date(d.ends_at) : null;
                      const endTime = end ? end.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : null;
                      return (
                        <li key={d.id} className="flex items-center gap-3 rounded-xl border bg-white px-4 py-3">
                          <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
                          <span className="text-sm font-semibold">{dateStr}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {endTime ? `${startTime}–${endTime} Uhr` : `${startTime} Uhr`}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <Link to="/erste-hilfe-kurs" className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-white hover:bg-primary">
                Zum Erste-Hilfe-Kurs <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
            <div className="relative order-first lg:order-none">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-xl">
                <img
                  src={ersteHilfeHero}
                  alt="Erste-Hilfe-Kurs bei Fahrschule MIRO-DRIVE in Bochum"
                  width={1280}
                  height={960}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FilialeGallery />

      {/* TEAM TEASER */}
      {team.length > 0 && (
        <section className="bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Dein Team</span>
                <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl">Lerne deine Fahrlehrer kennen.</h2>
                <p className="mt-4 text-muted-foreground">
                  Erfahren, geduldig und immer ansprechbar – das ist das Team hinter MIRO-DRIVE.
                </p>
              </div>
              <Link to="/team" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                Ganzes Team ansehen <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {(() => {
              const instructors = (team as TeamMember[]).filter((m) => (m.sort_order ?? 0) < 8);
              const owner = instructors.find((m) => m.name.toLowerCase().includes("ilkay"));
              const others = instructors.filter((m) => m !== owner).slice(0, 3);
              return (
                <div className="space-y-8 sm:space-y-12">
                  {owner && (
                    <div className="flex justify-center">
                      <Link to="/team" className="block transition-transform hover:-translate-y-1">
                        <TeamCard member={owner} size="featured" />
                      </Link>
                    </div>
                  )}
                  {others.length > 0 && (
                    <div className="grid grid-cols-3 items-stretch gap-2 sm:gap-4 lg:gap-6">
                      {others.map((m) => (
                        <Link key={m.id} to="/team" className="block transition-transform hover:-translate-y-1">
                          <TeamCard member={m} size="sm" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ÜBER UNS TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Warum MIRO-DRIVE</span>
            <h2 className="mt-2 text-4xl sm:text-5xl">Warum MIRO-DRIVE zu den besten Fahrschulen in Bochum gehört.</h2>
            <p className="mt-4 text-muted-foreground">
              MIRO-DRIVE steht für moderne Fahrausbildung, persönliche Betreuung und klare Kommunikation. Als
              Fahrschule in Bochum begleiten wir dich von der Anmeldung über Theorie und Praxis bis zur
              erfolgreichen Prüfung – sicher, stressfrei und professionell. Egal ob Bochum Innenstadt, Rathaus
              Bochum, Bochum Riemke, Herne oder Umgebung: bei MIRO-DRIVE findest du eine Fahrschule, die zu dir passt.
            </p>
            <Link to="/ueber-uns" className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-6 py-3 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-white">
              Mehr über uns <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 lg:col-span-2 lg:grid-cols-1">
            {reasons.map((r, i) => (
              <div key={r.title} className="rounded-2xl border bg-white p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="font-display text-xs">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 text-sm font-bold">{r.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SERVICES TEASER */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Leistungen der Fahrschule Bochum</span>
              <h2 className="mt-2 text-4xl sm:text-5xl">Führerschein Klasse B, B197 & B78 in Bochum.</h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                MIRO-DRIVE bietet dir eine moderne Ausbildung passend zu deinem Ziel: Theorieunterricht, Fahrstunden in Bochum, Sonderfahrten und Erste-Hilfe-Kurs.
              </p>
            </div>
            <Link to="/leistungen" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              Alle Leistungen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[
              { image: imgKlasseB, title: "Klasse B", text: "Der klassische Führerschein mit Schaltgetriebe.", to: "/leistungen" },
              { image: imgB197, title: "Klasse B197", text: "Automatik lernen – Schalter fahren dürfen.", to: "/leistungen" },
              { image: imgKlasseB, title: "Klasse B78", text: "Reine Automatik – schnell & entspannt.", to: "/leistungen" },
              { image: imgErsteHilfe, title: "Erste-Hilfe-Kurs", text: "Pflichtkurs für deinen Führerschein – direkt bei uns.", to: "/erste-hilfe-kurs" },
            ].map((s) => (
              <Link key={s.title} to={s.to} className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="eager"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <h3 className="font-display text-sm leading-tight sm:text-lg">{s.title}</h3>
                  <p className="mt-1 flex-1 text-xs text-muted-foreground sm:text-sm">{s.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline sm:text-sm">
                    Mehr erfahren <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="standorte" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Unsere Standorte</span>
            <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl">Zwei Filialen in Bochum.</h2>
            <p className="mt-4 text-muted-foreground">
              Die Anmeldung erfolgt persönlich in einer unserer beiden Filialen. Plane direkt deine Route – per Apple oder Google Maps.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {LOCATIONS.map((loc) => <LocationCard key={loc.id} location={loc} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 text-white sm:p-16">
          <div className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 -skew-x-12 bg-primary/30" />
          <div className="relative max-w-xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl">Starte deinen Führerschein noch heute.</h2>
            <p className="mt-4 text-white/70">
              Schreib uns per WhatsApp oder komm direkt in einer unserer Filialen vorbei – wir freuen uns auf dich.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground">
                WhatsApp öffnen
              </a>
              <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10">
                Standorte ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS – moved down to keep above-the-fold focused on services */}
      <ReviewsSection />
      <InstagramSection />
    </SiteLayout>
  );
}

function InfoStat({ icon: Icon, label, value }: { icon: typeof Heart; label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-white p-3">
      <Icon className="h-4 w-4 text-primary" />
      <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}

