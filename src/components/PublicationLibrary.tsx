import { useState } from "react";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { PublicPost } from "@/lib/posts";
import { PublicationCard } from "./PublicationCard";
import { Button } from "./ui/button";

export function PublicationLibrary({ posts, kind, compact = false }: { posts: PublicPost[]; kind?: string; compact?: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All topics");
  const kinds = posts.filter(p => !kind || p.kind === kind);
  const categories = ["All topics", ...new Set(kinds.map(p => p.category))];
  const filtered = kinds.filter(p => (category === "All topics" || p.category === category) && `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    {!compact && <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6"><div className="flex flex-wrap gap-2">{categories.map(c => <Button key={c} variant={category === c ? "default" : "ghost"} onClick={() => setCategory(c)}>{c}</Button>)}</div><label className="flex w-full items-center gap-2 border-b border-border py-2 sm:w-72"><Search className="size-4 text-muted-foreground" /><input aria-label="Search publications" className="w-full bg-transparent text-sm outline-none" placeholder="Search the reading room…" value={search} onChange={e => setSearch(e.target.value)} /></label></div>}
    {filtered.length ? <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{(compact ? filtered.slice(0, 3) : filtered).map(post => <PublicationCard key={post.id} post={post} />)}</div> : <div className="flex flex-col items-start gap-4 border-y border-border py-10"><BookOpen className="size-7 text-primary" /><h3 className="text-3xl">{search || category !== "All topics" ? "No matching publications" : "A new chapter begins here"}</h3><p className="max-w-xl text-muted-foreground">{search ? "Try another topic or search term." : "Articles, study carousels and video lessons from Dr. Drishti Kalra will appear here as they are published."}</p><Button asChild variant="link" className="px-0"><Link to="/mentorship">Explore notes & mentorship<ArrowRight /></Link></Button></div>}
  </>;
}