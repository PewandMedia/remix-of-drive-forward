import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CONTACT } from "@/lib/contact";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Phone, Mail, Instagram, MessageCircle, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt Fahrschule Bochum | MIRO-DRIVE" },
      { name: "description", content: "Kontaktiere MIRO-DRIVE, deine Fahrschule in Bochum. Anmeldung, Preise, Angebote und Erste-Hilfe-Kurs einfach per WhatsApp anfragen." },
      { property: "og:title", content: "Kontakt Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Moderne Fahrschule in Bochum – WhatsApp, Telefon oder Besuch direkt in der Filiale. Für Bochum Innenstadt, Rathaus Bochum, Riemke & Herne." },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      {/* HERO – mit lebendigem rotem Glow wie auf der Startseite */}
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 hero-dot-grid opacity-[0.14]" />
        <div className="pointer-events-none absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full bg-primary/25 blur-[120px] animate-blob" />
        <div className="pointer-events-none absolute top-20 -right-40 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px] animate-blob" style={{ animationDelay: "-6s" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Kontakt
          </div>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Kontakt zur Fahrschule MIRO-DRIVE in Bochum
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-lg">
            Du möchtest deinen Führerschein in Bochum machen? Dann kontaktiere MIRO-DRIVE direkt per WhatsApp, Telefon oder komm in eine unserer Filialen in Bochum Zentrum oder Riemke.
          </p>
        </div>
      </section>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Hinweis-Box – auffällig aber elegant */}
        <div className="mb-10 flex items-start gap-3 rounded-2xl border-l-4 border-primary bg-foreground p-5 text-white shadow-2xl shadow-primary/10 sm:p-6">
          <div className="relative mt-0.5 shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-md animate-pulse" />
            <AlertCircle className="relative h-5 w-5 text-primary" />
          </div>
          <p className="text-sm leading-relaxed">
            <span className="font-bold">Hinweis:</span> Eine Anmeldung zur Fahrschule ist nur persönlich in einer unserer Filialen möglich – nicht online. Wir freuen uns auf deinen Besuch!
          </p>
        </div>

        {/* STANDORTE – 2 Spalten auf Mobile */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>

        {/* KONTAKT-WIDGETS – 2×2 auf Mobile, spektakulärere Karten */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener"
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-white to-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#25D366]/40 hover:shadow-lg hover:shadow-[#25D366]/10 sm:rounded-3xl sm:p-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-md shadow-[#25D366]/20 transition-transform group-hover:scale-110 sm:h-11 sm:w-11 sm:rounded-2xl">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[11px]">WhatsApp</div>
              <div className="mt-0.5 text-xs font-bold sm:text-sm">{CONTACT.whatsappText}</div>
            </div>
          </a>

          <a
            href={`tel:${CONTACT.phone}`}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-white to-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:rounded-3xl sm:p-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-foreground to-foreground/80 text-white shadow-md shadow-foreground/10 transition-transform group-hover:scale-110 sm:h-11 sm:w-11 sm:rounded-2xl">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[11px]">Telefon</div>
              <div className="mt-0.5 text-xs font-bold sm:text-sm">{CONTACT.phoneDisplay}</div>
            </div>
          </a>

          <a
            href={`mailto:${CONTACT.email}`}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-white to-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:rounded-3xl sm:p-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-110 sm:h-11 sm:w-11 sm:rounded-2xl">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[11px]">E-Mail</div>
              <div className="mt-0.5 break-all text-xs font-bold sm:text-sm">{CONTACT.email}</div>
            </div>
          </a>

          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener"
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-white to-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:shadow-lg hover:shadow-foreground/10 sm:rounded-3xl sm:p-5"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-foreground to-foreground/80 text-white shadow-md shadow-foreground/10 transition-transform group-hover:scale-110 sm:h-11 sm:w-11 sm:rounded-2xl">
              <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[11px]">Social</div>
              <div className="mt-0.5 text-xs font-bold sm:text-sm">Instagram & TikTok</div>
            </div>
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}
