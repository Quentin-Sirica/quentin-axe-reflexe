import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type PublicTestimonial = {
  id: string;
  quote: string;
  name: string;
  progress: string | null;
  sport: string | null;
  photo_url: string | null;
};

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error("Erreur de vérification du rôle.");
  if (!data) throw new Error("Forbidden: admin role required.");
}

async function signPhoto(path: string | null): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const { data, error } = await supabaseAdmin
    .storage.from("testimonials")
    .createSignedUrl(path, 60 * 60 * 24 * 365);
  if (error || !data) return null;
  return data.signedUrl;
}

export const listPublicTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("testimonials")
    .select("id, quote, name, progress, sport, photo_url")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  const items: PublicTestimonial[] = await Promise.all(
    (data ?? []).map(async (t) => ({
      id: t.id,
      quote: t.quote,
      name: t.name,
      progress: t.progress,
      sport: t.sport,
      photo_url: await signPhoto(t.photo_url),
    })),
  );
  return { testimonials: items };
});

export const listTestimonialsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    const items = await Promise.all(
      (data ?? []).map(async (t) => ({
        ...t,
        photo_signed_url: await signPhoto(t.photo_url),
      })),
    );
    return { testimonials: items };
  });

const UpsertSchema = z.object({
  id: z.string().uuid().optional(),
  quote: z.string().trim().min(1).max(2000),
  name: z.string().trim().min(1).max(200),
  progress: z.string().trim().max(120).optional().nullable(),
  sport: z.string().trim().max(80).optional().nullable(),
  photo_url: z.string().trim().max(500).optional().nullable(),
  sort_order: z.number().int().min(0).max(9999).optional(),
  is_published: z.boolean().optional(),
});

export const upsertTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpsertSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const payload = {
      quote: data.quote,
      name: data.name,
      progress: data.progress ?? null,
      sport: data.sport ?? null,
      photo_url: data.photo_url ?? null,
      sort_order: data.sort_order ?? 0,
      is_published: data.is_published ?? true,
    };
    if (data.id) {
      const { error } = await supabaseAdmin
        .from("testimonials")
        .update(payload)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const, id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("testimonials")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true as const, id: inserted.id };
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { data: row } = await supabaseAdmin
      .from("testimonials")
      .select("photo_url")
      .eq("id", data.id)
      .maybeSingle();
    if (row?.photo_url && !row.photo_url.startsWith("http")) {
      await supabaseAdmin.storage.from("testimonials").remove([row.photo_url]);
    }
    const { error } = await supabaseAdmin.from("testimonials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const uploadTestimonialPhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => {
    const schema = z.object({
      filename: z.string().min(1).max(200),
      content_type: z.string().min(1).max(100),
      data_base64: z.string().min(1),
    });
    return schema.parse(input);
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const bytes = Uint8Array.from(atob(data.data_base64), (c) => c.charCodeAt(0));
    const ext = (data.filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${crypto.randomUUID()}.${ext || "jpg"}`;
    const { error } = await supabaseAdmin.storage
      .from("testimonials")
      .upload(path, bytes, { contentType: data.content_type, upsert: false });
    if (error) throw new Error(error.message);
    return { path };
  });