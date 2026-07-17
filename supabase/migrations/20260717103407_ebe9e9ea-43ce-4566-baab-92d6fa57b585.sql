GRANT SELECT ON public.offers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.offers TO authenticated;
GRANT ALL ON public.offers TO service_role;

GRANT SELECT ON public.prices TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prices TO authenticated;
GRANT ALL ON public.prices TO service_role;

GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;

GRANT SELECT ON public.instagram_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.instagram_posts TO authenticated;
GRANT ALL ON public.instagram_posts TO service_role;

GRANT SELECT ON public.first_aid_info TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_aid_info TO authenticated;
GRANT ALL ON public.first_aid_info TO service_role;

GRANT INSERT ON public.inquiries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

DROP POLICY IF EXISTS "Public can read active offers" ON public.offers;
CREATE POLICY "Public can read active offers"
ON public.offers
FOR SELECT
TO public
USING (active = true);

DROP POLICY IF EXISTS "Public can read active prices" ON public.prices;
CREATE POLICY "Public can read active prices"
ON public.prices
FOR SELECT
TO public
USING (active = true);

DROP POLICY IF EXISTS "Public can read active team" ON public.team_members;
CREATE POLICY "Public can read active team"
ON public.team_members
FOR SELECT
TO public
USING (active = true);