import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { PublicationLibrary } from "@/components/PublicationLibrary";
import { publicPostsOptions } from "@/lib/posts";
import { publicationMeta } from "@/lib/publishing";
export const Route = createFileRoute("/articles")({ head: () => publicationMeta("The reading room", "Articles, preparation guides and study insights for UPSC, State PCS and UGC NET-JRF."), loader: ({ context }) => context.queryClient.ensureQueryData(publicPostsOptions), component: Articles });
function Articles() { const { data } = useSuspenseQuery(publicPostsOptions); return <SiteShell><PageHero eyebrow="Read · Reflect · Revise" title="The reading room" intro="Preparation insights, ideas worth revisiting and a professor’s perspective on your examination journey." /><Section title="Articles & study insights"><PublicationLibrary posts={data} kind="article" /></Section></SiteShell>; }