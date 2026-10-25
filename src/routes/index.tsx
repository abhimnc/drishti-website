import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Send, Compass, GraduationCap, BadgeCheck, Feather, ClipboardCheck } from "lucide-react";
import { StudyEmblem } from "@/components/StudyEmblem";
import { StudyBackground } from "@/components/StudyBackground";
import { StudyProducts } from "@/components/StudyProducts";
import { SiteShell, Section } from "@/components/SiteShell";
import { MentorshipPlans } from "@/components/MentorshipPlans";
import { Button } from "@/components/ui/button";
import { examTestSeries, examTracks, formatMonthlyPrice, links, mentorshipPlans, prepTiers } from "@/lib/site";
import { CredentialsGallery } from "@/components/CredentialsGallery";
import { CountUp } from "@/components/CountUp";
import portrait from "@/assets/mentorship/mentor-portrait.jpg";
import { useSuspenseQuery } from "@tanstack/react-query";
import { publicPostsOptions } from "@/lib/posts";
import { PublicationLibrary } from "@/components/PublicationLibrary";
import { BookOpen, Layers, Play, ArrowRight as Next } from "lucide-react";
import { ExamIdentity } from "@/components/ExamIdentity";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(publicPostsOptions),
  head: () => ({ meta: [
    { title: "Dr. Drishti Kalra | UPSC, PCS & UGC NET-JRF Mentorship" },
    { name: "description", content: "Prepare with a JRF-qualified DU professor who has written UPSC Mains twice and appeared for the interview. Full Plan ₹4,500/month, Lite Plan ₹2,500/month, daily classes ₹20,000/month and a ₹300 trial session." },
    { property: "og:title", content: "Dr. Drishti Kalra — Your UPSC, PCS & NET-JRF Mentor" },
    { property: "og:description", content: "Personal mentorship, daily worksheets, test series and original NCERT & standard-book notes." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Index,
});

const credentials = [["1010", "UPSC CSE 2019 marks · Recommended"], ["2×", "UPSC Mains written"], ["JRF", "UGC NET-JRF History qualified"], ["Ph.D.", "History, University of Delhi"]] as const;
const lowestPlanPrice = Math.min(...mentorshipPlans.map((plan) => plan.monthlyPrice));
const uppcs = examTestSeries.find((exam) => exam.id === "uppcs")!;

function Index() {
  const { data: posts } = useSuspenseQuery(publicPostsOptions);
  return <SiteShell>
    <section className="illustrated-hero relative overflow-hidden bg-hero-surface text-hero-foreground">
      <StudyBackground />
      <div className="hero-intro relative z-10 mx-auto max-w-6xl px-6 pb-48 pt-12 text-center md:pb-56 md:pt-14">
        <p className="eyebrow">THE STUDY JOURNAL · UPSC · PCS · UGC NET-JRF</p>
        <h1 className="hero-heading mx-auto mt-4 max-w-3xl text-5xl font-semibold leading-[1.06] md:text-7xl">Dr. Drishti Kalra</h1>
        <p className="mx-auto mt-4 max-w-2xl font-display text-2xl font-medium md:text-3xl">Big dreams. Small daily steps.<br />A mentor beside you.</p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-hero-foreground">Two UPSC Mains attempts. An interview appearance. JRF qualified. A professor bringing that experience to your preparation.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="journey"><Link to="/mentorship"><Compass />Start your journey<ArrowRight /></Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/articles"><BookOpen />Enter the reading room</Link></Button>
        </div>
        <p className="mt-4 text-sm text-hero-foreground">Monthly mentorship from <strong>{formatMonthlyPrice(lowestPlanPrice)}</strong></p>
      </div>
      <span className="hero-flight" aria-hidden="true"><Send strokeWidth={1.5} /></span>
    </section>
    <section className="credentials-band border-b border-border" aria-label="Mentor credentials">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {credentials.map(([value, label]) => <div key={label} className="border-border px-6 py-7 md:border-r last:border-r-0"><p className="font-display text-3xl font-semibold text-primary md:text-4xl">{/^\d+$/.test(value) ? <CountUp value={Number(value)} /> : value}</p><p className="mt-2 text-sm text-muted-foreground">{label}</p></div>)}
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-0 px-6 py-10 md:grid-cols-3">{([{ to: "/articles", title: "Read & reflect", text: "Articles and preparation insights", kind: "book", tone: "sky" }, { to: "/carousels", title: "Revise visually", text: "Study ideas, slide by slide", kind: "layers", tone: "coral" }, { to: "/videos", title: "Watch & learn", text: "Lessons from my classroom", kind: "play", tone: "gold" }] as const).map(({ to, title, text, kind, tone }) => <Link key={to} to={to} className="pathway-link flex items-center gap-5 border-b border-border py-5 md:border-b-0 md:border-r md:px-6 first:pl-0 last:border-r-0"><StudyEmblem kind={kind} tone={tone} /><div><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{text}</p></div><Next className="ml-auto size-4 shrink-0" /></Link>)}</section>
    <Section eyebrow="Proof, not promises" title="Don’t take my word for it" className="pt-10">
      <p className="-mt-4 mb-10 max-w-3xl text-lg text-muted-foreground">My UPSC marksheet, PhD degree and UGC-NET JRF documents, with only personal identifiers blurred.</p>
      <CredentialsGallery compact />
      <Button asChild variant="link" className="mt-4 px-0"><Link to="/journey">My full academic journey<ArrowRight /></Link></Button>
    </Section>
    <section className="mentor-band overflow-hidden bg-hero-surface text-hero-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.75fr_1.25fr] md:items-center">
        <figure className="mentor-portrait" data-reveal="zoom"><img src={portrait} width={749} height={937} loading="lazy" alt="Dr. Drishti Kalra" className="aspect-[4/5] w-full object-cover object-top" /></figure>
        <div data-reveal="right">
          <p className="eyebrow text-gold">How 1:1 mentorship looks with me</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Coaching classes teach a room. Mentorship works on you.</h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">{["Explanatory classes, almost every day", "Nightly 1:1 check-ins", "Daily answer writing, checked", "Doubts cleared the same evening", "Plans that fit a job or college", "Test series & daily worksheets"].map((item) => <li key={item} className="flex gap-3"><BadgeCheck className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />{item}</li>)}</ul>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" variant="journey"><Link to="/mentorship">See real mentee examples<ArrowRight /></Link></Button></div>
        </div>
      </div>
    </section>
    <Section eyebrow="The reading room" title="Fresh from my desk" className="pt-16"><PublicationLibrary posts={posts} compact /><div className="mt-7"><Button asChild variant="link" className="px-0"><Link to="/articles">All articles<ArrowRight /></Link></Button></div></Section>
    <Section eyebrow="Your examination. Your journey." title="Mentorship for the path you choose">
      <div className="grid gap-8 md:grid-cols-3">
        {examTracks.map((track, i) => <article key={track.name} className="border-t-2 border-primary pt-6"><ExamIdentity exam={i === 0 ? "UPSC" : i === 1 ? "PCS" : "JRF"} /><p className="mt-6 text-sm text-muted-foreground">0{i + 1} / {track.detail}</p><h3 className="mt-4 text-3xl font-semibold">{track.name}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{track.description}</p><Button asChild variant="link" className="mt-5 px-0"><Link to="/mentorship">Explore mentorship<ArrowRight /></Link></Button></article>)}
      </div>
    </Section>
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div><p className="text-sm opacity-80">FROM MY DESK TO YOURS</p><h2 className="mt-4 text-4xl font-semibold">Good preparation needs<br />more than a reading list.</h2></div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-7">{[["Daily worksheets", "Practice as you prepare."], ["Test series", "Put your preparation to the test."], ["My NCERT notes", "A foundation for your reading."], ["Standard-book notes", "My own notes for your study."]].map(([t, d]) => <div key={t} className="border-t border-primary-foreground/30 pt-4"><h3 className="text-xl font-semibold">{t}</h3><p className="mt-2 text-sm opacity-80">{d}</p></div>)}</div>
      </div>
    </section>
    <Section eyebrow="Programmes & fees" title="Choose the support you need"><MentorshipPlans /></Section>
    <Section eyebrow="Notes & focused mentorship" title="From my notebooks to your preparation"><StudyProducts /></Section>
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <Link to="/test-series" className="test-series-teaser group grid gap-6 rounded-sm bg-ink p-8 text-ink-foreground md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div><p className="flex items-center gap-2 text-xs font-semibold uppercase text-gold"><ClipboardCheck className="size-4" aria-hidden="true" />{uppcs.exam} · EPFO</p><h2 className="mt-3 text-3xl font-semibold md:text-4xl">Test series: 12 full-length mocks + 75 sectional tests</h2><p className="mt-3 opacity-80">Plans from {formatMonthlyPrice(Math.min(...prepTiers.map((tier) => tier.price)))}, one-time payment. {uppcs.offer && <>Complete UPPCS test series now <strong className="text-gold">{formatMonthlyPrice(uppcs.offer.price)}</strong>.</>}</p></div>
        <span className="flex items-center gap-2 font-semibold text-gold">Choose your prep plan<ArrowRight className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" /></span>
      </Link>
    </section>
    <section className="border-y border-border bg-card"><div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2"><div><p className="eyebrow">The preparation notebook</p><h2 className="mt-3 text-4xl font-semibold">Find your study rhythm</h2><p className="mt-4 text-muted-foreground">A practical daily template, with room for learning, revision, practice and rest.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/preparation">Study timetable & tips<ArrowRight /></Link></Button></div><div className="border-t border-border pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0"><p className="eyebrow">Before you begin</p><h2 className="mt-3 text-4xl font-semibold">A little clarity helps</h2><p className="mt-4 text-muted-foreground">Programme fees, notes and what to expect from mentorship.</p><Button asChild variant="link" className="mt-4 px-0"><Link to="/faqs">Read the FAQs<ArrowRight /></Link></Button></div></div></section>
    <section className="border-t border-border bg-secondary"><div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between"><div><h2 className="text-3xl font-semibold">Stay connected with me</h2><p className="mt-2 text-muted-foreground">Notes, preparation updates and a conversation about your next step.</p></div><div className="flex flex-wrap gap-3"><Button asChild size="lg"><a href={links.whatsapp}>WhatsApp · 9821511909<ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg"><a href={links.telegram} target="_blank" rel="noreferrer">Join Telegram<ArrowUpRight /></a></Button></div></div></section>
  </SiteShell>;
}
