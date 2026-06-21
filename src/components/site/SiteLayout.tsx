import { useEffect, useState, type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { Toaster } from "@/components/ui/sonner";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {mounted && <WhatsAppFloat />}
      {mounted && <Toaster />}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-white">
      <div className="pointer-events-none absolute -right-32 top-0 h-full w-[40%] -skew-x-12 bg-primary/10" />
      <div className="pointer-events-none absolute -right-10 top-0 h-full w-2 bg-primary" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-3xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
