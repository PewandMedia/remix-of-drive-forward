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
import { Car, Users, Clock, Euro, Heart, Sparkles, MessageCircle, ShieldCheck, GraduationCap, MapPin, ArrowRight, Cog, Calendar, FileText, Star, Check, Award, Zap, Send, ClipboardCheck, Trophy, Flame, Timer, ChevronDown, User, Eye } from "lucide-react";
import heroVideo from "@/assets/miro-drive-hero-v2.mp4.asset.json";
import heroPoster from "@/assets/miro-drive-hero-v2-poster.jpg.asset.json";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { TeamCard, type TeamMember } from "@/components/site/TeamCard";

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
  { n: "01", icon: Send, title: "Melde dich per WhatsApp", text: "Schreib uns einfach über WhatsApp – wir melden uns umgehend." },
  { n: "02", icon: ClipboardCheck, title: "Anmeldung in der Filiale", text: "Kurze Anmeldung bei uns in Bochum Zentrum oder Riemke." },
  { n: "03", icon: GraduationCap, title: "Theorie & Praxis", text: "Strukturierter Unterricht, moderne Fahrzeuge und persönliche Betreuung." },
  { n: "04", icon: Trophy, title: "Bestanden", text: "Wir begleiten dich bis zur bestandenen TÜV-Prüfung." },
];

const reasons = [
  { title: "Stressfrei lernen", text: "Wir begleiten dich Schritt für Schritt bis zur Prüfung – geduldig, verständlich und professionell." },
  { title: "Moderne Ausbildung", text: "Klare Abläufe, digitale Kommunikation und moderne Fahrzeuge sorgen für eine angenehme Fahrausbildung." },
  { title: "Individuelle Beratung", text: "Jeder Fahrschüler ist anders – wir passen Tempo und Schwerpunkte an dich an." },
];

const PRICE_CLASSES = [
  { key: "Klasse B", short: "B", mobileShort: "Schalter", icon: Car, tagline: "Schalter – der klassische Führerschein.", highlights: ["Manuelles Schalten", "Volle Fahrzeugauswahl"] },
  { key: "Klasse B197", short: "B197", mobileShort: "Automatik + Schalter", icon: Sparkles, tagline: "Automatik lernen, Schalter fahren dürfen.", highlights: ["Ausbildung auf Automatik", "Führerschein gilt auch für Schalter"], featured: true },
  { key: "Klasse B78", short: "B78", mobileShort: "Automatik", icon: Cog, tagline: "Reine Automatik – einfach & entspannt.", highlights: ["Nur Automatik-Fahrzeuge", "Schnellerer Lernfortschritt"] },
];


function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-slate-50 to-red-50/40 text-slate-900">
      {/* dezente Deko – hell */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgb(226_232_240/0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgb(226_232_240/0.55)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[140px]" />
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
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-primary/15 blur-3xl" />
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-2xl shadow-slate-300/60 ring-1 ring-slate-200 lg:aspect-video">
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
              poster={heroPoster.url}
              aria-label="MIRO-DRIVE Fahrschulfahrzeug"
            >
              <source src={heroVideo.url} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 lg:from-black/25 lg:via-transparent lg:to-transparent" />
            {/* Overlay blockiert alle Klicks/Taps auf das Video */}
            <div className="absolute inset-0 z-10" aria-hidden="true" />


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

function LanguageChip({ l, compact = false }: { l: typeof LANGUAGES[0]; compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex min-w-0 flex-col items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/70 px-1.5 py-2 shadow-sm">
        {l.flag ? (
          <span className="text-lg leading-none">{l.flag}</span>
        ) : (
          <KurdistanFlag className="h-3.5 w-5 rounded-[2px] shadow-sm" />
        )}
        <span className="w-full truncate text-center text-[10px] font-semibold leading-tight text-slate-800">
          {l.label}
        </span>
      </div>
    );
  }
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50/70 px-4 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white hover:shadow-md">
      {l.flag ? (
        <span className="text-xl leading-none">{l.flag}</span>
      ) : (
        <KurdistanFlag className="h-4 w-6 rounded-sm shadow-sm" />
      )}
      <span className="text-sm font-semibold text-slate-800">{l.label}</span>
    </div>
  );
}

function LanguageStrip() {
  return (
    <section className="relative border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-700 sm:text-xs">
              Wir beraten & unterrichten in
            </p>
          </div>

          {/* Mobile: alle 5 Sprachen kompakt in einer Reihe */}
          <ul className="grid w-full grid-cols-5 gap-1.5 lg:hidden">
            {LANGUAGES.map((l) => (
              <li key={l.code} className="min-w-0">
                <LanguageChip l={l} compact />
              </li>
            ))}
          </ul>

          {/* Desktop: statische Chip-Reihe */}
          <ul className="hidden lg:flex lg:w-auto lg:items-center lg:justify-end lg:gap-3">
            {LANGUAGES.map((l) => (
              <li key={l.code}>
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
      },
      {
        queryKey: ["first_aid_dates_upcoming"],
        queryFn: () => getUpcomingFirstAidDates(),
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
              Von der ersten WhatsApp-Nachricht bis zur bestandenen Prüfung – wir machen es dir so unkompliziert wie möglich.
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

      {/* REVIEWS */}
      {/* PREISE TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Preise & Klassen</span>
              {hasActiveOffer && (
                <Link to="/preise" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow">
                  <Sparkles className="h-3 w-3" /> Aktion läuft
                </Link>
              )}
            </div>
            <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl">Drei Klassen, transparente Preise.</h2>
            <p className="mt-4 text-muted-foreground">
              Als Fahrschule in Bochum bilden wir in Klasse B, B197 und B78 aus – transparent, fair und übersichtlich.
              Perfekt für deinen Führerschein in Bochum, Herne und Umgebung.
            </p>
          </div>
          <Link to="/preise" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            Alle Preise ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* ANGEBOTS-BANNER */}
        {hasActiveOffer && (() => {
          const offerRow = rowFor("Klasse B") ?? prices.find((p: any) => isOfferLive(p));
          const oldP = offerRow?.old_price;
          const newP = offerRow?.price;
          const rem = offerRow ? formatRemaining(offerRow.offer_valid_until) : null;
          const label = offerRow?.offer_label || "Angebot";
          return (
            <div className="relative mb-6 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-primary via-[#c8102e] to-[#7a0010] p-5 text-white shadow-2xl shadow-primary/40 ring-1 ring-inset ring-white/20 sm:mb-8 sm:p-8">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(255,255,255,0.25),transparent_55%),radial-gradient(80%_60%_at_100%_100%,rgba(255,180,180,0.18),transparent_60%)]" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider backdrop-blur sm:text-xs">
                    <Flame className="h-3.5 w-3.5 animate-pulse" /> Jetzt sparen
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight sm:text-4xl">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm text-white/80 sm:text-base">
                    Anmeldegebühr nur <span className="font-display text-xl font-bold text-white sm:text-2xl">{newP}</span>{" "}
                    {oldP && <span className="text-sm text-white/50 line-through">statt {oldP}</span>}
                  </p>
                  {rem && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-white/90 sm:text-sm">
                      <Timer className="h-4 w-4" /> {rem}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:gap-3">
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary shadow-lg transition-transform hover:scale-105 sm:px-6 sm:py-3"
                  >
                    <MessageCircle className="h-4 w-4" /> Jetzt anmelden
                  </a>
                  <Link
                    to="/preise"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20 sm:px-6 sm:py-3"
                  >
                    Alle Preise <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="grid grid-cols-3 gap-2.5 items-stretch sm:gap-4 md:gap-6">
          {PRICE_CLASSES.map((c) => {
            const row: any = rowFor(c.key);
            const grund = row?.price ?? "";
            const live = isOfferLive(row);
            const remaining = live ? formatRemaining(row?.offer_valid_until) : null;
            const featured = c.featured;
            return (
              <Link
                key={c.key}
                to="/preise"
                className={[
                  "group relative flex flex-col justify-between overflow-hidden p-3 transition-all duration-300 sm:p-6 lg:p-8",
                  live
                    ? "z-10 border-4 border-primary bg-white shadow-[0_0_40px_-12px_theme(colors.primary/45)] hover:-translate-y-1 hover:shadow-[0_0_60px_-12px_theme(colors.primary/55)]"
                    : featured
                    ? "z-10 bg-foreground text-white shadow-2xl md:scale-[1.03]"
                    : "border-2 border-black/5 bg-white shadow-sm hover:-translate-y-1 hover:border-foreground hover:shadow-xl",
                ].join(" ")}
              >
                {featured && !live && (
                  <span className="absolute right-0 top-0 bg-primary px-2 py-0.5 font-display text-[8px] uppercase tracking-widest text-primary-foreground sm:px-4 sm:py-1 sm:text-[10px]">
                    Beliebt
                  </span>
                )}
                {live && (
                  <span className="absolute left-0 top-0 z-20 inline-flex items-center gap-1 bg-primary px-2 py-0.5 font-display text-[8px] font-black uppercase tracking-widest text-primary-foreground shadow-lg sm:px-3 sm:py-1 sm:text-[10px]">
                    <Flame className="h-2.5 w-2.5 animate-pulse sm:h-3 sm:w-3" /> {row?.offer_label || "Angebot"}
                  </span>
                )}
                <div>
                  <div
                    className={[
                      "mb-4 grid h-9 w-9 place-items-center rounded-full sm:mb-8 sm:h-12 sm:w-12",
                      live || featured ? "bg-primary text-primary-foreground" : "bg-foreground text-white",
                    ].join(" ")}
                  >
                    <c.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-1 font-display text-lg leading-tight tracking-tighter sm:mb-2 sm:text-3xl">
                    Klasse {c.short}
                  </h3>
                  <p
                    className={[
                      "mb-1 text-[9px] font-bold leading-tight sm:hidden",
                      live ? "text-muted-foreground" : featured ? "text-white/70" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {c.mobileShort}
                  </p>
                  <p
                    className={[
                      "mb-4 hidden text-xs font-semibold uppercase tracking-wider sm:mb-6 sm:block",
                      live ? "text-muted-foreground" : featured ? "text-white/60" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {c.tagline}
                  </p>
                  <ul className="mb-4 hidden space-y-3 sm:mb-10 sm:block">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-sm font-bold">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                {grund && (
                  <div
                    className={[
                      "flex items-end justify-between border-t pt-3 sm:pt-6",
                      live ? "border-primary/20" : featured ? "border-white/10" : "border-black/10",
                    ].join(" ")}
                  >
                    <div className="min-w-0">
                      <p
                        className={[
                          "mb-1 text-[8px] font-black uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.2em]",
                          live ? "text-primary/60" : featured ? "text-white/40" : "text-muted-foreground",
                        ].join(" ")}
                      >
                        Ab
                      </p>
                      {live && row?.old_price && (
                        <p className={["text-sm font-semibold line-through sm:text-lg", live ? "text-muted-foreground" : featured ? "text-white/50" : "text-muted-foreground"].join(" ")}>{row.old_price}</p>
                      )}
                      <p className={["font-display text-primary", live ? "text-3xl sm:text-6xl drop-shadow-sm" : "text-xl sm:text-4xl"].join(" ")}>{grund}</p>
                      {remaining && (
                        <p className="mt-1 inline-flex items-center gap-1 text-[9px] font-bold text-primary sm:text-[11px]">
                          <Timer className="h-3 w-3" /> {remaining}
                        </p>
                      )}
                      {live && row?.offer_note && (
                        <p className={["mt-1 hidden text-[10px] italic leading-snug sm:block", live ? "text-muted-foreground" : featured ? "text-white/70" : "text-muted-foreground"].join(" ")}>{row.offer_note}</p>
                      )}
                    </div>
                    <div
                      className={[
                        "hidden h-10 w-10 items-center justify-center transition-colors sm:flex",
                        live
                          ? "bg-primary text-primary-foreground group-hover:bg-foreground"
                          : featured
                          ? "bg-white/10 text-white group-hover:bg-primary"
                          : "border border-black/10 text-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
                      ].join(" ")}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
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
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 hidden lg:block blur-3xl" />
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
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    loading="lazy"
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

