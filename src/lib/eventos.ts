export type Evento = {
  id: string;
  data: string; // ISO
  titulo: string;
  categoria: "Exposição" | "Concerto" | "Encontro" | "Educativo";
  resumo: string;
  local: string;
};

export const EVENTOS: Evento[] = [
  {
    id: "expo-basalto",
    data: "2026-09-14",
    titulo: "Basalto — a pedra que fez cidade",
    categoria: "Exposição",
    resumo: "Mostra fotográfica sobre as técnicas construtivas trazidas pelos imigrantes italianos e o restauro contemporâneo das casas de Galópolis.",
    local: "Casa Nostra · Sala 1",
  },
  {
    id: "concerto-outono",
    data: "2026-08-22",
    titulo: "Concerto de Outono — Coral Galópolis",
    categoria: "Concerto",
    resumo: "Repertório italiano tradicional interpretado no adro da igreja histórica, ao pôr do sol.",
    local: "Praça da Igreja",
  },
  {
    id: "encontro-memoria",
    data: "2026-07-30",
    titulo: "Roda de memória com descendentes",
    categoria: "Encontro",
    resumo: "Conversa aberta com filhas e netos das operárias da antiga fábrica de tecidos, mediada pela equipe de curadoria.",
    local: "Auditório do Instituto",
  },
  {
    id: "visita-escolar",
    data: "2026-07-10",
    titulo: "Programa Escola no Museu",
    categoria: "Educativo",
    resumo: "Roteiro guiado para turmas do fundamental com material didático sobre imigração e patrimônio.",
    local: "Percurso do Museu de Território",
  },
  {
    id: "expo-tecidos",
    data: "2026-05-18",
    titulo: "Fios de uma indústria",
    categoria: "Exposição",
    resumo: "Instalação com peças originais dos teares da fábrica de tecidos que marcou o bairro por mais de um século.",
    local: "Galeria Principal",
  },
  {
    id: "aniversario",
    data: "2026-04-06",
    titulo: "148 anos da Colônia",
    categoria: "Encontro",
    resumo: "Programação de dia inteiro com missa, culinária típica, apresentações musicais e visitas guiadas gratuitas.",
    local: "Todo o território",
  },
];

export const upcoming = () =>
  EVENTOS.filter((e) => new Date(e.data) >= new Date()).sort((a, b) => a.data.localeCompare(b.data));
export const past = () =>
  EVENTOS.filter((e) => new Date(e.data) < new Date()).sort((a, b) => b.data.localeCompare(a.data));

export function formatBR(iso: string) {
  const [y, m, d] = iso.split("-");
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${d} ${meses[Number(m) - 1]} ${y}`;
}