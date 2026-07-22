
-- RLS policies for instagram storage bucket
CREATE POLICY "Public read instagram bucket"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'instagram');

CREATE POLICY "Admins insert instagram bucket"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'instagram' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update instagram bucket"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'instagram' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete instagram bucket"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'instagram' AND has_role(auth.uid(), 'admin'::app_role));

-- Seed current hardcoded posts so admin can manage them
INSERT INTO public.instagram_posts (image_url, caption, post_url, sort_order, active) VALUES
  ('/images/insta/bestanden-neu-1.jpg', 'Frisch bestanden bei MIRO-DRIVE', 'https://www.instagram.com/miro_drive/', 1, true),
  ('/images/insta/bestanden-neu-2.jpg', 'Frisch bestanden bei MIRO-DRIVE', 'https://www.instagram.com/miro_drive/', 2, true),
  ('/images/insta/bestanden-neu-3.jpg', 'Frisch bestanden bei MIRO-DRIVE', 'https://www.instagram.com/miro_drive/', 3, true),
  ('/images/insta/bestanden-neu-4.jpg', 'Frisch bestanden bei MIRO-DRIVE', 'https://www.instagram.com/miro_drive/', 4, true);
