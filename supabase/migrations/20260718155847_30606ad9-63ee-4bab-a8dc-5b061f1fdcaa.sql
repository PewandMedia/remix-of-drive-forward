CREATE TABLE public.first_aid_dates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz,
  note text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.first_aid_dates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_aid_dates TO authenticated;
GRANT ALL ON public.first_aid_dates TO service_role;

ALTER TABLE public.first_aid_dates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active first aid dates"
  ON public.first_aid_dates FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can view all first aid dates"
  ON public.first_aid_dates FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert first aid dates"
  ON public.first_aid_dates FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update first aid dates"
  ON public.first_aid_dates FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete first aid dates"
  ON public.first_aid_dates FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_first_aid_dates_updated_at
  BEFORE UPDATE ON public.first_aid_dates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();