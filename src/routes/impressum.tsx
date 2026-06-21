import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Impressum der Fahrschule MIRO-DRIVE." },
      { property: "og:url", content: "/impressum" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero title="Impressum" />
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm leading-relaxed text-foreground/80 sm:px-6 lg:px-8">
        <h2 className="font-display text-lg">Angaben gemäß § 5 TMG</h2>
        <p className="mt-3">Fahrschule MIRO-DRIVE<br />{CONTACT.address}</p>
        <h3 className="mt-6 font-display text-base">Kontakt</h3>
        <p className="mt-2">Telefon: {CONTACT.phoneDisplay}<br />E-Mail: {CONTACT.email}</p>
        <p className="mt-8 text-xs text-muted-foreground">Platzhalter – bitte vom Inhaber durch die rechtsgültigen Angaben ersetzen.</p>
      </div>
    </SiteLayout>
  ),
});