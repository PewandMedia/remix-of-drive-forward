import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { CookieBanner } from "@/components/site/CookieBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fahrschule Bochum | MIRO-DRIVE – Führerschein Klasse B & B197" },
      { name: "description", content: "MIRO-DRIVE ist deine moderne Fahrschule in Bochum für Klasse B, B197, B78, Erste-Hilfe-Kurs und persönliche Beratung. Jetzt anmelden." },
      { name: "keywords", content: "Fahrschule Bochum, Fahrschule in Bochum, Fahrschule Bochum Innenstadt, Fahrschule Rathaus Bochum, Fahrschule Bochum Riemke, Führerschein Bochum, Führerschein Klasse B Bochum, B197 Bochum, B78 Bochum, Erste-Hilfe-Kurs Bochum, Fahrstunden Bochum, beste Fahrschule Bochum, moderne Fahrschule Bochum, Fahrschule Herne, Fahrschule NRW" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "DE-NW" },
      { name: "geo.placename", content: "Bochum" },
      { property: "og:title", content: "Fahrschule Bochum | MIRO-DRIVE" },
      { property: "og:description", content: "Moderne Fahrschule in Bochum – Klasse B, B197, Erste-Hilfe-Kurs. Anmeldung schnell per WhatsApp." },
      { property: "og:locale", content: "de_DE" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MIRO-DRIVE" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "DrivingSchool"],
          name: "MIRO-DRIVE Fahrschule",
          description:
            "Moderne Fahrschule in Bochum für Führerschein Klasse B, B197, B78 und Erste-Hilfe-Kurs. Persönliche Betreuung in Bochum Innenstadt, Rathaus Bochum, Bochum Riemke und Umgebung.",
          image: "/favicon.ico",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bochum",
            addressRegion: "NRW",
            addressCountry: "DE",
          },
          areaServed: [
            { "@type": "City", name: "Bochum" },
            { "@type": "City", name: "Herne" },
            { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "549",
            bestRating: "5",
          },
          priceRange: "€€",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const onChunkError = (e: Event) => {
      const msg = (e as ErrorEvent).message || "";
      if (
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("Importing a module script failed") ||
        msg.includes("error loading dynamically imported module")
      ) {
        window.location.reload();
      }
    };
    const onPreloadError = () => window.location.reload();
    window.addEventListener("error", onChunkError);
    window.addEventListener("vite:preloadError", onPreloadError);
    return () => {
      window.removeEventListener("error", onChunkError);
      window.removeEventListener("vite:preloadError", onPreloadError);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CookieBanner />
    </QueryClientProvider>
  );
}
