
CREATE POLICY "team bucket public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'team');
CREATE POLICY "team bucket admin insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'team' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "team bucket admin update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'team' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "team bucket admin delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'team' AND public.has_role(auth.uid(),'admin'));
