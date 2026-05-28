import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  checkIsAdmin,
  listProgramApplications,
  listEnneagrammeLeads,
} from "@/lib/admin.functions";
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
        </Tabs>
      </div>
    </main>
  );
}