import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Heart, Award, Leaf } from "lucide-react";
import { CinematicTransition } from "../components/site/CinematicTransition";
import heroImg from "../assets/hero-brigadeiros.jpg";
import cardapioImg from "../assets/cardapio-grid.jpg";
import eventosImg from "../assets/eventos-mesa.jpg";
import macroImg from "../assets/brigadeiro-macro.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Que Brigadeiro — Brigadeiro Gourmet em Caxias do Sul" },
      {
        name: "description",
        content:
          "Confeitaria artesanal com mais de 50 sabores de brigadeiros gourmet em Caxias do Sul, Serra Gaúcha. Peça pelo WhatsApp ou monte sua mesa de doces para eventos.",
      },
      { property: "og:title", content: "Que Brigadeiro — Brigadeiro Gourmet em Caxias do Sul" },
      {
        property: "og:description",
        content: "O verdadeiro sabor do brigadeiro gourmet na Serra Gaúcha.",
      },
    ],
  }),
  component: Home,
});

const categorias = [
  { nome: "Clássicos", desc: "Chocolate belga, leite Ninho, brigadeiro tradicional." },
  { nome: "Frutados", desc: "Maracujá, morango, framboesa e limão siciliano." },
  { nome: "Alcoólicos", desc: "Whisky, licor 43, champagne e conhaque." },
  { nome: "Nuts", desc: "Pistache, avelã, nozes, castanha-do-pará." },
  { nome: "Especiais", desc: "Crème brûlée, ferrero, red velvet, doce de leite." },
];

const diferenciais = [
  { icon: Sparkles, title: "50+ sabores autorais", desc: "Curadoria pessoal de Marina De David." },
  { icon: Leaf, title: "Ingredientes premium", desc: "Chocolate belga, frutas frescas, nuts selecionados." },
  { icon: Heart, title: "Fabricação própria", desc: "Feitos à mão, na nossa cozinha em Caxias do Sul." },
  { icon: Award, title: "Atendimento personalizado", desc: "Do primeiro doce à mesa completa do seu evento." },
];

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.9 })
        .from(".hero-title-line", { y: 60, opacity: 0, duration: 1.1, stagger: 0.12 }, "-=0.5")
        .from(".hero-sub", { y: 20, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
        .from(".hero-image", { scale: 1.15, opacity: 0, duration: 1.6, ease: "power4.out" }, 0);

      // Parallax hero image
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            ref={heroImgRef}
            src={heroImg}
            alt="Brigadeiros gourmet Que Brigadeiro"
            width={1600}
            height={1200}
            className="hero-image h-[115%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.035_40)]/40 via-[oklch(0.22_0.035_40)]/30 to-background" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-40 md:px-10 md:pb-32">
          <p className="hero-eyebrow mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[oklch(0.85_0.06_78)]">
            Caxias do Sul · Serra Gaúcha
          </p>
          <h1 ref={heroTitleRef} className="text-balance text-5xl leading-[1.02] text-white md:text-7xl lg:text-8xl">
            <span className="hero-title-line block">O verdadeiro sabor</span>
            <span className="hero-title-line block italic">do brigadeiro gourmet</span>
            <span className="hero-title-line block">na Serra Gaúcha.</span>
          </h1>
          <p className="hero-sub mt-8 max-w-xl text-pretty text-lg text-white/85">
            Mais de 50 sabores autorais feitos à mão por Marina De David. Do doce
            para acompanhar o café ao evento inteiro montado com sofisticação.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/5554981140507?text=Ol%C3%A1%20Marina%2C%20quero%20fazer%20um%20pedido"
              target="_blank" rel="noopener noreferrer"
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-[oklch(0.78_0.115_85)] px-7 py-4 text-sm font-medium text-[oklch(0.22_0.035_40)] shadow-lg transition-all hover:shadow-xl"
            >
              Peça pelo WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              to="/cardapio"
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Ver o cardápio
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/60">
          role para explorar
        </div>
      </div>

      {/* MANIFESTO */}
      <CinematicTransition className="mx-auto max-w-5xl px-6 py-32 md:px-10 md:py-44" intensity="normal">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-primary">
          A Que Brigadeiro
        </p>
        <h2 className="text-balance text-4xl leading-[1.1] md:text-6xl">
          Um brigadeiro <span className="italic text-primary">não é só um doce</span> —
          é o encontro entre o afeto da infância e a técnica da confeitaria fina.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            to="/sobre"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            Conheça nossa história
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </CinematicTransition>

      {/* CATEGORIAS */}
      <CinematicTransition className="bg-secondary/40 py-32 md:py-40" intensity="normal">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
                Cardápio gourmet
              </p>
              <h2 className="max-w-3xl text-4xl leading-[1.1] md:text-6xl">
                Cinco famílias, mais de<br /> cinquenta sabores.
              </h2>
            </div>
            <Link
              to="/cardapio"
              className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 px-6 py-3 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Ver cardápio completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 lg:grid-cols-5">
            {categorias.map((c) => (
              <div
                key={c.nome}
                className="group relative flex flex-col justify-between bg-background p-8 transition-colors hover:bg-primary/5"
              >
                <div>
                  <div className="mb-4 h-px w-8 bg-primary transition-all group-hover:w-16" />
                  <h3 className="text-2xl">{c.nome}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <img
              src={cardapioImg}
              alt="Vitrine de sabores de brigadeiros gourmet"
              width={1400} height={1000} loading="lazy"
              className="h-[420px] w-full rounded-2xl object-cover md:h-[520px]"
            />
            <img
              src={macroImg}
              alt="Brigadeiro artesanal com folha de ouro"
              width={1200} height={1400} loading="lazy"
              className="h-[420px] w-full rounded-2xl object-cover md:h-[520px]"
            />
          </div>
        </div>
      </CinematicTransition>

      {/* DIFERENCIAIS */}
      <CinematicTransition className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40" intensity="normal">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Por que Que Brigadeiro
        </p>
        <h2 className="max-w-3xl text-4xl leading-[1.1] md:text-6xl">
          Feito à mão, com<br /> curadoria pessoal.
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {diferenciais.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border-t border-border pt-8">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-6 text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </CinematicTransition>

      {/* EVENTOS */}
      <CinematicTransition className="relative overflow-hidden bg-[oklch(0.22_0.035_40)] text-[oklch(0.94_0.02_78)]" intensity="strong">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-2 md:items-center md:gap-24 md:px-10 md:py-44">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[oklch(0.78_0.115_85)]">
              Eventos
            </p>
            <h2 className="text-balance text-4xl leading-[1.1] md:text-6xl">
              Mesas de doces que fazem <span className="italic">o momento acontecer</span>.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-[oklch(0.94_0.02_78)]/75">
              Casamentos, aniversários e eventos corporativos com curadoria de
              sabores, styling e montagem sob medida para a sua ocasião.
            </p>
            <Link
              to="/eventos"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[oklch(0.78_0.115_85)] px-7 py-4 text-sm font-medium text-[oklch(0.22_0.035_40)] transition-all hover:shadow-xl"
            >
              Solicitar orçamento <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <img
            src={eventosImg}
            alt="Mesa de doces montada para evento"
            width={1600} height={1100} loading="lazy"
            className="h-[520px] w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </CinematicTransition>

      {/* CTA FINAL */}
      <CinematicTransition className="mx-auto max-w-4xl px-6 py-32 text-center md:px-10 md:py-44" intensity="subtle">
        <h2 className="text-balance text-4xl leading-[1.1] md:text-6xl">
          Vai adoçar o seu dia<br /><span className="italic text-primary">agora mesmo?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Entregamos em Caxias do Sul e região. Fale com a gente pelo WhatsApp e
          monte a sua caixa.
        </p>
        <a
          href="https://wa.me/5554981140507?text=Ol%C3%A1%20Marina%2C%20quero%20fazer%20um%20pedido"
          target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:shadow-xl"
        >
          Peça pelo WhatsApp <ArrowRight className="h-4 w-4" />
        </a>
      </CinematicTransition>
    </>
  );
}
