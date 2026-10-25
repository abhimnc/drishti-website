import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/SiteShell";
import { education, timeline } from "@/lib/site";
import { CredentialsGallery } from "@/components/CredentialsGallery";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Academic & Professional Journey — Dr. Drishti Kalra" },
      { name: "description", content: "The academic and professional credentials behind Dr. Drishti Kalra’s UPSC, PCS and UGC NET-JRF mentorship: DU professor, PhD and JRF qualification." },
      { property: "og:title", content: "The Journey of Dr. Drishti Kalra" },
      { property: "og:description", content: "Degrees, teaching roles, research positions and UPSC faculty experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journey,
});

function Journey() {
  return (
    <SiteShell>
      <PageHero eyebrow="Credentials" title="The experience behind my mentorship" intro="JRF qualified, a PhD from Delhi University and an Assistant Professor at Shivaji College. Alongside my academic work, I have written UPSC Mains twice and appeared for the interview — scoring 1010 in Civil Services 2019." />
      <Section eyebrow="Proof, not promises" title="The documents behind the claims">
        <p className="-mt-4 mb-10 max-w-3xl text-lg text-muted-foreground">Original marksheets and certificates, with only personal identifiers blurred. Select any document to read it in full.</p>
        <CredentialsGallery />
      </Section>
      <Section eyebrow="Education" title="Academic journey" className="pt-0">
        <ol className="grid gap-6 md:grid-cols-5">
          {education.map(([y, d, p], i) => (
            <li key={d} className="rounded-sm border border-border bg-card p-6" data-reveal>
              <p className="font-display text-4xl text-accent">{i + 1}</p>
              <p className="mt-3 text-sm font-semibold text-primary">{y}</p>
              <p className="mt-2 font-medium">{d}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section eyebrow="Experience" title="Professional timeline" className="pt-0">
        <ol className="relative ml-3 border-l-2 border-border">
          {timeline.map(([y, d]) => (
            <li key={`${y}${d}`} className="timeline-entry relative pb-8 pl-8" data-reveal>
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-background bg-primary" />
              <p className="text-sm font-semibold text-primary">{y}</p>
              <p className="mt-1 text-lg">{d}</p>
            </li>
          ))}
        </ol>
      </Section>
    </SiteShell>
  );
}
