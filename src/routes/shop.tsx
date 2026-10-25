import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHero, Section } from "@/components/SiteShell";
import { StudyProducts } from "@/components/StudyProducts";
import { publicationMeta } from "@/lib/publishing";
export const Route = createFileRoute("/shop")({ head: () => publicationMeta("Notes & study shop", "Original NCERT and UPSC notes, History optional mentorship, Mains answer writing and UGC NET-JRF History notes."), component: Shop });
function Shop() { return <SiteShell><PageHero eyebrow="From my notebooks to yours" title="Notes & study shop" intro="Original study notes and focused support for your next step. Connect with me directly about your chosen collection." /><Section title="Study collections & focused support"><StudyProducts /></Section></SiteShell>; }