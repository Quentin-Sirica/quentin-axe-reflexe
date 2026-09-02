import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadSchema = z.object({
  first_name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  sport: z.enum(["Tennis", "Padel", "Badminton"]),
  ranking: z.string().trim().max(80).optional().nullable(),
  dominant_profile: z.number().int().min(1).max(9),
  profile_scores: z.record(z.string(), z.number().int().min(0).max(50)),
  answers: z.record(z.string(), z.array(z.number().int().min(0).max(10)).max(10)),
});

export const submitEnneagrammeLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => LeadSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("enneagramme_leads").insert({
      first_name: data.first_name,
      email: data.email.toLowerCase(),
      sport: data.sport,
      ranking: data.ranking ?? null,
      dominant_profile: data.dominant_profile,
      profile_scores: data.profile_scores,
      answers: data.answers,
    });
    if (error) {
      console.error("[enneagramme] insert failed:", error.message);
      throw new Error("Impossible d'enregistrer votre profil. Réessayez dans un instant.");
    }

    const { sendLeadEmail, leadEmailHtml, leadRow } = await import("@/lib/lead-email.server");
    await sendLeadEmail(
      `Nouveau test ennéagramme — ${data.first_name} (profil ${data.dominant_profile})`,
      leadEmailHtml(
        "Nouveau lead — test ennéagramme",
        leadRow("Prénom", data.first_name) +
          leadRow("Email", data.email.toLowerCase()) +
          leadRow("Sport", data.sport) +
          leadRow("Classement", data.ranking) +
          leadRow("Profil dominant", `Profil ${data.dominant_profile}`) +
          leadRow("Scores", JSON.stringify(data.profile_scores)),
      ),
    );

    return { ok: true as const };
  });
