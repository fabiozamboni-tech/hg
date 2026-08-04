import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: "subtle" | "normal" | "strong";
  id?: string;
}

/**
 * CinematicTransition — animates a section into view with a
 * scale + fade + blur-release, driven by ScrollTrigger.
 */
export function CinematicTransition({
  children,
  className = "",
  intensity = "normal",
  id,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const map = {
      subtle: { y: 20, scale: 0.985, blur: 4 },
      normal: { y: 48, scale: 0.965, blur: 8 },
      strong: { y: 80, scale: 0.94, blur: 14 },
    } as const;
    const cfg = map[intensity];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: cfg.y,
          scale: cfg.scale,
          opacity: 0,
          filter: `blur(${cfg.blur}px)`,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [intensity]);

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  );
}
