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
      { title: "Leistungen – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Führerschein Klasse B, B197, Theorieunterricht, Praxisstunden, Sonderfahrten, Auffrischungsstunden und Erste-Hilfe-Kurs." },
      { property: "og:title", content: "Leistungen – MIRO-DRIVE" },
      { property: "og:url", content: "/leistungen" },
    ],
    links: [{ rel: "canonical", href: "/leistungen" }],
  }),
  component: LeistungenPage,
});

const services = [
  { icon: GraduationCap, image: imgKlasseB, title: "Führerscheinausbildung Klasse B", text: "Komplette Ausbildung für deinen Autoführerschein – von der Anmeldung bis zur praktischen Prüfung.", cta: "Anmelden", to: "/kontakt" },
  { icon: Car, image: imgB197, title: "B197 Ausbildung", text: "Automatik fahren lernen und trotzdem Schaltwagen fahren dürfen – moderne Ausbildung mit maximaler Flexibilität.", cta: "Beratung anfragen", to: "/kontakt" },
  { icon: BookOpen, image: imgTheorie, title: "Theorieunterricht", text: "Strukturierter Theorieunterricht mit klaren Erklärungen, praxisnahen Beispielen und guter Prüfungsvorbereitung.", cta: "Termine erfragen", to: "/kontakt" },
  { icon: Wrench, image: imgPraxis, title: "Praxisstunden", text: "Individuelle Fahrstunden mit geduldiger Betreuung und klaren Lernzielen.", cta: "Stunde buchen", to: "/kontakt" },
  { icon: Sun, image: imgSonder, title: "Sonderfahrten", text: "Autobahn-, Überland- und Nachtfahrt professionell vorbereitet.", cta: "Mehr erfahren", to: "/kontakt" },
  { icon: RotateCcw, image: imgAuffrischung, title: "Auffrischungsstunden", text: "Für alle, die länger nicht gefahren sind oder wieder mehr Sicherheit gewinnen möchten.", cta: "Termin anfragen", to: "/kontakt" },
  { icon: Heart, image: imgErsteHilfe, title: "Erste-Hilfe-Kurs", text: "Informationen und Anmeldung zum Erste-Hilfe-Kurs direkt über die Website oder WhatsApp.", cta: "Kurs anfragen", to: "/erste-hilfe-kurs" },
  { icon: Gift, image: imgAngebote, title: "Individuelle Angebote", text: "Persönliche Beratung und individuelle Angebote für Anmeldung, Ausbildungspakete oder Sonderaktionen.", cta: "Angebot anfragen", to: "/angebote" },
];

function LeistungenPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Leistungen" title="Alles, was du für deinen Führerschein brauchst." subtitle="Eine komplette Fahrausbildung – modern aufgebaut, persönlich begleitet, transparent kommuniziert." />
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