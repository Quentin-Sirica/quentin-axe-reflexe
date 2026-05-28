
-- 1. Roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. Program applications
CREATE TABLE public.program_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  sport TEXT NOT NULL,
  ranking TEXT NOT NULL,
  context TEXT NOT NULL
);

GRANT INSERT ON public.program_applications TO anon, authenticated;
GRANT SELECT ON public.program_applications TO authenticated;
GRANT ALL ON public.program_applications TO service_role;

ALTER TABLE public.program_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
ON public.program_applications FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can read applications"
ON public.program_applications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. Enneagramme leads — add admin read policy (insert via service role already works)
ALTER TABLE public.enneagramme_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read enneagramme leads"
ON public.enneagramme_leads FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT ON public.enneagramme_leads TO authenticated;
