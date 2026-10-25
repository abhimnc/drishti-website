import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PostReader } from "@/components/PostReader";
import { publicPostsOptions } from "@/lib/posts";
import { publicationMeta } from "@/lib/publishing";
export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ context, params }) => { const posts = await context.queryClient.ensureQueryData(publicPostsOptions); const post = posts.find(p => p.slug === params.slug); if (!post) throw notFound(); return post; },
  head: ({ loaderData }) => publicationMeta(loaderData?.title ?? "Publication unavailable", loaderData?.excerpt ?? "Read publications from Dr. Drishti Kalra."),
  component: Article,
});
function Article() { const post = Route.useLoaderData(); return <SiteShell><PostReader post={post} /></SiteShell>; }