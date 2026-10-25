import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const getPublicPosts = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const url = process.env["SUPABASE_URL"];
  if (!key || !url) throw new Error("Publishing is temporarily unavailable");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from("posts").select("id,title,slug,kind,category,excerpt,body,media,youtube_id,created_at").eq("status", "published").order("created_at", { ascending: false }).limit(200);
  if (error) throw new Error("Could not load publications");
  return Promise.all((data ?? []).map(async (post) => {
    const images = await Promise.all(post.media.map(async (path) => {
      const result = await client.storage.from("publication-media").createSignedUrl(path, 3600);
      return result.data?.signedUrl.replace(url, import.meta.env["VITE_SUPABASE_URL"]) ?? "";
    }));
    return { ...post, images };
  }));
});