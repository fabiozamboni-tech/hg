import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CinematicTransition } from "@/components/motion";
import { MosaicGallery } from "@/components/site/MosaicGallery";
import { PageContentBg } from "@/components/site/PageContentBg";
import gal0 from "@/assets/gal-0.jpg";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import gal4 from "@/assets/gal-4.jpg";
import gal5 from "@/assets/gal-5.jpg";
import gal6 from "@/assets/gal-6.jpg";
import gal7 from "@/assets/gal-7.jpg";
import gal8 from "@/assets/gal-8.jpg";
import gal9 from "@/assets/gal-9.jpg";
import gal10 from "@/assets/gal-10.jpg";
import gal11 from "@/assets/gal-11.jpg";

export const Route = createFileRoute("/galopolis")({
  head: () => ({
    meta: [
      { title: "Galópolis — Instituto Hércules Galló" },
      { name: "description", content: "A história de Galópolis, vila operária colonizada por imigrantes italianos e transformada pela indústria têxtil na Serra Gaúcha." },
      { property: "og:title", content: "Galópolis — o bairro que nasceu de uma vila operária" },
      { property: "og:description", content: "Do Vale Del Profondo ao distrito que homenageia Hércules Galló." },
    ],
  }),
  component: GalopolisPage,
});

const GALERIA = [gal0, gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11];

function GalopolisPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img
          src={gal0}
          alt="Vista histórica de Galópolis"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/55 to-foreground/25" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Território</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Galópolis — <span className="italic text-ocre">a vila que virou distrito</span>.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
      {/* Bloco — Quem foi (marfim) */}
      <CinematicTransition>
        <section id="historia" className="bg-marfim text-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">Quem foi</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
                Do <span className="italic text-terracotta">Vale Del Profondo</span> ao distrito de Galópolis.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              <p>
                Colonizada a partir da década de 1890 por jovens vindos da Itália em meio a uma crise econômica, Galópolis era conhecida, à época, como Cascata da 4ª Légua, Desvio do Monte ou Vale Del Profondo. Os imigrantes que ocuparam a região perceberam que, devido ao relevo montanhoso, a área não era propícia para a agricultura. Os dois rios do lugar representavam a possibilidade de movimentar máquinas e gerar energia elétrica, além de ser útil no serviço de lavagem e tinturaria.
              </p>
              <p>
                Foi assim que surgiu o primeiro lanifício, uma sociedade nos moldes de uma cooperativa, em 1894. A fábrica produzia chales, palas, panos e fatiotas. Em 1903, Hércules Galló se juntou ao grupo de empreendedores, assumindo o comando do lanifício.
              </p>
              <p>
                Com Hércules Galló, a vila experimentou um significativo progresso. Ele estabeleceu um novo patamar de relacionamento com a força de trabalho. A construção de uma vila operária é ícone desse processo. As casas construídas lado a lado eram alugadas por valores simbólicos, uma estratégia de manutenção e atração de trabalhadores para o local, distante da cidade e de difícil acesso.
              </p>
              <p>
                Mesmo após a morte de Galló, a comunidade continuou se desenvolvendo em torno do lanifício. Casas comerciais, escolas, igreja, círculo operário e até um cinema encontraram respaldo para se instalar na vila.
              </p>
              <p>
                A comunidade passou a ser conhecida como povoado Galló, em referência ao homem que transformou o lugar. Em 1914, com a criação do 5º Distrito de Caxias pelo intendente Penna de Moraes, Galópolis recebeu o nome que até hoje homenageia o empreendedor Hércules Galló.
              </p>
            </div>

            <div className="mt-16">
              <MosaicGallery images={GALERIA} idPrefix="galopolis" alt="Imagem histórica de Galópolis" />
            </div>
          </div>
        </section>
      </CinematicTransition>
      </div>
    </>
  );
}