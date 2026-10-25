import { useEffect, useRef, type ReactNode } from "react";

const targets = "section > div, section > h2, article, [data-reveal]";

export function MotionPage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    const sections = Array.from(root.querySelectorAll<HTMLElement>(targets));
    sections.forEach(section => {
      if (section.getBoundingClientRect().top < window.innerHeight) return;
      // Siblings that reveal together arrive one after another rather than as a block.
      const siblings = section.parentElement ? Array.from(section.parentElement.children).filter(child => child.matches(targets)) : [];
      section.style.setProperty("--reveal-delay", `${Math.min(Math.max(siblings.indexOf(section), 0), 5) * 90}ms`);
      section.classList.add("reveal-pending");
      observer.observe(section);
    });
    return () => {
      observer.disconnect();
      sections.forEach(section => {
        section.classList.remove("reveal-pending", "reveal-visible");
        section.style.removeProperty("--reveal-delay");
      });
    };
  }, [children]);
  return <main ref={ref}>{children}</main>;
}
