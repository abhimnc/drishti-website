import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const SessionContext = createContext<{ user: User | null; ready: boolean }>({ user: null, ready: false });
export const usePublishingSession = () => useContext(SessionContext);
export function PublishingSession({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => { if (mounted) { setUser(data.user); setReady(true); } });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED", "INITIAL_SESSION", "PASSWORD_RECOVERY"].includes(event)) return;
      setUser(session?.user ?? null); setReady(true);
      if (event === "INITIAL_SESSION") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => { mounted = false; data.subscription.unsubscribe(); };
  }, [router, queryClient]);
  return <SessionContext.Provider value={{ user, ready }}>{children}</SessionContext.Provider>;
}