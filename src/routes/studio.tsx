import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { PublisherStudio } from "@/components/PublisherStudio";
import { publicationMeta } from "@/lib/publishing";
export const Route = createFileRoute("/studio")({ head: () => ({ ...publicationMeta("Publishing studio", "Manage articles, study carousels and videos."), meta: [...publicationMeta("Publishing studio", "Manage articles, study carousels and videos.").meta, { name: "robots", content: "noindex" }] }), component: Studio });
function Studio() { return <SiteShell><div className="mx-auto max-w-6xl px-6 py-10"><PublisherStudio /></div></SiteShell>; }