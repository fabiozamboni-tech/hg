import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Extra Y translation in px applied while off-screen. */
  y?: number;
  /** Extra scale applied while off-screen (0.9 = slight zoom-in). */
  scale?: number;
};

/**
 * Cinematic scroll-linked reveal: fades, lifts and scales the block as it
 * enters the viewport. Uses GSAP + ScrollTrigger, honors reduced motion.
 */
export function CinematicTransition({
  children,
  className,
  y = 80,
  scale = 0.96,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, scale, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1.1,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.6,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, scale]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}
