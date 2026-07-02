import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/miro-drive-logo.svg.asset.json";
import { NAV_LINKS } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: hasOffer = false } = useQuery({
    queryKey: ["nav-active-offer"],
    queryFn: async () => {
      const { count } = await supabase
        .from("prices")
        .select("id", { count: "exact", head: true })
        .eq("active", true)
        .eq("offer_active", true);
      return (count ?? 0) > 0;
    },
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    let ticking = false;
    let last = window.scrollY > 8;
    setScrolled(last);
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const now = window.scrollY > 8;
        if (now !== last) {
          last = now;
          setScrolled(now);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow",
        scrolled && "shadow-[0_4px_24px_-12px_rgba(0,0,0,0.18)]"
      )}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 flex items-center gap-3">
          <img src={logoAsset.url} alt="MIRO-DRIVE Fahrschule" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
              {l.to === "/preise" && hasOffer && (
                <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary-foreground">
                  <Sparkles className="h-2.5 w-2.5" /> Aktion
                </span>
              )}
            </Link>
          ))}
          <Link
            to="/kontakt"
            className="ml-3 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]"
          >
            Jetzt anmelden
          </Link>
        </nav>

        <button
          aria-label="Menü"
          className="rounded-md p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-3 text-base font-semibold text-foreground/80 hover:bg-muted"
                activeProps={{ className: "text-primary bg-muted" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/kontakt"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              Jetzt anmelden
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}