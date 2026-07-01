ALTER TABLE public.prices 
  ADD COLUMN IF NOT EXISTS offer_valid_from timestamptz,
  ADD COLUMN IF NOT EXISTS offer_valid_until timestamptz;