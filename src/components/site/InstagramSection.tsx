import { Instagram, ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CONTACT } from "@/lib/contact";
import { getActiveInstagramPosts } from "@/lib/public-data.functions";

export function InstagramSection() {
  const { data: posts = [] } = useQuery({
    queryKey: ["instagram-posts"],
    queryFn: () => getActiveInstagramPosts(),
  });

  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Instagram className="h-4 w-4" /> Instagram
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
            Frisch <span className="text-primary">bestanden</span> – unsere Fahrschüler bei Instagram.
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Jede Woche feiern wir die nächsten frisch gebackenen Führerschein-Besitzer. Folge{" "}
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-foreground underline-offset-4 hover:underline"
            >
              @miro_drive
            </a>{" "}
            und sei dabei.
          </p>
        </div>

        {(() => {
          const n = posts.length;
          const mobileCount = Math.floor(n / 3) * 3;
          const desktopCount = Math.floor(n / 4) * 4;
          return (
            <div className="mt-10 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-3 md:grid-cols-4">
              {posts.map((p, idx) => {
                const inMobile = idx < mobileCount;
                const inDesktop = idx < desktopCount;
                if (!inMobile && !inDesktop) return null;
                const visibility =
                  inMobile && inDesktop
                    ? ""
                    : inMobile
                      ? "md:hidden"
                      : "hidden md:block";
                return (
                  <a
                    key={p.id}
                    href={p.post_url || CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative block aspect-square overflow-hidden rounded-xl bg-muted shadow-sm transition-transform hover:-translate-y-1 ${visibility}`}
                  >
                    <img
                      src={p.image_url}
                      alt={p.caption ?? `Bestandene Führerscheinprüfung bei MIRO-DRIVE – Beitrag ${idx + 1}`}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#833ab4]/80 via-[#fd1d1d]/60 to-[#fcb045]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Instagram className="h-8 w-8 drop-shadow" />
                      <span className="mt-1 hidden items-center gap-1 text-[10px] font-bold uppercase tracking-wider sm:inline-flex">
                        Ansehen <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          );
        })()}

        <div className="mt-12 flex justify-center">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
          >
            <Instagram className="h-4 w-4" />
            Auf Instagram folgen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
