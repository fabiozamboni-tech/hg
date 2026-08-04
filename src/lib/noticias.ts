export type Noticia = {
  id: string;
  data: string; // ISO
  titulo: string;
  categoria: string;
  resumo: string;
  imagem: string;
  conteudo: string[];
  imagens?: string[];
};

import heroCasaNoite from "@/assets/hero-casa-noite.jpg.asset.json";
import heroCasaPedra from "@/assets/hero-casa-pedra.jpg.asset.json";
import heroCasaJardim from "@/assets/hero-casa-jardim.jpg.asset.json";
import heroCasaGrupo from "@/assets/hero-casa-grupo.jpg.asset.json";
import arq1 from "@/assets/arquivo-1.jpg";
import arq2 from "@/assets/arquivo-2.jpg";
import arq3 from "@/assets/arquivo-3.jpg";
import arq4 from "@/assets/arquivo-4.jpg";
import arq5 from "@/assets/arquivo-5.jpg";
import arq6 from "@/assets/arquivo-6.jpg";

export const NOTICIAS: Noticia[] = [
  {
    id: "restauro-casa-nostra",
    data: "2026-07-15",
    titulo: "Restauro da Casa Nostra entra em nova fase",
    categoria: "Patrimônio",
    resumo:
      "Equipe de restauro conclui reforço estrutural dos alicerces de basalto e inicia o tratamento das madeiras originais.",
    imagem: heroCasaPedra.url,
    conteudo: [
      "A equipe de restauro do Instituto Hércules Galló concluiu o reforço estrutural dos alicerces de basalto da Casa Nostra e inicia agora a etapa mais delicada do projeto: o tratamento das madeiras originais das paredes e do telhado.",
      "Cada peça é catalogada, higienizada e recebe tratamento contra cupins e umidade antes de ser recolocada em sua posição original. Onde a madeira já não pode ser recuperada, entram substituições feitas com o mesmo tipo de araucária, preparadas artesanalmente por marceneiros da região.",
      "A previsão é que esta fase seja concluída até o final do próximo semestre, quando a casa passará a receber visitação mediada.",
    ],
    imagens: [arq1, arq2, arq3, arq4],
  },
  {
    id: "acervo-digital-fase-2",
    data: "2026-07-02",
    titulo: "Acervo digital ganha nova plataforma de consulta",
    categoria: "Memória",
    resumo:
      "Mais de 1.200 fotografias históricas passam a ser acessíveis ao público, com curadoria expandida da equipe do Instituto.",
    imagem: heroCasaJardim.url,
    conteudo: [
      "O Instituto Hércules Galló lança a segunda fase de seu acervo digital, disponibilizando ao público mais de 1.200 fotografias históricas de Galópolis, da fábrica de tecidos e das famílias imigrantes que ergueram o bairro.",
      "A nova plataforma reúne curadoria expandida, com legendas contextualizadas, datação estimada e possibilidade de busca por temas — trabalho fabril, vida doméstica, festas religiosas, arquitetura e território.",
      "O trabalho de digitalização é resultado de uma parceria com pesquisadores da UCS e voluntários da comunidade, que ao longo de dois anos recuperaram álbuns e negativos em fase avançada de deterioração.",
    ],
    imagens: [arq5, arq6, arq1, arq2],
  },
  {
    id: "parceria-unesco",
    data: "2026-06-18",
    titulo: "Galópolis pleiteia reconhecimento como paisagem cultural",
    categoria: "Instituto",
    resumo:
      "Instituto Hércules Galló articula dossiê com o IPHAN e universidades para inscrição do bairro em programa nacional.",
    imagem: heroCasaNoite.url,
    conteudo: [
      "O Instituto Hércules Galló, em articulação com o IPHAN e universidades da região, prepara o dossiê para a inscrição de Galópolis no programa nacional de Paisagens Culturais Brasileiras.",
      "A candidatura reúne o conjunto arquitetônico da antiga vila operária, a fábrica de tecidos, a rede de casas em basalto e madeira e o modo de vida que resiste no cotidiano do bairro.",
      "O reconhecimento abre caminho para novas fontes de financiamento e para políticas públicas específicas de preservação, sem congelar a vida da comunidade.",
    ],
    imagens: [heroCasaNoite.url, arq3, arq4, arq5],
  },
  {
    id: "escolas-2026",
    data: "2026-06-05",
    titulo: "Programa Escola no Museu recebe 3 mil estudantes",
    categoria: "Educativo",
    resumo:
      "Turmas da rede pública participam de roteiros mediados sobre imigração italiana e a história da fábrica de tecidos.",
    imagem: heroCasaGrupo.url,
    conteudo: [
      "O programa Escola no Museu, mantido pelo Instituto Hércules Galló em parceria com a Secretaria Municipal de Educação, recebeu mais de 3 mil estudantes da rede pública ao longo do primeiro semestre.",
      "As turmas participam de roteiros mediados que atravessam a história da imigração italiana, o desenvolvimento da fábrica de tecidos e o cotidiano das famílias operárias que ergueram Galópolis.",
      "A atividade integra o eixo educativo do Instituto e é oferecida gratuitamente às escolas mediante agendamento prévio.",
    ],
    imagens: [heroCasaGrupo.url, arq6, arq1, arq2],
  },
];