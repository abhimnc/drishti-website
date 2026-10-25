import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section, PageHero } from "@/components/SiteShell";
import { ExamTestSeries } from "@/components/ExamTestSeries";

export const Route = createFileRoute("/test-series")({
  head: () => ({
    meta: [
      { title: "UPPCS & EPFO Test Series | Dr. Drishti Kalra" },
      { name: "description", content: "UPPCS Prelims 2026 and EPFO test series: 12 full-length mocks, 75 sectional tests, notes, worksheets and guidance. Plans from ₹1,500, one-time payment." },
      { property: "og:title", content: "UPPCS & EPFO Test Series — Dr. Drishti Kalra" },
      { property: "og:description", content: "Choose your prep plan: Test Series ₹1,500, Tests + Notes + Worksheets ₹3,000 or Full Run ₹5,999." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestSeries,
});

function TestSeries() {
  return (
    <SiteShell>
      <PageHero eyebrow="UPPCS Prelims 2026 · EPFO" title="Test series & prep plans" intro="Practise under real exam conditions before the real exam. Choose test practice only, or complete guided preparation with daily current affairs. All plans are a one-time payment." />
      <Section eyebrow="Choose your prep plan" title="From practice-only to end-to-end guidance"><ExamTestSeries /></Section>
    </SiteShell>
  );
}
