import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import original from "@/assets/study-desk.jpg";
import revision from "@/assets/revision-desk.jpg";
import library from "@/assets/library-desk.jpg";
import greenRoom from "@/assets/green-study-room.jpg";

const scenes = [
  { src: greenRoom, alt: "Green bookshelves and an open notebook on a sunlit study desk" },
  { src: revision, alt: "A notebook and revision books beside a sunlit window" },
  { src: library, alt: "An open notebook on a quiet university library desk" },
  { src: original, alt: "Books and a pen on a sunlit study desk" },
];

export function StudyBackground() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      if (timer) clearInterval(timer);
      if (!motion.matches && !paused) timer = setInterval(() => setActive((previous) => (previous + 1) % scenes.length), 6500);
    };
    sync();
    motion.addEventListener("change", sync);
    return () => { if (timer) clearInterval(timer); motion.removeEventListener("change", sync); };
  }, [paused]);
  return <>
    {scenes.map((scene, index) => <img key={scene.src} src={scene.src} alt={scene.alt} aria-hidden={index !== active} width={1600} height={1000} loading={index === 0 ? "eager" : "lazy"} className={`study-scene absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${paused ? "scene-paused" : ""} ${index === active ? "opacity-100" : "opacity-0"}`} />)}
    <div className="hero-veil absolute inset-0" />
    <div className="absolute bottom-10 right-6 z-20 flex items-center gap-1" aria-label="Study background controls">
      {scenes.map((scene, index) => <Button key={scene.src} size="icon" variant={index === active ? "default" : "outline"} className="size-8 rounded-full" aria-label={`Show study background ${index + 1}`} aria-pressed={index === active} onClick={() => setActive(index)}><span className="size-1.5 rounded-full bg-current" /></Button>)}
      <Button size="icon" variant="outline" className="ml-1 size-8 rounded-full" title={paused ? "Resume backgrounds" : "Pause backgrounds"} aria-label={paused ? "Resume backgrounds" : "Pause backgrounds"} onClick={() => setPaused((previous) => !previous)}>{paused ? <Play className="size-3" /> : <Pause className="size-3" />}</Button>
    </div>
  </>;
}