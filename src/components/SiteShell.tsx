import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { links } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { usePublishingSession } from "./PublishingSession";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { whatsappEnquiry } from "@/lib/site";
import { StudyEmblem } from "./StudyEmblem";
import { MotionPage } from "./MotionPage";
import { BookOpen, Home, Layers, Play, ShoppingBag, GraduationCap, Compass, ClipboardCheck } from "lucide-react";
import greenRoom from "@/assets/green-study-room.jpg";
import revision from "@/assets/revision-desk.jpg";
import library from "@/assets/library-desk.jpg";
import { ExamIdentity } from "./ExamIdentity";

const nav = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/articles", label: "Articles", Icon: BookOpen },
  { to: "/carousels", label: "Carousels", Icon: Layers },
  { to: "/videos", label: "Videos", Icon: Play },
  { to: "/shop", label: "Shop", Icon: ShoppingBag },
  { to: "/test-series", label: "Test series", Icon: ClipboardCheck },
  { to: "/about", label: "Your mentor", Icon: GraduationCap },
  { to: "/mentorship", label: "Mentorship", Icon: Compass },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const { user } = usePublishingSession();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <span className="scroll-progress" aria-hidden="true" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="flex items-center gap-3 font-display text-xl font-semibold text-foreground md:text-2xl">
            <StudyEmblem kind="compass" tone="gold" className="brand-emblem hidden sm:inline-flex" /><span>Dr. Drishti Kalra<span className="mt-1 block font-sans text-[10px] font-medium text-muted-foreground md:text-xs">UPSC · PCS · UGC NET-JRF</span></span>
          </Link>
          <nav className="hidden gap-4 text-sm xl:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary font-semibold" }}
                activeOptions={{ exact: true }}
              >
                <n.Icon className="size-3.5" aria-hidden="true" />{n.label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="outline"><Link to={user ? "/studio" : "/auth"}>{user ? "My studio" : "Publisher sign-in"}</Link></Button>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-4 pb-3 text-xs xl:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="flex items-center gap-1 text-muted-foreground" activeProps={{ className: "text-primary font-semibold" }} activeOptions={{ exact: true }}>
              <n.Icon className="size-3" aria-hidden="true" />{n.label}
            </Link>
          ))}
        </nav>
      </header>
      <MotionPage>{children}</MotionPage>
      <section className="border-t border-border bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div><p className="eyebrow">Let’s talk about your preparation</p><h2 className="mt-3 text-3xl font-semibold">A question? A next step?</h2><p className="mt-2 text-muted-foreground">Reach me directly on WhatsApp · 9821511909</p></div>
          <Button asChild size="lg" className="w-fit"><a href={whatsappEnquiry("a preparation query")}><MessageCircle />WhatsApp your query<ArrowUpRight /></a></Button>
        </div>
      </section>
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div><p className="font-display text-2xl">Dr. Drishti Kalra</p><p className="mt-2 text-sm opacity-80">Professor. JRF qualified. Your mentor.</p></div>
          <div className="flex flex-wrap gap-6 text-sm opacity-80">
            <Link to="/journey">Credentials</Link>
            <Link to="/preparation">Study timetable & tips</Link>
            <Link to="/faqs">FAQs</Link>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:opacity-100">LinkedIn</a>
            <a href={links.whatsapp} className="hover:opacity-100">WhatsApp · 9821511909</a>
            <a href={links.telegram} target="_blank" rel="noreferrer" className="hover:opacity-100">Telegram</a>          </div>
        </div>
        <p className="border-t border-ink-foreground/15 px-6 py-4 text-center text-xs opacity-70">
          Made with Love <span aria-label="love">❤️</span> by <a href={links.builderLinkedin} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:opacity-100">Abhishek</a>
        </p>
      </footer>
    </div>
  );
}

export function Section({ eyebrow, title, children, className = "" }: { eyebrow?: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-6xl px-6 py-20 ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-4xl font-semibold md:text-5xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const image = pathname === "/articles" || pathname === "/about" ? library : pathname === "/carousels" || pathname === "/preparation" ? revision : greenRoom;
  return (
    <section className="study-page-hero relative isolate overflow-hidden border-b border-border bg-hero-surface text-hero-foreground">
      <img src={image} alt="Books and notebooks in a quiet study space" width={1600} height={1000} className="page-study-scene absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="page-study-veil absolute inset-0 -z-10" />
      <div className="page-hero-copy mx-auto max-w-6xl px-6 py-14 md:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-hero-foreground">{intro}</p>
        <div className="mt-7 flex gap-4"><ExamIdentity exam="UPSC" /><ExamIdentity exam="PCS" /><ExamIdentity exam="JRF" /></div>
      </div>
    </section>
  );
}
