import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { PublicationLibrary } from "@/components/PublicationLibrary";
import { publicPostsOptions } from "@/lib/posts";
import { publicationMeta } from "@/lib/publishing";
export const Route = createFileRoute("/carousels")({ head: () => publicationMeta("Study carousels", "Swipeable study posts and visual revision for UPSC, PCS and UGC NET-JRF."), loader: ({ context }) => context.queryClient.ensureQueryData(publicPostsOptions), component: Carousels });
function Carousels() { const { data } = useSuspenseQuery(publicPostsOptions); return <SiteShell><PageHero eyebrow="One idea at a time" title="Study carousels" intro="Small collections of ideas, visual notes and revision points to return to throughout your preparation." /><Section title="Visual study notes"><PublicationLibrary posts={data} kind="carousel" /></Section></SiteShell>; }