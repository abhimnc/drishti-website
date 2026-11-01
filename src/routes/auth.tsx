import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { usePublishingSession } from "@/components/PublishingSession";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { publicationMeta, publisherEmail } from "@/lib/publishing";
export const Route = createFileRoute("/auth")({ head: () => ({ ...publicationMeta("Publisher sign-in", "Sign in to Dr. Drishti Kalra’s publishing studio."), meta: [...publicationMeta("Publisher sign-in", "Sign in to Dr. Drishti Kalra’s publishing studio.").meta, { name: "robots", content: "noindex" }] }), component: Auth });
function Auth() {
  const { user } = usePublishingSession(); const navigate = useNavigate();
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { if (user) navigate({ to: "/studio", replace: true }); }, [user, navigate]);
  return <SiteShell><div className="mx-auto max-w-md px-6 py-16"><p className="eyebrow">Dr. Drishti Kalra</p><h1 className="mt-3 text-4xl font-semibold">Publisher sign-in</h1><form className="mt-8 space-y-5" onSubmit={async e => { e.preventDefault(); setBusy(true); setMessage(""); try {
    const { error } = await supabase.auth.signInWithPassword({ email: publisherEmail(username), password }); if (error) throw new Error(error.message === "Invalid login credentials" ? "Incorrect username or password." : error.message); navigate({ to: "/studio" });
  } catch (error) { setMessage(error instanceof Error ? error.message : "Sign-in failed"); } finally { setBusy(false); } }}><label className="block text-sm font-semibold">Username<input required autoComplete="username" autoCapitalize="none" spellCheck={false} pattern="[A-Za-z0-9._-]+" className="mt-2 w-full rounded border border-input bg-background px-3 py-3" value={username} onChange={e => setUsername(e.target.value)} /></label><label className="block text-sm font-semibold">Password<input type="password" required autoComplete="current-password" className="mt-2 w-full rounded border border-input bg-background px-3 py-3" value={password} onChange={e => setPassword(e.target.value)} /></label><Button type="submit" className="w-full" disabled={busy}>{busy ? "Please wait…" : "Sign in"}</Button></form>{message && <p role="status" className="mt-5 text-sm">{message}</p>}</div></SiteShell>;
}
