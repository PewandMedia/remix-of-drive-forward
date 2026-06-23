import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import heroCar from "@/assets/hero-car.png";
import { Car, Users, Clock, Euro, Heart, Sparkles, MessageCircle, ShieldCheck, GraduationCap, MapPin, ArrowRight, Cog, Calendar, FileText, HelpCircle, Star } from "lucide-react";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReviewsSection } from "@/components/site/ReviewsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MIRO-DRIVE Fahrschule – Dein Führerschein startet hier" },
      { name: "description", content: "Modern, sicher und stressfrei zum Führerschein. Anmeldung per WhatsApp, transparente Preise, persönliche Betreuung." },
      { property: "og:title", content: "MIRO-DRIVE Fahrschule" },
      { property: "og:description", content: "Modern, sicher und stressfrei zum Führerschein." },
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

const trustItems = [
  { icon: Car, label: "Moderne Fahrzeuge" },
  { icon: Users, label: "Freundliche Fahrlehrer" },
  { icon: Clock, label: "Flexible Fahrstunden" },
  { icon: Euro, label: "Faire Preise" },
  { icon: Heart, label: "Persönliche Betreuung" },
  { icon: ShieldCheck, label: "Erste-Hilfe-Kurs" },
  { icon: Sparkles, label: "Individuelle Angebote" },
  { icon: MessageCircle, label: "Anmeldung per WhatsApp" },
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
  const [pricesQ, teamQ, faQ] = useQueries({
    queries: [
      {
        queryKey: ["home-prices"],
        queryFn: async () => {
          const { data, error } = await supabase.from("prices").select("category,title,price,old_price,offer_label,offer_active").eq("active", true);
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

  const hasActiveOffer = prices.some((p: any) => p.offer_active);

  const priceFor = (cat: string) => {
    const grund = prices.find((p) => p.category === cat && /grundbetrag/i.test(p.title));
    return grund?.price ?? prices.find((p) => p.category === cat)?.price ?? "";
  };

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[58%] -skew-x-12 bg-primary/[0.04] lg:block" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-3 w-[60%] -skew-x-12 bg-primary" />
        <div className="relative mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:min-h-[720px] lg:grid-cols-[1.05fr_1.25fr] lg:py-24 lg:px-8">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Fahrschule MIRO-DRIVE
            </div>
            <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl xl:text-8xl">
              Dein Führerschein <br />
              <span className="text-primary">startet hier</span> – <br />
              modern, sicher <br />
              und stressfrei.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Bei MIRO-DRIVE lernst du Autofahren mit professioneller Betreuung, modernen Fahrzeugen, transparenter Beratung und einer Ausbildung, die dich wirklich sicher auf die Straße bringt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]">
                <MessageCircle className="h-4 w-4" /> WhatsApp schreiben
              </a>
              <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-white hover:bg-foreground/90">
                <MapPin className="h-4 w-4" /> Standorte & Route
              </Link>
              <Link to="/preise" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-white">
                Preise ansehen
              </Link>
            </div>
            <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">
              Anmeldung nur persönlich in einer unserer Filialen
            </p>
            <a
              href={CONTACT.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </span>
              <span className="font-bold text-foreground">{CONTACT.googleRating}</span>
              <span>·</span>
              <span>{CONTACT.googleReviewCount} Google-Bewertungen</span>
            </a>
          </div>
          <div className="relative lg:-mr-12 xl:-mr-24">
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,theme(colors.primary/25),transparent_65%)] blur-2xl" />
            <div className="pointer-events-none absolute -right-6 top-8 -z-10 hidden h-2 w-40 bg-foreground lg:block" />
            <img
              src={heroCar}
              alt="MIRO-DRIVE Fahrschulauto – moderner weißer Mercedes A-Klasse"
              width={1600}
              height={1024}
              loading="eager"
              fetchPriority="high"
              className="animate-drive-in-left relative w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y bg-[#0a0a0a] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:grid-cols-8 lg:px-8">
          {trustItems.map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-2 text-center">
              <t.icon className="h-6 w-6 text-primary" />
              <span className="text-xs font-semibold text-white/80">{t.label}</span>
            </div>
          ))}
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
              Wir bilden in Klasse B, B197 und B78 aus – wähle die, die zu dir passt. Alle Preise sind offen einsehbar.
            </p>
          </div>
          <Link to="/preise" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            Alle Preise ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3 md:items-stretch">
          {PRICE_CLASSES.map((c) => {
            const grund = priceFor(c.key);
            const featured = c.featured;
            return (
              <Link
                key={c.key}
                to="/preise"
                className={[
                  "group relative flex flex-col justify-between overflow-hidden p-8 transition-all duration-300",
                  featured
                    ? "z-10 bg-foreground text-white shadow-2xl md:scale-[1.03]"
                    : "border-2 border-black/5 bg-white shadow-sm hover:-translate-y-1 hover:border-foreground hover:shadow-xl",
                ].join(" ")}
              >
                {featured && (
                  <span className="absolute right-0 top-0 bg-primary px-4 py-1 font-display text-[10px] uppercase tracking-widest text-primary-foreground">
                    Beliebt
                  </span>
                )}
                <div>
                  <div
                    className={[
                      "mb-8 grid h-12 w-12 place-items-center rounded-full",
                      featured ? "bg-primary text-primary-foreground" : "bg-foreground text-white",
                    ].join(" ")}
                  >
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-display text-3xl leading-tight tracking-tighter">
                    Klasse {c.short}
                  </h3>
                  <p
                    className={[
                      "mb-6 text-xs font-semibold uppercase tracking-wider",
                      featured ? "text-white/60" : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {c.tagline}
                  </p>
                  <ul className="mb-10 space-y-3">
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
                      "flex items-end justify-between border-t pt-6",
                      featured ? "border-white/10" : "border-black/10",
                    ].join(" ")}
                  >
                    <div>
                      <p
                        className={[
                          "mb-1 text-[10px] font-black uppercase tracking-[0.2em]",
                          featured ? "text-white/40" : "text-muted-foreground",
                        ].join(" ")}
                      >
                        Grundbetrag ab
                      </p>
                      <p className="font-display text-4xl text-primary">{grund}</p>
                    </div>
                    <div
                      className={[
                        "flex h-10 w-10 items-center justify-center transition-colors",
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
          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
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
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-8">
                <div className="grid h-full place-items-center">
                  <Heart className="h-32 w-32 text-primary/80" strokeWidth={1.2} />
                </div>
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
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <Link key={m.id} to="/team" className="group rounded-3xl border bg-white p-5 text-center transition-transform hover:-translate-y-1">
                  <div className="mx-auto mb-4">
                    <MiniAvatar name={m.name} src={m.image_url} />
                  </div>
                  <p className="font-display text-base">{m.name}</p>
                  {m.role && <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{m.role}</p>}
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
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Über uns</span>
            <h2 className="mt-2 text-4xl sm:text-5xl">Eine Fahrschule, die zuhört.</h2>
            <p className="mt-4 text-muted-foreground">
              MIRO-DRIVE steht für eine moderne Fahrausbildung mit Herz: zwei Standorte in Bochum, ein eingespieltes Team, klare Preise und ein Ablauf, der wirklich auf dich zugeschnitten ist – egal ob Anfänger oder Auffrischer.
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
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Unsere Leistungen</span>
            <h2 className="mt-2 text-4xl sm:text-5xl">Von der Anmeldung bis zur Prüfung.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Komplette Führerscheinausbildung Klasse B, B197 & B78, strukturierter Theorieunterricht, individuelle Praxisstunden, Sonderfahrten und Auffrischungskurse – alles aus einer Hand.
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
        <div className="grid gap-6 lg:grid-cols-2">
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
