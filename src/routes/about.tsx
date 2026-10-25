import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/SiteShell";
import { awards, competencies, expertise, languages } from "@/lib/site";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CredentialsGallery } from "@/components/CredentialsGallery";
import portrait from "@/assets/mentorship/mentor-portrait.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Meet Your Mentor — Dr. Drishti Kalra | Professor & JRF Qualified" },
      { name: "description", content: "Meet Dr. Drishti Kalra: DU professor, JRF qualified, two UPSC Mains attempts and one interview appearance. Your mentor for UPSC, PCS and UGC NET-JRF." },
      { property: "og:title", content: "Your Mentor — Dr. Drishti Kalra" },
      { property: "og:description", content: "A professor and JRF-qualified mentor with first-hand UPSC Mains and interview experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Your mentor"
        title="Dr. Drishti Kalra"
        intro="Assistant Professor at Shivaji College, University of Delhi. JRF qualified. Two UPSC Mains attempts and an interview appearance. I bring both academic experience and an aspirant’s perspective to your preparation."
      />
      <Section eyebrow="A little about me" title="I know what it means to be an aspirant">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <figure className="mentor-portrait" data-reveal="zoom"><img src={portrait} width={749} height={937} alt="Dr. Drishti Kalra" className="aspect-[4/5] w-full object-cover object-top" /></figure>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>I have written UPSC Mains twice and appeared for the interview; in Civil Services 2019 I scored 1010 marks and was recommended by UPSC. I am also JRF qualified in History and hold a PhD from the University of Delhi. My mentorship now supports UPSC, State PCS and UGC NET-JRF aspirants.</p>
            <p>As a professor, I work with students in the classroom; as a mentor, I bring my own examination experience to your preparation, with nightly check-ins, daily answer writing checked line by line and a timetable built around your day.</p>
            <div className="flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/mentorship">View programmes & fees</Link></Button><Button asChild size="lg" variant="outline"><Link to="/journey">See my documents</Link></Button></div>
          </div>
        </div>
      </Section>
      <Section eyebrow="Proof, not promises" title="My marksheet & certificates" className="pt-0"><CredentialsGallery compact /></Section>
      <Section eyebrow="Academic background" title="Teaching & research experience" className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {expertise.map(([h, items]) => (
            <div key={h} className="rounded-sm border border-border bg-card p-8">
              <h3 className="text-2xl font-semibold text-primary">{h}</h3>
              <ul className="mt-4 space-y-2">{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {competencies.map((c) => <span key={c} className="rounded-full border border-border bg-secondary px-4 py-2 text-sm">{c}</span>)}
        </div>
      </Section>
      <Section eyebrow="Languages" title="Five languages, one voice" className="pt-0">
        <div className="divide-y divide-border border-y border-border">
          {languages.map(([l, d]) => (
            <div key={l} className="grid gap-2 py-5 md:grid-cols-[200px_1fr]">
              <p className="font-display text-2xl font-semibold">{l}</p>
              <p className="text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Recognition</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Honours & awards</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {awards.map(([t, d]) => (
              <div key={t} className="border-t border-accent pt-5">
                <h3 className="text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm opacity-75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
