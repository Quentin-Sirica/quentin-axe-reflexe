import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  checkIsAdmin,
  listProgramApplications,
  listEnneagrammeLeads,
} from "@/lib/admin.functions";
import {
  listTestimonialsAdmin,
  upsertTestimonial,
  deleteTestimonial,
  uploadTestimonialPhoto,
} from "@/lib/testimonials.functions";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    try {
      const res = await checkIsAdmin();
      if (!res.isAdmin) throw redirect({ to: "/login" });
    } catch (e) {
      if (e && typeof e === "object" && "to" in e) throw e;
      throw redirect({ to: "/login" });
    }
  },
  component: AdminPage,
});

type ProgramApp = {
  id: string;
  created_at: string;
  first_name: string;
  email: string;
  sport: string;
  ranking: string;
  context: string;
};

type Lead = {
  id: string;
  created_at: string;
  first_name: string;
  email: string;
  sport: string;
  ranking: string | null;
  dominant_profile: number;
  profile_scores: Record<string, number>;
};

function downloadCSV(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function AdminPage() {
  const navigate = useNavigate();
  const fetchApps = useServerFn(listProgramApplications);
  const fetchLeads = useServerFn(listEnneagrammeLeads);

  const appsQ = useQuery({ queryKey: ["admin", "program"], queryFn: () => fetchApps() });
  const leadsQ = useQuery({ queryKey: ["admin", "enneagramme"], queryFn: () => fetchLeads() });

  const [search, setSearch] = useState("");

  const filteredApps = useMemo(() => {
    const list = (appsQ.data?.applications ?? []) as ProgramApp[];
    if (!search) return list;
    const s = search.toLowerCase();
    return list.filter((a) =>
      [a.first_name, a.email, a.sport, a.ranking, a.context].some((v) => v?.toLowerCase().includes(s))
    );
  }, [appsQ.data, search]);

  const filteredLeads = useMemo(() => {
    const list = (leadsQ.data?.leads ?? []) as Lead[];
    if (!search) return list;
    const s = search.toLowerCase();
    return list.filter((a) =>
      [a.first_name, a.email, a.sport, a.ranking ?? ""].some((v) => v?.toLowerCase().includes(s))
    );
  }, [leadsQ.data, search]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Admin</div>
            <h1 className="font-display text-2xl sm:text-3xl mt-1">Leads</h1>
          </div>
          <div className="flex items-center gap-3">
            <input
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              onClick={onLogout}
              className="font-mono text-[10px] uppercase tracking-[0.25em] border border-border rounded-md px-3 py-2 hover:border-foreground/40"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <Tabs defaultValue="program">
          <TabsList>
            <TabsTrigger value="program">
              Programme{appsQ.data ? ` (${appsQ.data.applications.length})` : ""}
            </TabsTrigger>
            <TabsTrigger value="enneagramme">
              Profil Mental{leadsQ.data ? ` (${leadsQ.data.leads.length})` : ""}
            </TabsTrigger>
            <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
          </TabsList>

          <TabsContent value="program" className="mt-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => downloadCSV("candidatures-programme.csv", filteredApps)}
                disabled={filteredApps.length === 0}
                className="text-sm border border-border rounded-md px-3 py-2 hover:border-foreground/40 disabled:opacity-50"
              >
                Exporter CSV
              </button>
            </div>
            {appsQ.isLoading ? (
              <p className="text-muted-foreground text-sm">Chargement…</p>
            ) : appsQ.error ? (
              <p className="text-destructive text-sm">{(appsQ.error as Error).message}</p>
            ) : filteredApps.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune candidature.</p>
            ) : (
              <div className="space-y-3">
                {filteredApps.map((a) => (
                  <details key={a.id} className="bg-card border border-border rounded-md p-4 group">
                    <summary className="cursor-pointer flex flex-wrap items-baseline gap-x-4 gap-y-1 list-none">
                      <span className="font-display text-lg">{a.first_name}</span>
                      <span className="text-sm text-primary">{a.email}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {a.sport} · {a.ranking}
                      </span>
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {new Date(a.created_at).toLocaleString("fr-FR")}
                      </span>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                        Objectif / contexte
                      </div>
                      <p className="text-sm whitespace-pre-wrap text-foreground/90">{a.context}</p>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="enneagramme" className="mt-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() =>
                  downloadCSV(
                    "leads-profil-mental.csv",
                    filteredLeads.map((l) => ({
                      ...l,
                      profile_scores: JSON.stringify(l.profile_scores),
                    }))
                  )
                }
                disabled={filteredLeads.length === 0}
                className="text-sm border border-border rounded-md px-3 py-2 hover:border-foreground/40 disabled:opacity-50"
              >
                Exporter CSV
              </button>
            </div>
            {leadsQ.isLoading ? (
              <p className="text-muted-foreground text-sm">Chargement…</p>
            ) : leadsQ.error ? (
              <p className="text-destructive text-sm">{(leadsQ.error as Error).message}</p>
            ) : filteredLeads.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun lead.</p>
            ) : (
              <div className="overflow-x-auto bg-card border border-border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted/20">
                    <tr className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Prénom</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Sport</th>
                      <th className="px-4 py-3">Classement</th>
                      <th className="px-4 py-3">Profil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((l) => (
                      <tr key={l.id} className="border-t border-border">
                        <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                          {new Date(l.created_at).toLocaleString("fr-FR")}
                        </td>
                        <td className="px-4 py-3">{l.first_name}</td>
                        <td className="px-4 py-3 text-primary">{l.email}</td>
                        <td className="px-4 py-3">{l.sport}</td>
                        <td className="px-4 py-3">{l.ranking ?? "—"}</td>
                        <td className="px-4 py-3 font-semibold">Type {l.dominant_profile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <TestimonialsAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

type AdminTestimonial = {
  id: string;
  quote: string;
  name: string;
  progress: string | null;
  sport: string | null;
  photo_url: string | null;
  photo_signed_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

const emptyForm = {
  id: "" as string,
  quote: "",
  name: "",
  progress: "",
  sport: "",
  photo_url: "" as string,
  sort_order: 0,
  is_published: true,
};

function TestimonialsAdmin() {
  const qc = useQueryClient();
  const list = useServerFn(listTestimonialsAdmin);
  const upsert = useServerFn(upsertTestimonial);
  const remove = useServerFn(deleteTestimonial);
  const upload = useServerFn(uploadTestimonialPhoto);

  const q = useQuery({ queryKey: ["admin", "testimonials"], queryFn: () => list() });
  const items = (q.data?.testimonials ?? []) as AdminTestimonial[];

  const [form, setForm] = useState({ ...emptyForm });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const reset = () => {
    setForm({ ...emptyForm });
    setPhotoPreview(null);
    setErr(null);
  };

  const startEdit = (t: AdminTestimonial) => {
    setForm({
      id: t.id,
      quote: t.quote,
      name: t.name,
      progress: t.progress ?? "",
      sport: t.sport ?? "",
      photo_url: t.photo_url ?? "",
      sort_order: t.sort_order,
      is_published: t.is_published,
    });
    setPhotoPreview(t.photo_signed_url);
    setErr(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onFile = async (file: File) => {
    setBusy(true);
    setErr(null);
    try {
      const buf = await file.arrayBuffer();
      let bin = "";
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
      const data_base64 = btoa(bin);
      const res = await upload({
        data: { filename: file.name, content_type: file.type || "image/jpeg", data_base64 },
      });
      setForm((f) => ({ ...f, photo_url: res.path }));
      setPhotoPreview(URL.createObjectURL(file));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Échec de l'upload");
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      await upsert({
        data: {
          id: form.id || undefined,
          quote: form.quote,
          name: form.name,
          progress: form.progress || null,
          sport: form.sport || null,
          photo_url: form.photo_url || null,
          sort_order: Number(form.sort_order) || 0,
          is_published: form.is_published,
        },
      });
      await qc.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      await qc.invalidateQueries({ queryKey: ["public-testimonials"] });
      reset();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Erreur");
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    setBusy(true);
    try {
      await remove({ data: { id } });
      await qc.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      await qc.invalidateQueries({ queryKey: ["public-testimonials"] });
      if (form.id === id) reset();
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary";

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
      <form onSubmit={onSubmit} className="bg-card border border-border rounded-md p-5 space-y-3 h-fit">
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {form.id ? "Modifier" : "Nouveau témoignage"}
        </div>

        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
            {photoPreview ? (
              <img src={photoPreview} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[10px] text-muted-foreground">Photo</span>
            )}
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block mb-1">Photo (médaillon)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onFile(f);
              }}
              className="text-xs"
              disabled={busy}
            />
            {form.photo_url && (
              <button
                type="button"
                onClick={() => {
                  setForm((f) => ({ ...f, photo_url: "" }));
                  setPhotoPreview(null);
                }}
                className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-destructive"
              >
                Retirer
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Nom affiché</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
            placeholder="Marc L."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Évolution / objectif</label>
            <input
              value={form.progress}
              onChange={(e) => setForm({ ...form, progress: e.target.value })}
              className={inputCls}
              placeholder="30/1 → 15/5"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Sport</label>
            <input
              value={form.sport}
              onChange={(e) => setForm({ ...form, sport: e.target.value })}
              className={inputCls}
              placeholder="Tennis"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Verbatim</label>
          <textarea
            required
            rows={5}
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            className={inputCls}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <label className="text-xs text-muted-foreground block mb-1">Ordre d'affichage</label>
            <input
              type="number"
              min={0}
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              className={inputCls}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
            />
            Publié sur le site
          </label>
        </div>

        {err && <p className="text-destructive text-xs">{err}</p>}

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={busy}
            className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-display disabled:opacity-50"
          >
            {form.id ? "Enregistrer" : "Créer"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={reset}
              className="border border-border rounded-md px-4 py-2 text-sm hover:border-foreground/40"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {q.isLoading ? (
          <p className="text-muted-foreground text-sm">Chargement…</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucun témoignage.</p>
        ) : (
          items.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-md p-4 flex gap-4">
              <div className="h-14 w-14 shrink-0 rounded-full overflow-hidden border border-border bg-muted/30">
                {t.photo_signed_url ? (
                  <img src={t.photo_signed_url} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-display">{t.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
                    {[t.progress, t.sport].filter(Boolean).join(" · ")}
                  </span>
                  {!t.is_published && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-destructive">
                      Brouillon
                    </span>
                  )}
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">#{t.sort_order}</span>
                </div>
                <p className="mt-2 text-sm text-foreground/80 italic line-clamp-3">"{t.quote}"</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => startEdit(t)}
                    className="text-xs border border-border rounded-md px-3 py-1 hover:border-foreground/40"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-xs border border-border rounded-md px-3 py-1 hover:border-destructive hover:text-destructive"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}