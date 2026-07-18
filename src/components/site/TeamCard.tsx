export type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string | null;
  bio?: string | null;
  image_url: string | null;
  sort_order?: number | null;
};

export function Avatar({
  name,
  src,
  size = "md",
}: {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg" | "featured";
}) {
  const dim =
    size === "lg"
      ? "h-36 w-36 sm:h-40 sm:w-40"
      : size === "featured"
      ? "h-28 w-28 sm:h-32 sm:w-32"
      : size === "sm"
      ? "h-16 w-16 sm:h-28 sm:w-28"
      : "h-24 w-24 sm:h-28 sm:w-28";
  const textSize =
    size === "lg"
      ? "text-5xl"
      : size === "featured"
      ? "text-4xl"
      : size === "sm"
      ? "text-xl sm:text-3xl"
      : "text-3xl";

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        className={`${dim} shrink-0 rounded-full object-cover`}
      />
    );
  }

  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex ${dim} shrink-0 items-center justify-center rounded-full bg-primary font-display ${textSize} text-primary-foreground`}
    >
      {initials}
    </div>
  );
}

export function renderLanguages(description: string | null | undefined) {
  if (!description?.startsWith("Sprachen:")) return [];
  return description
    .replace("Sprachen:", "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function TeamCard({
  member,
  size = "md",
}: {
  member: TeamMember;
  size?: "sm" | "md" | "lg" | "featured";
}) {
  const languages = renderLanguages(member.description);
  const extraDesc =
    member.description && !member.description.startsWith("Sprachen:")
      ? member.description
      : null;
  const bio = member.bio;

  const isLg = size === "lg";
  const isFeatured = size === "featured";
  const isSm = size === "sm";

  const cardSize = isLg
    ? "min-h-[420px] w-full max-w-md p-8 sm:p-10"
    : isFeatured
    ? "min-h-[340px] w-full max-w-sm p-6 sm:p-8"
    : isSm
    ? "min-h-[200px] p-3 sm:min-h-[320px] sm:p-7"
    : "min-h-[320px] p-5 sm:p-7";

  return (
    <article
      className={`relative isolate flex h-full min-w-0 flex-col items-center overflow-hidden rounded-2xl border bg-card ${cardSize} text-center shadow-sm transition-shadow hover:shadow-lg ${
        isLg || isFeatured ? "border-primary/30" : "border-border"
      }`}
      aria-label={member.name}
    >
      <Avatar name={member.name} src={member.image_url} size={size} />
      <h3
        className={`${
          isLg ? "mt-6 text-3xl" : isSm ? "mt-4 text-base sm:text-xl" : "mt-5 text-xl"
        } max-w-full truncate font-display text-foreground`}
      >
        {member.name}
      </h3>
      <p
        className={`mt-1 ${
          isLg ? "text-base" : isSm ? "text-[10px] sm:text-sm" : "text-sm"
        } font-bold text-primary`}
      >
        {member.role}
      </p>
      {languages.length > 0 && (
        <div
          className={`${
            isLg ? "mt-4" : isSm ? "mt-2 sm:mt-3" : "mt-3"
          } flex flex-wrap justify-center gap-1.5`}
        >
          {languages.map((lang) => (
            <span
              key={lang}
              className={`rounded-full border border-border bg-muted/50 ${
                isLg ? "px-3 py-1" : isSm ? "px-2 py-0.5 text-[10px] sm:px-2.5 sm:text-xs" : "px-2.5 py-0.5"
              } text-xs text-muted-foreground`}
            >
              {lang}
            </span>
          ))}
        </div>
      )}
      {extraDesc && <p className="mt-3 text-sm text-muted-foreground">{extraDesc}</p>}
      {bio && (
        <p
          className={`${
            isLg ? "mt-6 text-base" : isSm ? "mt-4 text-xs sm:text-sm" : "mt-5 text-sm"
          } leading-relaxed text-muted-foreground`}
        >
          {bio}
        </p>
      )}
    </article>
  );
}
