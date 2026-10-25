import { useState } from "react";
import { ArrowLeft, ArrowRight, Share2, Check } from "lucide-react";
import { Button } from "./ui/button";
import type { PublicPost } from "@/lib/posts";

export function PostReader({ post }: { post: PublicPost }) {
  const [slide, setSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  return <article className="mx-auto max-w-3xl px-6 py-14">
    <div className="flex items-center justify-between gap-4"><p className="eyebrow">{post.category} · {post.kind}</p><Button size="icon" variant="ghost" title="Share publication" aria-label="Share publication" onClick={async () => { try { if (navigator.share) await navigator.share({ title: post.title, url: window.location.href }); else { await navigator.clipboard.writeText(window.location.href); setCopied(true); } } catch { /* Sharing cancelled */ } }}>{copied ? <Check /> : <Share2 />}</Button></div>
    <h1 className="mt-5 break-words text-5xl font-semibold leading-tight md:text-6xl">{post.title}</h1>
    <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
    <p className="mt-6 border-b border-border pb-6 text-sm text-muted-foreground">Dr. Drishti Kalra · {new Date(post.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</p>
    {post.kind === "video" && <iframe className="mt-8 aspect-video w-full border-0" src={`https://www.youtube-nocookie.com/embed/${post.youtube_id}`} title={post.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />}
    {post.kind === "carousel" && <div className="mt-8"><div className="aspect-[4/5] overflow-hidden bg-secondary" onTouchStart={e => { e.currentTarget.dataset["touch"] = String(e.touches[0]?.clientX ?? 0); }} onTouchEnd={e => { const start = Number(e.currentTarget.dataset["touch"]); const end = e.changedTouches[0]?.clientX ?? start; if (start - end > 40) setSlide(s => Math.min(s + 1, post.images.length - 1)); if (end - start > 40) setSlide(s => Math.max(s - 1, 0)); }}><img src={post.images[slide]} alt={`${post.title} — slide ${slide + 1}`} className="h-full w-full object-contain" /></div><div className="mt-4 flex items-center justify-between"><Button size="icon" variant="outline" aria-label="Previous slide" disabled={slide === 0} onClick={() => setSlide(s => s - 1)}><ArrowLeft /></Button><p aria-live="polite" className="text-sm">{slide + 1} / {post.images.length}</p><Button size="icon" variant="outline" aria-label="Next slide" disabled={slide >= post.images.length - 1} onClick={() => setSlide(s => s + 1)}><ArrowRight /></Button></div></div>}
    {post.kind === "article" && post.images[0] && <img src={post.images[0]} alt={post.title} className="mt-8 max-h-[480px] w-full object-cover" />}
    <div className="article-body mt-10 space-y-5 text-lg leading-relaxed">{post.body.split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => paragraph.startsWith("## ") ? <h2 key={i} className="pt-4 text-3xl font-semibold">{paragraph.slice(3)}</h2> : paragraph.startsWith("# ") ? <h2 key={i} className="pt-4 text-4xl font-semibold">{paragraph.slice(2)}</h2> : <p key={i} className="whitespace-pre-wrap break-words">{paragraph}</p>)}</div>
  </article>;
}