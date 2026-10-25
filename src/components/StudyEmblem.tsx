import { BookOpen, Compass, Feather, Layers, Play, Sparkles, type LucideIcon } from "lucide-react";

const symbols: Record<string, LucideIcon> = { book: BookOpen, compass: Compass, feather: Feather, layers: Layers, play: Play, sparkles: Sparkles };

export function StudyEmblem({ kind = "book", tone = "sky", className = "" }: { kind?: string; tone?: "sky" | "coral" | "gold"; className?: string }) {
  const Symbol = symbols[kind] ?? BookOpen;
  return <span aria-hidden="true" className={`study-emblem emblem-${tone} ${className}`}><Symbol strokeWidth={1.7} /><Sparkles className="emblem-spark" strokeWidth={2} /></span>;
}