import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/_bootstrap-admin")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const email = "davhuin@gmail.com";
        const password = "AxeReflexe2026!";

        let userId: string | null = null;
        const created = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });
        if (created.error) {
          // user might already exist — look it up
          const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
          if (listErr) return new Response(JSON.stringify({ error: listErr.message }), { status: 500 });
          const existing = list.users.find((u) => u.email?.toLowerCase() === email);
          if (!existing) return new Response(JSON.stringify({ error: created.error.message }), { status: 500 });
          userId = existing.id;
          // reset password too
          await supabaseAdmin.auth.admin.updateUserById(existing.id, { password, email_confirm: true });
        } else {
          userId = created.data.user?.id ?? null;
        }
        if (!userId) return new Response(JSON.stringify({ error: "no user id" }), { status: 500 });

        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
        if (roleErr) return new Response(JSON.stringify({ error: roleErr.message }), { status: 500 });

        return new Response(JSON.stringify({ ok: true, userId }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});