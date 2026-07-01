import { MapPin, Clock, Navigation, Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { fullAddress, navigationUrl, type Location } from "@/lib/locations";

export function LocationCard({ location, compact = false }: { location: Location; compact?: boolean }) {
  const handleRoute = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(navigationUrl(location), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-white to-white/70 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 sm:rounded-3xl">
      {/* card top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="p-4 sm:p-7">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary sm:px-2.5 sm:text-[10px]">
              {location.label}
            </span>
            <h3 className="mt-2 font-display text-sm leading-tight sm:text-xl">{location.name}</h3>
          </div>
          {/* gradient-ring icon */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white shadow-lg shadow-primary/20 sm:h-10 sm:w-10">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-muted-foreground sm:mt-3 sm:text-sm">{fullAddress(location)}</p>

        <div className="mt-3 border-t border-dashed pt-3 sm:mt-5 sm:pt-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/80 sm:gap-2 sm:text-xs">
            <Clock className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" /> Bürozeiten
          </div>
          <ul className="mt-2 space-y-1 text-[11px] sm:mt-3 sm:space-y-1.5 sm:text-sm">
            {location.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-2 border-b border-dashed border-border/40 pb-1 last:border-0 sm:gap-3 sm:pb-1.5">
                <span className="text-muted-foreground">{h.day}</span>
                <span className="font-semibold">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`mt-auto grid gap-1.5 border-t border-border/40 bg-muted/20 p-3 sm:gap-2 sm:p-5 ${compact ? "grid-cols-1" : "grid-cols-3"}`}>
        <a
          href={navigationUrl(location)}
          onClick={handleRoute}
          className="inline-flex items-center justify-center gap-1 rounded-full bg-primary px-2.5 py-2 text-[10px] font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02] sm:px-4 sm:text-xs"
        >
          <Navigation className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> <span className="hidden sm:inline">Route planen</span><span className="sm:hidden">Route</span>
        </a>
        <a
          href={`tel:${CONTACT.phone}`}
          className="inline-flex items-center justify-center gap-1 rounded-full bg-foreground px-2.5 py-2 text-[10px] font-bold text-white transition-transform hover:scale-[1.02] hover:bg-foreground/90 sm:px-4 sm:text-xs"
        >
          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Anrufen
        </a>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-1 rounded-full bg-[#25D366] px-2.5 py-2 text-[10px] font-bold text-white transition-transform hover:scale-[1.02] sm:px-4 sm:text-xs"
        >
          <MessageCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}