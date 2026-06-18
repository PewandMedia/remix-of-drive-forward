import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import carAsset from "@/assets/miro-car.png.asset.json";
import { Car, Users, Clock, Euro, Heart, Sparkles, MessageCircle, ShieldCheck, GraduationCap, MapPin } from "lucide-react";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { OfferFlyer, type OfferFlyerData } from "@/components/site/OfferFlyer";

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
  { title: "Transparente Preise", text: "Alle Kosten werden verständlich dargestellt. Zusätzlich können individuelle Angebote direkt angefragt werden." },
  { title: "Erste-Hilfe-Kurs möglich", text: "Bei MIRO-DRIVE kannst du dich auch über Erste-Hilfe-Kurse informieren und direkt eine Anfrage stellen." },
  { title: "Schneller Kontakt", text: "Über WhatsApp kannst du uns direkt schreiben und deine Anmeldung unkompliziert starten." },
  { title: "Individuelle Beratung", text: "Jeder Fahrschüler ist anders. Deshalb bieten wir individuelle Angebote und Beratungspakete." },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[55%] -skew-x-12 bg-primary/5 lg:block" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-3 w-[55%] -skew-x-12 bg-primary lg:top-1/2" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Fahrschule MIRO-DRIVE
            </div>
            <h1 className="text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl">
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
          </div>
          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
            <img src={carAsset.url} alt="MIRO-DRIVE Fahrschulauto" className="w-full drop-shadow-2xl" />
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

      {/* LOCATIONS */}
      <section id="standorte" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Unsere Standorte</span>
            <h2 className="mt-2 text-3xl uppercase sm:text-4xl lg:text-5xl">Zwei Filialen in Bochum.</h2>
            <p className="mt-4 text-muted-foreground">
              Die Anmeldung erfolgt persönlich in einer unserer beiden Filialen. Plane direkt deine Route – per Apple oder Google Maps.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {LOCATIONS.map((loc) => <LocationCard key={loc.id} location={loc} />)}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Warum MIRO-DRIVE?</span>
          <h2 className="mt-2 text-3xl uppercase sm:text-4xl lg:text-5xl">Eine Fahrschule, die wirklich begleitet.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <div key={r.title} className="group relative overflow-hidden rounded-2xl border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/0 transition-colors group-hover:bg-primary/10" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="relative mt-5 text-xl font-bold">{r.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Unsere Leistungen</span>
            <h2 className="mt-2 text-3xl uppercase sm:text-4xl">Von der Anmeldung bis zur Prüfung.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Komplette Führerscheinausbildung Klasse B & B197, strukturierter Theorieunterricht, individuelle Praxisstunden, Sonderfahrten und Auffrischungskurse – alles aus einer Hand.
            </p>
            <Link to="/leistungen" className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-bold text-white hover:bg-foreground/90">
              Alle Leistungen ansehen
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: GraduationCap, label: "Klasse B" },
              { icon: Car, label: "Klasse B197" },
              { icon: Clock, label: "Auffrischungs­stunden" },
              { icon: ShieldCheck, label: "Erste-Hilfe-Kurs" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border bg-white p-6">
                <s.icon className="h-7 w-7 text-primary" />
                <p className="mt-4 font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-10 text-white sm:p-16">
          <div className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 -skew-x-12 bg-primary/30" />
          <div className="relative max-w-xl">
            <h2 className="text-3xl uppercase sm:text-4xl lg:text-5xl">Starte deinen Führerschein noch heute.</h2>
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
    </SiteLayout>
  );
}
