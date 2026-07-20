import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { FILIALE_IMAGES } from "@/components/site/FilialeGallery";
import { Target, Award, Sparkles } from "lucide-react";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns | Fahrschule Bochum – MIRO-DRIVE" },
      { name: "description", content: "Deine Fahrschule in Bochum Zentrum & Riemke – modern ausgestattet, transparent und nah dran." },
      { property: "og:title", content: "Über uns – MIRO-DRIVE Fahrschule Bochum" },
      { property: "og:description", content: "Deine Fahrschule in Bochum Zentrum & Riemke – modern ausgestattet, transparent und nah dran." },
      { property: "og:url", content: "/ueber-uns" },
    ],
    links: [{ rel: "canonical", href: "/ueber-uns" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Über uns"
        title="MIRO-DRIVE – deine moderne Fahrschule in Bochum"
        subtitle="Sicher, professionell und stressfrei zum Führerschein in Bochum – für Bochum Innenstadt, Rathaus Bochum, Bochum Riemke, Herne und Umgebung."
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-lg leading-relaxed text-foreground/80">
            MIRO-DRIVE ist eine moderne Fahrschule in Bochum mit dem Ziel, Fahrschüler sicher, professionell und
            stressfrei zum Führerschein zu begleiten. Wir stehen für persönliche Betreuung, transparente Preise,
            moderne Fahrzeuge und klare Kommunikation. Ob du aus Bochum Innenstadt, Bochum Riemke, der Nähe vom
            Rathaus Bochum oder aus der Umgebung wie Herne kommst – bei MIRO-DRIVE bekommst du eine Fahrausbildung,
            die zu dir passt.
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex gap-4 rounded-2xl border bg-white p-6">
              <Target className="h-8 w-8 shrink-0 text-primary" />
              <div><h3 className="font-display text-lg">Unsere Mission</h3><p className="mt-1 text-sm text-muted-foreground">Wir möchten Fahrschüler sicher, selbstbewusst und gut vorbereitet auf den Straßenverkehr bringen.</p></div>
            </div>
            <div className="flex gap-4 rounded-2xl border bg-white p-6">
              <Award className="h-8 w-8 shrink-0 text-primary" />
              <div><h3 className="font-display text-lg">Unser Anspruch</h3><p className="mt-1 text-sm text-muted-foreground">MIRO-DRIVE steht für moderne Fahrausbildung, faire Beratung und professionelle Betreuung in Bochum.</p></div>
            </div>
            <div className="flex gap-4 rounded-2xl border bg-white p-6">
              <Sparkles className="h-8 w-8 shrink-0 text-primary" />
              <div><h3 className="font-display text-lg">Dein Vorteil</h3><p className="mt-1 text-sm text-muted-foreground">Du bekommst nicht nur Fahrstunden, sondern eine klare Begleitung von der Anmeldung bis zur bestandenen Prüfung.</p></div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/kontakt" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Jetzt anmelden</Link>
            <Link to="/preise" className="inline-flex rounded-full border-2 border-foreground bg-white px-6 py-3 text-sm font-bold text-foreground hover:bg-foreground hover:text-white transition-colors">Preise ansehen</Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 self-start">
          {FILIALE_IMAGES.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl border bg-white shadow-sm sm:rounded-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={img.src} alt={img.alt} loading="eager" className="h-full w-full object-cover object-center" />
              </div>
              <figcaption className="px-2 py-2 text-center text-[11px] font-semibold text-foreground sm:px-3 sm:py-2 sm:text-sm">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}