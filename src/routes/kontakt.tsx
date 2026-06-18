import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Phone, Mail, Instagram, MessageCircle, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "MIRO-DRIVE Fahrschule – zwei Standorte in Bochum. Kontaktiere uns per WhatsApp, Telefon oder besuche uns direkt in der Filiale." },
      { property: "og:title", content: "Kontakt – MIRO-DRIVE" },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Kontakt"
        title="Besuche uns in einer unserer Filialen."
        subtitle="Die Anmeldung erfolgt persönlich – komm einfach während der Bürozeiten vorbei. Für Fragen erreichst du uns telefonisch oder per WhatsApp."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed">
            <span className="font-bold">Hinweis:</span> Eine Anmeldung zur Fahrschule ist nur persönlich in einer unserer Filialen möglich – nicht online. Wir freuen uns auf deinen Besuch!
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full bg-[#25D366] p-2.5 text-white"><MessageCircle className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</div>
              <div className="text-sm font-bold">{CONTACT.whatsappText}</div>
            </div>
          </a>
          <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full bg-foreground p-2.5 text-white"><Phone className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Telefon</div>
              <div className="text-sm font-bold">{CONTACT.phoneDisplay}</div>
            </div>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full bg-primary p-2.5 text-white"><Mail className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">E-Mail</div>
              <div className="text-sm font-bold">{CONTACT.email}</div>
            </div>
          </a>
          <a href={CONTACT.instagram} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-2xl border bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full bg-foreground p-2.5 text-white"><Instagram className="h-4 w-4" /></div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Social</div>
              <div className="text-sm font-bold">Instagram & TikTok</div>
            </div>
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}