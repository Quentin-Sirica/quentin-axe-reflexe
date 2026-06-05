import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ApplicationSchema = z.object({
  first_name: z.string().trim().min(1).max(120),
  last_name: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  sport: z.enum(["Tennis", "Padel", "Badminton"]),
  ranking: z.string().trim().min(1).max(80),
  context: z.string().trim().min(10).max(2000),
});

export const submitProgramApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ApplicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("program_applications").insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      sport: data.sport,
      ranking: data.ranking,
      context: data.context,
    });
    if (error) {
      console.error("[program] insert failed:", error.message);
      throw new Error("Impossible d'enregistrer votre candidature. Réessayez dans un instant.");
    }
    return { ok: true as const };
  });