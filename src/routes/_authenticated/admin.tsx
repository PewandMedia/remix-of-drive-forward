import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin – MIRO-DRIVE" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === null) return <SiteLayout><div className="p-16 text-center text-sm text-muted-foreground">Wird geladen…</div></SiteLayout>;
  if (!isAdmin) return (
    <SiteLayout>
      <div className="mx-auto max-w-md p-16 text-center">
        <h2 className="font-display text-xl">Kein Admin-Zugriff</h2>
        <p className="mt-2 text-sm text-muted-foreground">Dein Konto hat keine Admin-Rolle. Bitte vom Inhaber freigeben lassen.</p>
        <Button onClick={signOut} className="mt-6 rounded-full">Abmelden</Button>
      </div>
    </SiteLayout>
  );

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">Admin-Panel</h1>
          <p className="text-sm text-muted-foreground">Verwalte Preise, Angebote, Team und den Erste-Hilfe-Kurs.</p>
          </div>
          <Button variant="outline" onClick={signOut} className="rounded-full"><LogOut className="h-4 w-4" /> Abmelden</Button>
        </div>

        <Tabs defaultValue="prices" className="mt-8">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="prices">Preise</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="first_aid">Erste-Hilfe</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>
          <TabsContent value="prices"><PricesAdmin /></TabsContent>
          <TabsContent value="team"><TeamAdmin /></TabsContent>
          <TabsContent value="first_aid"><FirstAidAdmin /></TabsContent>
          <TabsContent value="instagram"><InstagramAdmin /></TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}

/* ============== PRICES ============== */
function PricesAdmin() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-prices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prices").select("*").order("category").order("sort_order");
      if (error) throw error; return data;
    },
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("prices").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-prices"] }); qc.invalidateQueries({ queryKey: ["prices"] }); toast.success("Gelöscht"); },
  });
  const toggleActive = useMutation({
    mutationFn: async (p: { id: string; active: boolean }) => { const { error } = await supabase.from("prices").update({ active: p.active }).eq("id", p.id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-prices"] }); qc.invalidateQueries({ queryKey: ["prices"] }); },
  });

  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-end">
        <PriceDialog />
      </div>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase">
            <tr><th className="p-3">Kategorie</th><th className="p-3">Titel</th><th className="p-3">Preis</th><th className="p-3">Angebot</th><th className="p-3">Aktiv</th><th className="p-3 text-right">Aktion</th></tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-bold">{p.category}</td>
                <td className="p-3">{p.title}<div className="text-xs text-muted-foreground">{p.description}</div></td>
                <td className="p-3">
                  {p.offer_active && p.old_price && (
                    <span className="mr-1 text-xs text-muted-foreground line-through">{p.old_price}</span>
                  )}
                  <span className="text-primary">{p.price}</span>
                </td>
                <td className="p-3">
                  {p.offer_active ? (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-black uppercase text-primary-foreground">
                      {p.offer_label || "Aktion"}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">–</span>
                  )}
                </td>
                <td className="p-3"><Switch checked={p.active} onCheckedChange={(v) => toggleActive.mutate({ id: p.id, active: v })} /></td>
                <td className="p-3"><div className="flex justify-end gap-2"><PriceDialog initial={p} /><Button size="icon" variant="ghost" onClick={() => del.mutate(p.id)}><Trash2 className="h-4 w-4" /></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PriceDialog({ initial }: { initial?: any }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const isEdit = !!initial;
  const save = useMutation({
    mutationFn: async (form: FormData) => {
      const row = {
        category: String(form.get("category") || ""),
        title: String(form.get("title") || ""),
        description: String(form.get("description") || "") || null,
        price: String(form.get("price") || ""),
        sort_order: Number(form.get("sort_order") || 0),
        active: form.get("active") === "on",
        offer_active: form.get("offer_active") === "on",
        old_price: String(form.get("old_price") || "") || null,
        offer_label: String(form.get("offer_label") || "") || null,
        offer_valid_from: String(form.get("offer_valid_from") || "") ? new Date(String(form.get("offer_valid_from"))).toISOString() : null,
        offer_valid_until: String(form.get("offer_valid_until") || "") ? new Date(String(form.get("offer_valid_until"))).toISOString() : null,
      };
      if (isEdit) { const { error } = await supabase.from("prices").update(row).eq("id", initial.id); if (error) throw error; }
      else { const { error } = await supabase.from("prices").insert(row); if (error) throw error; }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-prices"] });
      qc.invalidateQueries({ queryKey: ["prices"] });
      qc.invalidateQueries({ queryKey: ["home-prices"] });
      qc.invalidateQueries({ queryKey: ["nav-active-offer"] });
      toast.success("Gespeichert"); setOpen(false);
    },
    onError: (e: any) => toast.error(e.message),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
               : <Button className="rounded-full"><Plus className="h-4 w-4" /> Preis hinzufügen</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{isEdit ? "Preis bearbeiten" : "Neuer Preis"}</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); save.mutate(new FormData(e.currentTarget)); }} className="space-y-3">
          <div><Label>Kategorie</Label><Input name="category" required defaultValue={initial?.category} placeholder="Klasse B / B197 / Auffrischungsstunden / Erste-Hilfe-Kurs" /></div>
          <div><Label>Titel</Label><Input name="title" required defaultValue={initial?.title} /></div>
          <div><Label>Beschreibung</Label><Textarea name="description" rows={2} defaultValue={initial?.description ?? ""} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Preis</Label><Input name="price" required defaultValue={initial?.price} placeholder="z. B. 60 €" /></div>
            <div><Label>Sortierung</Label><Input name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} /></div>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" name="offer_active" defaultChecked={initial?.offer_active ?? false} />
              Angebot / Aktion aktiv
            </label>
            <p className="mt-1 text-xs text-muted-foreground">Wenn aktiv, wird der alte Preis durchgestrichen und ein Aktions-Badge angezeigt.</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div><Label>Alter Preis (durchgestrichen)</Label><Input name="old_price" defaultValue={initial?.old_price ?? ""} placeholder="z. B. 299 €" /></div>
              <div><Label>Aktions-Label</Label><Input name="offer_label" defaultValue={initial?.offer_label ?? ""} placeholder="z. B. -30% / Sommer-Aktion" /></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <Label>Aktion gültig ab</Label>
                <Input name="offer_valid_from" type="datetime-local" defaultValue={initial?.offer_valid_from ? new Date(initial.offer_valid_from).toISOString().slice(0,16) : ""} />
              </div>
              <div>
                <Label>Aktion gültig bis</Label>
                <Input name="offer_valid_until" type="datetime-local" defaultValue={initial?.offer_valid_until ? new Date(initial.offer_valid_until).toISOString().slice(0,16) : ""} />
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Leer lassen für dauerhaft. Außerhalb des Zeitraums wird automatisch der normale Preis gezeigt.</p>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked={initial?.active ?? true} /> Aktiv</label>
          <DialogFooter><Button type="submit" className="rounded-full">Speichern</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


/* ============== TEAM ============== */
function TeamAdmin() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-team"],
    queryFn: async () => { const { data, error } = await supabase.from("team_members").select("*").order("sort_order"); if (error) throw error; return data; },
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("team_members").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); qc.invalidateQueries({ queryKey: ["team_members"] }); },
  });
  const toggleActive = useMutation({
    mutationFn: async (p: { id: string; active: boolean }) => { const { error } = await supabase.from("team_members").update({ active: p.active }).eq("id", p.id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); qc.invalidateQueries({ queryKey: ["team_members"] }); },
  });
  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-end"><TeamDialog /></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((m) => (
          <div key={m.id} className="rounded-xl border bg-white p-5">
            <div className="flex items-start justify-between">
              <div><h3 className="font-display text-lg">{m.name}</h3><p className="text-xs text-primary">{m.role}</p></div>
              <Switch checked={m.active} onCheckedChange={(v) => toggleActive.mutate({ id: m.id, active: v })} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{m.description}</p>
            <div className="mt-3 flex justify-end gap-2"><TeamDialog initial={m} /><Button size="icon" variant="ghost" onClick={() => del.mutate(m.id)}><Trash2 className="h-4 w-4" /></Button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamDialog({ initial }: { initial?: any }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const isEdit = !!initial;
  const save = useMutation({
    mutationFn: async (form: FormData) => {
      const row = {
        name: String(form.get("name") || ""),
        role: String(form.get("role") || ""),
        description: String(form.get("description") || "") || null,
        image_url: String(form.get("image_url") || "") || null,
        sort_order: Number(form.get("sort_order") || 0),
        active: form.get("active") === "on",
      };
      if (isEdit) { const { error } = await supabase.from("team_members").update(row).eq("id", initial.id); if (error) throw error; }
      else { const { error } = await supabase.from("team_members").insert(row); if (error) throw error; }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-team"] }); qc.invalidateQueries({ queryKey: ["team_members"] }); toast.success("Gespeichert"); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
               : <Button className="rounded-full"><Plus className="h-4 w-4" /> Teammitglied</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{isEdit ? "Mitglied bearbeiten" : "Neues Mitglied"}</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); save.mutate(new FormData(e.currentTarget)); }} className="space-y-3">
          <div><Label>Name</Label><Input name="name" required defaultValue={initial?.name} /></div>
          <div><Label>Rolle</Label><Input name="role" required defaultValue={initial?.role} /></div>
          <div><Label>Beschreibung</Label><Textarea name="description" rows={3} defaultValue={initial?.description ?? ""} /></div>
          <div><Label>Bild-URL</Label><Input name="image_url" defaultValue={initial?.image_url ?? ""} placeholder="https://…" /></div>
          <div><Label>Sortierung</Label><Input name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked={initial?.active ?? true} /> Aktiv</label>
          <DialogFooter><Button type="submit" className="rounded-full">Speichern</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ============== FIRST AID ============== */
function FirstAidAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin-first-aid"],
    queryFn: async () => { const { data, error } = await supabase.from("first_aid_info").select("*").order("updated_at", { ascending: false }).limit(1); if (error) throw error; return data?.[0] ?? null; },
  });
  const save = useMutation({
    mutationFn: async (form: FormData) => {
      const row = {
        description: String(form.get("description") || ""),
        price: String(form.get("price") || "") || null,
        duration: String(form.get("duration") || "") || null,
        dates: String(form.get("dates") || "") || null,
        active: form.get("active") === "on",
      };
      if (data) { const { error } = await supabase.from("first_aid_info").update(row).eq("id", data.id); if (error) throw error; }
      else { const { error } = await supabase.from("first_aid_info").insert(row); if (error) throw error; }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-first-aid"] }); qc.invalidateQueries({ queryKey: ["first_aid_info"] }); toast.success("Gespeichert"); },
    onError: (e: any) => toast.error(e.message),
  });
  return (
    <div className="mt-6 max-w-2xl">
      <form onSubmit={(e) => { e.preventDefault(); save.mutate(new FormData(e.currentTarget)); }} className="space-y-3 rounded-xl border bg-white p-6">
        <div><Label>Beschreibung</Label><Textarea name="description" rows={4} required defaultValue={data?.description ?? ""} /></div>
        <div className="grid gap-3 md:grid-cols-3">
          <div><Label>Preis</Label><Input name="price" defaultValue={data?.price ?? ""} /></div>
          <div><Label>Dauer</Label><Input name="duration" defaultValue={data?.duration ?? ""} /></div>
          <div><Label>Termine</Label><Input name="dates" defaultValue={data?.dates ?? ""} /></div>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked={data?.active ?? true} /> Aktiv</label>
        <Button type="submit" className="rounded-full">Speichern</Button>
      </form>
    </div>
  );
}

/* ============== INQUIRIES ============== */

/* ============== INSTAGRAM ============== */
function InstagramAdmin() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-instagram"],
    queryFn: async () => { const { data, error } = await supabase.from("instagram_posts").select("*").order("sort_order"); if (error) throw error; return data; },
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("instagram_posts").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-instagram"] }); qc.invalidateQueries({ queryKey: ["instagram-posts"] }); },
  });
  const toggleActive = useMutation({
    mutationFn: async (p: { id: string; active: boolean }) => { const { error } = await supabase.from("instagram_posts").update({ active: p.active }).eq("id", p.id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-instagram"] }); qc.invalidateQueries({ queryKey: ["instagram-posts"] }); },
  });
  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">Lade Instagram-Beiträge hoch (z. B. frisch bestandene Fahrschüler). Die ersten 6 aktiven Beiträge erscheinen auf der Startseite.</p>
        <InstagramDialog />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white p-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              {p.image_url ? <img src={p.image_url} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <p className="line-clamp-2 text-xs text-muted-foreground">{p.caption ?? "—"}</p>
              <Switch checked={p.active} onCheckedChange={(v) => toggleActive.mutate({ id: p.id, active: v })} />
            </div>
            <p className="mt-1 truncate text-[10px] text-muted-foreground">Sortierung: {p.sort_order}</p>
            <div className="mt-3 flex justify-end gap-2">
              <InstagramDialog initial={p} />
              <Button size="icon" variant="ghost" onClick={() => del.mutate(p.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InstagramDialog({ initial }: { initial?: any }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const isEdit = !!initial;
  const save = useMutation({
    mutationFn: async (form: FormData) => {
      const row = {
        image_url: String(form.get("image_url") || ""),
        caption: String(form.get("caption") || "") || null,
        post_url: String(form.get("post_url") || "https://www.instagram.com/miro_drive/"),
        sort_order: Number(form.get("sort_order") || 0),
        active: form.get("active") === "on",
      };
      if (isEdit) { const { error } = await supabase.from("instagram_posts").update(row).eq("id", initial.id); if (error) throw error; }
      else { const { error } = await supabase.from("instagram_posts").insert(row); if (error) throw error; }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-instagram"] }); qc.invalidateQueries({ queryKey: ["instagram-posts"] }); toast.success("Gespeichert"); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? <Button size="icon" variant="ghost"><Pencil className="h-4 w-4" /></Button>
               : <Button className="rounded-full"><Plus className="h-4 w-4" /> Beitrag</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{isEdit ? "Beitrag bearbeiten" : "Neuer Instagram-Beitrag"}</DialogTitle></DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); save.mutate(new FormData(e.currentTarget)); }} className="space-y-3">
          <div><Label>Bild-URL</Label><Input name="image_url" required defaultValue={initial?.image_url} placeholder="https://…/bild.jpg" /></div>
          <div><Label>Beschreibung / Caption</Label><Textarea name="caption" rows={2} defaultValue={initial?.caption ?? ""} placeholder="z. B. Glückwunsch Lisa zur bestandenen Prüfung!" /></div>
          <div><Label>Instagram-Post-URL</Label><Input name="post_url" defaultValue={initial?.post_url ?? "https://www.instagram.com/miro_drive/"} placeholder="https://www.instagram.com/p/…" /></div>
          <div><Label>Sortierung (niedriger = weiter vorne)</Label><Input name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="active" defaultChecked={initial?.active ?? true} /> Aktiv</label>
          <DialogFooter><Button type="submit" className="rounded-full">Speichern</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}