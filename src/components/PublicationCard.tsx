import { Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Layers, Play } from "lucide-react";
import type { PublicPost } from "@/lib/posts";
import desk from "@/assets/revision-desk.jpg";

export function PublicationCard({ post }: { post: PublicPost }) {
  const Icon = post.kind === "carousel" ? Layers : post.kind === "video" ? Play : BookOpen;
  return <article className="group min-w-0">
    <Link to="/articles/$slug" params={{ slug: post.slug }} className="block">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary"><img src={post.images[0] || desk} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" /><span className="absolute bottom-3 left-3 flex items-center gap-2 bg-background px-3 py-1 text-xs font-semibold uppercase"><Icon className="size-3.5" />{post.kind}</span></div>
      <p className="eyebrow mt-5">{post.category}</p>
      <h3 className="mt-2 flex items-start justify-between gap-3 text-3xl font-semibold leading-tight">{post.title}<ArrowUpRight className="mt-2 size-4 shrink-0 text-primary" /></h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
    </Link>
  </article>;
}