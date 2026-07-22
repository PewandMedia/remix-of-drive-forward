import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "miro-drive-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // small delay for smoother appearance after hydration
        const t = window.setTimeout(() => setVisible(true), 400);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Hinweis"
      className="fixed inset-x-0 bottom-0 z-[90] flex justify-center px-3 pb-3 sm:bottom-4 sm:right-4 sm:left-auto sm:justify-end sm:px-0 sm:pb-0"
    >
      <div className="pointer-events-auto w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h2 className="font-display text-base text-slate-900 sm:text-lg">
                Cookies auf dieser Seite
              </h2>
              <button
                type="button"
                onClick={() => persist("declined")}
                aria-label="Schließen"
                className="-mr-2 -mt-1 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Wir verwenden ausschließlich technisch notwendige Cookies, damit unsere
              Website funktioniert. Es findet kein Tracking und keine Analyse statt.
              Details findest du in unserer{" "}
              <Link
                to="/datenschutz"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => persist("accepted")}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm shadow-primary/25 transition hover:bg-primary/90"
              >
                Verstanden
              </button>
              <button
                type="button"
                onClick={() => persist("declined")}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Ablehnen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
