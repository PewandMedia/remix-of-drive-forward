import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Navigation } from "lucide-react";
import { InstagramLogoIcon, TikTokIcon } from "@/components/icons/TikTokIcon";
import { CONTACT, NAV_LINKS } from "@/lib/contact";
import { LOCATIONS, navigationUrl, fullAddress } from "@/lib/locations";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3 17.4L1.5 23l5.8-1.5A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.4.9.9-3.3-.2-.4A9 9 0 1 1 12 20.5zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.8 1-.3.2-.6 0a7.4 7.4 0 0 1-2.2-1.4 8 8 0 0 1-1.5-1.9c-.2-.3 0-.5.1-.6l.5-.6.2-.4a.5.5 0 0 0 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3c0 1.3 1 2.6 1.1 2.8s1.9 3 4.6 4.2c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 bg-[#0a0a0a] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-3">
          <img src="/images/miro-drive-logo.svg" alt="MIRO-DRIVE" className="h-10 w-auto" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(5000%) hue-rotate(350deg) brightness(95%)' }} />
          <p className="mt-4 text-sm text-white/70">
            MIRO-DRIVE ist deine moderne Fahrschule für eine sichere, transparente und stressfreie Führerscheinausbildung.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp" className="rounded-full bg-[#25D366] p-2.5 hover:scale-105 transition-transform">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="rounded-full p-2.5 hover:scale-105 transition-transform" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <InstagramLogoIcon className="h-5 w-5 text-white" />
            </a>
            <a href={CONTACT.tiktok} target="_blank" rel="noopener" aria-label="TikTok" className="rounded-full bg-black p-2.5 text-white hover:scale-105 transition-transform">
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold tracking-wider text-white">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary">{l.label}</Link>
              </li>
            ))}
            <li><Link to="/ueber-uns" className="hover:text-primary">Über uns</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-bold tracking-wider text-white">Kontakt</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href={`tel:${CONTACT.phone}`} className="hover:text-white">{CONTACT.phoneDisplay}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
            <li className="text-xs text-white/50">Anmeldung nur persönlich in der Filiale.</li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-sm font-bold tracking-wider text-white">Unsere Standorte</h3>
          <div className="mt-4 space-y-4">
            {LOCATIONS.map((loc) => (
              <div key={loc.id} className="rounded-xl border border-white/10 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-primary">{loc.label}</div>
                    <div className="mt-0.5 text-sm font-bold text-white">{loc.name}</div>
                    <div className="mt-1 flex items-start gap-1.5 text-xs text-white/70">
                      <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      <span>{fullAddress(loc)}</span>
                    </div>
                  </div>
                  <a
                    href={navigationUrl(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase text-primary-foreground"
                  >
                    <Navigation className="h-3 w-3" /> Route
                  </a>
                </div>
                <ul className="mt-3 space-y-1 text-xs text-white/60">
                  {loc.hours.map((h) => (
                    <li key={h.day} className="flex justify-between"><span>{h.day}</span><span className="text-white/80">{h.time}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} MIRO-DRIVE Fahrschule. Alle Rechte vorbehalten.</p>
          <div className="flex gap-5">
            <Link to="/impressum" className="hover:text-white">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-white">Datenschutz</Link>
            <Link to="/auth" className="text-white/25 hover:text-white/60">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}