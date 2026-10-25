import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Minus, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { examTestSeries, formatMonthlyPrice, prepTierFeatures, prepTiers, whatsappEnquiry } from "@/lib/site";

type Exam = (typeof examTestSeries)[number];

const examDay = (date: string) => new Date(`${date}T00:00:00+05:30`);
const formatExamDate = (date: string) => examDay(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

// Days left depends on the visitor's clock, so it is only shown after hydration.
function useDaysLeft(date: string | null) {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    if (date) setDays(Math.ceil((examDay(date).getTime() - Date.now()) / 86_400_000));
  }, [date]);
  return days;
}

function OfferBanner({ exam }: { exam: Exam }) {
  const days = useDaysLeft(exam.examDate);
  if (!exam.offer || (days !== null && days <= 0)) return null;
  return <div className="offer-banner mt-8 grid gap-8 rounded-sm bg-ink p-7 text-ink-foreground md:grid-cols-[1fr_1.1fr] md:p-9" data-reveal="zoom">
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase text-gold"><Timer className="size-4" aria-hidden="true" />Limited-time offer{days !== null && ` · ${days} days to the exam`}</p>
      <h4 className="mt-3 text-3xl font-semibold">{exam.offer.name}</h4>
      <p className="mt-4 flex items-baseline gap-3"><s className="text-2xl opacity-60">{formatMonthlyPrice(exam.offer.was)}</s><span className="offer-price font-sans text-5xl font-semibold text-gold">{formatMonthlyPrice(exam.offer.price)}</span></p>
      <p className="mt-2 text-sm opacity-80">English + Hindi medium · हिंदी माध्यम में भी उपलब्ध</p>
      <Button asChild size="lg" variant="journey" className="mt-6"><a href={exam.registerUrl} target="_blank" rel="noreferrer">Register for {formatMonthlyPrice(exam.offer.price)}<ArrowUpRight /></a></Button>
    </div>
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">{exam.offer.inclusions.map(([value, label]) => <li key={label} className="rounded-sm border border-ink-foreground/20 p-4"><p className="font-display text-3xl font-semibold text-gold">{value}</p><p className="mt-1 text-sm opacity-80">{label}</p></li>)}</ul>
  </div>;
}

export function ExamTestSeries() {
  return <div className="space-y-24">
    {examTestSeries.map((exam) => <div key={exam.id}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          {exam.examDate && <p className="flex items-center gap-2 text-sm font-medium text-primary"><CalendarDays className="size-4" aria-hidden="true" />Exam on {formatExamDate(exam.examDate)}</p>}
          <h3 className="mt-3 text-4xl font-semibold">{exam.exam}</h3>
          <p className="mt-3 text-lg text-muted-foreground">{exam.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">{exam.highlights.map((item) => <li key={item} className="rounded-full border border-border px-3 py-1 text-sm">{item}</li>)}</ul>
        </div>
        <Button asChild size="lg"><a href={exam.registerUrl} target="_blank" rel="noreferrer">Register now<ArrowUpRight /></a></Button>
      </div>
      <OfferBanner exam={exam} />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {prepTiers.map((tier, i) => {
          const featured = tier.id === "full-run";
          return <article key={tier.id} className={`plan-card relative flex flex-col rounded-sm border p-7 ${featured ? "plan-featured border-primary bg-hero-surface text-hero-foreground" : "border-border bg-card"}`}>
            {featured && <span className="plan-ribbon absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase text-foreground">Most complete</span>}
            <h4 className="text-2xl font-semibold">{tier.name}</h4>
            <p className={`mt-2 text-sm ${featured ? "opacity-85" : "text-muted-foreground"}`}>{tier.summary}</p>
            <p className="mt-6 font-sans text-4xl font-semibold">{formatMonthlyPrice(tier.price)}</p>
            <p className={`text-sm ${featured ? "opacity-80" : "text-muted-foreground"}`}>One-time payment</p>
            <ul className="mb-7 mt-6 space-y-2.5 text-sm">{prepTierFeatures.map(([feature, included]) => <li key={feature} className={`flex gap-2.5 ${included[i] ? "" : "opacity-50"}`}>{included[i] ? <Check className={`size-4 shrink-0 ${featured ? "text-gold" : "text-primary"}`} aria-label="Included" /> : <Minus className="size-4 shrink-0" aria-label="Not included" />}{feature}</li>)}</ul>
            <Button asChild variant={featured ? "journey" : "outline"} className="mt-auto w-full"><a href={exam.registerUrl} target="_blank" rel="noreferrer">Choose {tier.name}<ArrowUpRight /></a></Button>
          </article>;
        })}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">Registration opens a Google Form where you choose your plan; payment details are inside the form. Questions? <a className="text-primary underline underline-offset-4" href={whatsappEnquiry(`the ${exam.exam} test series`)}>Ask me on WhatsApp</a>.</p>
    </div>)}
  </div>;
}
