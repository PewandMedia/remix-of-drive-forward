import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "Ist MIRO-DRIVE eine Fahrschule in Bochum?", a: "Ja, MIRO-DRIVE ist deine moderne Fahrschule in Bochum für Klasse B, B197, B78 und Anfragen zum Erste-Hilfe-Kurs." },
  { q: "Ist MIRO-DRIVE für Bochum Innenstadt und Riemke geeignet?", a: "Ja, MIRO-DRIVE richtet sich an Fahrschüler aus Bochum Innenstadt, der Nähe vom Rathaus Bochum, Bochum Riemke, Herne und Umgebung." },
  { q: "Kann ich mich direkt online anmelden?", a: "Du kannst deine Anmeldung direkt über WhatsApp, telefonisch oder über das Kontaktformular starten. Die eigentliche Anmeldung erfolgt persönlich in einer unserer Filialen in Bochum." },
  { q: "Bietet MIRO-DRIVE Klasse B und B197 an?", a: "Ja, auf der Website werden Klasse B und B197 als Leistungen dargestellt. Zusätzlich bieten wir Klasse B78 an." },
  { q: "Kann ich einen Erste-Hilfe-Kurs anfragen?", a: "Ja, über die Website kannst du eine Anfrage für einen Erste-Hilfe-Kurs in Bochum stellen – jeden Monat direkt bei MIRO-DRIVE." },
  { q: "Gibt es individuelle Angebote?", a: "Ja, MIRO-DRIVE kann individuelle Angebote für Anmeldung, Ausbildungspakete oder Kombi-Angebote erstellen – frag einfach per WhatsApp an." },
  { q: "Warum sollte ich MIRO-DRIVE als Fahrschule in Bochum wählen?", a: "MIRO-DRIVE verbindet moderne Fahrzeuge, persönliche Betreuung, transparente Preise und eine stressfreie Ausbildung. Mit 5,0 Sternen und über 549 Google-Bewertungen ist MIRO-DRIVE eine starke Wahl für deinen Führerschein in Bochum." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ Fahrschule Bochum | MIRO-DRIVE" },
      { name: "description", content: "Antworten zu Anmeldung, Ablauf, Klasse B/B197/B78, Prüfungen und Erste-Hilfe-Kurs in Bochum." },
      { property: "og:title", content: "FAQ Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Antworten zu Anmeldung, Ablauf, Klasse B/B197/B78, Prüfungen und Erste-Hilfe-Kurs in Bochum." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }),
    }],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="FAQ" title="Häufige Fragen zur Fahrschule in Bochum" subtitle="Antworten auf die wichtigsten Fragen rund um deinen Führerschein in Bochum – Klasse B, B197, Erste-Hilfe-Kurs und Anmeldung." />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="rounded-2xl border bg-white px-5">
              <AccordionTrigger className="text-left text-base font-bold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SiteLayout>
  );
}