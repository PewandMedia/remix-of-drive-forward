import { MapPin, Clock, Navigation, Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { fullAddress, navigationUrl, type Location } from "@/lib/locations";

export function LocationCard({ location, compact = false }: { location: Location; compact?: boolean }) {
  const handleRoute = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(navigationUrl(location), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {location.label}
          </span>
          <h3 className="mt-3 font-display text-xl uppercase leading-tight">{location.name}</h3>
        </div>
        <div className="rounded-full bg-foreground p-2.5 text-white">
          <MapPin className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{fullAddress(location)}</p>

      <div className="mt-5 border-t pt-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/80">
          <Clock className="h-3.5 w-3.5 text-primary" /> Bürozeiten
        </div>
        <ul className="mt-3 space-y-1.5 text-sm">
          {location.hours.map((h) => (
            <li key={h.day} className="flex items-center justify-between gap-3 border-b border-dashed pb-1.5 last:border-0">
              <span className="text-muted-foreground">{h.day}</span>
              <span className="font-semibold">{h.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`mt-6 grid gap-2 ${compact ? "grid-cols-1" : "sm:grid-cols-3"}`}>
        <a
          href={navigationUrl(location)}
          onClick={handleRoute}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
        >
          <Navigation className="h-3.5 w-3.5" /> Route planen
        </a>
        <a
          href={`tel:${CONTACT.phone}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-bold text-white hover:bg-foreground/90"
        >
          <Phone className="h-3.5 w-3.5" /> Anrufen
        </a>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white"
        >
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}