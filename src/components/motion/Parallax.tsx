import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "motion/react";

type Props = {
  children: ReactNode;
  /** Pixels of vertical travel across the visible range. Negative = up. */
  offset?: number;
  className?: string;
};

/**
 * Vertical parallax translation tied to the element's own scroll progress.
 * Uses a spring for buttery motion and disables itself under reduced motion.
 */
export function Parallax({ children, offset = -80, className }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.4 });

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** How much extra scale to apply during the scroll pass (1 = none). */
  zoom?: number;
  /** Vertical parallax travel in pixels (negative = drifts up). */
  offset?: number;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
};

/**
 * Image that gently zooms and drifts as it crosses the viewport,
 * clipped by its container. Mimics the alre.com hero/section effect.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  zoom = 1.15,
  offset = 60,
  loading = "lazy",
  width,
  height,
}: ParallaxImageProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [zoom, 1, zoom]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.4 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""}`}
      style={{ willChange: "transform" }}
    >
      {reduce ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          className="h-full w-full object-cover"
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          className="h-full w-full object-cover"
          style={{ y: smoothY, scale }}
        />
      )}
    </div>
  );
}