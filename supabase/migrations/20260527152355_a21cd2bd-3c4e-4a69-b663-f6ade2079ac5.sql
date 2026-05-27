
CREATE TABLE public.enneagramme_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  sport TEXT NOT NULL,
  ranking TEXT,
  dominant_profile SMALLINT NOT NULL CHECK (dominant_profile BETWEEN 1 AND 9),
  profile_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb
);

GRANT ALL ON public.enneagramme_leads TO service_role;

ALTER TABLE public.enneagramme_leads ENABLE ROW LEVEL SECURITY;

-- No public policies: writes go through a server function using the service role.
CREATE INDEX enneagramme_leads_created_at_idx ON public.enneagramme_leads (created_at DESC);
CREATE INDEX enneagramme_leads_email_idx ON public.enneagramme_leads (email);
