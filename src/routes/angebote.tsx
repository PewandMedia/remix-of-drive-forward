import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import { MessageCircle, Sparkles, CheckCircle2, ArrowRight, Phone } from "lucide-react";

export const Route = createFileRoute("/angebote")({
  head: () => ({
    meta: [
      { title: "Angebote Fahrschule Bochum | MIRO-DRIVE" },
      { name: "description", content: "Individuelle Angebote für deine Anmeldung bei MIRO-DRIVE. Fahrschule Bochum für Klasse B, B197, Erste-Hilfe-Kurs und persönliche Beratung." },
      { property: "og:title", content: "Angebote Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Persönliche Angebote für deinen Führerschein in Bochum – jetzt einfach per WhatsApp anfragen." },
      { property: "og:url", content: "/angebote" },
    ],
    links: [{ rel: "canonical", href: "/angebote" }],
  }),
  component: AngebotePage,
});

const bullets = [
  "Individuelles Angebot für deine Anmeldung",
  "Kombi-Pakete aus Klasse B, B197 und Erste-Hilfe-Kurs",
  "Faire, transparente Beratung – keine versteckten Kosten",
  "Passend für Bochum Innenstadt, Rathaus Bochum, Bochum Riemke und Umgebung",
  "Schnelle Antwort per WhatsApp",
];

function AngebotePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Angebote"
        title="Individuelle Angebote für deine Fahrschule in Bochum"
        subtitle="Du möchtest dich bei MIRO-DRIVE anmelden und suchst ein persönliches Angebot? Frag direkt ein individuelles Angebot für deine Führerscheinausbildung in Bochum an – für Bochum Innenstadt, Bochum Riemke, Herne und Umgebung."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Persönliches Angebot anfragen</h2>
            <p className="mt-4 text-foreground/80">
              Jeder Fahrschüler startet mit anderen Voraussetzungen. Deshalb bietet MIRO-DRIVE individuelle
              Angebote für Anmeldung, Führerscheinausbildung, Erste-Hilfe-Kurs oder Kombi-Pakete an – zugeschnitten
              auf deinen Führerschein in Bochum.
            </p>
            <p className="mt-4 text-foreground/80">
              Ob Klasse B, B197, Auffrischungsstunden oder ein Komplettpaket: Wir beraten dich fair, transparent
              und persönlich. Als moderne Fahrschule in Bochum stellen wir dir ein Angebot zusammen, das wirklich zu
              dir passt.
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.03] transition-transform"
              >
                <MessageCircle className="h-4 w-4" /> Angebot per WhatsApp anfragen
              </a>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-6 py-3.5 text-sm font-bold text-foreground hover:bg-foreground hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> Kontakt aufnehmen
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
            <Sparkles className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-display text-2xl sm:text-3xl">Dein Führerschein in Bochum – passgenau geplant</h3>
            <p className="mt-3 text-white/70">
              Sag uns kurz, was du brauchst: Anmeldung Klasse B, B197, ein Kombi-Angebot mit Erste-Hilfe-Kurs oder
              Auffrischungsstunden. Wir melden uns mit einem persönlichen Vorschlag – meistens noch am selben Tag.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                to="/preise"
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10"
              >
                <span className="text-sm font-bold">Preise ansehen</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/leistungen"
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10"
              >
                <span className="text-sm font-bold">Leistungen entdecken</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/erste-hilfe-kurs"
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10"
              >
                <span className="text-sm font-bold">Erste-Hilfe-Kurs</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/kontakt"
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-4 hover:bg-white/10"
              >
                <span className="text-sm font-bold">Standorte & Kontakt</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}