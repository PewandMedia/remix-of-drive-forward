import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBox } from "@/components/site/QueryFallbacks";

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

function Avatar({ name, src }: { name: string; src?: string | null }) {
  if (src) return <img src={src} alt={name} className="h-32 w-32 rounded-full object-cover" />;
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#7a0a14] font-display text-3xl text-white">
      {initials}
    </div>
  );
}

function TeamPage() {
  const { data: team } = useSuspenseQuery(teamQuery);
  return (
    <SiteLayout>
      <PageHero eyebrow="Team" title="Lerne das Team von MIRO-DRIVE kennen." subtitle="Geduldig, erfahren und immer an deiner Seite – unser Team begleitet dich sicher bis zum Führerschein." />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.id} className="group flex flex-col items-center rounded-3xl border bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl">
              <Avatar name={m.name} src={m.image_url} />
              <h3 className="mt-5 font-display text-xl">{m.name}</h3>
              <p className="mt-1 text-sm font-bold text-primary">{m.role}</p>
              {m.description && <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}