-- MIRO-DRIVE Supabase Schema Reset & Rebuild
-- Achtung: Löscht ALLE bestehenden Tabellen/Enums/Funktionen im public-Schema.

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT CREATE ON SCHEMA public TO service_role;

-- =====================================================
-- Enums
-- =====================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.inquiry_status AS ENUM ('neu', 'in_bearbeitung', 'erledigt');
CREATE TYPE public.inquiry_type AS ENUM ('kontakt', 'anmeldung', 'angebot', 'erste_hilfe', 'sonstiges');

-- =====================================================
-- Tables
-- =====================================================
CREATE TABLE public.first_aid_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  price TEXT,
  duration TEXT,
  dates TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.inquiry_type NOT NULL DEFAULT 'kontakt',
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  license_class TEXT,
  first_aid_interest BOOLEAN NOT NULL DEFAULT false,
  contact_pref TEXT,
  message TEXT,
  status public.inquiry_status NOT NULL DEFAULT 'neu',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.instagram_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  post_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/miro_drive/',
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  short_desc TEXT,
  items TEXT[] NOT NULL DEFAULT '{}',
  price_label TEXT,
  button_text TEXT NOT NULL DEFAULT 'Angebot anfragen',
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  image_url TEXT,
  headline TEXT,
  subline TEXT,
  price_blocks JSONB NOT NULL DEFAULT '[]',
  extra_line TEXT,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  show_on_home BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE public.prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  old_price TEXT,
  offer_label TEXT,
  offer_active BOOLEAN NOT NULL DEFAULT false,
  offer_valid_from TIMESTAMP WITH TIME ZONE,
  offer_valid_until TIMESTAMP WITH TIME ZONE,
  offer_note TEXT
);

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  bio TEXT
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- =====================================================
-- Grants
-- =====================================================
GRANT SELECT ON public.first_aid_info TO anon, authenticated;
GRANT ALL ON public.first_aid_info TO service_role;

GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

GRANT SELECT ON public.instagram_posts TO anon, authenticated;
GRANT ALL ON public.instagram_posts TO service_role;

GRANT SELECT ON public.offers TO anon, authenticated;
GRANT ALL ON public.offers TO service_role;

GRANT SELECT ON public.prices TO anon, authenticated;
GRANT ALL ON public.prices TO service_role;

GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT ALL ON public.team_members TO service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

-- =====================================================
-- RLS
-- =====================================================
ALTER TABLE public.first_aid_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Functions
-- =====================================================
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =====================================================
-- Triggers
-- =====================================================
CREATE TRIGGER update_first_aid_info_updated_at
  BEFORE UPDATE ON public.first_aid_info
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_instagram_posts_updated_at
  BEFORE UPDATE ON public.instagram_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_prices_updated_at
  BEFORE UPDATE ON public.prices
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================
-- Policies
-- =====================================================

-- first_aid_info
CREATE POLICY "Public can read first aid info"
  ON public.first_aid_info FOR SELECT
  TO public USING (true);

CREATE POLICY "Admins manage first aid"
  ON public.first_aid_info FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- inquiries
CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries FOR INSERT
  TO public WITH CHECK (
    length(name) >= 1 AND length(name) <= 200 AND
    (email IS NULL OR length(email) <= 320) AND
    (phone IS NULL OR length(phone) <= 50) AND
    (message IS NULL OR length(message) <= 5000)
  );

CREATE POLICY "Admins read inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update inquiries"
  ON public.inquiries FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete inquiries"
  ON public.inquiries FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- instagram_posts
CREATE POLICY "Public can view active instagram posts"
  ON public.instagram_posts FOR SELECT
  TO public USING (active = true);

CREATE POLICY "Admins can manage instagram posts"
  ON public.instagram_posts FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- offers
CREATE POLICY "Public can read active offers"
  ON public.offers FOR SELECT
  TO public USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage offers"
  ON public.offers FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- prices
CREATE POLICY "Public can read active prices"
  ON public.prices FOR SELECT
  TO public USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage prices"
  ON public.prices FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- team_members
CREATE POLICY "Public can read active team"
  ON public.team_members FOR SELECT
  TO public USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage team"
  ON public.team_members FOR ALL
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
