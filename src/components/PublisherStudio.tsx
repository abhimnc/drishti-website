import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Save, Send, Trash2, ArrowUp, ArrowDown, X, Upload, LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { postSchema, slugify, youtubeId, type PostInput } from "@/lib/publishing";
import { usePublishingSession } from "./PublishingSession";
import { Button } from "./ui/button";
import { PostReader } from "./PostReader";

const emptyPost = (): PostInput => ({ title: "", slug: "", kind: "article", category: "UPSC", excerpt: "", body: "", media: [], youtube_id: "", status: "draft" });
const field = "w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
export function PublisherStudio() {
  const { user, ready } = usePublishingSession();
  const cache = useQueryClient();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostInput>(emptyPost);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [preview, setPreview] = useState(false);
  const role = useQuery({ queryKey: ["publisher-role", user?.id], enabled: !!user, queryFn: async () => {
    const { data, error } = await supabase.rpc("has_role", { _user_id: user?.id ?? "", _role: "admin" });
    if (error) throw error; return data;
  } });
  const listing = useQuery({ queryKey: ["studio-posts", user?.id], enabled: role.data === true, queryFn: async () => {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (error) throw error; return data;
  } });
  useEffect(() => {
    let active = true;
    Promise.all(post.media.map(async path => { const { data } = await supabase.storage.from("publication-media").createSignedUrl(path, 3600); return data?.signedUrl ?? ""; })).then(urls => { if (active) setImages(urls); });
    return () => { active = false; };
  }, [post.media]);
  const save = useMutation({ mutationFn: async (status: "draft" | "published") => {
    const checked = postSchema.safeParse({ ...post, status });
    if (!checked.success) throw new Error(checked.error.issues[0]?.message ?? "Check your publication");
    const { id, ...values } = checked.data;
    const payload = { ...values, updated_at: new Date().toISOString() };
    const response = id ? await supabase.from("posts").update(payload).eq("id", id).select().single() : await supabase.from("posts").insert(payload).select().single();
    if (response.error) throw new Error(response.error.code === "23505" ? "That address is already used. Change the article address." : response.error.message);
    return response.data;
  }, onSuccess: data => { setPost(postSchema.parse(data)); setMessage(data.status === "published" ? "Published — now visible in the reading room." : "Draft saved."); cache.invalidateQueries({ queryKey: ["studio-posts"] }); cache.invalidateQueries({ queryKey: ["public-posts"] }); }, onError: error => setMessage(error.message) });
  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true); setMessage("");
    const paths: string[] = [];
    try {
      if (post.media.length + files.length > 20) throw new Error("A post can contain up to 20 images.");
      for (const file of Array.from(files)) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024) throw new Error("Choose JPG, PNG or WebP images under 10 MB.");
        const path = `${user?.id}/${crypto.randomUUID()}.${file.type.split("/")[1]}`;
        const { error } = await supabase.storage.from("publication-media").upload(path, file);
        if (error) throw error;
        paths.push(path);
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed"); }
    finally { setPost(p => ({ ...p, media: [...p.media, ...paths] })); setUploading(false); }
  }
  async function removePost() {
    if (!post.id || !window.confirm("Delete this publication?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) { setMessage(error.message); return; }
    setPost(emptyPost()); setMessage("Publication deleted."); cache.invalidateQueries({ queryKey: ["studio-posts"] }); cache.invalidateQueries({ queryKey: ["public-posts"] });
  }
  if (!ready || role.isLoading) return <p className="py-20">Opening your studio…</p>;
  if (!user) return <div className="py-20"><h2 className="text-4xl">Your publishing studio</h2><Button className="mt-6" onClick={() => navigate({ to: "/auth" })}>Sign in to publish</Button></div>;
  if (!role.data) return <div className="py-20"><h2 className="text-4xl">Publisher access required</h2><p className="mt-4 text-muted-foreground">This account does not have editing permission.</p><Button className="mt-5" variant="outline" onClick={async () => { await cache.cancelQueries(); cache.clear(); await supabase.auth.signOut(); navigate({ to: "/auth", replace: true }); }}>Switch account</Button></div>;
  return <>
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6"><div><p className="eyebrow">From your desk</p><h1 className="mt-2 text-4xl font-semibold">Publishing studio</h1></div><Button variant="outline" onClick={async () => { await cache.cancelQueries(); cache.clear(); await supabase.auth.signOut(); navigate({ to: "/auth", replace: true }); }}><LogOut />Sign out</Button></div>
    <div className="grid gap-10 py-8 lg:grid-cols-[240px_1fr]">
      <aside><Button className="mb-6 w-full" onClick={() => { setPost(emptyPost()); setPreview(false); setMessage(""); }}><Plus />New publication</Button><div className="space-y-2">{listing.data?.map(p => <Button key={p.id} variant={post.id === p.id ? "secondary" : "ghost"} className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => { setPost({ ...p, kind: p.kind as PostInput["kind"], status: p.status as PostInput["status"] }); setMessage(""); setPreview(false); }}><span><span className="block">{p.title}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{p.kind} · {p.status}</span></span></Button>)}</div>{listing.error && <p role="alert">Could not load publications.</p>}</aside>
      <div className="min-w-0"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><div className="flex gap-1">{(["article", "carousel", "video"] as const).map(kind => <Button key={kind} variant={post.kind === kind ? "default" : "ghost"} onClick={() => setPost(p => ({ ...p, kind }))}>{kind.charAt(0).toUpperCase() + kind.slice(1)}</Button>)}</div><Button variant="outline" onClick={() => setPreview(p => !p)}>{preview ? "Edit" : "Preview"}</Button></div>
      {preview ? <PostReader key={`${post.id}-${post.kind}`} post={{ ...post, id: post.id ?? "preview", created_at: new Date().toISOString(), images }} /> : <div className="space-y-5">
        <label className="block text-sm font-semibold">Title<input className={`${field} mt-2`} value={post.title} onChange={e => { const title = e.target.value; setPost(p => ({ ...p, title, slug: p.id ? p.slug : slugify(title) })); }} /></label>
        <div className="grid gap-5 md:grid-cols-2"><label className="block text-sm font-semibold">Article address<input className={`${field} mt-2`} value={post.slug} onChange={e => setPost(p => ({ ...p, slug: e.target.value }))} /></label><label className="block text-sm font-semibold">Topic<select className={`${field} mt-2`} value={post.category} onChange={e => setPost(p => ({ ...p, category: e.target.value }))}>{["UPSC", "State PCS", "UGC NET-JRF", "History", "Answer writing", "Preparation strategy", "Current affairs"].map(c => <option key={c}>{c}</option>)}</select></label></div>
        <label className="block text-sm font-semibold">Short introduction<textarea rows={3} className={`${field} mt-2`} value={post.excerpt} onChange={e => setPost(p => ({ ...p, excerpt: e.target.value }))} /></label>
        {post.kind === "video" && <label className="block text-sm font-semibold">YouTube link<input className={`${field} mt-2`} defaultValue={post.youtube_id ? `https://www.youtube.com/watch?v=${post.youtube_id}` : ""} key={post.id ?? "new"} placeholder="https://www.youtube.com/watch?v=…" onChange={e => setPost(p => ({ ...p, youtube_id: youtubeId(e.target.value) }))} /></label>}
        <label className="block text-sm font-semibold">{post.kind === "article" ? "Article" : "Caption & notes"}<textarea rows={post.kind === "article" ? 16 : 5} className={`${field} mt-2 font-sans`} value={post.body} onChange={e => setPost(p => ({ ...p, body: e.target.value }))} /></label>
        <div><div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold">{post.kind === "carousel" ? "Slides" : "Cover images"}</p><Button asChild variant="outline" disabled={uploading}><label className="cursor-pointer"><Upload />{uploading ? "Uploading…" : "Add images"}<input aria-label="Upload publication images" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploading} onChange={e => { upload(e.target.files); e.target.value = ""; }} /></label></Button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{post.media.map((path, i) => <div key={path} className="overflow-hidden border border-border"><img src={images[i]} alt={`Slide ${i + 1}`} className="aspect-[4/5] w-full object-contain bg-secondary" /><div className="flex justify-between p-1"><Button size="icon" variant="ghost" aria-label={`Move slide ${i + 1} earlier`} disabled={i === 0} onClick={() => setPost(p => { const media = [...p.media]; const current = media[i]; const previous = media[i - 1]; if (current === undefined || previous === undefined) return p; media[i - 1] = current; media[i] = previous; return { ...p, media }; })}><ArrowUp /></Button><Button size="icon" variant="ghost" aria-label={`Move slide ${i + 1} later`} disabled={i === post.media.length - 1} onClick={() => setPost(p => { const media = [...p.media]; const current = media[i]; const next = media[i + 1]; if (current === undefined || next === undefined) return p; media[i] = next; media[i + 1] = current; return { ...p, media }; })}><ArrowDown /></Button><Button size="icon" variant="ghost" aria-label={`Remove slide ${i + 1}`} onClick={() => setPost(p => ({ ...p, media: p.media.filter(m => m !== path) }))}><X /></Button></div></div>)}</div></div>
      </div>}
      {message && <p role="status" className="mt-5 border-l-2 border-primary pl-3 text-sm">{message}</p>}
      <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6"><Button variant="outline" disabled={save.isPending || uploading} onClick={() => save.mutate("draft")}><Save />{post.status === "published" ? "Unpublish & save draft" : "Save draft"}</Button><Button disabled={save.isPending || uploading} onClick={() => save.mutate("published")}><Send />{save.isPending ? "Saving…" : post.status === "published" ? "Update publication" : "Publish"}</Button>{post.id && <Button variant="ghost" size="icon" title="Delete publication" aria-label="Delete publication" onClick={removePost}><Trash2 /></Button>}</div>
      </div>
    </div>
  </>;
}