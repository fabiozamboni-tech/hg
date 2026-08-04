import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-[oklch(0.22_0.035_40)] text-[oklch(0.94_0.02_78)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <p className="font-display text-3xl leading-none">
            Que <span className="italic text-[oklch(0.78_0.115_85)]">Brigadeiro</span>
          </p>
          <p className="mt-4 max-w-md text-sm text-[oklch(0.85_0.02_78)]/80">
            Confeitaria autoral em Caxias do Sul. Mais de 50 sabores de brigadeiros
            gourmet feitos artesanalmente por Marina De David.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[oklch(0.78_0.115_85)]">
            Navegação
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sobre" className="hover:text-[oklch(0.78_0.115_85)]">A Que Brigadeiro</Link></li>
            <li><Link to="/cardapio" className="hover:text-[oklch(0.78_0.115_85)]">Cardápio</Link></li>
            <li><Link to="/eventos" className="hover:text-[oklch(0.78_0.115_85)]">Eventos</Link></li>
            <li><Link to="/contato" className="hover:text-[oklch(0.78_0.115_85)]">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[oklch(0.78_0.115_85)]">
            Onde nos encontrar
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.78_0.115_85)]" />
              <span>Bairro Pio X<br />Caxias do Sul — RS</span>
            </li>
            <li>
              <a
                href="https://wa.me/5554981140507"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[oklch(0.78_0.115_85)]"
              >
                <MessageCircle className="h-4 w-4" /> (54) 98114-0507
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[oklch(0.78_0.115_85)]"
              >
                <Instagram className="h-4 w-4" /> @quebrigadeiro
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-[oklch(0.85_0.02_78)]/60">
        © {new Date().getFullYear()} Que Brigadeiro — Feito com carinho na Serra Gaúcha.
      </div>
    </footer>
  );
}
