import { createFileRoute } from "@tanstack/react-router";
import { getPublicPosts } from "@/lib/posts.functions";
import { siteUrl } from "@/lib/site";

const pages = ["/", "/mentorship", "/test-series", "/shop", "/articles", "/carousels", "/videos", "/journey", "/about", "/preparation", "/faqs"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = await getPublicPosts().catch(() => []);
        const urls = [
          ...pages.map((path) => `<url><loc>${siteUrl}${path === "/" ? "" : path}</loc></url>`),
          ...posts.filter((p) => p.kind === "article").map((p) => `<url><loc>${siteUrl}/articles/${p.slug}</loc><lastmod>${p.created_at.slice(0, 10)}</lastmod></url>`),
        ];
        return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`, {
          headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
        });
      },
    },
  },
});
