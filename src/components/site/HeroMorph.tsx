import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import basalto from "@/assets/basalto.jpg";
import { useIsMobile } from "@/hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import heroCasaNoite from "@/assets/hero-casa-noite.jpg.asset.json";
import heroCasaPedra from "@/assets/hero-casa-pedra.jpg.asset.json";
import heroCasaJardim from "@/assets/hero-casa-jardim.jpg.asset.json";
import heroCasaVisita from "@/assets/hero-casa-visita.jpg.asset.json";
import heroCasaGrupo from "@/assets/hero-casa-grupo.jpg.asset.json";
import bgRestauracao from "@/assets/bg-restauracao-home.jpg.asset.json";

/**
 * Cinematic hero → "Quem somos" morph.
 *
 * A single <video> element is pinned inside a sticky viewport and,
 * synchronised with scroll, scales down and translates into the
 * left column of the second section. Hero copy fades out while the
 * "Quem somos" copy fades in — no duplication, no hard cut.
 *
 * Respects `prefers-reduced-motion` (falls back to a plain stacked
 * layout with no scroll-driven transforms).
 *
 * Video source can be swapped in by passing a `videoSrc` prop.
 * By default we render the poster image (hero-casas) so the layout
 * works even without a video file committed to the repo.
 */
const HERO_SLIDES: Array<{ src: string; alt: string }> = [
  { src: heroCasaNoite.url, alt: "Casarão histórico iluminado ao anoitecer em Galópolis" },
  { src: heroCasaPedra.url, alt: "Casa de madeira sobre alicerce de pedra basáltica" },
  { src: heroCasaJardim.url, alt: "Casarão em meio ao jardim com árvores floridas" },
  { src: heroCasaVisita.url, alt: "Visitantes em frente ao casarão amarelo com detalhes em vermelho" },
  { src: heroCasaGrupo.url, alt: "Grupo de visitantes no pátio do casarão histórico" },
];

function HeroCarouselBg() {
  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: false }),
  );
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-foreground">
      <Carousel
        opts={{ loop: true, align: "start", duration: 45 }}
        plugins={[autoplay.current]}
        setApi={setApi}
        className="h-full w-full [&>div]:h-full"
      >
        <CarouselContent className="ml-0 h-full w-screen max-w-[100vw]">
          {HERO_SLIDES.map((s, i) => (
            <CarouselItem key={i} className="relative h-full min-w-0 shrink-0 grow-0 basis-full pl-0">
              <img
                src={s.src}
                alt={s.alt}
                className="absolute inset-0 h-full w-full object-cover [filter:sepia(0.35)_saturate(0.85)_contrast(0.95)_brightness(0.98)_hue-rotate(-8deg)]"
                loading={i === 0 ? "eager" : "lazy"}
                {...(i === 0 ? { fetchPriority: "high" as const } : {})}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,225,170,0.10) 0%, rgba(120,80,40,0.28) 100%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9  0 0 0 0 0.75  0 0 0 0 0.55  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2 md:bottom-8">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={selected === i}
            className={`pointer-events-auto h-2 rounded-full transition-all duration-500 ${
              selected === i ? "w-8 bg-marfim" : "w-2 bg-marfim/50 hover:bg-marfim/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroMorph() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll progress with a spring for a cinematic feel.
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  // --- Video transforms ------------------------------------------------
  // Mobile keeps the video centred (no horizontal drift) and shrinks
  // less aggressively so the layout underneath stays legible.
  const targetScale = isMobile ? 0.62 : 0.34;
  const targetX = isMobile ? 0 : -22; // vw
  const targetY = isMobile ? -8 : -4; // vh

  // Scale: 1 (full-bleed) → landed size.
  const scale = useTransform(p, [0, 0.7], [1, targetScale]);
  // Horizontal shift towards the left column on desktop.
  const xPct = useTransform(p, [0, 0.7], [0, targetX]);
  const x = useMotionTemplate`${xPct}vw`;
  // Vertical shift: subtle drift as it lands.
  const yPct = useTransform(p, [0, 0.7], [0, targetY]);
  const y = useMotionTemplate`${yPct}vh`;
  // Progressive border radius.
  const radius = useTransform(p, [0, 0.7], [0, 28]);
  const borderRadius = useMotionTemplate`${radius}px`;
  // Shadow emerges as it shrinks.
  const shadowOpacity = useTransform(p, [0.15, 0.7], [0, 0.45]);
  const boxShadow = useMotionTemplate`0 30px 80px -30px rgba(48, 32, 32, ${shadowOpacity})`;
  // Gradient overlay fades away as the video becomes an object rather than a backdrop.
  const overlayOpacity = useTransform(p, [0, 0.5], [1, 0]);

  // --- Copy transforms -------------------------------------------------
  const heroOpacity = useTransform(p, [0, 0.25], [1, 0]);
  const heroY = useTransform(p, [0, 0.25], [0, -40]);

  const aboutOpacity = useTransform(p, [0.45, 0.75], [0, 1]);
  const aboutY = useTransform(p, [0.45, 0.75], [40, 0]);

  // Reduced-motion fallback: static hero + normal "Quem somos" section.
  if (reduce) {
    return (
      <>
        <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden -mt-20">
          <HeroCarouselBg />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/20" />
          <HeroCopy />
        </section>
        <StaticAboutSection />
      </>
    );
  }

  return (
    <div
      ref={wrapperRef}
      // Scroll distance for the morph. Shorter on mobile / tablet so the
      // user doesn't have to scroll through empty pinned space.
      className="relative -mt-20 h-[170vh] md:h-[200vh] lg:h-[220vh]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Textural backdrop revealed as the video shrinks --------------- */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, oklch(0.96 0.02 70) 0%, oklch(0.955 0.018 65) 55%, var(--background) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-25 mix-blend-multiply"
          style={{
            backgroundImage: `url(${bgRestauracao.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            filter: "sepia(0.35) saturate(0.7) hue-rotate(-8deg)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
        />
        {/* Morphing video ---------------------------------------------- */}
        <motion.div
          className="absolute inset-0 origin-center overflow-hidden"
          style={{
            scale,
            x,
            y,
            borderRadius,
            boxShadow,
            willChange: "transform, border-radius",
          }}
        >
          <HeroCarouselBg />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/20"
            style={{ opacity: overlayOpacity }}
          />
        </motion.div>

        {/* Hero copy (fades out on scroll) ----------------------------- */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ opacity: heroOpacity, y: heroY, willChange: "transform, opacity" }}
        >
          <div className="pointer-events-auto mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:pb-32 lg:px-10">
            <HeroCopy />
          </div>
        </motion.div>

        {/* "Quem somos" copy (fades in as video lands) ---------------- */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ opacity: aboutOpacity, y: aboutY, willChange: "transform, opacity" }}
        >
          <div className="pointer-events-auto mx-auto grid h-full max-w-7xl grid-cols-12 items-center gap-8 px-6 lg:px-10">
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <p className="text-[11px] uppercase tracking-[0.35em] text-terracotta">
                Quem somos
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
                Uma instituição que trata o{" "}
                <span className="italic text-terracotta">bairro inteiro</span> como acervo.
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                O Instituto Hércules Galló nasceu para proteger e traduzir a memória
                de Galópolis — a arquitetura de pedra basáltica, os ofícios trazidos
                pelos imigrantes italianos, a monumental fábrica de tecidos e a
                paisagem cultural que os cerca.
              </p>
              <Link
                to="/instituto"
                className="mt-10 inline-flex items-center gap-3 rounded-xl bg-terracotta px-6 py-3 text-sm font-medium text-marfim shadow-sm transition-all hover:brightness-110"
              >
                Conhecer o instituto <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function HeroCopy() {
  return (
    <div className="max-w-4xl">
      <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-ocre">
        Patrimônio
      </p>
      <h1 className="font-serif text-4xl leading-[1.05] text-marfim md:text-6xl lg:text-7xl">
        <span className="block">Descubra a história da</span>
        <span className="block italic text-ocre">pedra basáltica</span>
        <span className="block">que fundou Galópolis</span>
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-marfim/85 md:text-lg">
        Casas erguidas por mãos italianas, restauradas para contar a história
        de uma comunidade que se fez pedra sobre pedra.
      </p>
      <Link
        to="/contato"
        className="mt-10 inline-flex items-center gap-3 rounded-xl bg-terracotta px-6 py-3 text-sm font-medium text-marfim shadow-lg transition-all hover:brightness-110"
      >
        Agendar visita <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function StaticAboutSection() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <img
            src={basalto}
            alt="Detalhe da alvenaria de basalto de uma casa restaurada em Galópolis"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-[0_25px_60px_-30px_rgba(48,32,32,0.5)]"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-[11px] uppercase tracking-[0.35em] text-terracotta">Quem somos</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.1] md:text-5xl">
            Uma instituição que trata o{" "}
            <span className="italic text-terracotta">bairro inteiro</span> como acervo.
          </h2>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            O Instituto Hércules Galló nasceu para proteger e traduzir a memória
            de Galópolis — a arquitetura de pedra basáltica, os ofícios trazidos
            pelos imigrantes italianos, a monumental fábrica de tecidos e a
            paisagem cultural que os cerca.
          </p>
          <Link
            to="/instituto"
            className="mt-10 inline-flex items-center gap-3 rounded-xl bg-terracotta px-6 py-3 text-sm font-medium text-marfim shadow-sm transition-all hover:brightness-110"
          >
            Conhecer o instituto <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}