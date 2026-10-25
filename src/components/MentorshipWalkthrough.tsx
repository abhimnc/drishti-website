import { mentorshipWalkthrough } from "@/lib/study-guidance";
import checkIn from "@/assets/mentorship/nightly-check-in.jpg";
import timetable from "@/assets/mentorship/weekly-timetable.jpg";
import voiceNote from "@/assets/mentorship/voice-note-doubts.jpg";
import evaluation from "@/assets/mentorship/answer-evaluation.jpg";
import notes from "@/assets/mentorship/notes-handwritten.jpg";
import correction from "@/assets/mentorship/notes-correction.jpg";
import liveClass from "@/assets/mentorship/live-class.jpg";

type Step = (typeof mentorshipWalkthrough)[number];

const proof: Partial<Record<Step["id"], { src: string; width: number; height: number }[]>> = {
  "nightly-check-in": [{ src: checkIn, width: 604, height: 480 }],
  "weekly-timetable": [{ src: timetable, width: 476, height: 480 }],
  "voice-note-doubts": [{ src: voiceNote, width: 627, height: 480 }],
  "answer-evaluation": [{ src: evaluation, width: 462, height: 462 }],
  "notes-review": [{ src: notes, width: 457, height: 397 }, { src: correction, width: 419, height: 191 }],
  "live-class": [{ src: liveClass, width: 704, height: 474 }],
};

function StepText({ step, index }: { step: Step; index: number }) {
  return <div>
    <div className="flex items-center gap-3"><span className="step-number">{index + 1}</span>{step.plan && <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase">{step.plan}</span>}</div>
    <h3 className="mt-5 text-3xl font-semibold md:text-4xl">{step.title}</h3>
    <p className="mt-2 text-lg text-muted-foreground">{step.lead}</p>
    <p className="mt-5 text-xs font-semibold uppercase text-primary">How it works</p>
    <p className="mt-1 leading-relaxed">{step.how}</p>
    <p className="mt-4 text-xs font-semibold uppercase text-primary">Why it matters</p>
    <p className="mt-1 leading-relaxed text-muted-foreground">{step.why}</p>
  </div>;
}

export function MentorshipWalkthrough() {
  const illustrated = mentorshipWalkthrough.filter((step) => proof[step.id]);
  const brief = mentorshipWalkthrough.filter((step) => !proof[step.id]);
  return <div>
    <div className="space-y-20">
      {illustrated.map((step, i) => {
        const flip = i % 2 === 1;
        return <div key={step.id} className="grid gap-10 md:grid-cols-2 md:items-center">
          <figure className={`proof-figure ${flip ? "md:order-2" : ""}`} data-reveal={flip ? "right" : "left"}>
            <div className="flex flex-wrap items-start gap-3">
              {proof[step.id]!.map((image) => <img key={image.src} src={image.src} width={image.width} height={image.height} loading="lazy" alt={`${step.caption}, shared from Dr. Drishti Kalra's mentorship with personal details hidden`} className="proof-shot h-auto max-w-full flex-1 basis-[45%] border-2 border-gold object-contain shadow-lg" />)}
            </div>
            <figcaption className="mt-3 inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase">{step.caption}</figcaption>
          </figure>
          <div className={flip ? "md:order-1" : ""} data-reveal={flip ? "left" : "right"}><StepText step={step} index={i} /></div>
        </div>;
      })}
    </div>
    <div className="mt-20 grid gap-x-10 gap-y-12 border-t border-border pt-12 md:grid-cols-2">
      {brief.map((step, i) => <article key={step.id}><StepText step={step} index={illustrated.length + i} /></article>)}
    </div>
  </div>;
}
