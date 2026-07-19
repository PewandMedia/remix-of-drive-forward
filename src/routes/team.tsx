import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { getActiveTeamMembers } from "@/lib/public-data.functions";
import { ErrorBox } from "@/components/site/QueryFallbacks";
import { ReviewsBadge } from "@/components/site/ReviewsSection";
import { TeamCard, type TeamMember } from "@/components/site/TeamCard";

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

function TeamPage() {
  const { data: team } = useSuspenseQuery(teamQuery);
  const allInstructors = (team as TeamMember[]).filter((m) => (m.sort_order ?? 0) < 8);
  const owner = allInstructors.find((m) => m.name.toLowerCase().includes("ilkay"));
  let otherInstructors = allInstructors.filter((m) => m !== owner);
  const office = (team as TeamMember[]).filter((m) => (m.sort_order ?? 0) >= 8);
  const birtan = office.find((m) => m.name.toLowerCase().includes("birtan"));
  const officeWithoutBirtan = birtan ? office.filter((m) => m !== birtan) : office;
  if (birtan) otherInstructors = [...otherInstructors, birtan];

  const instructorGrid = (members: TeamMember[]) => (
    <div className="grid grid-cols-3 items-stretch gap-2 sm:gap-8">
      {members.map((m) => (
        <TeamCard key={m.id} member={m} size="sm" />
      ))}
    </div>
  );

  const officeGrid = (members: TeamMember[]) => (
    <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-8 lg:grid-cols-4">
      {members.map((m) => (
        <TeamCard key={m.id} member={m} />
      ))}
    </div>
  );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Team"
        title="Das Team deiner Fahrschule in Bochum"
        subtitle="Bei MIRO-DRIVE wirst du von einem freundlichen, geduldigen und professionellen Team begleitet – Anmeldung, Theorie und Praxis bis zur Prüfung, sicher und stressfrei in Bochum."
      />
      <div className="mx-auto max-w-7xl space-y-20 overflow-hidden px-4 py-16 pb-28 sm:px-6 lg:px-8">
        <ReviewsBadge />
        {(owner || otherInstructors.length > 0) && (
          <section className="flow-root">
            <h2 className="mb-10 text-center font-display text-2xl text-primary sm:text-3xl">
              Fahrlehrer:innen der Fahrschule MIRO-DRIVE
            </h2>
            {owner && (
              <div className="mb-12 flex justify-center">
                <TeamCard member={owner} size="lg" />
              </div>
            )}
            {otherInstructors.length > 0 && instructorGrid(otherInstructors)}
          </section>
        )}
        {officeWithoutBirtan.length > 0 && (
          <section className="flow-root border-t border-border pt-16">
            <h2 className="mb-8 text-center font-display text-2xl text-primary sm:text-3xl">
              Bürokräfte der Fahrschule MIRO-DRIVE
            </h2>
            {officeGrid(officeWithoutBirtan)}
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
