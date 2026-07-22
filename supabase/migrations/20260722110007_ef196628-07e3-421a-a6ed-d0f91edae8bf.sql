
CREATE TABLE public.location_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  day_label text NOT NULL,
  time_label text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.location_hours TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.location_hours TO authenticated;
GRANT ALL ON public.location_hours TO service_role;

ALTER TABLE public.location_hours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read location hours"
  ON public.location_hours FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert location hours"
  ON public.location_hours FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update location hours"
  ON public.location_hours FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete location hours"
  ON public.location_hours FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_location_hours_updated_at
  BEFORE UPDATE ON public.location_hours
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.location_hours (location_id, sort_order, day_label, time_label) VALUES
  ('bochum-zentrum', 0, 'Di. – Do.', '14:00 – 20:00'),
  ('bochum-zentrum', 1, 'Fr.', '14:00 – 18:00'),
  ('bochum-zentrum', 2, 'Sa. – Mo.', 'geschlossen'),
  ('bochum-riemke', 0, 'Di. – Do.', '14:00 – 20:00'),
  ('bochum-riemke', 1, 'Fr.', '14:00 – 18:00'),
  ('bochum-riemke', 2, 'Sa. – Mo.', 'geschlossen');
