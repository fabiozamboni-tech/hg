import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-marfim mt-0 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4 relative z-10">
        <div className="md:col-span-2">
          <div className="inline-block bg-marfim p-3 rounded-2xl shadow-lg">
            <img src={logo} alt="Instituto Hércules Galló" className="h-16 w-auto" />
          </div>
          <p className="mt-6 text-sm text-marfim/70 max-w-md leading-relaxed">
            Museu de território que preserva a memória da imigração italiana, da arquitetura basáltica
            e da indústria têxtil no bairro de Galópolis, Caxias do Sul — RS.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" aria-label="Instagram" className="grid place-items-center h-11 w-11 rounded-xl border border-marfim/25 hover:bg-terracotta hover:border-terracotta transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="grid place-items-center h-11 w-11 rounded-xl border border-marfim/25 hover:bg-terracotta hover:border-terracotta transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-marfim/50 mb-4">Navegação</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/instituto" className="text-marfim/80 hover:text-ocre">O Instituto</Link></li>
            <li><Link to="/atividades" className="text-marfim/80 hover:text-ocre">Atividades</Link></li>
            <li><Link to="/novidades" className="text-marfim/80 hover:text-ocre">Novidades</Link></li>
            <li><Link to="/agenda" className="text-marfim/80 hover:text-ocre">Agenda</Link></li>
            <li><Link to="/galeria" className="text-marfim/80 hover:text-ocre">Galeria</Link></li>
            <li><Link to="/contato" className="text-marfim/80 hover:text-ocre">Contato</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-marfim/50 mb-4">Visite-nos</p>
          <ul className="space-y-3 text-sm text-marfim/80">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /><span>Rua Galópolis, s/n<br/>Galópolis · Caxias do Sul — RS</span></li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" /><span>(54) 3000-0000</span></li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0" /><span>contato@herculesgallo.org.br</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-marfim/10 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-marfim/50">
          <p>© {new Date().getFullYear()} Instituto Hércules Galló. Todos os direitos reservados.</p>
          <p>Galópolis · Patrimônio vivo da Serra Gaúcha</p>
        </div>
      </div>
    </footer>
  );
}