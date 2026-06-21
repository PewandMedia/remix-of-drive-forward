import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { bootstrapFirstAdmin } from "@/lib/admin.functions";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin-Login – MIRO-DRIVE" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const bootstrap = useServerFn(bootstrapFirstAdmin);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    navigate({ to: "/admin" });
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: String(f.get("email")),
      password: String(f.get("password")),
      options: { emailRedirectTo: window.location.origin + "/admin" },
    });
    if (error) { setLoading(false); return toast.error(error.message); }
    try {
      const res = await bootstrap();
      if (res.granted) toast.success("Admin-Zugang eingerichtet.");
      else toast.info("Konto erstellt. Bitte vom bestehenden Admin freigeben lassen.");
    } catch { /* ignore */ }
    setLoading(false);
    navigate({ to: "/admin" });
  }

  return (
    <SiteLayout>
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
        <h1 className="font-display text-3xl">Admin-Bereich</h1>
        <p className="mt-2 text-sm text-muted-foreground">Login für den Inhaber der Fahrschule. Der erste registrierte Nutzer wird automatisch zum Admin.</p>
        <Tabs defaultValue="login" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Registrieren</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="mt-4 space-y-4 rounded-2xl border bg-white p-6">
              <div><Label htmlFor="le">E-Mail</Label><Input id="le" name="email" type="email" required /></div>
              <div><Label htmlFor="lp">Passwort</Label><Input id="lp" name="password" type="password" required minLength={6} /></div>
              <Button type="submit" disabled={loading} className="w-full rounded-full">Einloggen</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="mt-4 space-y-4 rounded-2xl border bg-white p-6">
              <div><Label htmlFor="se">E-Mail</Label><Input id="se" name="email" type="email" required /></div>
              <div><Label htmlFor="sp">Passwort</Label><Input id="sp" name="password" type="password" required minLength={6} /></div>
              <Button type="submit" disabled={loading} className="w-full rounded-full">Konto erstellen</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}