import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CinematicTransition } from "@/components/motion";
import { MosaicGallery } from "@/components/site/MosaicGallery";
import { PageContentBg } from "@/components/site/PageContentBg";
import r0 from "@/assets/restauracao-0.png.asset.json";
import r1 from "@/assets/restauracao-1.png.asset.json";
import r2 from "@/assets/restauracao-2.png.asset.json";
import r3 from "@/assets/restauracao-3.png.asset.json";
import r4 from "@/assets/restauracao-4.png.asset.json";
import r5 from "@/assets/restauracao-5.png.asset.json";
import r6 from "@/assets/restauracao-6.png.asset.json";
import r7 from "@/assets/restauracao-7.png.asset.json";
import r8 from "@/assets/restauracao-8.png.asset.json";

export const Route = createFileRoute("/restauracao")({
  head: () => ({
    meta: [
      { title: "Restauração — Instituto Hércules Galló" },
      { name: "description", content: "O projeto de restauração das casas centenárias de Hércules Galló em Galópolis: Casa 1, Casa 2, Sala Multiuso, Plano Diretor e o registro fotográfico da obra." },
      { property: "og:title", content: "Restauração das casas — Instituto Hércules Galló" },
      { property: "og:description", content: "Restauração, conservação e reabilitação do patrimônio arquitetônico deixado por Hércules Galló em Galópolis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RestauracaoPage,
});

const IMG = "/restauracao/";

const CASA_1 = [
  "d406ab2f8d9ebe5cfffaf69efdf0967a", "dce565a1bc5078e6ba284ad819b5a26a",
  "8683bdfdc7fd5044a2011fef8d4cc21f", "5a72733d43d10de9f7916c807d065f55",
  "e0bde1e1a2444287cf8a4e67493a95ee", "5c412fedb2ff0f02dc4cf325cbd8f659",
  "0aef552f5bece52aa59942ae5cedde55", "5b73967882f1e8519db07d605a7323de",
  "87557b33ab5286aa8ea18df1bfec88ff", "41f2becffaafd014ed87cdaeeaed7491",
  "80e4244e8c974f8f7458604c4d51dd80", "02f46ac02192fb8e73360cd86280bf6c",
  "92c2643dea01efcd38d3f58edb83a8cc", "8f08665a76b7b577b24acb097e208735",
].map((h) => `${IMG}${h}.jpg`);

const CASA_2 = [
  "42166d821825f7507031aec2aafd2296", "3ae2d1c1c5babf9ed0459e9eb9758457",
  "863bc276aa609985d1665e47bb11ec8d", "7d451113e676ef048012c59b7daadde6",
  "5f82311ad9400f8a73299a440b6e9523", "17ff4a5fc0cbf0e5914078efe34ce651",
  "460d24221e0c6dabed45a194fef981bf", "ac48709a7daf40fe1c6155489b2c87db",
  "f8973e56bd00a20fccd61e99e8312c22", "1fd02d81a1b155aab608afd867df1686",
  "533fc66e59485fbffdb4c916f3560e73", "f48b08adbd4120ab9318a7095b2821c4",
  "a763f919c232302eebe12726ba1b51e8", "c0a735f6dfcd1d914dbaec7afc547cb2",
  "4cd2a947d10168d1d9faf42367f67429", "6f4dcc8ab70fea91846c18e6cbdd898f",
  "f6428be74508546693333bd2c3f3dcd9", "a39af447e5f1e3dab04c6cc00f7a8dde",
  "ef0f91c70e743d6316f706cedce38ff6", "5c14bf7d14eac484c26e6c63528fcafe",
].map((h) => `${IMG}${h}.jpg`);

const RESTAURACAO_IMGS = [r0, r1, r2, r3, r4, r5, r6, r7, r8].map((a) => a.url);

const FOTOS_RESTAURACAO = [
  "6e666e0b1c0836e8996a17ea2ff572ac", "c4cb001c2e8e66ab3be98c2eb84ecd26",
  "9f27b00b8fec36ebd1c5f1c303ef90e2", "a512e016092ead8e601412dccd24b4d2",
  "04d17c4d7ace6105ab026ec48d8544db", "3339c45d9e30141fe2f72d4e69fbc158",
  "ab1ea37eedb42a6b3a1c1c9ba07d8946", "565f510bce562e3b6b0ac6ab38acc1fb",
  "2aef67087d2b0c4a058497c3213c490c", "73a626b0678bda71062cb4a955399358",
  "61ac90625150cdfbf1a8dec5aae37869", "7118d75799c9721301b9bfb7fc1404df",
  "c24293efea924f89144f39fbe1ee0c80", "037df7f850cad431235ec7822914e9d3",
  "c97b2ccf836f3ebea543c8c1b226c112", "3121c0bd3933db4011a953f2152f2167",
  "3b8b458884ba81c1a7d8b9f6396a5766", "05598c29a5564f6c985846d4e8103a48",
  "6c3069480e7ae00884066f42ff422219", "e31823433deead34672b7d938b70b71e",
  "1d85494734a5f80a45e47f7ff7000c8e", "73d3d28256c4c5b604a74527b1df73f0",
  "3c23df68bf267b9820ccd6beeb18247e", "538b3f17fa043a4cd6dda5071630b5dd",
].map((h) => `${IMG}${h}.jpg`);

const SECOES = [
  { id: "o-projeto", label: "O Projeto" },
  { id: "casa-1", label: "Casa 1" },
  { id: "casa-2", label: "Casa 2" },
  { id: "restauracao", label: "Restauração" },
  { id: "sala-multiuso", label: "Sala Multiuso" },
  { id: "plano-diretor", label: "Plano Diretor" },
  { id: "fotos", label: "Fotos" },
] as const;

function RestauracaoPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img
          src={r0.url}
          alt="Restauração das casas centenárias do Instituto Hércules Galló"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Patrimônio</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              A casa <span className="italic text-ocre">renasce</span> — o restauro das residências centenárias.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
      {/* Navegação âncora */}
      <nav aria-label="Seções" className="sticky top-24 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ul className="flex gap-1 overflow-x-auto py-3">
            {SECOES.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap rounded-lg"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* O Projeto — marfim */}
      <CinematicTransition>
        <section id="o-projeto" className="bg-marfim text-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">O Projeto</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
                Preservar antes que <span className="italic text-terracotta">o tempo consuma</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              <p>
                José Galló, herdeiro das casas que pertenceram a Hércules Galló, decidiu recuperar as residências em 2009. A preocupação era que as edificações que testemunharam boa parte da história de Galópolis sucumbissem à degradação do tempo. Além disso, o instituto buscou inspirar outros proprietários a preservarem construções com histórias e significados semelhantes.
              </p>
              <p>
                A primeira medida foi buscar o tombamento dos imóveis pelo Patrimônio Histórico Municipal de Caxias do Sul. O processo foi concluído em julho de 2010. Com os imóveis tombados, os proprietários receberam o direito de comercializar índices de potencial construtivo, o que subsidiou a recuperação das casas.
              </p>
              <p>
                Para efetivar a restauração, o projeto incluiu etapas de levantamento histórico, com pesquisas bibliográficas, iconográficas, investigações arqueológicas, registros fotográficos e levantamento topográfico.
              </p>
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Casa 1 — bordô */}
      <CinematicTransition>
        <section id="casa-1" className="bg-primary text-primary-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Casa 1</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05] text-marfim">
                A primeira residência, de <span className="italic text-ocre">1904</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-marfim/85 max-w-3xl">
              <p>
                A Casa 1, com cerca de 170 metros quadrados, foi a primeira a ser construída, por volta de 1904. Quando a família mudou-se para a Casa 2, essa primeira residência passou a ser ocupada por funcionários do lanifício.
              </p>
              <p>
                A edificação tem forte influência da arquitetura colonial italiana do período tardio. É formada por três pavimentos: porão, térreo e sótão. Os principais materiais utilizados na construção foram madeira (na estrutura, nos pisos, nos forros e nas paredes), pedra (nas fundações) e metal (em telhas de ferro galvanizado e ferragens). Com ornamentação discreta, a casa apresenta guarda-copo e lambrequins de madeira, enfatizando o aspecto de chalé.
              </p>
              <p>
                Por ser a mais antiga e ter permanecido por mais tempo desocupada, era a construção que apresentava nível mais avançado de deterioração, exigindo maior intervenção no restauro. Com a reforma foram incluídas condições de acessibilidade.
              </p>
            </div>
            <div className="mt-16">
              <MosaicGallery images={CASA_1} idPrefix="casa-1" alt="Restauração da Casa 1" />
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Casa 2 — escuro */}
      <CinematicTransition>
        <section id="casa-2" className="bg-foreground text-marfim py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Casa 2</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
                A casa da <span className="italic text-ocre">prosperidade</span>, 1908.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-marfim/80 max-w-3xl">
              <p>
                A Casa 2, com cerca de 500 metros quadrados, surgiu em 1908, quando os negócios da família prosperaram. A casa passou por duas reformas, por volta de 1917, para poder acomodar os sócios do lanifício em visitas de negócios.
              </p>
              <p>
                A edificação tem quatro pavimentos: porão, térreo, primeiro pavimento e sótão. A exemplo da Casa 1, tem forte influência da arquitetura colonial italiana do período tardio. Porém, destaca-se pela preocupação estética, ornada com balcões, guarda-copo e lambrequins. É construída principalmente com madeira (na estrutura, nos pisos, nos forros e nas paredes), pedra (nas fundações) e barro (para fabricação de telhas francesas e tijolos).
              </p>
              <p>
                Para viabilizar a visitação pública, a Casa 2 recebeu elevadores, rampas, passarelas, sanitários e escadas.
              </p>
            </div>
            <div className="mt-16">
              <MosaicGallery images={CASA_2} idPrefix="casa-2" alt="Restauração da Casa 2" />
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Restauração — ocre claro */}
      <CinematicTransition>
        <section id="restauracao" className="bg-ocre/20 text-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">Restauração</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
                Quatro conceitos, <span className="italic text-terracotta">uma memória viva</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              <p>
                O projeto de restauro das casas centenárias onde viveu Hércules Galló e sua família focou em quatro conceitos:
              </p>
              <ul className="space-y-4 list-none pl-0">
                <li>
                  <strong className="text-terracotta">Reconstrução:</strong> restabelecimento exato do estado anterior de uma edificação ou de parte dela que se encontra destruída ou em risco de destruição, mas ainda não em ruínas.
                </li>
                <li>
                  <strong className="text-terracotta">Conservação:</strong> ações destinadas a preservar a autenticidade e prolongar o tempo de vida ou integridade física do bem cultural.
                </li>
                <li>
                  <strong className="text-terracotta">Reabilitação:</strong> adaptação do espaço preexistente a usos diferentes para o qual foi concebido originalmente.
                </li>
                <li>
                  <strong className="text-terracotta">Reprodução/réplica:</strong> cópia exata de parte de elementos ou de elementos completos.
                </li>
              </ul>
            </div>
            <div className="mt-16">
              <MosaicGallery images={RESTAURACAO_IMGS} idPrefix="restauracao-sub" alt="Registros da restauração" />
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Sala Multiuso — bordô */}
      <CinematicTransition>
        <section id="sala-multiuso" className="bg-primary text-primary-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Sala Multiuso</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05] text-marfim">
                Um espaço para o <span className="italic text-ocre">encontro</span>.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-marfim/85 max-w-3xl">
              <p>
                O projeto de implantação do Instituto Hércules Galló inclui a intervenção no entorno das casas, possibilitando a visitação e circulação na área. Além disso, está prevista a construção de uma sala multiuso junto às residências, que será utilizada de diversas formas pelo instituto e pela comunidade.
              </p>
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Plano Diretor — marfim */}
      <CinematicTransition>
        <section id="plano-diretor" className="bg-marfim text-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">Plano Diretor</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
                Um projeto <span className="italic text-terracotta">vivo</span> e contínuo.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              <p>
                Um projeto deve ser vivo, e sua continuidade, constante. O planejamento deve ser feito integralmente e a realização deve vir no tempo certo.
              </p>
              <p>
                Os estudos que foram elaborados para a implantação do instituto contemplam equipamentos de mobilidade, acessibilidade e trânsito. O instituto acredita que a acessibilidade é um caminho para a autonomia de todos e implica não somente na possibilidade de acesso aos espaços físicos, mas também à informação. Por isso, o projeto foi desenvolvido a partir desse conceito.
              </p>
              <p>
                A primeira fase de obras, que bradava pela urgência e pela manutenção do patrimônio histórico antes que se perdesse, está concluída. As próximas fases complementarão a obra para torná-la plena.
              </p>
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Fotos da Restauração — escuro */}
      <CinematicTransition>
        <section id="fotos" className="bg-foreground text-marfim py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Fotos da Restauração</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.05]">
                O olhar sobre a <span className="italic text-ocre">obra</span>.
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-marfim/75 max-w-3xl">
                Registro fotográfico das etapas de restauro das duas casas — do canteiro à entrega — como um diário visual da preservação.
              </p>
            </Reveal>
            <div className="mt-16">
              <MosaicGallery images={FOTOS_RESTAURACAO} idPrefix="fotos-restauracao" alt="Fotografia da restauração das casas" />
            </div>
          </div>
        </section>
      </CinematicTransition>
      </div>
    </>
  );
}