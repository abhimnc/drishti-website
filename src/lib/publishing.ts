import { z } from "zod";

export const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens"),
  kind: z.enum(["article", "carousel", "video"]),
  category: z.string().trim().min(1).max(80),
  excerpt: z.string().max(600),
  body: z.string().max(100000),
  media: z.array(z.string()).max(20),
  youtube_id: z.string(),
  status: z.enum(["draft", "published"]),
}).superRefine((post, ctx) => {
  if (post.status !== "published") return;
  if (post.kind === "article" && !post.body.trim()) ctx.addIssue({ code: "custom", message: "Add your article before publishing" });
  if (post.kind === "carousel" && post.media.length < 2) ctx.addIssue({ code: "custom", message: "Add at least two slides before publishing" });
  if (post.kind === "video" && !/^[a-zA-Z0-9_-]{11}$/.test(post.youtube_id)) ctx.addIssue({ code: "custom", message: "Add a valid YouTube video link" });
});
export type PostInput = z.infer<typeof postSchema>;
export function youtubeId(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    if (url.hostname === "youtu.be") return /^[\w-]{11}$/.test(url.pathname.slice(1)) ? url.pathname.slice(1) : "";
    if (!["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname)) return "";
    const id = url.searchParams.get("v") ?? url.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{11})/)?.[1] ?? "";
    return /^[\w-]{11}$/.test(id) ? id : "";
  } catch { return ""; }
}
export function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
export function publicationMeta(title: string, description: string) {
  return { meta: [{ title: `${title} | Dr. Drishti Kalra` }, { name: "description", content: description }, { property: "og:title", content: `${title} — Dr. Drishti Kalra` }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
}// The single publisher signs in with a username; Supabase auth stores it as this non-deliverable address.
export const publisherEmail = (username: string) => `${username.trim().toLowerCase()}@publisher.invalid`;
