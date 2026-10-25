import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { sampleTimetable, topperTips } from "@/lib/study-guidance";
import library from "@/assets/library-desk.jpg";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/preparation")({
  head: () => ({ meta: [
    { title: "Study Timetable & Preparation Tips | Dr. Drishti Kalra" },
    { name: "description", content: "An adaptable study timetable for UPSC, PCS and UGC NET-JRF aspirants, plus sourced UPSC topper tips on tests, answer writing and interview preparation." },
    { property: "og:title", content: "Build a sustainable study routine — Dr. Drishti Kalra" },
    { property: "og:description", content: "Plan your preparation around focused study, revision, practice and rest." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Preparation,
});

function Preparation() {
  return <SiteShell>
    <PageHero eyebrow="The preparation notebook" title="A rhythm for your preparation" intro="A useful plan is one you can return to. Make space for understanding, revision, practice—and a life beyond your desk." />
    <Section eyebrow="Illustrative daily plan" title="Your timetable, not a race">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div><img src={library} alt="An open notebook and books on a study desk" width={1600} height={1008} className="aspect-[4/3] w-full object-cover" loading="lazy" /><p className="mt-5 leading-relaxed text-muted-foreground">This is a sample full-time preparation day, not a topper’s timetable or a class schedule. Adjust the hours for work, college, family commitments and your examination stage.</p><p className="mt-4 leading-relaxed text-muted-foreground">If you have fewer hours, keep a shorter core-subject block plus revision and question practice. Review your progress each week before adding more hours.</p></div>
        <div className="border-t border-border">{sampleTimetable.map(slot => <div key={slot.time} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[130px_1fr]"><p className="text-sm font-semibold text-primary">{slot.time}</p><div><h3 className="text-xl font-semibold">{slot.activity}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{slot.detail}</p></div></div>)}</div>
      </div>
    </Section>
    <section className="border-t border-border bg-secondary"><div className="mx-auto max-w-6xl px-6 py-16"><p className="eyebrow">Lessons from topper interviews</p><h2 className="mt-3 text-4xl font-semibold md:text-5xl">Borrow the principle. Build your own routine.</h2><p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">These are paraphrased UPSC preparation insights, not direct quotes or endorsements of my mentorship. The sample timetable above is our own illustrative template, not a schedule attributed to these toppers.</p><div className="mt-10 grid gap-8 md:grid-cols-3">{topperTips.map(tip => <article key={tip.name} className="flex flex-col border-t-2 border-primary pt-5"><p className="text-sm font-semibold text-primary">{tip.name}</p><p className="mt-1 text-xs text-muted-foreground">{tip.credential}</p><h3 className="mt-5 text-2xl font-semibold">{tip.title}</h3><p className="mb-5 mt-3 leading-relaxed text-muted-foreground">{tip.tip}</p><Button asChild variant="link" className="mt-auto h-auto justify-start whitespace-normal px-0 text-left"><a href={tip.url} target="_blank" rel="noreferrer">{tip.source}<ArrowUpRight className="shrink-0" /></a></Button></article>)}</div></div></section>
  </SiteShell>;
}