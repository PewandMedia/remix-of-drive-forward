import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
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
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
        {/* Kompakter Header */}
        <header className="mb-4 sm:mb-6">
          <div className="hidden text-[11px] font-bold uppercase tracking-[0.2em] text-primary sm:block">Kontakt</div>
          <h1 className="text-2xl font-black leading-tight sm:mt-2 sm:text-4xl">Kontakt zur Fahrschule MIRO-DRIVE in Bochum</h1>
          <p className="mt-1.5 max-w-3xl text-xs text-muted-foreground sm:mt-2 sm:text-base">
            Melde dich per WhatsApp, Telefon oder komm direkt in eine unserer Filialen in Bochum.
          </p>
        </header>

        {/* Anmeldungs-Tipp (schlank) */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 sm:mb-6 sm:px-4 sm:py-3">
          <div className="flex min-w-0 items-center gap-2 text-xs sm:text-sm">
            <AlertCircle className="h-4 w-4 shrink-0 text-primary" />
            <span className="min-w-0"><span className="font-bold">Tipp:</span> Online anmelden – Vertrag kommt per E-Mail.</span>
          </div>
          <a href="/anmeldung" className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:px-3.5 sm:py-1.5">
            Anmelden →
          </a>
        </div>

        {/* Zwei-Spalten: Kontakt-Karten links, Standorte rechts */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-2.5 lg:col-span-5 lg:space-y-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-3 rounded-2xl bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.5)] transition-all hover:-translate-y-0.5 sm:p-4"
            >
              <div className="rounded-full bg-white/20 p-2 sm:p-2.5"><MessageCircle className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">WhatsApp – schnellste Antwort</div>
                <div className="truncate text-base font-black sm:text-lg">{CONTACT.whatsappText}</div>
              </div>
              <span className="hidden shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold sm:inline-block">Chat</span>
            </a>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-2.5 rounded-xl border bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm sm:gap-3 sm:p-3.5">
                <div className="rounded-full bg-foreground p-1.5 text-white sm:p-2"><Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Telefon</div>
                  <div className="truncate text-xs font-bold sm:text-sm">{CONTACT.phoneDisplay}</div>
                </div>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 rounded-xl border bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm sm:gap-3 sm:p-3.5">
                <div className="rounded-full bg-primary p-1.5 text-white sm:p-2"><Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">E-Mail</div>
                  <div className="truncate text-xs font-bold sm:text-sm">{CONTACT.email}</div>
                </div>
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener" className="flex items-center gap-2.5 rounded-xl border bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm sm:gap-3 sm:p-3.5">
                <div className="rounded-full p-1.5 text-white shadow-sm" style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}><InstagramLogoIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Instagram</div>
                  <div className="truncate text-xs font-bold sm:text-sm">miro_drive</div>
                </div>
              </a>
              <a href={CONTACT.tiktok} target="_blank" rel="noopener" className="flex items-center gap-2.5 rounded-xl border bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm sm:gap-3 sm:p-3.5">
                <div className="rounded-full bg-black p-1.5 text-white shadow-sm"><TikTokIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" /></div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">TikTok</div>
                  <div className="truncate text-xs font-bold sm:text-sm">@mirodrive</div>
                </div>
              </a>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-7">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <FilialeGallery compact />
        </div>
      </div>

    </SiteLayout>
  );
}
