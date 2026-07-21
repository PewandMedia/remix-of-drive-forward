import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { FilialeGallery } from "@/components/site/FilialeGallery";
import { Phone, Mail, MessageCircle, AlertCircle } from "lucide-react";
import { InstagramLogoIcon, TikTokIcon } from "@/components/icons/TikTokIcon";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt Fahrschule Bochum | MIRO-DRIVE" },
      { name: "description", content: "WhatsApp, Telefon oder Filiale in Bochum – melde dich in unter einer Minute für den Führerschein an." },
      { property: "og:title", content: "Kontakt Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "WhatsApp, Telefon oder Filiale in Bochum – melde dich in unter einer Minute für den Führerschein an." },
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
        title="Kontakt zur Fahrschule MIRO-DRIVE in Bochum"
        subtitle="Du möchtest deinen Führerschein in Bochum machen? Dann kontaktiere MIRO-DRIVE direkt per WhatsApp, Telefon oder komm in eine unserer Filialen in Bochum Innenstadt, Rathaus Bochum oder Riemke."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Direkt-Kontakt: prominent oben */}
        <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener"
            className="group flex items-center gap-4 rounded-2xl bg-[#25D366] p-6 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(37,211,102,0.7)] md:col-span-2 lg:col-span-2"
          >
            <div className="rounded-full bg-white/20 p-3.5 text-white"><MessageCircle className="h-6 w-6" /></div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">WhatsApp – schnellste Antwort</div>
              <div className="truncate text-xl font-black">{CONTACT.whatsappText}</div>
            </div>
            <span className="hidden shrink-0 rounded-full bg-white/15 px-4 py-2 text-sm font-bold sm:inline-block">Chat starten</span>
          </a>
          <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-4 rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full bg-foreground p-3 text-white"><Phone className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Telefon</div>
              <div className="truncate text-base font-bold">{CONTACT.phoneDisplay}</div>
            </div>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full bg-primary p-3 text-white"><Mail className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">E-Mail</div>
              <div className="truncate text-base font-bold">{CONTACT.email}</div>
            </div>
          </a>
          <a href={CONTACT.instagram} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full p-2.5 text-white shadow-sm" style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}><InstagramLogoIcon className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Instagram</div>
              <div className="truncate text-base font-bold">miro_drive</div>
            </div>
          </a>
          <a href={CONTACT.tiktok} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="rounded-full bg-black p-2.5 text-white shadow-sm"><TikTokIcon className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">TikTok</div>
              <div className="truncate text-base font-bold">@mirodrive</div>
            </div>
          </a>
        </div>

        <div className="mb-10 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed">
              <span className="font-bold">Tipp:</span> Du kannst dich auch direkt online anmelden – wir schicken dir den Ausbildungsvertrag anschließend per E-Mail.
            </p>
          </div>
          <a href="/anmeldung" className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            Zur Online-Anmeldung
          </a>
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>

        <FilialeGallery compact />
      </div>

    </SiteLayout>
  );
}