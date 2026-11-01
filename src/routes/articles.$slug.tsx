import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PostReader } from "@/components/PostReader";
import { publicPostsOptions } from "@/lib/posts";
import { publicationMeta } from "@/lib/publishing";
import { siteUrl } from "@/lib/site";
export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ context, params }) => { const posts = await context.queryClient.ensureQueryData(publicPostsOptions); const post = posts.find(p => p.slug === params.slug); if (!post) throw notFound(); return post; },
  head: ({ loaderData }) => {
    const base = publicationMeta(loaderData?.title ?? "Publication unavailable", loaderData?.excerpt ?? "Read publications from Dr. Drishti Kalra.");
    if (!loaderData) return base;
    return {
      meta: [...base.meta.filter((m) => !("property" in m && m.property === "og:type")), { property: "og:type", content: "article" }, { property: "article:published_time", content: loaderData.created_at }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: loaderData.title, description: loaderData.excerpt, datePublished: loaderData.created_at, articleSection: loaderData.category, author: { "@type": "Person", name: "Dr. Drishti Kalra", url: siteUrl }, mainEntityOfPage: `${siteUrl}/articles/${loaderData.slug}` }) }],
    };
  },
  component: Article,
});
function Article() { const post = Route.useLoaderData(); return <SiteShell><PostReader post={post} /></SiteShell>; }