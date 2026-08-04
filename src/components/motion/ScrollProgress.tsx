import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Thin horizontal bar at the top of the page that tracks scroll progress.
 * Purely decorative — hidden from assistive tech and disabled under
 * reduced motion.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className={`fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-terracotta ${className ?? ""}`}
      style={{ scaleX }}
    />
  );
}