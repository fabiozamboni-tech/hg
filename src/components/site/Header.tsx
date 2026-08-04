import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logoHG.png.asset.json";

type NavItem = {
  to: string;
  label: string;
  submenu?: { hash: string; label: string }[];
};

const NAV: NavItem[] = [
  { to: "/instituto", label: "Instituto" },
  { to: "/hercules-gallo", label: "Hércules Galló" },
  { to: "/galopolis", label: "Galópolis" },
  {
    to: "/restauracao",
    label: "Restauração",
    submenu: [
      { hash: "o-projeto", label: "O Projeto" },
      { hash: "casa-1", label: "Casa 1" },
      { hash: "casa-2", label: "Casa 2" },
      { hash: "restauracao", label: "Restauração" },
      { hash: "sala-multiuso", label: "Sala Multiuso" },
      { hash: "plano-diretor", label: "Plano Diretor" },
      { hash: "fotos", label: "Fotos da Restauração" },
    ],
  },
  { to: "/atividades", label: "Atividades" },
  { to: "/novidades", label: "Novidades" },
  { to: "/agenda", label: "Agenda" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center"
    >
      <div
        className="mx-auto mt-4 w-[min(100%-1.5rem,80rem)] px-6 md:px-8 flex items-center justify-between h-20 md:h-24 rounded-2xl bg-marfim/85 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(48,32,32,0.35)] border border-border/40 transition-all duration-500"
      >
        <Link to="/" aria-label="Instituto Hércules Galló — página inicial" className="flex items-center">
          <img
            src={logoAsset.url}
            alt="Instituto Hércules Galló"
            className="h-14 md:h-16 w-auto"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-7" aria-label="Principal">
          {NAV.map((n) => (
            n.submenu ? (
              <div key={n.to} className="relative group">
                <Link
                  to={n.to}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-1"
                  activeProps={{ className: "text-primary" }}
                >
                  {n.label}
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="min-w-[220px] rounded-xl bg-marfim/98 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(48,32,32,0.35)] border border-border/40 py-2">
                    {n.submenu.map((s) => (
                      <Link
                        key={s.hash}
                        to={n.to}
                        hash={s.hash}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:bg-ocre/15 hover:text-primary transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            )
          ))}
        </nav>

        <button
          className="lg:hidden min-h-11 min-w-11 grid place-items-center text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          className="lg:hidden bg-marfim/98 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(48,32,32,0.35)] border-b border-border/40"
          aria-label="Menu móvel"
        >
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV.map((n) => (
              <div key={n.to} className="border-b border-border/40">
                <Link
                  to={n.to}
                  className="block text-base py-3 text-foreground/85"
                  activeProps={{ className: "text-primary" }}
                >
                  {n.label}
                </Link>
                {n.submenu && (
                  <div className="pl-4 pb-2 flex flex-col">
                    {n.submenu.map((s) => (
                      <Link
                        key={s.hash}
                        to={n.to}
                        hash={s.hash}
                        className="text-sm py-2 text-foreground/70"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}