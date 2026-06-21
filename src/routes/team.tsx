import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBox } from "@/components/site/QueryFallbacks";
import { ReviewsBadge } from "@/components/site/ReviewsSection";

const teamQuery = queryOptions({
  queryKey: ["team_members"],
  queryFn: async () => {
    const { data, error } = await supabase.from("team_members").select("*").eq("active", true).order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team – MIRO-DRIVE Fahrschule" },
      { name: "description", content: "Lerne das Team von MIRO-DRIVE kennen – geduldig, erfahren und immer an deiner Seite." },
      { property: "og:title", content: "Team – MIRO-DRIVE" },
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
  if (src) return <img src={src} alt={name} className={`${dim} rounded-full object-cover`} />;
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

function TeamPage() {
  const { data: team } = useSuspenseQuery(teamQuery);
  const allInstructors = team.filter((m) => (m.sort_order ?? 0) < 8);
  const owner = allInstructors.find((m) => m.name.toLowerCase().includes("ilkay"));
  const otherInstructors = allInstructors.filter((m) => m !== owner);
  const office = team.filter((m) => (m.sort_order ?? 0) >= 8);

  const renderGroup = (members: typeof team) => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((m) => {
        const languages = m.description?.startsWith("Sprachen:")
          ? m.description.replace("Sprachen:", "").split(",").map((s) => s.trim()).filter(Boolean)
          : [];
        return (
          <div
            key={m.id}
            className="group flex flex-col items-center rounded-3xl border bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <Avatar name={m.name} src={m.image_url} />
            <h3 className="mt-5 font-display text-xl">{m.name}</h3>
            <p className="mt-1 text-sm font-bold text-primary">{m.role}</p>
            {languages.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {languages.map((lang) => (
                  <span key={lang} className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {lang}
                  </span>
                ))}
              </div>
            )}
            {m.description && !m.description.startsWith("Sprachen:") && (
              <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <SiteLayout>
      <PageHero eyebrow="Team" title="Lerne das Team von MIRO-DRIVE kennen." subtitle="Geduldig, erfahren und immer an deiner Seite – unser Team begleitet dich sicher bis zum Führerschein." />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <ReviewsBadge />
        {(owner || otherInstructors.length > 0) && (
          <section>
            <h2 className="mb-10 text-center font-display text-2xl text-primary sm:text-3xl">
              Fahrlehrer:innen der Fahrschule MIRO-DRIVE
            </h2>
            {owner && (
              <div className="mb-12 flex justify-center">
                <div className="group flex w-full max-w-md flex-col items-center rounded-3xl border-2 border-primary/30 bg-white p-10 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                  <Avatar name={owner.name} src={owner.image_url} size="lg" />
                  <h3 className="mt-6 font-display text-3xl">{owner.name}</h3>
                  <p className="mt-2 text-base font-bold text-primary">{owner.role}</p>
                  {(() => {
                    const langs = renderLanguages(owner.description);
                    return langs.length > 0 ? (
                      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                        {langs.map((lang) => (
                          <span key={lang} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                            {lang}
                          </span>
                        ))}
                      </div>
                    ) : owner.description ? (
                      <p className="mt-4 text-sm text-muted-foreground">{owner.description}</p>
                    ) : null;
                  })()}
                </div>
              </div>
            )}
            {otherInstructors.length > 0 && renderGroup(otherInstructors)}
          </section>
        )}
        {office.length > 0 && (
          <section>
            <h2 className="mb-8 text-center font-display text-2xl text-primary sm:text-3xl">
              Bürokräfte der Fahrschule MIRO-DRIVE
            </h2>
            {renderGroup(office)}
          </section>
        )}
      </div>
    </SiteLayout>
  );
}