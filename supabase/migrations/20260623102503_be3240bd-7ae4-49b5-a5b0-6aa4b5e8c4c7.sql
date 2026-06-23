ALTER TABLE public.prices
  ADD COLUMN IF NOT EXISTS old_price text,
  ADD COLUMN IF NOT EXISTS offer_label text,
  ADD COLUMN IF NOT EXISTS offer_active boolean NOT NULL DEFAULT false;