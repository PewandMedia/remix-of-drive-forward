GRANT SELECT ON public.first_aid_dates TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_aid_dates TO authenticated;
GRANT ALL ON public.first_aid_dates TO service_role;