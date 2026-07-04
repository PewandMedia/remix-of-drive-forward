import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Wie MIRO-DRIVE personenbezogene Daten verarbeitet – transparent nach DSGVO." },
      { property: "og:url", content: "/datenschutz" },
    ],
    links: [{ rel: "canonical", href: "/datenschutz" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero title="Datenschutz" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-foreground/80 sm:px-6 lg:px-8">
        <p>Diese Website verarbeitet personenbezogene Daten nur, soweit dies zur Bereitstellung der Inhalte und zur Bearbeitung von Anfragen erforderlich ist. Übermittelte Formulardaten werden zur Bearbeitung deiner Anfrage gespeichert.</p>
        <p className="mt-8 text-xs text-muted-foreground">Platzhalter – bitte vom Inhaber durch die rechtsgültigen Hinweise ersetzen.</p>
      </div>
    </SiteLayout>
  ),
});