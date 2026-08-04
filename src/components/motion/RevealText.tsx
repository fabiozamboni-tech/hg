import { motion, useReducedMotion, type Variants } from "motion/react";

type Props = {
  lines: string[];
  className?: string;
  /** Delay before the first line starts, in seconds. */
  delay?: number;
  /** Time between consecutive lines, in seconds. */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

const container: Variants = {
  hidden: {},
  show: (custom: { delay: number; stagger: number }) => ({
    transition: { delayChildren: custom.delay, staggerChildren: custom.stagger },
  }),
};

const line: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.1, ease: [0.2, 0.7, 0.2, 1] },
  },
};

/**
 * Line-by-line masked reveal — each line rises from behind its own clip.
 * Ideal for hero headlines. Falls back to static text under reduced motion.
 */
export function RevealText({
  lines,
  className,
  delay = 0.1,
  stagger = 0.12,
  as = "h2",
}: Props) {
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) {
    return (
      <Tag className={className}>
        {lines.map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <motion.span
      className={className}
      variants={container}
      custom={{ delay, stagger }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      style={{ display: "block" }}
    >
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span className="block" variants={line}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}