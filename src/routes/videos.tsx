import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { PublicationLibrary } from "@/components/PublicationLibrary";
import { publicPostsOptions } from "@/lib/posts";
import { publicationMeta } from "@/lib/publishing";
export const Route = createFileRoute("/videos")({ head: () => publicationMeta("Video lessons", "YouTube lessons and preparation conversations from Dr. Drishti Kalra."), loader: ({ context }) => context.queryClient.ensureQueryData(publicPostsOptions), component: Videos });
function Videos() { const { data } = useSuspenseQuery(publicPostsOptions); return <SiteShell><PageHero eyebrow="Learn with me" title="Video lessons" intro="Lessons and conversations on examination preparation, study strategy and the subjects that matter." /><Section title="Watch & learn"><PublicationLibrary posts={data} kind="video" /></Section></SiteShell>; }