import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Clock, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CinematicTransition } from "@/components/motion";
import { PageContentBg } from "@/components/site/PageContentBg";
import heroCasas from "@/assets/hero-casas.jpg";
import qs1 from "@/assets/quem-somos/qs-c0785f79.jpg";
import qs2 from "@/assets/quem-somos/qs-e8104e6f.jpg";
import qs3 from "@/assets/quem-somos/qs-f4c72b6c.jpg";
import qs4 from "@/assets/quem-somos/qs-61606b2f.jpg";
import qs5 from "@/assets/quem-somos/qs-914456f9.jpg";
import qs6 from "@/assets/quem-somos/qs-8e7d7ce0.jpg";
import qs7 from "@/assets/quem-somos/qs-8148749e.jpg";
import qs8 from "@/assets/quem-somos/qs-e17ebf5f.jpg";
import qs9 from "@/assets/quem-somos/qs-ce48242b.jpg";
import qs10 from "@/assets/quem-somos/qs-e4468ebd.jpg";
import qs11 from "@/assets/quem-somos/qs-cd493cc6.jpg";

export const Route = createFileRoute("/instituto")({
  head: () => ({
    meta: [
      { title: "O Instituto — Hércules Galló" },
      { name: "description", content: "Quem somos, o museu, parcerias, horários e palavra do presidente do Instituto Hércules Galló." },
      { property: "og:title", content: "O Instituto Hércules Galló" },
      { property: "og:description", content: "Uma casa dedicada à memória de Galópolis — história, museu, parcerias e visitação." },
    ],
  }),
  component: InstitutoOnePage,
});

const GALERIA = [qs1, qs2, qs3, qs4, qs5, qs6, qs7, qs8, qs9, qs10, qs11];

const SECOES = [
  { id: "quem-somos", label: "Quem somos" },
  { id: "museu", label: "Museu" },
  { id: "parcerias", label: "Parcerias" },
  { id: "horarios", label: "Horários" },
  { id: "palavra", label: "Palavra do Presidente" },
] as const;

function InstitutoOnePage() {
  return (
    <>
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img
          src={heroCasas}
          alt="Casas históricas em pedra basáltica de Galópolis"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/20" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">O Instituto</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Uma casa dedicada à memória de Galópolis.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
      {/* Quem Somos — bloco marfim */}
      <CinematicTransition>
        <section id="quem-somos" className="scroll-mt-40 bg-marfim text-foreground py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">01 · Quem somos</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05]">
                Inspirado no <span className="italic text-terracotta">imigrante</span> que empresta seu nome.
              </h2>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Inspirado na figura emblemática do imigrante italiano que empresta seu nome, o Instituto Hércules
                Galló nasceu da vontade dos descendentes de preservar a memória do empreendedor do setor têxtil da
                Serra Gaúcha. O propósito inicial do Instituto é ser tutor do conjunto de residências restauradas,
                localizadas em Galópolis, bairro de Caxias do Sul (RS), mas também transformar o local em um centro
                voltado à cultura e à memória.
              </p>
              <p>
                O Instituto se propõe a ser agente gerador de projetos culturais e educacionais e ser pensante nas
                questões de preservação e atrações para Galópolis. A ideia é interagir com a comunidade, apoiando
                movimentos no mundo das artes, acolhendo exposições, encontros, mostras e palestras. Além disso, o
                IHG quer chamar atenção para outras edificações existentes em Galópolis que mereçam atenção enquanto
                Patrimônio Histórico Local.
              </p>
              <p>
                O Instituto também quer motivar a comunidade do bairro e de Caxias do Sul a encontrar caminhos para
                atrair turismo cultural e de lazer. Estabelecer vínculos com outros institutos e organizações que
                tenham os mesmos intuitos, em âmbito regional, nacional ou internacional, é outra meta importante do
                IHG.
              </p>
              <div className="pt-6">
                <p className="text-[11px] tracking-[0.3em] uppercase text-terracotta">Diretoria</p>
                <ul className="mt-4 grid sm:grid-cols-3 gap-4 text-foreground">
                  <li className="border-l-2 border-terracotta pl-4">
                    <p className="font-serif text-lg">José Galló</p>
                    <p className="text-sm text-muted-foreground">Empresário e neto de Hércules Galló</p>
                  </li>
                  <li className="border-l-2 border-terracotta pl-4">
                    <p className="font-serif text-lg">Renato Solio</p>
                    <p className="text-sm text-muted-foreground">Arquiteto e bisneto de Hércules Galló</p>
                  </li>
                  <li className="border-l-2 border-terracotta pl-4">
                    <p className="font-serif text-lg">Christiano Antoniazzi Galló</p>
                    <p className="text-sm text-muted-foreground">Bisneto de Hércules Galló</p>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Galeria estilo mosaico (idêntica à galeria de restauração da home) */}
          <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-16">
            <MosaicGallery images={GALERIA} idPrefix="quem-somos" />
          </div>
        </section>
      </CinematicTransition>

      {/* Museu — bloco escuro */}
      <CinematicTransition>
        <section id="museu" className="scroll-mt-40 bg-foreground text-marfim py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">02 · Museu</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05]">
                O acervo da <span className="italic text-ocre">indústria têxtil</span> de Galópolis.
              </h2>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8 space-y-6 text-base md:text-lg text-marfim/80 leading-relaxed">
              <p>
                Após o restauro das casas, a segunda fase de atuação do Instituto Hércules Galló consiste na
                montagem do acervo do museu, que funcionará nas casas restauradas. A ideia é preservar a história da
                indústria têxtil de Galópolis e da região, que têm seu desenvolvimento profundamente ligado ao setor.
              </p>
              <p>
                Está previsto um memorial com peças, mobiliário, utensílios, documentos, roupas e outros objetos que
                preservem a história de Hércules Galló.
              </p>
            </Reveal>
          </div>
        </section>
      </CinematicTransition>

      {/* Parcerias — bloco bordô */}
      <CinematicTransition>
        <section id="parcerias" className="scroll-mt-40 bg-primary text-primary-foreground py-24 md:py-32 rounded-t-[2rem]">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">03 · Parcerias</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05]">
                Uma parceria com a <span className="italic text-ocre">cidade</span>.
              </h2>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8 space-y-6 text-base md:text-lg text-primary-foreground/85 leading-relaxed">
              <p>
                A ligação do Instituto com a prefeitura de Caxias do Sul iniciou com o processo de tombamento das
                residências de Hércules Galló pelo Patrimônio Histórico Municipal, em 2010.
              </p>
              <p>
                Com duração de dois anos, a intervenção nas casas foi conduzida pelo escritório de arquitetura Uaná
                Design, sob coordenação dos arquitetos Renato Solio e Roque Frizzo.
              </p>
              <p>
                Concluída essa etapa, o IHG e o poder público municipal retomam a parceria para colocar o espaço à
                disposição de visitantes.
              </p>
            </Reveal>
          </div>
        </section>
      </CinematicTransition>

      {/* Horários — bloco ocre/marfim */}
      <CinematicTransition>
        <section
          id="horarios"
          className="scroll-mt-40 py-24 md:py-32 rounded-t-[2rem]"
          style={{ backgroundImage: "linear-gradient(180deg, oklch(0.92 0.04 75) 0%, oklch(0.96 0.02 75) 100%)" }}
        >
          <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">04 · Horários</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05] text-foreground">
                Visite o <span className="italic text-terracotta">Instituto</span>.
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <Reveal delay={80} className="bg-marfim rounded-2xl p-8 shadow-[0_20px_50px_-30px_rgba(48,32,32,0.35)]">
                <Clock className="text-terracotta mx-auto" size={26} />
                <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mt-4">Funcionamento</p>
                <p className="mt-3 font-serif text-xl text-foreground">Terça a Sábado</p>
                <p className="text-sm text-muted-foreground mt-1">13h30 às 17h30</p>
                <p className="text-xs text-muted-foreground/80 mt-4 italic">
                  Excepcionalmente, sob consulta, poderá haver visitação com agendamento.
                </p>
              </Reveal>
              <Reveal delay={160} className="bg-marfim rounded-2xl p-8 shadow-[0_20px_50px_-30px_rgba(48,32,32,0.35)]">
                <MapPin className="text-terracotta mx-auto" size={26} />
                <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mt-4">Endereço</p>
                <p className="mt-3 font-serif text-xl text-foreground">BR 116, nº 1579</p>
                <p className="text-sm text-muted-foreground mt-1">Galópolis · Caxias do Sul / RS</p>
              </Reveal>
              <Reveal delay={240} className="bg-marfim rounded-2xl p-8 shadow-[0_20px_50px_-30px_rgba(48,32,32,0.35)]">
                <Phone className="text-terracotta mx-auto" size={26} />
                <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mt-4">Contato</p>
                <p className="mt-3 font-serif text-xl text-foreground">54 3028.2810</p>
                <p className="text-sm text-muted-foreground mt-1">Agendamento para grupos</p>
              </Reveal>
            </div>
          </div>
        </section>
      </CinematicTransition>

      {/* Palavra do Presidente — bloco escuro/terracota */}
      <CinematicTransition>
        <section
          id="palavra"
          className="scroll-mt-40 py-24 md:py-32 rounded-t-[2rem] text-marfim"
          style={{ backgroundImage: "linear-gradient(180deg, oklch(0.28 0.06 30) 0%, oklch(0.22 0.05 30) 100%)" }}
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">05 · Palavra do Presidente</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.05]">
                Preservar e aprender com o <span className="italic text-ocre">passado</span>.
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-12 space-y-6 text-base md:text-lg text-marfim/85 leading-relaxed">
              <p>
                O trabalho de intervenção na recuperação e manutenção das duas residências que pertenceram a
                Hércules Galló e a criação do Instituto que leva seu nome é a nossa contribuição para a memória do
                bairro de Galópolis e de seu município, Caxias do Sul, proporcionando à comunidade um espaço
                adequado para preservar e conhecer a sua história.
              </p>
              <p>
                O Instituto Hércules Galló pretende, além de resguardar o passado da localidade e de seus
                personagens, apoiar movimentos e ações voltadas para a cultura e educação através de exposições,
                encontros, mostras, palestras e oficinas. Com isso, o IHG não quer ser reconhecido apenas como
                museu, mas como uma instituição de caráter essencial para o fomento e o desenvolvimento cultural,
                social e turístico de Galópolis.
              </p>
              <p>
                O Instituto também desempenhará um importante papel nas questões de preservação das demais
                edificações históricas e culturais de Galópolis, apoiando e defendendo o Patrimônio Histórico local.
              </p>
              <p className="font-serif text-2xl italic text-ocre border-l-2 border-ocre pl-6">
                Preservar e aprender com o passado é garantir o futuro de uma nação.
              </p>
            </Reveal>
          </div>
        </section>
      </CinematicTransition>
      </div>
    </>
  );
}

function MosaicGallery({ images, idPrefix }: { images: string[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const spans = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <>
      <div className="grid grid-cols-4 auto-rows-[110px] md:auto-rows-[160px] gap-3 md:gap-4">
        {images.map((src, i) => (
          <motion.button
            key={i}
            layoutId={`${idPrefix}-${i}`}
            onClick={() => setOpen(i)}
            className={`${spans[i % spans.length]} group relative overflow-hidden rounded-2xl shadow-[0_25px_60px_-30px_rgba(48,32,32,0.5)] focus:outline-none focus:ring-2 focus:ring-terracotta`}
            aria-label="Ampliar imagem"
          >
            <img
              src={src}
              alt="Registro fotográfico do Instituto Hércules Galló"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            key={`lightbox-${idPrefix}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 text-marfim h-11 w-11 grid place-items-center z-10"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            <motion.div
              layoutId={`${idPrefix}-${open}`}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="max-w-5xl w-full overflow-hidden rounded-2xl"
            >
              <img
                src={images[open]}
                alt="Imagem ampliada"
                className="max-h-[80vh] w-auto mx-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}