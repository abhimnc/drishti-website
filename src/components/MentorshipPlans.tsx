import { ArrowUpRight, Check, Minus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMonthlyPrice, mentorshipPlans, planComparison, trialSession, whatsappEnquiry } from "@/lib/site";

export function MentorshipPlans() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {mentorshipPlans.map((plan) => {
        const featured = plan.id === "mentorship";
        return <article key={plan.id} className={`plan-card relative flex flex-col rounded-sm border p-7 md:p-9 ${featured ? "plan-featured border-primary bg-hero-surface text-hero-foreground" : "border-border bg-card"}`}>
          {featured && <span className="plan-ribbon absolute -top-3 right-6 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase text-foreground"><Sparkles className="size-3.5" aria-hidden="true" />Recommended</span>}
          <p className={`text-sm font-medium ${featured ? "text-gold" : "text-primary"}`}>{plan.tagline.toUpperCase()}</p>
          <h3 className="mt-4 text-3xl font-semibold">{plan.name}</h3>
          <p className={`mt-2 ${featured ? "opacity-85" : "text-muted-foreground"}`}>{plan.description}</p>
          <p className="mt-7"><span className="font-sans text-4xl font-semibold">{formatMonthlyPrice(plan.monthlyPrice)}</span><span className={`ml-2 ${featured ? "opacity-80" : "text-muted-foreground"}`}>/ month</span></p>
          {plan.perDay && <p className={`mt-1 text-sm ${featured ? "text-gold" : "text-muted-foreground"}`}>Just {formatMonthlyPrice(plan.perDay)} a day</p>}
          <ul className={`mb-8 mt-7 space-y-3 border-t pt-6 ${featured ? "border-hero-foreground/25" : "border-border"}`}>
            {plan.features.map((feature) => <li key={feature} className="flex gap-3"><Check className={`mt-1 size-4 shrink-0 ${featured ? "text-gold" : "text-primary"}`} aria-hidden="true" />{feature}</li>)}
          </ul>
          <Button asChild size="lg" variant={featured ? "journey" : "default"} className="mt-auto h-auto w-full whitespace-normal py-3">
            <a href={whatsappEnquiry(`the ${plan.name}`)}>Enquire about the {plan.name.toLowerCase()}<ArrowUpRight /></a>
          </Button>
        </article>;
      })}
    </div>
  );
}

export function PlanComparison() {
  const cell = (value: string | boolean, strong = false) => typeof value === "string"
    ? <span className={strong ? "font-semibold" : "text-muted-foreground"}>{value}</span>
    : value ? <Check className="mx-auto size-5 text-primary" aria-label="Included" /> : <Minus className="mx-auto size-5 text-muted-foreground/60" aria-label="Not included" />;
  return <div className="overflow-x-auto" data-reveal>
    <table className="w-full min-w-[520px] border-collapse text-left">
      <thead><tr className="border-b-2 border-primary"><th className="py-4 pr-4 text-sm font-semibold text-muted-foreground">Side by side</th><th className="bg-hero-surface px-4 py-4 text-center text-sm font-semibold text-hero-foreground">Full Plan</th><th className="px-4 py-4 text-center text-sm font-semibold">Lite Plan</th></tr></thead>
      <tbody>{planComparison.map(([feature, full, lite]) => <tr key={feature} className="comparison-row border-b border-border"><th scope="row" className="py-3.5 pr-4 font-normal">{feature}</th><td className="bg-secondary px-4 text-center">{cell(full, true)}</td><td className="px-4 text-center">{cell(lite)}</td></tr>)}</tbody>
    </table>
  </div>;
}

export function TrialSession() {
  return <div className="trial-card grid gap-6 rounded-sm border border-border bg-accent p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9" data-reveal>
    <div><p className="eyebrow">Try before you commit</p><h3 className="mt-3 text-3xl font-semibold">Still not sure?</h3><p className="mt-2 max-w-xl text-muted-foreground">Book one {trialSession.minutes}-minute session. Work with me, then decide.</p></div>
    <div className="flex flex-col items-start gap-3 md:items-end"><p><span className="font-sans text-4xl font-semibold">{formatMonthlyPrice(trialSession.price)}</span><span className="ml-2 text-muted-foreground">/ {trialSession.minutes} min</span></p><Button asChild size="lg"><a href={whatsappEnquiry(`a ${trialSession.minutes}-minute trial session`)}>Book a trial<ArrowUpRight /></a></Button></div>
  </div>;
}
