import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import heroAtividades from "@/assets/hero-museu.jpg";

export const Route = createFileRoute("/atividades")({
  head: () => ({
    meta: [
      { title: "Atividades — Instituto Hércules Galló" },
      { name: "description", content: "Após o restauro das casas, o Instituto Hércules Galló monta o acervo do museu de território, dedicado à história da indústria têxtil de Galópolis." },
      { property: "og:title", content: "Atividades — Instituto Hércules Galló" },
      { property: "og:description", content: "Fases de atuação do Instituto: restauro, montagem do acervo e visitação mediada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Atividades,
});

function Atividades() {
  return (
    <>
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img src={heroAtividades} alt="Interior do museu de território" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/55 to-foreground/25" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Atividades</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              A segunda fase: <span className="italic">o museu ganha vida</span>.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
        <section className="relative mx-auto max-w-4xl px-6 lg:px-10 py-24 md:py-28">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
              <p>
                Após o restauro das casas, a segunda fase de atuação do Instituto Hércules Galló consiste na
                montagem do acervo do museu, que funcionará nas casas restauradas.
              </p>
              <p>
                A ideia é preservar a história da indústria têxtil de Galópolis e da região, que têm seu
                desenvolvimento profundamente ligado ao setor.
              </p>
              <p className="font-serif italic text-terracotta text-xl">
                As casas restauradas e o acervo do museu podem ser visitados mediante agendamento.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link to="/contato" className="text-sm font-medium px-6 py-3 rounded-xl bg-terracotta text-marfim hover:brightness-110 shadow-sm transition-all">
                Agendar visita
              </Link>
              <Link to="/agenda" className="text-sm font-medium px-6 py-3 rounded-xl border border-foreground/20 text-foreground hover:bg-foreground/5 transition-all">
                Ver agenda
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}