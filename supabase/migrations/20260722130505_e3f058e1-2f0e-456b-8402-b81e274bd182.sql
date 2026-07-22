
CREATE TABLE public.filiale_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filiale_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  kicker TEXT,
  caption TEXT,
  alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.filiale_photos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.filiale_photos TO authenticated;
GRANT ALL ON public.filiale_photos TO service_role;

ALTER TABLE public.filiale_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active filiale photos"
  ON public.filiale_photos FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can read all filiale photos"
  ON public.filiale_photos FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert filiale photos"
  ON public.filiale_photos FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update filiale photos"
  ON public.filiale_photos FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete filiale photos"
  ON public.filiale_photos FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_filiale_photos_updated_at
  BEFORE UPDATE ON public.filiale_photos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Public can read filiale bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'filiale');

CREATE POLICY "Admins can upload to filiale bucket"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'filiale' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update filiale bucket"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'filiale' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'filiale' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete from filiale bucket"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'filiale' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO public.filiale_photos (filiale_id, image_url, kicker, caption, alt, sort_order) VALUES
  ('rathaus', '/media/filiale-aussen.jpg',  'Filiale',   'Außenansicht',        'Fahrschule MIRO-DRIVE Bochum Rathaus – Außenansicht der Filiale', 1),
  ('rathaus', '/media/theorieraum.jpg',     'Unterricht','Theorieraum',         'MIRO-DRIVE Bochum Rathaus – moderner Theorieraum mit Großbildschirm', 2),
  ('rathaus', '/media/empfang.jpg',         'Willkommen','Empfang & Beratung',  'MIRO-DRIVE Bochum Rathaus – Empfang und Beratungsbereich', 3),
  ('riemke',  '/media/riemke-aussen.jpg',      'Filiale',    'Außenansicht',       'Fahrschule MIRO-DRIVE Bochum Riemke – Außenansicht mit FAHRSCHULE-Schriftzug', 1),
  ('riemke',  '/media/riemke-lounge.jpg',      'Willkommen', 'Wartebereich',       'MIRO-DRIVE Bochum Riemke – gemütlicher Wartebereich mit Couchtisch', 2),
  ('riemke',  '/media/riemke-empfang.jpg',     'Beratung',   'Empfang & Beratung', 'MIRO-DRIVE Bochum Riemke – Empfangstisch mit Visitenkarten', 3),
  ('riemke',  '/media/riemke-weihnachten.jpg', 'Atmosphäre', 'Unser Team-Spirit',  'MIRO-DRIVE Bochum Riemke – Roll-up Banner mit weihnachtlicher Dekoration', 4),
  ('autos',   '/media/autos/auto-vogelperspektive.jpg', 'Fahrzeug',   'Vogelperspektive', 'MIRO-DRIVE Fahrschulwagen von oben mit Logo auf der Motorhaube', 1),
  ('autos',   '/media/autos/auto-2.jpg',               'Fahrzeug',   'Heckansicht',      'MIRO-DRIVE Fahrschulwagen Heckansicht', 2),
  ('autos',   '/media/autos/auto-5.jpg',               'Fahrpraxis', 'Auf der Straße',   'MIRO-DRIVE Fahrschulauto während der Fahrstunde im Tunnel', 3);
