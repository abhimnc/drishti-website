import { useRef, useState } from "react";
import { BadgeCheck, Expand, X } from "lucide-react";
import { credentialDocuments } from "@/lib/site";
import { CountUp } from "./CountUp";
import upsc from "@/assets/credentials/upsc-mains-2019.jpg";
import phd from "@/assets/credentials/phd-degree.jpg";
import jrf from "@/assets/credentials/jrf-award-letter.jpg";
import net from "@/assets/credentials/net-certificate.jpg";

type Credential = (typeof credentialDocuments)[number];

const scans: Record<Credential["id"], { src: string; width: number; height: number }> = {
  upsc: { src: upsc, width: 1240, height: 800 },
  phd: { src: phd, width: 1200, height: 1734 },
  jrf: { src: jrf, width: 1078, height: 1509 },
  net: { src: net, width: 1080, height: 1370 },
};

const privacyNote = "Roll numbers, reference numbers, QR codes and family names are blurred for privacy.";

export function CredentialsGallery({ compact = false }: { compact?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Credential | null>(null);
  const show = (credential: Credential) => { setOpen(credential); dialog.current?.showModal(); };
  return <>
    <div className={`grid gap-6 sm:grid-cols-2 ${compact ? "lg:grid-cols-4" : ""}`}>
      {credentialDocuments.map((credential) => {
        const scan = scans[credential.id];
        const numeric = /^\d+$/.test(credential.headline);
        return <article key={credential.id} className="credential-card flex flex-col border border-border bg-card">
          <button type="button" onClick={() => show(credential)} className="credential-scan group relative block overflow-hidden bg-secondary text-left" aria-label={`View the ${credential.title} document`}>
            <img src={scan.src} width={scan.width} height={scan.height} loading="lazy" alt={`${credential.title}, issued by ${credential.issuer}, with personal identifiers blurred`} className={`w-full object-cover object-top ${compact ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
            <span className="credential-stamp absolute right-3 top-3"><BadgeCheck aria-hidden="true" />Original document</span>
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/90 px-2 py-1 text-xs text-foreground"><Expand className="size-3.5" aria-hidden="true" />View document</span>
          </button>
          <div className="flex flex-1 flex-col p-6">
            <p className="eyebrow">{credential.issuer}</p>
            <p className="mt-4 font-display text-5xl font-semibold text-primary">{numeric ? <CountUp value={Number(credential.headline)} /> : credential.headline}</p>
            <p className="mt-1 text-sm font-medium">{credential.headlineLabel}</p>
            <h3 className="mt-4 text-2xl font-semibold leading-tight">{credential.title}</h3>
            {!compact && <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              {credential.details.map(([term, value]) => <div key={term} className="grid grid-cols-[120px_1fr] gap-3"><dt className="text-muted-foreground">{term}</dt><dd>{value}</dd></div>)}
            </dl>}
          </div>
        </article>;
      })}
    </div>
    <p className="mt-5 text-sm text-muted-foreground">{privacyNote}</p>
    <dialog ref={dialog} onClose={() => setOpen(null)} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }} className="credential-dialog m-auto max-h-[92vh] w-[min(900px,calc(100vw-2rem))] border border-border bg-background p-0 text-foreground" aria-label={open?.title ?? "Credential document"}>
      {open && <div className="flex max-h-[92vh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-border p-5">
          <div><p className="eyebrow">{open.issuer}</p><h3 className="mt-2 text-2xl font-semibold">{open.title}</h3></div>
          <button type="button" onClick={() => dialog.current?.close()} className="rounded-sm p-2 hover:bg-secondary" aria-label="Close document"><X className="size-5" /></button>
        </div>
        <div className="overflow-auto bg-secondary p-4"><img src={scans[open.id].src} width={scans[open.id].width} height={scans[open.id].height} alt={`${open.title}, with personal identifiers blurred`} className="mx-auto h-auto w-full max-w-[760px] shadow-lg" /></div>
        <p className="border-t border-border p-4 text-xs text-muted-foreground">{privacyNote}</p>
      </div>}
    </dialog>
  </>;
}
