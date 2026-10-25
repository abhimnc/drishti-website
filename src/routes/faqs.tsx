import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { SiteShell, PageHero } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { preparationFaqs } from "@/lib/study-guidance";
import { whatsappEnquiry } from "@/lib/site";

export const Route = createFileRoute("/faqs")({
  head: () => ({ meta: [
    { title: "Mentorship FAQs | Dr. Drishti Kalra" },
    { name: "description", content: "Answers about UPSC, PCS and NET-JRF mentorship, monthly fees, notes and WhatsApp enquiries with Dr. Drishti Kalra." },
    { property: "og:title", content: "Your mentorship questions — Dr. Drishti Kalra" },
    { property: "og:description", content: "Programme fees, study support, notes and direct WhatsApp contact." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Faqs,
});

function Faqs() {
  return <SiteShell>
    <PageHero eyebrow="Before you begin" title="Your questions, answered" intro="A few things you may want to know before choosing your notes or starting mentorship." />
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="border-t border-border">{preparationFaqs.map(faq => <details key={faq.question} className="group border-b border-border py-5">
        <summary className="cursor-pointer text-lg font-semibold text-foreground">{faq.question}</summary>
        <p className="mt-4 leading-relaxed text-muted-foreground">{faq.answer}</p>
      </details>)}</div>
      <div className="mt-12"><h2 className="text-3xl font-semibold">Still have a question?</h2><Button asChild size="lg" className="mt-5"><a href={whatsappEnquiry("a preparation query")}><MessageCircle />Ask me on WhatsApp<ArrowUpRight /></a></Button></div>
    </div>
  </SiteShell>;
}