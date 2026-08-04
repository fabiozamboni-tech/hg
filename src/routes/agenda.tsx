import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import { formatBR } from "@/lib/eventos";
import { useEvents } from "@/lib/cms/useContent";
import { CmsArea } from "@/lib/cms/CmsProvider";
import heroAgenda from "@/assets/arquivo-1.jpg";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — Instituto Hércules Galló" },
      { name: "description", content: "Exposições, concertos, encontros e programas educativos do Instituto Hércules Galló." },
      { property: "og:title", content: "Agenda — Instituto Hércules Galló" },
      { property: "og:description", content: "Programação cultural de Galópolis." },
    ],
  }),
  component: Agenda,
});

function Agenda() {
  const { upcoming: prox, past: pass } = useEvents();

  return (
    <CmsArea id="agenda">
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img
          src={heroAgenda}
          alt="Registro do acervo do Instituto Hércules Galló"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/55 to-foreground/25" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Agenda</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              O calendário vivo de Galópolis.
            </h1>
            <p className="mt-6 max-w-2xl text-marfim/80">
              Exposições, concertos, encontros com pesquisadores e programas educativos ao longo do ano.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
        <section className="relative mx-auto max-w-5xl px-6 lg:px-10 py-20">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl">Próximos eventos</h2>
        </Reveal>
        <ol className="mt-12 relative border-l border-border pl-8 space-y-12">
          {prox.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <li className="relative">
                <span className="absolute -left-[41px] top-2 h-3 w-3 rounded-full bg-primary" aria-hidden />
                <p className="text-[11px] tracking-[0.3em] uppercase text-accent">{e.categoria}</p>
                <time className="font-serif text-2xl mt-1 block">{formatBR(e.data)}</time>
                <h3 className="font-serif text-xl mt-2">{e.titulo}</h3>
                <p className="mt-2 text-muted-foreground max-w-2xl">{e.resumo}</p>
                <p className="mt-3 text-xs text-muted-foreground">{e.local}</p>
              </li>
            </Reveal>
          ))}
          {prox.length === 0 && (
            <li className="text-muted-foreground">Nenhum evento programado no momento.</li>
          )}
        </ol>

        <div className="mt-24">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl">Eventos anteriores</h2>
          </Reveal>
          <ul className="mt-10 divide-y divide-border border-t border-b border-border">
            {pass.map((e, i) => (
              <Reveal key={e.id} delay={i * 40}>
                <li className="py-6 grid md:grid-cols-12 gap-4">
                  <time className="md:col-span-3 text-sm text-muted-foreground">{formatBR(e.data)}</time>
                  <div className="md:col-span-9">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-accent">{e.categoria}</p>
                    <p className="font-serif text-xl mt-1">{e.titulo}</p>
                    <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{e.resumo}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </CmsArea>
  );
}