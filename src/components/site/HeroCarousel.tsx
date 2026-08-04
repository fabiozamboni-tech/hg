import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroCasas from "@/assets/hero-casas.jpg";
import heroMuseu from "@/assets/hero-museu.jpg";
import heroTerritorio from "@/assets/hero-territorio.jpg";

type Line = { text: string; italic?: boolean };

const SLIDES: Array<{
  image: string;
  kicker: string;
  lines: Line[];
  text: string;
  cta: { label: string; to: "/contato" };
}> = [
  {
    image: heroCasas,
    kicker: "Patrimônio",
    lines: [
      { text: "Descubra a história da" },
      { text: "pedra basáltica", italic: true },
      { text: "que fundou Galópolis" },
    ],
    text: "Casas erguidas por mãos italianas, restauradas para contar a história de uma comunidade que se fez pedra sobre pedra.",
    cta: { label: "Agendar visita", to: "/contato" },
  },
  {
    image: heroMuseu,
    kicker: "Memória viva",
    lines: [
      { text: "Um museu que é" },
      { text: "território inteiro", italic: true },
      { text: "de Galópolis" },
    ],
    text: "Do tear ao altar, do arquivo à rua — cada objeto guarda um capítulo da imigração italiana no sul do Brasil.",
    cta: { label: "Agendar visita", to: "/contato" },
  },
  {
    image: heroTerritorio,
    kicker: "Serra Gaúcha",
    lines: [
      { text: "Onde o passado" },
      { text: "segue habitado", italic: true },
      { text: "na Serra Gaúcha" },
    ],
    text: "Um bairro de Caxias do Sul que preserva o italiano das ruas, as fábricas de tecido e a fé nas capelas.",
    cta: { label: "Agendar visita", to: "/contato" },
  },
];

export function HeroCarousel() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden -mt-20">
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[2200ms] ease-[cubic-bezier(.4,0,.2,1)] ${
            i === idx ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== idx}
        >
          <img
            src={s.image}
            alt=""
            className={`h-full w-full object-cover ${i === idx ? "animate-slow-zoom" : ""}`}
            width={1920}
            height={1280}
            {...(idx === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/20" />
        </div>
      ))}

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-24 md:pb-32">
        {SLIDES.map((s, idx) => {
          const active = i === idx;
          return (
            <div
              key={idx}
              className={`absolute left-6 right-6 lg:left-10 lg:right-10 bottom-24 md:bottom-32 max-w-4xl ${
                active ? "" : "pointer-events-none"
              }`}
              aria-hidden={!active}
            >
              <div className="overflow-hidden mb-6">
                <p
                  className={`text-[11px] tracking-[0.4em] uppercase text-ocre transition-transform ease-[cubic-bezier(.2,.7,.2,1)]`}
                  style={{
                    transitionDuration: "900ms",
                    transitionDelay: active ? "100ms" : "0ms",
                    transform: active ? "translateY(0)" : "translateY(120%)",
                  }}
                >
                  {s.kicker}
                </p>
              </div>

              <h1 className="font-serif text-marfim text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
                {s.lines.map((line, li) => (
                  <span key={li} className="block overflow-hidden pb-[0.08em]">
                    <span
                      className={`block ease-[cubic-bezier(.2,.7,.2,1)] ${line.italic ? "italic text-ocre" : ""}`}
                      style={{
                        transitionProperty: "transform",
                        transitionDuration: "1200ms",
                        transitionDelay: active ? `${250 + li * 140}ms` : "0ms",
                        transform: active ? "translateY(0)" : "translateY(110%)",
                      }}
                    >
                      {line.text}
                    </span>
                  </span>
                ))}
              </h1>

              <p
                className="mt-6 text-marfim/85 text-base md:text-lg max-w-xl leading-relaxed ease-out"
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "1000ms",
                  transitionDelay: active ? "850ms" : "0ms",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(16px)",
                }}
              >
                {s.text}
              </p>
              <div
                className="ease-out"
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "1000ms",
                  transitionDelay: active ? "1050ms" : "0ms",
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <Link
                  to={s.cta.to}
                  className="inline-flex items-center gap-3 mt-10 text-sm font-medium px-6 py-3 rounded-xl bg-terracotta text-marfim hover:brightness-110 shadow-lg transition-all"
                >
                  {s.cta.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            aria-current={i === idx}
            className={`h-[2px] transition-all duration-500 ${
              i === idx ? "w-14 bg-marfim" : "w-6 bg-marfim/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}