import { createServerFn } from "@tanstack/react-start";
import { serverPublicClient } from "./public-data.server";

export const getActivePrices = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { data, error } = await supabase
    .from("prices")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getHomePrices = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { data, error } = await supabase
    .from("prices")
    .select("category,title,price,old_price,offer_label,offer_note,offer_active,offer_valid_from,offer_valid_until")
    .eq("active", true);
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getActiveTeamMembers = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getTeamPreview = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id,name,role,image_url,description,sort_order")
    .eq("active", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getFirstAidInfo = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { data, error } = await supabase
    .from("first_aid_info")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1);
  if (error) throw new Error(error.message);
  return data?.[0] ?? null;
});

export const hasActiveOffer = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { count, error } = await supabase
    .from("prices")
    .select("id", { count: "exact", head: true })
    .eq("active", true)
    .eq("offer_active", true);
  if (error) throw new Error(error.message);
  return (count ?? 0) > 0;
});

export const getUpcomingFirstAidDates = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("first_aid_dates")
    .select("id,starts_at,ends_at,note")
    .eq("active", true)
    .gte("starts_at", nowIso)
    .order("starts_at", { ascending: true })
    .limit(6);
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getActiveInstagramPosts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = serverPublicClient();
  const { data, error } = await supabase
    .from("instagram_posts")
    .select("id,image_url,post_url,caption,sort_order")
    .eq("active", true)
    .order("sort_order", { ascending: true })
    .limit(6);
  if (error) throw new Error(error.message);
  return data ?? [];
});
