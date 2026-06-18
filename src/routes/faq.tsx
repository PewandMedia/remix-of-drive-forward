import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  { q: "Wie kann ich mich anmelden?", a: "Du kannst dich direkt über WhatsApp, telefonisch oder über das Kontaktformular anmelden." },
  { q: "Welche Führerscheinklassen bietet MIRO-DRIVE an?", a: "Aktuell Klasse B, B197 und Auffrischungsstunden. Weitere Klassen können später ergänzt werden." },
  { q: "Kann ich einen Erste-Hilfe-Kurs machen?", a: "Ja, über die Website kannst du eine Anfrage für einen Erste-Hilfe-Kurs stellen." },
  { q: "Gibt es individuelle Angebote?", a: "Ja, wir können individuelle Angebote für Anmeldung, Ausbildungspakete oder Kombi-Anfragen anbieten." },
  { q: "Kann ich die Preise online sehen?", a: "Ja, die Preise werden transparent auf der Preise-Seite dargestellt und können vom Chef im Admin-Panel angepasst werden." },
  { q: "Wie erreiche ich euch am schnellsten?", a: "Am schnellsten erreichst du MIRO-DRIVE über WhatsApp." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Häufige Fragen zur Anmeldung, Führerscheinklassen, Erste-Hilfe-Kurs und Preisen bei MIRO-DRIVE." },
      { property: "og:title", content: "FAQ – MIRO-DRIVE" },
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
      <PageHero eyebrow="FAQ" title="Häufig gestellte Fragen." subtitle="Antworten auf die wichtigsten Fragen rund um deine Führerscheinausbildung." />
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