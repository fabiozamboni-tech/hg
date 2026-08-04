import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Preset = "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-in";

const PRESETS: Record<Preset, Variants> = {
  "fade-in": {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 48 },
    show: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -48 },
    show: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
};

type Props = {
  children: ReactNode;
  as?: "section" | "div" | "article" | "header" | "footer";
  preset?: Preset;
  delay?: number;
  duration?: number;
  /** Percent of element that must be visible to trigger (0–1). */
  amount?: number;
  /** Play only once (default) or every time it re-enters the viewport. */
  once?: boolean;
  /** Stagger children that also use motion variants. */
  stagger?: number;
  className?: string;
};

/**
 * Reveals its children when scrolled into view.
 * Respects `prefers-reduced-motion` — falls back to a plain, instant reveal.
 */
export function AnimatedSection({
  children,
  as = "div",
  preset = "slide-up",
  delay = 0,
  duration = 0.9,
  amount = 0.2,
  once = true,
  stagger,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    ...PRESETS[preset],
    show: {
      ...PRESETS[preset].show,
      transition: {
        duration,
        delay,
        ease: [0.2, 0.7, 0.2, 1],
        ...(stagger ? { staggerChildren: stagger, delayChildren: delay } : {}),
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Child of a stagger-enabled AnimatedSection. Inherits its parent's
 * hidden/show orchestration.
 */
export function AnimatedItem({
  children,
  preset = "slide-up",
  className,
}: {
  children: ReactNode;
  preset?: Preset;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={PRESETS[preset]}>
      {children}
    </motion.div>
  );
}