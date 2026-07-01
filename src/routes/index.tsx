import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import logoAsset from "@/assets/miro-logo.png.asset.json";
import ersteHilfeHero from "@/assets/erste-hilfe-hero.jpg";
import { Car, Users, Clock, Euro, Heart, Sparkles, MessageCircle, ShieldCheck, GraduationCap, MapPin, ArrowRight, Cog, Calendar, FileText, HelpCircle, Star, Check, Award, Zap, Send, ClipboardCheck, Trophy } from "lucide-react";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { InstagramSection } from "@/components/site/InstagramSection";
import { isOfferLive, formatRemaining } from "@/lib/offer";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fahrschule Bochum | MIRO-DRIVE – Führerschein Klasse B & B197" },
      { name: "description", content: "MIRO-DRIVE ist deine moderne Fahrschule in Bochum für Klasse B, B197, Auffrischungsstunden, Erste-Hilfe-Kurs und persönliche Beratung. Jetzt anmelden." },
      { property: "og:title", content: "Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Moderne Fahrschule in Bochum – Klasse B, B197, Fahrstunden & Erste-Hilfe-Kurs. Jetzt per WhatsApp anmelden." },
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

const marqueeItems = [
  "Führerschein Bochum",
  "Klasse B",
  "Klasse B197",
  "Klasse B78",
  "Automatik & Schalter",
  "Erste-Hilfe-Kurs 50 €",
  "NRW",
  "5,0 ★ Google",
  "549+ Bewertungen",
  "WhatsApp Anmeldung",
  "Bochum Zentrum",
  "Bochum Riemke",
];

const steps = [
  { n: "01", icon: Send, title: "Melde dich per WhatsApp", text: "Schreib uns direkt – wir antworten meist innerhalb weniger Minuten." },
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
  { key: "Klasse B", short: "B", icon: Car, tagline: "Schalter – der klassische Führerschein.", highlights: ["Manuelles Schalten", "Volle Fahrzeugauswahl"] },
  { key: "Klasse B197", short: "B197", icon: Sparkles, tagline: "Automatik lernen, Schalter fahren dürfen.", highlights: ["Ausbildung auf Automatik", "Führerschein gilt auch für Schalter"], featured: true },
  { key: "Klasse B78", short: "B78", icon: Cog, tagline: "Reine Automatik – einfach & entspannt.", highlights: ["Nur Automatik-Fahrzeuge", "Schnellerer Lernfortschritt"] },
];

const FAQ_TOP = [
  { q: "Welche Führerscheinklassen bietet MIRO-DRIVE an?", a: "Wir bilden in den Klassen B (Schalter), B197 (Automatik mit Schaltberechtigung) und B78 (reine Automatik) aus." },
  { q: "Wie melde ich mich an?", a: "Die Anmeldung erfolgt ausschließlich persönlich in einer unserer Filialen in Bochum Zentrum oder Riemke." },
  { q: "Wie erreiche ich euch am schnellsten?", a: "Am schnellsten erreichst du uns per WhatsApp – wir antworten in der Regel innerhalb kürzester Zeit." },
];

function Index() {
  const [, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((n) => n + 1), 60_000); return () => clearInterval(id); }, []);
  const [pricesQ, teamQ, faQ] = useQueries({
    queries: [
      {
        queryKey: ["home-prices"],
        queryFn: async () => {
          const { data, error } = await supabase.from("prices").select("category,title,price,old_price,offer_label,offer_active,offer_valid_from,offer_valid_until").eq("active", true);
          if (error) throw error;
          return data ?? [];
        },
      },
      {
        queryKey: ["home-team"],
        queryFn: async () => {
          const { data, error } = await supabase.from("team_members").select("id,name,role,image_url").eq("active", true).order("sort_order").limit(4);
          if (error) throw error;
          return data ?? [];
        },
      },
      {
        queryKey: ["home-first-aid"],
        queryFn: async () => {
          const { data, error } = await supabase.from("first_aid_info").select("*").eq("active", true).order("updated_at", { ascending: false }).limit(1);
          if (error) throw error;
          return data?.[0] ?? null;
        },
      },
    ],
  });

  const prices = pricesQ.data ?? [];
  const team = teamQ.data ?? [];
  const faInfo = faQ.data;

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
      <section className="relative overflow-hidden bg-background">
        {/* soft radial glow + dot grid */}
        <div className="pointer-events-none absolute inset-0 hero-dot-grid opacity-[0.14]" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-28">
          <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[1.15fr_1fr]">
            {/* left column */}
            <div className="animate-fade-up">
              <a
                href={CONTACT.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10 sm:text-xs"
              >
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </span>
                {CONTACT.googleRating} · {CONTACT.googleReviewCount} Google-Bewertungen
              </a>

              <p className="mb-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-px w-8 bg-primary" /> Fahrschule · Bochum · NRW
              </p>
              <h1 className="font-display text-[2rem] leading-[1.04] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]">
                Fahrschule MIRO-DRIVE –<br className="hidden sm:block" />
                die <span className="italic text-primary">Nr. 1 Fahrschule</span> in Bochum.
              </h1>
              <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-lg lg:text-xl">
                Zwei Filialen in Bochum: <strong className="text-foreground">Bochum Zentrum – Brückstraße 53</strong> und{" "}
                <strong className="text-foreground">Bochum Riemke – Herner Straße 365</strong>. Klasse B, B197 & B78 –
                persönlich betreut, fair bepreist. Für Fahrschüler aus Bochum und ganz NRW.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/30 sm:col-span-1 sm:px-7 sm:py-4 sm:text-sm">
                  <MessageCircle className="h-4 w-4" /> Jetzt per WhatsApp anmelden
                </a>
                <Link to="/preise" className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-bold text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90 sm:px-7 sm:py-4 sm:text-sm">
                  Preise ansehen <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/kontakt" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground/10 bg-background px-5 py-3 text-xs font-bold text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:px-7 sm:py-4 sm:text-sm">
                  Beratung anfragen
                </Link>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground sm:mt-8 sm:flex sm:flex-wrap sm:gap-x-6 sm:text-sm">
                {["2 Filialen in Bochum", "WhatsApp-Anmeldung", "Automatik & Schalter", "Persönliche Betreuung"].map((f) => (
                  <li key={f} className="inline-flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* right column – stat bento */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-2xl" />
              <div className="relative grid grid-cols-2 gap-2.5 sm:gap-3">
                {/* Brand logo panel */}
                <div className="col-span-2 relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white to-white/70 p-5 shadow-xl sm:p-8">
                  <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
                  <div className="relative flex flex-col items-center text-center">
                    <img
                      src={logoAsset.url}
                      alt="MIRO-DRIVE Fahrschule Bochum Logo"
                      className="h-12 w-auto sm:h-20"
                    />
                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-primary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">
                        Nr. 1 Fahrschule in Bochum
                      </span>
                      <span className="h-px w-8 bg-primary" />
                    </div>
                  </div>
                </div>

                <a
                  href={CONTACT.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 group overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white to-white/60 p-4 shadow-xl transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-2xl sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary sm:h-5 sm:w-5" />
                        ))}
                      </div>
                      <p className="mt-2 font-display text-4xl leading-none sm:text-5xl">{CONTACT.googleRating}</p>
                      <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
                        {CONTACT.googleReviewCount} Google-Bewertungen
                      </p>
                    </div>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-foreground text-white sm:h-14 sm:w-14">
                      <Award className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                  </div>
                </a>

                <div className="rounded-3xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-5">
                  <MapPin className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground sm:mt-3">Filialen</p>
                  <p className="mt-1 font-display text-base leading-tight sm:text-xl">Bochum Zentrum & Riemke</p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:p-5">
                  <GraduationCap className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground sm:mt-3">Klassen</p>
                  <p className="mt-1 font-display text-base leading-tight sm:text-xl">B · B197 · B78</p>
                </div>
                <div className="col-span-2 rounded-3xl bg-foreground p-4 text-white shadow-xl sm:p-5">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Anmeldung in Minuten</p>
                  </div>
                  <p className="mt-2 font-display text-lg leading-tight sm:text-2xl">
                    Schreib uns per WhatsApp – wir antworten meist innerhalb weniger Minuten.
                  </p>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                    Chat starten <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <section className="relative overflow-hidden border-y bg-foreground py-5 text-background">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-lg tracking-tight sm:text-xl">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </section>


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
                  featured
                    ? "z-10 bg-foreground text-white shadow-2xl md:scale-[1.03]"
                    : "border-2 border-black/5 bg-white shadow-sm hover:-translate-y-1 hover:border-foreground hover:shadow-xl",
                ].join(" ")}
              >
                {featured && (
                  <span className="absolute right-0 top-0 bg-primary px-2 py-0.5 font-display text-[8px] uppercase tracking-widest text-primary-foreground sm:px-4 sm:py-1 sm:text-[10px]">
                    Beliebt
                  </span>
                )}
                {live && (
                  <span className="absolute left-0 top-0 z-10 inline-flex items-center gap-1 bg-white px-2 py-0.5 font-display text-[8px] font-black uppercase tracking-widest text-primary shadow-md sm:px-3 sm:py-1 sm:text-[10px]">
                    🔥 {row?.offer_label || "Angebot"}
                  </span>
                )}
                <div>
                  <div
                    className={[
                      "mb-4 grid h-9 w-9 place-items-center rounded-full sm:mb-8 sm:h-12 sm:w-12",
                      featured ? "bg-primary text-primary-foreground" : "bg-foreground text-white",
                    ].join(" ")}
                  >
                    <c.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-1 font-display text-lg leading-tight tracking-tighter sm:mb-2 sm:text-3xl">
                    Klasse {c.short}
                  </h3>
                  <p
                    className={[
                      "mb-4 hidden text-xs font-semibold uppercase tracking-wider sm:mb-6 sm:block",
                      featured ? "text-white/60" : "text-muted-foreground",
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
                      featured ? "border-white/10" : "border-black/10",
                    ].join(" ")}
                  >
                    <div className="min-w-0">
                      <p
                        className={[
                          "mb-1 text-[8px] font-black uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.2em]",
                          featured ? "text-white/40" : "text-muted-foreground",
                        ].join(" ")}
                      >
                        Ab
                      </p>
                      {live && row?.old_price && (
                        <p className={["text-[10px] font-semibold line-through sm:text-sm", featured ? "text-white/50" : "text-muted-foreground"].join(" ")}>{row.old_price}</p>
                      )}
                      <p className={["font-display text-primary", live ? "text-2xl sm:text-5xl drop-shadow-sm" : "text-xl sm:text-4xl"].join(" ")}>{grund}</p>
                      {remaining && (
                        <p className="mt-1 text-[9px] font-bold text-primary sm:text-[11px]">⏰ {remaining}</p>
                      )}
                    </div>
                    <div
                      className={[
                        "hidden h-10 w-10 items-center justify-center transition-colors sm:flex",
                        featured
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

      {/* ERSTE HILFE KURS TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border bg-white">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/15 hidden lg:block blur-3xl" />
          <div className="relative grid gap-6 p-5 sm:gap-10 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Erste-Hilfe-Kurs</span>
              <h2 className="mt-2 text-4xl sm:text-5xl">Pflichtkurs für deinen Führerschein.</h2>
              <p className="mt-4 text-muted-foreground">
                {faInfo?.description ?? "Bei uns kannst du dich direkt über Erste-Hilfe-Kurse informieren – kompakt, verständlich und perfekt abgestimmt auf deine Fahrausbildung."}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {faInfo?.price && (
                  <InfoStat icon={Euro} label="Preis" value={faInfo.price} />
                )}
                {faInfo?.duration && (
                  <InfoStat icon={Clock} label="Dauer" value={faInfo.duration} />
                )}
                {faInfo?.dates && (
                  <InfoStat icon={Calendar} label="Termine" value={faInfo.dates} />
                )}
                {!faInfo && (
                  <>
                    <InfoStat icon={Heart} label="Kompakt" value="1 Tag" />
                    <InfoStat icon={FileText} label="Anerkannt" value="für TÜV" />
                    <InfoStat icon={Calendar} label="Anmeldung" value="vor Ort" />
                  </>
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
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {team.map((m) => (
                <Link key={m.id} to="/team" className="group rounded-2xl border bg-white p-3 text-center transition-transform hover:-translate-y-1 sm:rounded-3xl sm:p-5">
                  <div className="mx-auto mb-4">
                    <MiniAvatar name={m.name} src={m.image_url} />
                  </div>
                  <p className="font-display text-sm sm:text-base">{m.name}</p>
                  {m.role && <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">{m.role}</p>}
                </Link>
              ))}
            </div>
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
          <div className="grid gap-3 lg:col-span-2 lg:grid-cols-2">
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

      {/* FAQ TEASER */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <HelpCircle className="h-4 w-4" /> FAQ
              </span>
              <h2 className="mt-2 text-4xl sm:text-5xl">Schnelle Antworten.</h2>
            </div>
            <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              Alle FAQ ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_TOP.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="rounded-2xl border bg-white px-5">
                <AccordionTrigger className="text-left text-base font-bold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Leistungen der Fahrschule Bochum</span>
            <h2 className="mt-2 text-4xl sm:text-5xl">Führerschein Klasse B, B197 & Auffrischungsstunden in Bochum.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Ob Führerschein Klasse B in Bochum, B197 oder Auffrischungsstunden – MIRO-DRIVE bietet dir eine
              moderne Ausbildung passend zu deinem Ziel: Theorieunterricht, Fahrstunden in Bochum, Sonderfahrten und
              Erste-Hilfe-Kurs.
            </p>
            <Link to="/leistungen" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-white hover:bg-foreground/90">
              Alle Leistungen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: GraduationCap, label: "Klasse B" },
              { icon: Sparkles, label: "Klasse B197" },
              { icon: Cog, label: "Klasse B78" },
              { icon: Clock, label: "Auffrischungs­stunden" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border bg-white p-6">
                <s.icon className="h-7 w-7 text-primary" />
                <p className="mt-4 font-bold">{s.label}</p>
              </div>
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

function MiniAvatar({ name, src }: { name: string; src?: string | null }) {
  if (src) return <img src={src} alt={name} loading="lazy" decoding="async" className="h-20 w-20 rounded-full object-cover" />;
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-[#7a0a14] font-display text-xl text-white">
      {initials}
    </div>
  );
}
