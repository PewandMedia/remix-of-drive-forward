
ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS first_name text,
  ADD COLUMN IF NOT EXISTS last_name text,
  ADD COLUMN IF NOT EXISTS birth_date date,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS postal_code text,
  ADD COLUMN IF NOT EXISTS city text;

DROP POLICY IF EXISTS "Anyone submit inquiries" ON public.inquiries;
CREATE POLICY "Anyone submit inquiries" ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND (email IS NULL OR length(email) <= 320)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (message IS NULL OR length(message) <= 5000)
    AND (first_name IS NULL OR length(first_name) <= 100)
    AND (last_name IS NULL OR length(last_name) <= 100)
    AND (address IS NULL OR length(address) <= 300)
    AND (postal_code IS NULL OR length(postal_code) <= 20)
    AND (city IS NULL OR length(city) <= 120)
  );
