import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CinematicTransition } from "@/components/motion";
import { MosaicGallery } from "@/components/site/MosaicGallery";
import { PageContentBg } from "@/components/site/PageContentBg";
import quem0 from "@/assets/quem-0.jpg";
import quem1 from "@/assets/quem-1.jpg";
import quem2 from "@/assets/quem-2.jpg";
import quem3 from "@/assets/quem-3.jpg";
import quem4 from "@/assets/quem-4.jpg";
import quem5 from "@/assets/quem-5.jpg";
import quem6 from "@/assets/quem-6.jpg";
import fam0 from "@/assets/fam-0.jpg";
import fam1 from "@/assets/fam-1.jpg";
import fam2 from "@/assets/fam-2.jpg";
import fam3 from "@/assets/fam-3.jpg";
import fam4 from "@/assets/fam-4.jpg";
import fam5 from "@/assets/fam-5.jpg";
import fam6 from "@/assets/fam-6.jpg";
import fam7 from "@/assets/fam-7.jpg";
import fam8 from "@/assets/fam-8.jpg";
import fam9 from "@/assets/fam-9.jpg";

export const Route = createFileRoute("/hercules-gallo")({
  head: () => ({
    meta: [
      { title: "Hércules Galló — Instituto Hércules Galló" },
      { name: "description", content: "A trajetória de Hércules Galló, industrial piemontês que transformou Galópolis, e a história da família que deu continuidade ao seu legado." },
      { property: "og:title", content: "Hércules Galló — quem foi e sua família" },
      { property: "og:description", content: "De Piemonte à Serra Gaúcha: a vida de Hércules Galló e a saga da família em Galópolis." },
    ],
  }),
  component: HerculesGalloPage,
});

const QUEM_FOI = [quem0, quem1, quem2, quem3, quem4, quem5, quem6];
const FAMILIA = [fam0, fam1, fam2, fam3, fam4, fam5, fam6, fam7, fam8, fam9];

const SECOES = [
  { id: "quem-foi", label: "Quem foi" },
  { id: "familia", label: "Família" },
] as const;

function HerculesGalloPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img
          src={quem0}
          alt="Retrato histórico de Hércules Galló"
          className="absolute inset-0 h-full w-full object-cover object-top"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Personagem</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Hércules Galló — <span className="italic text-ocre">o homem que deu nome à vila</span>.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
      {/* Bloco 1 — Quem foi (marfim) */}
      <CinematicTransition>
        <section id="quem-foi" className="bg-marfim text-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">Quem foi</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
                De Piemonte à <span className="italic text-terracotta">Serra Gaúcha</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              <p>
                Hércules Galló nasceu em Piemonte, na Itália, em 1869, um ano antes da unificação do país. O processo que agregou reinos, repúblicas e ducados em uma só nação foi determinante para, 30 anos mais tarde, Galló deixar o país. Diferentemente de outros italianos que viam na emigração uma saída para as dificuldades econômicas, Galló percebeu a América como uma nova possibilidade de investir a herança e outras economias.
              </p>
              <p>
                Após uma passagem pelo Rio de Janeiro, começou a trabalhar na Fiação de Tecidos Portoalegrense, na capital do Rio Grande do Sul. Em 1904, investiu as economias trazidas da Itália na compra de ações de um lanifício que funcionava como cooperativa em Galópolis.
              </p>
              <p>
                Como propulsor da indústria têxtil na Serra Gaúcha, foi responsável por colocar Caxias do Sul no cenário econômico do Rio Grande do Sul. O lanifício, à época chamado Companhia de Tecidos de Lã, prosperou sob sua administração. Em 1910 era considerado uma das 10 maiores empresas do Estado. Dois anos depois, Galló associou-se à Casa Comercial Chaves e Almeida, um dos principais clientes do lanifício.
              </p>
              <p>
                Entre 1910 e 1920, também dedicou-se à vida pública. A porta de entrada foi a Associação de Comerciantes municipal, em 1912. No final do mesmo ano, foi nomeado vice-intendente de Caxias do Sul, ato assinado pelo intendente Coronel Penna de Moraes. Galló assumiu o mais alto cargo do Executivo da época entre 1914 e 1915, devido a uma licença do titular. Foi também o primeiro deputado da Serra Gaúcha, integrando a 7ª legislatura da Assembleia dos Representantes entre 1913 e 1916.
              </p>
              <p>
                Prestes a constituir um novo lanifício, possivelmente na vila que o acolheu e que ele ajudou a desenvolver, Galló morreu em 9 de maio de 1921, aos 51 anos, em Porto Alegre.
              </p>
            </div>

            <div className="mt-16">
              <MosaicGallery images={QUEM_FOI} idPrefix="quem-foi" alt="Fotografia histórica de Hércules Galló" />
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Bloco 2 — Família (bordô) */}
      <CinematicTransition>
        <section id="familia" className="bg-primary text-primary-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Família</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05] text-marfim">
                A saga da família <span className="italic text-ocre">Galló</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-marfim/85 max-w-3xl">
              <p>
                Hércules Galló casou-se com Edwige Virginia Strona em 1890, na Itália. Olga, a primogênita do casal, nasceu no ano seguinte. Renato, o segundo filho, veio ao mundo em 1897. A família deixou a Itália em 1899 para viver no Brasil. Já em Caxias do Sul nasceu o terceiro filho, Pinot, em 1910.
              </p>
              <p>
                A dedicação de Edwige aos negócios foi essencial para o sucesso da família. Enquanto ela cuidava do lanifício, Galló percorria a região levando os produtos da indústria.
              </p>
              <p>
                Em 1915, a filha Olga casou-se com Secondo Solio, técnico elétrico contratado por Galló para trabalhar no lanifício. Renato deixou o Brasil e a intenção de tocar a indústria do pai para lutar pela Itália na Primeira Guerra Mundial, em 1917. Retornou ao Brasil três anos depois, ao lado de Hércules.
              </p>
              <p>
                Quase 10 anos após a morte de Galló, Edwige conseguiu organizar os negócios da família para poder retornar à Itália, em 1930. Com Renato e Pinot, ela se juntou à filha Olga, ao genro Secondo e ao neto, Ercole. Com o tempo, desfez-se dos negócios no Brasil, mas não abriu mão de manter as duas casas construídas pelo marido em Galópolis.
              </p>
              <p>
                Renato continuou dedicando-se à defesa da Itália em conflitos armados da primeira metade do século XX. Ainda na Itália, Pinot casou-se com Antonia Tumelero. Em 1950, após longas negociações com o governo brasileiro, a família conseguiu retomar a vida em Caxias do Sul.
              </p>
              <p>
                No ano seguinte, nasceu José, filho de Pinot e Antonia. Pinot morreu em 1953. Em 1956, Edwige e Olga também vieram a falecer. A Secondo, viúvo de Olga, com o filho Ercole, e a Antonia, viúva de Pinot, com o filho José, restou o desafio de dar continuidade às trajetórias das famílias Galló e Solio em Galópolis. Em 1957, decidem se casar. Da união, nasce Renato, em 1958, e Paulo, em 1960.
              </p>
            </div>

            <div className="mt-16">
              <MosaicGallery images={FAMILIA} idPrefix="familia" alt="Retrato da família Galló" />
            </div>
          </div>
        </section>
      </CinematicTransition>
      </div>
    </>
  );
}