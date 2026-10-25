import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/SiteShell";
import { formatMonthlyPrice, links, studyProducts, upiId, whatsappEnquiry } from "@/lib/site";
import { examTracks } from "@/lib/site";
import { MentorshipPlans, PlanComparison, TrialSession } from "@/components/MentorshipPlans";
import { MentorshipWalkthrough } from "@/components/MentorshipWalkthrough";
import { StudyProducts } from "@/components/StudyProducts";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import answerEvaluation from "@/assets/mentorship/answer-evaluation.jpg";

export const Route = createFileRoute("/mentorship")({
  head: () => ({
    meta: [
      { title: "1:1 Mentorship, Notes & Answer Writing | Dr. Drishti Kalra" },
      { name: "description", content: "UPSC 1:1 mentorship: Full Plan ₹4,500/month, Lite Plan ₹2,500/month, ₹300 trial session. History optional mentorship ₹3,000/month. See real examples of check-ins, timetables and evaluated answers." },
      { property: "og:title", content: "How 1:1 mentorship looks with Dr. Drishti Kalra" },
      { property: "og:description", content: "Nightly check-ins, explanatory classes almost every day, daily answer writing checked line by line." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mentorship,
});

const historyOptional = studyProducts.find((product) => product.id === "history-optional")!;
const joinSteps = ["Message me on WhatsApp to book the Full Plan, Lite Plan or a trial.", "We fix a start date and map your weekly availability.", "Your timetable arrives, and nightly sessions begin."];

function Mentorship() {
  return (
    <SiteShell>
      <PageHero eyebrow="For UPSC aspirants · fresher or fourth attempt" title="How 1:1 mentorship looks with me" intro="Everyone says “1:1 mentorship.” Almost nobody shows you what it actually means. Here are the ten things I do for every aspirant I mentor, with real, anonymised examples from my mentees." />
      <Section eyebrow="Two plans, one mentor" title="Pick your pace">
        <p className="-mt-4 mb-10 max-w-3xl text-lg text-muted-foreground">Preparation runs on momentum. With a class only every few days, doubts and gaps pile up in between. That is why I recommend the Full Plan.</p>
        <MentorshipPlans />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <PlanComparison />
          <TrialSession />
        </div>
      </Section>
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow">Real examples from my mentees</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Ten things I do for every aspirant</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">Most aspirants do not fail for lack of material. They fail because nobody is watching the day-to-day. Coaching classes teach a room. Mentorship works on you.</p>
          <div className="mt-14"><MentorshipWalkthrough /></div>
        </div>
      </section>
      <Section eyebrow="UPSC Mains · History optional" title="History optional mentorship">
        <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <p className="text-lg text-muted-foreground">History optional is rarely lost for lack of reading. It is lost in the answer sheet. This Mains-first programme is built around one habit: writing every single day.</p>
            <ul className="mt-6 space-y-3">{["Weekly timetable with a Mains question every day", "One answer written and evaluated every day, with marks", "A full 1-hour 1:1 session on video every week", "No worksheets: your daily practice is the answer you write"].map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul>
            <p className="mt-7"><span className="font-sans text-4xl font-semibold">{formatMonthlyPrice(historyOptional.price)}</span><span className="ml-2 text-muted-foreground">/ month · just {formatMonthlyPrice(Math.round(historyOptional.price / 30))} a day</span></p>
            <p className="mt-4 text-sm text-muted-foreground">To join, pay to UPI <strong className="text-foreground">{upiId}</strong> and send the screenshot on WhatsApp to 9821511909. We then fix your start date and weekly session slot.</p>
            <Button asChild size="lg" className="mt-6"><a href={whatsappEnquiry(historyOptional.name)}>Join History optional mentorship<ArrowUpRight /></a></Button>
          </div>
          <figure data-reveal="zoom"><img src={answerEvaluation} width={462} height={462} loading="lazy" alt="A History Mains answer evaluated by Dr. Drishti Kalra, with examiner remarks in the margin" className="proof-shot mx-auto w-full max-w-md border-2 border-gold shadow-lg" /><figcaption className="mt-3 text-center text-sm text-muted-foreground">Sample of how I evaluate an answer</figcaption></figure>
        </div>
      </Section>
      <Section eyebrow="One mentor, few seats" title="Start this month" className="pt-0">
        <ol className="grid gap-6 md:grid-cols-3">{joinSteps.map((step, i) => <li key={step} className="border-t-2 border-primary pt-5" data-reveal><span className="step-number">{i + 1}</span><p className="mt-4 text-lg">{step}</p></li>)}</ol>
        <div className="mt-10 flex flex-wrap gap-3"><Button asChild size="lg"><a href={links.whatsapp}>WhatsApp · 9821511909<ArrowUpRight /></a></Button><Button asChild variant="outline" size="lg"><a href={links.telegram} target="_blank" rel="noreferrer">Join Telegram<ArrowUpRight /></a></Button><Button asChild variant="link" size="lg"><Link to="/journey">See my credentials<ArrowRight /></Link></Button></div>
      </Section>
      <Section eyebrow="Notes & focused support" title="Choose your next step" className="pt-0"><StudyProducts /></Section>
      <Section eyebrow="Your examination" title="A personal approach to preparation" className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          {examTracks.map((track) => (
            <div key={track.name} className="border-t border-primary pt-6">
              <h3 className="text-3xl font-semibold text-primary">{track.name}</h3>
              <p className="mt-3 text-muted-foreground">{track.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
