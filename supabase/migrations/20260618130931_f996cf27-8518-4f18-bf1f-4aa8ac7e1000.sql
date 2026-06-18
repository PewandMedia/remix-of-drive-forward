ALTER TABLE public.offers
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS headline text,
  ADD COLUMN IF NOT EXISTS subline text,
  ADD COLUMN IF NOT EXISTS price_blocks jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS extra_line text,
  ADD COLUMN IF NOT EXISTS valid_from timestamptz,
  ADD COLUMN IF NOT EXISTS valid_until timestamptz,
  ADD COLUMN IF NOT EXISTS show_on_home boolean NOT NULL DEFAULT true;

ALTER TABLE public.offers ALTER COLUMN title DROP NOT NULL;
ALTER TABLE public.offers ALTER COLUMN short_desc DROP NOT NULL;