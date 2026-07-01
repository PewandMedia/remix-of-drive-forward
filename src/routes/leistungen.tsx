import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import { Car, GraduationCap, BookOpen, Wrench, Sun, RotateCcw, Heart, Gift } from "lucide-react";
import imgKlasseB from "@/assets/leistungen/klasse-b.jpg";
import imgB197 from "@/assets/leistungen/b197.jpg";
import imgTheorie from "@/assets/leistungen/theorie.jpg";
import imgPraxis from "@/assets/leistungen/praxis.jpg";
import imgSonder from "@/assets/leistungen/sonderfahrten.jpg";
import imgAuffrischung from "@/assets/leistungen/auffrischung.jpg";
import imgErsteHilfe from "@/assets/leistungen/erste-hilfe.jpg";
import imgAngebote from "@/assets/leistungen/angebote.jpg";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Führerschein Bochum | Klasse B, B197 & Fahrstunden | MIRO-DRIVE" },
      { name: "description", content: "Moderne Fahrausbildung in Bochum: Klasse B, B197, Theorieunterricht, Praxisstunden, Sonderfahrten und Auffrischungsstunden bei MIRO-DRIVE." },
      { property: "og:title", content: "Führerschein Bochum | Klasse B & B197 | MIRO-DRIVE" },
      { property: "og:description", content: "Alle Leistungen deiner Fahrschule in Bochum – Klasse B, B197, Fahrstunden, Sonderfahrten & Erste-Hilfe-Kurs." },
      { property: "og:url", content: "/leistungen" },
    ],
    links: [{ rel: "canonical", href: "/leistungen" }],
  }),
  component: LeistungenPage,
});

const services = [
  { icon: GraduationCap, image: imgKlasseB, title: "Führerschein Klasse B in Bochum", text: "Starte deine Ausbildung für den Autoführerschein Klasse B bei MIRO-DRIVE. Wir begleiten dich professionell von der ersten Beratung bis zur praktischen Prüfung in Bochum.", cta: "Anmelden", to: "/kontakt" },
  { icon: Car, image: imgB197, title: "B197 Führerschein in Bochum", text: "Mit der B197-Ausbildung lernst du modern und flexibel: Ausbildung auf Automatik – Führerschein gilt trotzdem für Schaltwagen.", cta: "Beratung anfragen", to: "/kontakt" },
  { icon: BookOpen, image: imgTheorie, title: "Theorieunterricht in Bochum", text: "Unser Theorieunterricht in Bochum ist verständlich, strukturiert und praxisnah – optimale Vorbereitung auf deine Theorieprüfung.", cta: "Termine erfragen", to: "/kontakt" },
  { icon: Wrench, image: imgPraxis, title: "Fahrstunden in Bochum", text: "In den Fahrstunden in Bochum lernst du Schritt für Schritt sicheres Fahren im echten Straßenverkehr in Bochum und Umgebung.", cta: "Stunde buchen", to: "/kontakt" },
  { icon: Sun, image: imgSonder, title: "Sonderfahrten", text: "Wir bereiten dich professionell auf Überlandfahrten, Autobahnfahrten und Nachtfahrten rund um Bochum und Herne vor.", cta: "Mehr erfahren", to: "/kontakt" },
  { icon: RotateCcw, image: imgAuffrischung, title: "Auffrischungsstunden in Bochum", text: "Du hast deinen Führerschein bereits, fühlst dich aber unsicher? Mit Auffrischungsstunden bei MIRO-DRIVE gewinnst du wieder Sicherheit im Straßenverkehr.", cta: "Termin anfragen", to: "/kontakt" },
  { icon: Heart, image: imgErsteHilfe, title: "Erste-Hilfe-Kurs Bochum", text: "Für deinen Führerschein brauchst du einen Erste-Hilfe-Kurs. Bei MIRO-DRIVE kannst du dich informieren und direkt eine Anfrage stellen.", cta: "Kurs anfragen", to: "/erste-hilfe-kurs" },
  { icon: Gift, image: imgAngebote, title: "Individuelle Angebote", text: "Persönliche Angebote für Anmeldung, Ausbildungspakete oder Kombi-Angebote – zugeschnitten auf deinen Führerschein in Bochum.", cta: "Angebot anfragen", to: "/angebote" },
];

function LeistungenPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Leistungen"
        title="Unsere Leistungen als Fahrschule in Bochum"
        subtitle="MIRO-DRIVE bietet dir eine moderne Fahrausbildung in Bochum – von der Anmeldung über Theorie und Praxis bis zur erfolgreichen Prüfung. Ideal für Bochum Innenstadt, Rathaus Bochum, Bochum Riemke und Herne."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                <div className="absolute bottom-3 left-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-lg ring-1 ring-black/5">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg leading-tight">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.text}</p>
                <Link to={s.to} className="mt-5 inline-flex items-center text-sm font-bold text-primary hover:underline">
                  {s.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-muted/30 p-8">
          <p className="font-display text-xl">Du hast Fragen zu einer Leistung?</p>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Per WhatsApp fragen</a>
        </div>
      </div>
    </SiteLayout>
  );
}