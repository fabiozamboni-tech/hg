import { createFileRoute } from "@tanstack/react-router";
import { CinematicTransition } from "../components/site/CinematicTransition";
import sobreImg from "../assets/sobre-marina.jpg";
import macroImg from "../assets/brigadeiro-macro.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "A Que Brigadeiro — História e curadoria de Marina De David" },
      {
        name: "description",
        content:
          "Conheça a história da Que Brigadeiro: fabricação própria, curadoria de sabores por Marina De David e paixão pela confeitaria fina em Caxias do Sul.",
      },
      { property: "og:title", content: "A Que Brigadeiro — Nossa história" },
      { property: "og:description", content: "Fabricação própria e curadoria autoral em Caxias do Sul." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <>
      <CinematicTransition className="mx-auto max-w-7xl px-6 pt-40 md:px-10 md:pt-56" intensity="normal">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-primary">A Que Brigadeiro</p>
        <h1 className="max-w-4xl text-balance text-5xl leading-[1.02] md:text-7xl">
          A confeitaria começa <span className="italic text-primary">na escolha do ingrediente</span> —
          e termina no seu paladar.
        </h1>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-24 grid max-w-7xl gap-16 px-6 md:grid-cols-5 md:px-10" intensity="normal">
        <img
          src={sobreImg}
          alt="Marina De David preparando brigadeiros"
          width={1200} height={1500} loading="lazy"
          className="col-span-2 h-[560px] w-full rounded-2xl object-cover"
        />
        <div className="col-span-3 space-y-6 text-lg leading-relaxed text-muted-foreground md:pt-10">
          <p>
            A <strong className="text-foreground">Que Brigadeiro</strong> nasceu do
            desejo de traduzir, em cada docinho, a memória afetiva do brigadeiro de
            infância com a técnica e o cuidado da confeitaria fina.
          </p>
          <p>
            Toda a produção acontece na nossa cozinha em Caxias do Sul, no bairro
            Pio X, sob a curadoria de <strong className="text-foreground">Marina De David</strong>.
            Nada é terceirizado: os brigadeiros são enrolados à mão, sabor por sabor,
            com chocolate belga, frutas frescas e nuts selecionados.
          </p>
          <p>
            Mais do que um doce, oferecemos uma experiência gastronômica local —
            para presentear, adoçar a rotina ou compor a mesa de eventos que precisam
            de um toque autoral.
          </p>
        </div>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-32 max-w-7xl px-6 md:px-10 md:mt-44" intensity="normal">
        <div className="grid gap-16 border-y border-border py-16 md:grid-cols-3 md:gap-8">
          {[
            { n: "50+", label: "Sabores autorais" },
            { n: "100%", label: "Fabricação própria" },
            { n: "10", label: "Anos adoçando a Serra" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-6xl leading-none text-primary md:text-7xl">{s.n}</p>
              <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </CinematicTransition>

      <CinematicTransition className="mx-auto my-32 max-w-4xl px-6 text-center md:px-10 md:my-44" intensity="subtle">
        <img
          src={macroImg}
          alt="Brigadeiro gourmet com folha de ouro"
          width={1200} height={1400} loading="lazy"
          className="mx-auto mb-12 h-72 w-72 rounded-full object-cover shadow-xl"
        />
        <blockquote className="text-balance font-display text-3xl italic leading-tight md:text-5xl">
          "Cada brigadeiro que sai da nossa cozinha carrega uma pequena obsessão
          pelo detalhe."
        </blockquote>
        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          — Marina De David
        </p>
      </CinematicTransition>
    </>
  );
}
