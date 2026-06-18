import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import { Car, GraduationCap, BookOpen, Wrench, Sun, RotateCcw, Heart, Gift } from "lucide-react";

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
  { icon: GraduationCap, title: "Führerscheinausbildung Klasse B", text: "Komplette Ausbildung für deinen Autoführerschein – von der Anmeldung bis zur praktischen Prüfung.", cta: "Anmelden", to: "/kontakt" },
  { icon: Car, title: "B197 Ausbildung", text: "Automatik fahren lernen und trotzdem Schaltwagen fahren dürfen – moderne Ausbildung mit maximaler Flexibilität.", cta: "Beratung anfragen", to: "/kontakt" },
  { icon: BookOpen, title: "Theorieunterricht", text: "Strukturierter Theorieunterricht mit klaren Erklärungen, praxisnahen Beispielen und guter Prüfungsvorbereitung.", cta: "Termine erfragen", to: "/kontakt" },
  { icon: Wrench, title: "Praxisstunden", text: "Individuelle Fahrstunden mit geduldiger Betreuung und klaren Lernzielen.", cta: "Stunde buchen", to: "/kontakt" },
  { icon: Sun, title: "Sonderfahrten", text: "Autobahn-, Überland- und Nachtfahrt professionell vorbereitet.", cta: "Mehr erfahren", to: "/kontakt" },
  { icon: RotateCcw, title: "Auffrischungsstunden", text: "Für alle, die länger nicht gefahren sind oder wieder mehr Sicherheit gewinnen möchten.", cta: "Termin anfragen", to: "/kontakt" },
  { icon: Heart, title: "Erste-Hilfe-Kurs", text: "Informationen und Anmeldung zum Erste-Hilfe-Kurs direkt über die Website oder WhatsApp.", cta: "Kurs anfragen", to: "/erste-hilfe-kurs" },
  { icon: Gift, title: "Individuelle Angebote", text: "Persönliche Beratung und individuelle Angebote für Anmeldung, Ausbildungspakete oder Sonderaktionen.", cta: "Angebot anfragen", to: "/angebote" },
];

function LeistungenPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Leistungen" title="Alles, was du für deinen Führerschein brauchst." subtitle="Eine komplette Fahrausbildung – modern aufgebaut, persönlich begleitet, transparent kommuniziert." />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="group flex flex-col rounded-2xl border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg leading-tight">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.text}</p>
              <Link to={s.to} className="mt-5 inline-flex items-center text-sm font-bold text-primary hover:underline">
                {s.cta} →
              </Link>
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