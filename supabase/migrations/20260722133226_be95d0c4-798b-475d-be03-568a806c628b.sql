
ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS contract_url TEXT,
  ADD COLUMN IF NOT EXISTS contract_sent_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS contract_error TEXT;

-- Storage policies for contracts bucket (admins can read; service role writes bypass RLS)
CREATE POLICY "Admins can read contracts"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'contracts'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);
