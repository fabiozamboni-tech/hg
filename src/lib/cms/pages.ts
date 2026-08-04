/** Páginas do site disponíveis no editor visual. */
export type SitePage = { area: string; label: string; path: string; hint: string };

export const SITE_PAGES: SitePage[] = [
  { area: "home", label: "Home", path: "/", hint: "Hero, quem somos, notícias, galeria e agenda" },
  { area: "instituto", label: "Instituto", path: "/instituto", hint: "Quem somos, museu, parcerias, horários" },
  { area: "hercules-gallo", label: "Hércules Galló", path: "/hercules-gallo", hint: "Biografia e legado" },
  { area: "galopolis", label: "Galópolis", path: "/galopolis", hint: "História do bairro e da fábrica" },
  { area: "restauracao", label: "Restauração", path: "/restauracao", hint: "Projeto, casas, plano diretor e fotos" },
  { area: "atividades", label: "Atividades", path: "/atividades", hint: "Programas e ações do Instituto" },
  { area: "novidades", label: "Novidades", path: "/novidades", hint: "Listagem de notícias" },
  { area: "agenda", label: "Agenda", path: "/agenda", hint: "Eventos e programação" },
  { area: "galeria", label: "Galeria", path: "/galeria", hint: "Álbuns de fotos" },
  { area: "contato", label: "Contato", path: "/contato", hint: "Endereço, horários e formulário" },
];
