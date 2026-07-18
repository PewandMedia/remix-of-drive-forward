import { createFileRoute } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getFirstAidInfo, getFirstAidDates } from "@/lib/public-data.functions";
import { CONTACT } from "@/lib/contact";
import { LocationCard } from "@/components/site/LocationCard";
import { LOCATIONS } from "@/lib/locations";
import { Heart, Calendar, Clock, FileText, GraduationCap, Phone, MessageCircle, MapPin } from "lucide-react";
import ersteHilfeImg from "@/assets/erste-hilfe-hero.jpg";

export const Route = createFileRoute("/erste-hilfe-kurs")({
  head: () => ({
    meta: [
      { title: "Erste-Hilfe-Kurs Bochum für Führerschein | MIRO-DRIVE" },
      { name: "description", content: "Amtlich anerkannter Erste-Hilfe-Kurs in Bochum – regelmäßige Termine, Anmeldung per WhatsApp." },
      { property: "og:title", content: "Erste-Hilfe-Kurs Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Amtlich anerkannter Erste-Hilfe-Kurs in Bochum – regelmäßige Termine, Anmeldung per WhatsApp." },
      { property: "og:url", content: "/erste-hilfe-kurs" },
    ],
    links: [{ rel: "canonical", href: "/erste-hilfe-kurs" }],
  }),
  component: FAPage,
});

const benefits = [
  { icon: Heart, title: "Für den Führerschein", text: "Amtlich anerkannt für alle Klassen." },
  { icon: GraduationCap, title: "Kompakt an einem Tag", text: "8 Stunden geballtes Wissen – praxisnah." },
  { icon: FileText, title: "Bescheinigung sofort", text: "Du erhältst deine Bestätigung direkt am Kurstag." },
  { icon: MapPin, title: "Zentral in Bochum", text: "Direkt in unserer Fahrschule – keine langen Wege." },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function FAPage() {
  const [infoQ, datesQ] = useQueries({
    queries: [
      { queryKey: ["first_aid_info"], queryFn: () => getFirstAidInfo() },
      { queryKey: ["first_aid_dates"], queryFn: () => getFirstAidDates() },
    ],
  });
  const info = infoQ.data;
  const dates = datesQ.data ?? [];
  const nextDate = dates[0];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Erste-Hilfe-Kurs Bochum"
        title="Erste-Hilfe-Kurs in Bochum für deinen Führerschein"
        subtitle="Bei MIRO-DRIVE kannst du deinen Erste-Hilfe-Kurs unkompliziert absolvieren – 8 Stunden an einem Tag, regelmäßig in unserer Fahrschule."
      />

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {/* Intro + Bild */}
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute -inset-3 rotate-1 rounded-3xl bg-muted" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <img src={ersteHilfeImg} alt="Erste-Hilfe-Koffer mit rotem Kreuz" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Was dich erwartet</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Kompakt. Anerkannt. Praxisnah.</h2>
            <p className="mt-4 text-muted-foreground">
              {info?.description ?? "Der Erste-Hilfe-Kurs ist Pflicht für deinen Führerschein. Bei uns läuft er strukturiert, verständlich und in entspannter Atmosphäre – ideal als Baustein deiner Fahrausbildung."}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3 rounded-2xl border bg-white p-4">
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{b.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nächste Termine */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Nächste Termine</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Wähle deinen Kurstag</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {info?.duration ?? "8 Stunden an einem Tag (08:00 – 16:00 Uhr)"}{info?.dates ? ` · ${info.dates}` : ""}
              </p>
            </div>
          </div>

          {dates.length === 0 ? (
            <div className="mt-8 rounded-2xl border bg-muted/40 p-8 text-center">
              <Calendar className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 text-sm font-semibold">Aktuell sind keine Termine online.</p>
              <p className="mt-1 text-sm text-muted-foreground">Frag uns kurz per WhatsApp – wir nennen dir den nächsten Kurstermin.</p>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white">
                <MessageCircle className="h-4 w-4" /> Termin erfragen
              </a>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dates.map((d) => (
                <article key={d.id} className="group flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                    <Calendar className="h-4 w-4" /> Kurstermin
                  </div>
                  <p className="mt-3 font-display text-xl leading-tight">{formatDate(d.starts_at)}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatTime(d.starts_at)}{d.ends_at ? ` – ${formatTime(d.ends_at)} Uhr` : " Uhr"}
                  </p>
                  {d.note && <p className="mt-3 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">{d.note}</p>}
                  <div className="mt-5 flex flex-1 items-end gap-2">
                    <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white hover:brightness-110">
                      <MessageCircle className="h-3.5 w-3.5" /> Platz sichern
                    </a>
                    <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold hover:bg-muted">
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Info-Panel */}
        <section className="overflow-hidden rounded-3xl bg-foreground p-8 text-white sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Anmeldung</span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Sichere dir deinen Platz</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Melde dich unkompliziert per WhatsApp oder Anruf. Der Kurs findet in unserer Fahrschule statt und lässt sich ideal mit deiner Führerscheinanmeldung kombinieren.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white hover:brightness-110">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href={`tel:${CONTACT.phone}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-foreground hover:bg-white/90">
                  <Phone className="h-4 w-4" /> Anrufen
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Dauer</div>
                <p className="mt-2 text-lg font-bold leading-tight">{info?.duration ?? "8 Stunden (08:00 – 16:00)"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Nächster Termin</div>
                <p className="mt-2 text-lg font-bold leading-tight">
                  {nextDate ? new Date(nextDate.starts_at).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }) : "Auf Anfrage"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Standorte */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl">Komm vorbei – unsere Standorte</h2>
          <p className="mt-2 text-sm text-muted-foreground">Anmeldung direkt in einer unserer Filialen während der Bürozeiten.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {LOCATIONS.map((loc) => <LocationCard key={loc.id} location={loc} />)}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
