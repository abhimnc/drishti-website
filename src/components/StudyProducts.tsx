import { ArrowUpRight, BookOpen, Feather, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatMonthlyPrice, studyProducts, whatsappEnquiry } from "@/lib/site";
import bundle from "@/assets/notes-bundle.jpg";
import { ExamIdentity } from "./ExamIdentity";

export function StudyProducts() {
  return <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
    {studyProducts.map((product) => {
      const Icon = product.id === "mains-writing" ? Feather : product.id === "history-optional" ? GraduationCap : BookOpen;
      return <article key={product.id} className="study-product flex flex-col border-t-2 border-primary pt-6">
        <div className="product-visual relative mb-5 overflow-hidden bg-secondary">
          <img src={bundle} width={1024} height={768} loading="lazy" alt="Illustrative bundle of study notebooks, not a photograph of the purchased notes" className="aspect-[4/3] w-full object-cover" />
          <span className="absolute left-4 top-4"><ExamIdentity exam={product.id === "ncert-notes" ? "NCERT" : product.id === "net-history" ? "JRF" : "UPSC"} /></span>
          <span className="absolute bottom-3 right-3 bg-background/90 px-2 py-1 text-xs text-muted-foreground">Collection illustration</span>
        </div>
        <div className="flex items-center justify-between gap-3"><p className="eyebrow">{product.category}</p><Icon className="size-5 text-primary" aria-hidden="true" /></div>
        <h3 className="mt-5 text-3xl font-semibold">{product.name}</h3>
        <p className="mt-3 text-muted-foreground">{product.description}</p>
        <div className="mb-6 mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1"><p className="text-3xl font-semibold">{formatMonthlyPrice(product.price)}</p><p className="text-sm text-muted-foreground">{product.unit}</p></div>
        <div className="mt-auto flex flex-wrap gap-3">
          {product.orderUrl && <Button asChild><a href={product.orderUrl} target="_blank" rel="noreferrer" aria-label={`Order ${product.name}`}>Order now<ArrowUpRight /></a></Button>}
          <Button asChild variant="outline"><a href={whatsappEnquiry(product.name)} aria-label={`Enquire about ${product.name}`}>Enquire on WhatsApp<ArrowUpRight /></a></Button>
        </div>
      </article>;
    })}
  </div>;
}