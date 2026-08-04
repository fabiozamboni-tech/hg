import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import heroMuseu from "@/assets/hero-museu.jpg";
import basalto from "@/assets/basalto.jpg";
import arq3 from "@/assets/arquivo-3.jpg";
import arq4 from "@/assets/arquivo-4.jpg";

export const Route = createFileRoute("/museu")({
  head: () => ({
    meta: [
      { title: "O Museu — Instituto Hércules Galló" },
      { name: "description", content: "Um museu de território que trata o bairro de Galópolis como acervo vivo: pedra, tecido, memória e paisagem." },
      { property: "og:title", content: "O Museu de Território de Galópolis" },
      { property: "og:description", content: "Percurso pelo patrimônio construído e imaterial de Galópolis." },
    ],
  }),
  component: Museu,
});

const nucleos = [
  {
    titulo: "Casa Nostra",
    resumo: "Casa histórica em pedra basáltica que abriga o núcleo museológico principal, com salas de exposição permanente sobre a colonização italiana.",
    imagem: basalto,
  },
  {
    titulo: "Igreja e adro",
    resumo: "A igreja de Nossa Senhora e o adro cerimonial formam o coração simbólico do bairro. Recebem concertos e celebrações da comunidade.",
    imagem: arq3,
  },
  {
    titulo: "Antiga fábrica de tecidos",
    resumo: "Complexo industrial em processo de restauração que preserva parte do maquinário original e a arquitetura fabril do início do século XX.",
    imagem: arq4,
  },
];

function Museu() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden -mt-20">
        <img
          src={heroMuseu}
          alt="Interior do museu com tear histórico"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16">
          <Reveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-ocre">O Museu</p>
            <h1 className="font-serif text-marfim text-5xl md:text-7xl mt-4 max-w-3xl leading-[1.05]">
              Um museu que se percorre a pé, com o tempo do bairro.
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="relative">
        <PageContentBg />
        <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-primary">Museu de território</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 font-serif text-3xl md:text-4xl leading-tight">
              Não separamos o acervo da paisagem que o produziu. As casas, ruas, capelas e a fábrica são o próprio museu — habitado, restaurado e aberto à visita.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-24">
          {nucleos.map((n, i) => (
            <Reveal key={n.titulo}>
              <div className={`grid gap-10 md:grid-cols-2 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <img
                  src={n.imagem}
                  alt={n.titulo}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div>
                  <p className="text-[11px] tracking-[0.35em] uppercase text-accent">Núcleo {i + 1}</p>
                  <h2 className="font-serif text-3xl md:text-4xl mt-3 leading-tight">{n.titulo}</h2>
                  <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">{n.resumo}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      </div>

      <section className="bg-wood-deep border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 grid md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-8">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Faça o percurso completo com um mediador.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Visitas guiadas gratuitas de terça a domingo, com agendamento prévio para grupos e escolas.
            </p>
          </Reveal>
          <Reveal delay={150} className="md:col-span-4 md:text-right">
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase border border-primary/40 text-primary px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Agendar visita
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}