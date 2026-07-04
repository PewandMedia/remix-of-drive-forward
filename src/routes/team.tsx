import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { RotateCw } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getActiveTeamMembers } from "@/lib/public-data.functions";
import { ErrorBox } from "@/components/site/QueryFallbacks";
import { ReviewsBadge } from "@/components/site/ReviewsSection";

const teamQuery = queryOptions({
  queryKey: ["team_members"],
  queryFn: () => getActiveTeamMembers(),
});

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Fahrschule Bochum | MIRO-DRIVE" },
      { name: "description", content: "Mehrsprachig, geduldig, erfahren – lerne die Fahrlehrer:innen von MIRO-DRIVE persönlich kennen." },
      { property: "og:title", content: "Team Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Mehrsprachig, geduldig, erfahren – lerne die Fahrlehrer:innen von MIRO-DRIVE persönlich kennen." },
      { property: "og:url", content: "/team" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(teamQuery),
  component: TeamPage,
  errorComponent: ErrorBox,
});

function Avatar({ name, src, size = "md" }: { name: string; src?: string | null; size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-44 w-44" : "h-32 w-32";
  const textSize = size === "lg" ? "text-5xl" : "text-3xl";
  if (src) return <img src={src} alt={name} loading="lazy" decoding="async" className={`${dim} rounded-full object-cover`} />;
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={`flex ${dim} items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#7a0a14] font-display ${textSize} text-white`}>
      {initials}
    </div>
  );
}

function renderLanguages(description: string | null | undefined) {
  if (!description?.startsWith("Sprachen:")) return [];
  return description.replace("Sprachen:", "").split(",").map((s) => s.trim()).filter(Boolean);
}

type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string | null;
  bio?: string | null;
  image_url: string | null;
};

function FlipCard({ member, size = "md" }: { member: TeamMember; size?: "md" | "lg" }) {
  const [flipped, setFlipped] = useState(false);
  const languages = renderLanguages(member.description);
  const extraDesc = member.description && !member.description.startsWith("Sprachen:") ? member.description : null;
  const bio = (member as any).bio as string | null | undefined;

  const isLg = size === "lg";
  const heightClass = isLg ? "min-h-[520px]" : "min-h-[380px] sm:min-h-[440px]";
  const padding = isLg ? "p-10" : "p-4 sm:p-8";

  return (
    <div
      className={`perspective-1000 ${isLg ? "w-full max-w-md" : ""} cursor-pointer`}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((v) => !v); } }}
      role="button"
      tabIndex={0}
      aria-label={`Karte von ${member.name} umdrehen`}
    >
      <div
        className={`relative preserve-3d ${heightClass} w-full transition-transform duration-700 ease-out ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 backface-hidden flex flex-col items-center rounded-3xl border ${isLg ? "border-2 border-primary/30 shadow-lg" : ""} bg-white ${padding} text-center transition-shadow hover:shadow-xl`}
        >
          <Avatar name={member.name} src={member.image_url} size={size} />
          <h3 className={`${isLg ? "mt-6 text-3xl" : "mt-5 text-xl"} font-display`}>{member.name}</h3>
          <p className={`mt-1 ${isLg ? "text-base" : "text-sm"} font-bold text-primary`}>{member.role}</p>
          {languages.length > 0 && (
            <div className={`${isLg ? "mt-4" : "mt-3"} flex flex-wrap justify-center gap-1.5`}>
              {languages.map((lang) => (
                <span key={lang} className={`rounded-full border border-border bg-muted/50 ${isLg ? "px-3 py-1" : "px-2.5 py-0.5"} text-xs text-muted-foreground`}>
                  {lang}
                </span>
              ))}
            </div>
          )}
          {extraDesc && <p className="mt-3 text-sm text-muted-foreground">{extraDesc}</p>}
          <div className="mt-auto pt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/70">
            <RotateCw className="h-3 w-3" /> Klick für mehr
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center rounded-3xl ${padding} text-center text-white shadow-xl`}
          style={{ background: "linear-gradient(135deg, #1a0508 0%, #7a0a14 60%, #c8102e 100%)" }}
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Über {member.name.split(" ")[0]}</div>
          <div className="mt-4 h-px w-12 bg-white/40" />
          {bio ? (
            <p className={`mt-5 ${isLg ? "text-base leading-relaxed" : "text-sm leading-relaxed"} text-white/95`}>{bio}</p>
          ) : (
            <p className="mt-5 text-sm italic text-white/70">Bald mehr über {member.name.split(" ")[0]}…</p>
          )}
          <div className="mt-auto pt-4 flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-white/60">
            <RotateCw className="h-3 w-3" /> Zurück
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamPage() {
  const { data: team } = useSuspenseQuery(teamQuery);
  const allInstructors = team.filter((m) => (m.sort_order ?? 0) < 8);
  const owner = allInstructors.find((m) => m.name.toLowerCase().includes("ilkay"));
  let otherInstructors = allInstructors.filter((m) => m !== owner);
  const office = team.filter((m) => (m.sort_order ?? 0) >= 8);
  const birtan = office.find((m) => m.name.toLowerCase().includes("birtan"));
  const officeWithoutBirtan = birtan ? office.filter((m) => m !== birtan) : office;
  if (birtan) otherInstructors = [...otherInstructors, birtan];

  const renderGroup = (members: typeof team) => (
    <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((m) => <FlipCard key={m.id} member={m as TeamMember} />)}
    </div>
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Team"
        title="Das Team deiner Fahrschule in Bochum"
        subtitle="Bei MIRO-DRIVE wirst du von einem freundlichen, geduldigen und professionellen Team begleitet – Anmeldung, Theorie und Praxis bis zur Prüfung, sicher und stressfrei in Bochum."
      />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <ReviewsBadge />
        {(owner || otherInstructors.length > 0) && (
          <section>
            <h2 className="mb-10 text-center font-display text-2xl text-primary sm:text-3xl">
              Fahrlehrer:innen der Fahrschule MIRO-DRIVE
            </h2>
            {owner && (
              <div className="mb-12 flex justify-center">
                <FlipCard member={owner as TeamMember} size="lg" />
              </div>
            )}
            {otherInstructors.length > 0 && renderGroup(otherInstructors)}
          </section>
        )}
        {officeWithoutBirtan.length > 0 && (
          <section>
            <h2 className="mb-8 text-center font-display text-2xl text-primary sm:text-3xl">
              Bürokräfte der Fahrschule MIRO-DRIVE
            </h2>
            {renderGroup(officeWithoutBirtan)}
          </section>
        )}
      </div>
    </SiteLayout>
  );
}