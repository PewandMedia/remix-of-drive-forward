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
const CLASS_CATEGORIES = ["Klasse B", "Klasse B197", "Klasse B78"] as const;

type PriceRow = any;
type PriceGroup = {
  key: string;
  title: string;
  isClassGroup: boolean;
  rows: PriceRow[];
  representative: PriceRow;
  categories: string[];
};

function groupPrices(rows: PriceRow[]): PriceGroup[] {
  const groups: PriceGroup[] = [];
  const classBuckets = new Map<string, PriceRow[]>();
  for (const r of rows) {
    if ((CLASS_CATEGORIES as readonly string[]).includes(r.category)) {
      const k = r.title;
      if (!classBuckets.has(k)) classBuckets.set(k, []);
      classBuckets.get(k)!.push(r);
    } else {
      groups.push({
        key: `single:${r.id}`,
        title: r.title,
        isClassGroup: false,
        rows: [r],
        representative: r,
        categories: [r.category],
      });
    }
  }
  for (const [title, bucket] of classBuckets) {
    const sorted = [...bucket].sort(
      (a, b) => CLASS_CATEGORIES.indexOf(a.category) - CLASS_CATEGORIES.indexOf(b.category),
    );
    groups.push({
      key: `class:${title}`,
      title,
      isClassGroup: true,
      rows: sorted,
      representative: sorted[0],
      categories: sorted.map((r) => r.category),
    });
  }
  return groups;
}

function PricesAdmin() {
  const qc = useQueryClient();
  const { data = [] } = useQuery({
    queryKey: ["admin-prices"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prices").select("*").order("category").order("sort_order");
      if (error) throw error; return data;
    },
  });
  const groups = groupPrices(data);
  const invalidateAll = () => {
    qc.invalidateQueries({ queryKey: ["admin-prices"] });
    qc.invalidateQueries({ queryKey: ["prices"] });
    qc.invalidateQueries({ queryKey: ["home-prices"] });
    qc.invalidateQueries({ queryKey: ["nav-active-offer"] });
  };
  const del = useMutation({
    mutationFn: async (ids: string[]) => { const { error } = await supabase.from("prices").delete().in("id", ids); if (error) throw error; },
    onSuccess: () => { invalidateAll(); toast.success("Gelöscht"); },
  });
  const toggleActive = useMutation({
    mutationFn: async (p: { ids: string[]; active: boolean }) => { const { error } = await supabase.from("prices").update({ active: p.active }).in("id", p.ids); if (error) throw error; },
    onSuccess: () => { invalidateAll(); },
  });

  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-end">
        <PriceDialog />
      </div>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase">
            <tr><th className="p-3">Gilt für</th><th className="p-3">Titel</th><th className="p-3">Preis</th><th className="p-3">Angebot</th><th className="p-3">Aktiv</th><th className="p-3 text-right">Aktion</th></tr>
          </thead>
          <tbody>
            {groups.map((g) => {
              const p = g.representative;
              const allActive = g.rows.every((r) => r.active);
              const ids = g.rows.map((r) => r.id);
              return (
                <tr key={g.key} className="border-t">
                  <td className="p-3 font-bold">
                    {g.isClassGroup ? (
                      <div className="flex flex-wrap gap-1">
                        {g.categories.map((c) => (
                          <span key={c} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-black uppercase text-primary">
                            {c.replace("Klasse ", "")}
                          </span>
                        ))}
                      </div>
                    ) : (
                      p.category
                    )}
                  </td>
                  <td className="p-3">{g.title}<div className="text-xs text-muted-foreground">{p.description}</div></td>
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
                  <td className="p-3"><Switch checked={allActive} onCheckedChange={(v) => toggleActive.mutate({ ids, active: v })} /></td>
                  <td className="p-3"><div className="flex justify-end gap-2"><PriceDialog initial={p} group={g} /><Button size="icon" variant="ghost" onClick={() => del.mutate(ids)}><Trash2 className="h-4 w-4" /></Button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const OFFER_PRESETS: { label: string; note?: string; days?: number }[] = [
  { label: "🎄 Weihnachts-Aktion", note: "Nur solange der Vorrat reicht – perfektes Geschenk unterm Baum.", days: 30 },
  { label: "🎆 Silvester-Special", note: "Starte mit deinem Führerschein ins neue Jahr.", days: 14 },
  { label: "🐰 Oster-Aktion", note: "Frisch in den Frühling mit deinem Führerschein.", days: 21 },
  { label: "☀️ Sommer-Aktion", note: "Ferien nutzen und Führerschein in Rekordzeit machen.", days: 45 },
  { label: "🍂 Herbst-Aktion", note: "Perfekter Start ins neue Semester.", days: 30 },
  { label: "🌸 Frühlings-Aktion", note: "Neue Saison, neuer Führerschein.", days: 30 },
  { label: "🖤 Black Friday", note: "Nur wenige Tage – Rabatt-Wochenende bei MIRO-DRIVE.", days: 4 },
  { label: "🎓 Ferien-Special", note: "Ideal für Schüler & Studenten in den Ferien.", days: 30 },
];

function toDateInput(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function fromDateInput(v: string, endOfDay = false): string | null {
  if (!v) return null;
  const d = new Date(v + (endOfDay ? "T23:59:59" : "T00:00:00"));
  return isNaN(d.getTime()) ? null : d.toISOString();
}
function extractNumber(s: string | null | undefined): string {
  if (!s) return "";
  const m = String(s).match(/(\d+(?:[.,]\d+)?)/);
  return m ? m[1].replace(",", ".") : "";
}

function PriceDialog({ initial, group }: { initial?: any; group?: PriceGroup }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const isEdit = !!initial;
  const isGroupEdit = !!group && group.isClassGroup;
  const [applyAllClasses, setApplyAllClasses] = useState(!isEdit);

  // Controlled offer state
  const [priceNum, setPriceNum] = useState<string>(extractNumber(initial?.price));
  const [offerActive, setOfferActive] = useState<boolean>(!!initial?.offer_active);
  const [oldPriceNum, setOldPriceNum] = useState<string>(extractNumber(initial?.old_price));
  const [offerLabel, setOfferLabel] = useState<string>(initial?.offer_label ?? "");
  const [offerNote, setOfferNote] = useState<string>(initial?.offer_note ?? "");
  const [validFrom, setValidFrom] = useState<string>(toDateInput(initial?.offer_valid_from));
  const [validUntil, setValidUntil] = useState<string>(toDateInput(initial?.offer_valid_until));

  // When Angebot is toggled on and old price is empty → auto-fill with current price
  useEffect(() => {
    if (offerActive && !oldPriceNum && priceNum) setOldPriceNum(priceNum);
  }, [offerActive]);

  function applyPreset(preset: typeof OFFER_PRESETS[number]) {
    setOfferActive(true);
    setOfferLabel(preset.label);
    if (preset.days) {
      const today = new Date();
      const end = new Date();
      end.setDate(end.getDate() + preset.days);
      setValidFrom(toDateInput(today.toISOString()));
      setValidUntil(toDateInput(end.toISOString()));
    }
    if (!oldPriceNum && priceNum) setOldPriceNum(priceNum);
  }

  function quickRange(days: number | "eom" | "eoy") {
    const start = new Date();
    let end: Date;
    if (days === "eom") { end = new Date(start.getFullYear(), start.getMonth() + 1, 0); }
    else if (days === "eoy") { end = new Date(start.getFullYear(), 11, 31); }
    else { end = new Date(); end.setDate(end.getDate() + days); }
    setValidFrom(toDateInput(start.toISOString()));
    setValidUntil(toDateInput(end.toISOString()));
  }

  const save = useMutation({
    mutationFn: async (form: FormData) => {
      const priceStr = priceNum ? `${priceNum} €` : "";
      const oldStr = offerActive && oldPriceNum ? `${oldPriceNum} €` : null;
      const row = {
        category: String(form.get("category") || ""),
        title: String(form.get("title") || ""),
        description: String(form.get("description") || "") || null,
        price: priceStr,
        sort_order: Number(form.get("sort_order") || 0),
        active: form.get("active") === "on",
        offer_active: offerActive,
        old_price: oldStr,
        offer_label: offerActive ? (offerLabel || null) : null,
        offer_note: offerActive ? (offerNote || null) : null,
        offer_valid_from: offerActive ? fromDateInput(validFrom, false) : null,
        offer_valid_until: offerActive ? fromDateInput(validUntil, true) : null,
      };
      if (isEdit) {
        if (isGroupEdit) {
          const { category: _c, title: _t, sort_order: _s, ...shared } = row;
          const { error } = await supabase.from("prices").update(shared).in("id", group!.rows.map((r) => r.id));
          if (error) throw error;
        } else {
          const { error } = await supabase.from("prices").update(row).eq("id", initial.id);
          if (error) throw error;
        }
      } else {
        if (applyAllClasses) {
          const { category: _c, ...shared } = row;
          const inserts = CLASS_CATEGORIES.map((cat) => ({ ...shared, category: cat }));
          const { error } = await supabase.from("prices").insert(inserts);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("prices").insert(row);
          if (error) throw error;
        }
      }
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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? (isGroupEdit ? `Preis „${group!.title}" bearbeiten (gilt für alle Klassen)` : "Preis bearbeiten") : "Neuer Preis"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => { e.preventDefault(); save.mutate(new FormData(e.currentTarget)); }} className="space-y-3">
          {isGroupEdit ? (
            <div className="rounded-lg border bg-primary/5 p-3 text-xs">
              Änderungen greifen automatisch für: <b>{group!.categories.join(" · ")}</b>. Kategorie und Titel bleiben pro Zeile erhalten.
              <input type="hidden" name="category" value={initial?.category} />
              <input type="hidden" name="title" value={initial?.title} />
              <input type="hidden" name="sort_order" value={initial?.sort_order ?? 0} />
            </div>
          ) : (
            <>
              {!isEdit && (
                <label className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm font-bold">
                  <input type="checkbox" checked={applyAllClasses} onChange={(e) => setApplyAllClasses(e.target.checked)} />
                  Für alle Führerschein-Klassen anlegen (B · B197 · B78)
                </label>
              )}
              <div><Label>Kategorie</Label>
                {applyAllClasses && !isEdit ? (
                  <p className="text-xs text-muted-foreground">Wird automatisch für alle Klassen angelegt.</p>
                ) : (
                  <Input name="category" required defaultValue={initial?.category} placeholder="Klasse B / B197 / B78 / Erste-Hilfe-Kurs" />
                )}
              </div>
              <div><Label>Titel</Label><Input name="title" required defaultValue={initial?.title} /></div>
            </>
          )}
          <div><Label>Beschreibung</Label><Textarea name="description" rows={2} defaultValue={initial?.description ?? ""} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{offerActive ? "Aktions-Preis (€)" : "Preis (€)"}</Label>
              <Input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={priceNum}
                onChange={(e) => setPriceNum(e.target.value)}
                required
                placeholder="z. B. 150"
              />
            </div>
            {!isGroupEdit && (
              <div><Label>Sortierung</Label><Input name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} /></div>
            )}
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
            <label className="flex items-center gap-2 text-sm font-bold">
              <input type="checkbox" checked={offerActive} onChange={(e) => setOfferActive(e.target.checked)} />
              Angebot / Aktion aktiv
            </label>
            <p className="mt-1 text-xs text-muted-foreground">
              Der aktuelle Preis wird zum Aktionspreis. Der alte Preis wird durchgestrichen darüber angezeigt.
            </p>

            {offerActive && (
              <>
                <div className="mt-3">
                  <Label className="text-xs">Anlass auswählen</Label>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {OFFER_PRESETS.map((p) => (
                      <button
                        type="button"
                        key={p.label}
                        onClick={() => applyPreset(p)}
                        className={[
                          "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition",
                          offerLabel === p.label
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-white hover:border-primary hover:text-primary",
                        ].join(" ")}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  {(() => {
                    const active = OFFER_PRESETS.find((p) => p.label === offerLabel);
                    return active?.note ? (
                      <p className="mt-2 rounded-md bg-white/70 px-2 py-1.5 text-[11px] italic leading-snug text-muted-foreground">
                        <span className="font-semibold not-italic text-foreground">Info: </span>{active.note}
                      </p>
                    ) : null;
                  })()}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <Label>Alter Preis (€)</Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      value={oldPriceNum}
                      onChange={(e) => setOldPriceNum(e.target.value)}
                      placeholder="wird automatisch übernommen"
                    />
                    <p className="mt-1 text-[10px] text-muted-foreground">Wird durchgestrichen angezeigt.</p>
                  </div>
                  <div>
                    <Label>Aktions-Label (frei änderbar)</Label>
                    <Input
                      value={offerLabel}
                      onChange={(e) => setOfferLabel(e.target.value)}
                      placeholder="z. B. Sommer-Aktion"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <Label>Notiz zur Aktion (optional)</Label>
                  <Textarea
                    rows={2}
                    value={offerNote}
                    onChange={(e) => setOfferNote(e.target.value)}
                    placeholder="z. B. Nur für Neuanmeldungen bis Monatsende. Wird direkt unter dem Preis angezeigt."
                  />
                </div>

                <div className="mt-3">
                  <Label className="text-xs">Schnell-Auswahl Zeitraum</Label>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {[
                      { label: "7 Tage", d: 7 as const },
                      { label: "14 Tage", d: 14 as const },
                      { label: "30 Tage", d: 30 as const },
                      { label: "Bis Monatsende", d: "eom" as const },
                      { label: "Bis Jahresende", d: "eoy" as const },
                    ].map((q) => (
                      <button
                        type="button"
                        key={q.label}
                        onClick={() => quickRange(q.d)}
                        className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold hover:border-primary hover:text-primary"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <Label>Gültig ab</Label>
                    <Input type="date" value={validFrom} onChange={(e) => setValidFrom(e.target.value)} />
                  </div>
                  <div>
                    <Label>Gültig bis</Label>
                    <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">Nach Ablauf wird das Angebot automatisch ausgeblendet. Leer lassen = unbegrenzt.</p>
              </>
            )}
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
        bio: String(form.get("bio") || "") || null,
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
          <div>
            <Label>Bio (Rückseite der Karte)</Label>
            <Textarea name="bio" rows={4} defaultValue={initial?.bio ?? ""} placeholder="z. B. Entspannter Fahrlehrer, der dich sicher & stressfrei zur Prüfung bringt." />
          </div>
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