import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import { MapPin, Phone, Mail, Clock, Accessibility } from "lucide-react";
import { toast } from "sonner";
import heroTerritorio from "@/assets/hero-territorio.jpg";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Instituto Hércules Galló" },
      { name: "description", content: "Fale com o Instituto Hércules Galló. Endereço, horários, acessibilidade e formulário para agendamento de visitas." },
      { property: "og:title", content: "Contato — Instituto Hércules Galló" },
      { property: "og:description", content: "Agende sua visita ao museu de território de Galópolis." },
    ],
  }),
  component: Contato,
});

const schema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  assunto: z.string().min(3, "Informe o assunto"),
  mensagem: z.string().min(10, "Mensagem curta demais"),
});
type Form = z.infer<typeof schema>;

function Contato() {
  const [enviando, setEnviando] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    setEnviando(true);
    await new Promise((r) => setTimeout(r, 700));
    console.info("Mensagem recebida:", data);
    toast.success("Mensagem enviada. Nossa equipe responde em até dois dias úteis.");
    reset();
    setEnviando(false);
  };

  return (
    <>
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img
          src={heroTerritorio}
          alt="Vista do território de Galópolis"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/50 to-foreground/20" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Contato</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Venha, escreva, agende.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
        <section className="relative mx-auto max-w-7xl px-6 lg:px-10 py-20 grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Onde estamos</p>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="text-primary shrink-0 mt-0.5" /><span>Rua Galópolis, s/n<br/>Bairro Galópolis · Caxias do Sul — RS<br/>CEP 95086-000</span></li>
              <li className="flex gap-3"><Phone size={18} className="text-primary shrink-0 mt-0.5" /><span>(54) 3000-0000</span></li>
              <li className="flex gap-3"><Mail size={18} className="text-primary shrink-0 mt-0.5" /><span>contato@herculesgallo.org.br</span></li>
              <li className="flex gap-3"><Clock size={18} className="text-primary shrink-0 mt-0.5" /><span>Terça a domingo · 9h às 17h30<br/>Fechado às segundas</span></li>
              <li className="flex gap-3"><Accessibility size={18} className="text-primary shrink-0 mt-0.5" /><span>Acessibilidade: rampas, banheiro adaptado e material tátil disponível na recepção.</span></li>
            </ul>
          </div>

          <div className="aspect-[4/3] w-full overflow-hidden border border-border">
            <iframe
              title="Mapa do Instituto Hércules Galló"
              src="https://www.google.com/maps?q=Gal%C3%B3polis%2C+Caxias+do+Sul+-+RS&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-7">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Fale conosco</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="nome" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Nome</label>
              <input
                id="nome"
                {...register("nome")}
                className="w-full border border-input bg-background px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                aria-invalid={!!errors.nome}
              />
              {errors.nome && <p className="mt-1 text-xs text-destructive">{errors.nome.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">E-mail</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full border border-input bg-background px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="assunto" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Assunto</label>
              <select
                id="assunto"
                {...register("assunto")}
                className="w-full border border-input bg-background px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                aria-invalid={!!errors.assunto}
                defaultValue=""
              >
                <option value="" disabled>Escolha um tema</option>
                <option>Agendamento de visita</option>
                <option>Programa Escola no Museu</option>
                <option>Pesquisa e acervo</option>
                <option>Parcerias</option>
                <option>Imprensa</option>
                <option>Outro</option>
              </select>
              {errors.assunto && <p className="mt-1 text-xs text-destructive">{errors.assunto.message}</p>}
            </div>
            <div>
              <label htmlFor="mensagem" className="block text-xs tracking-widest uppercase text-muted-foreground mb-2">Mensagem</label>
              <textarea
                id="mensagem"
                rows={6}
                {...register("mensagem")}
                className="w-full border border-input bg-background px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                aria-invalid={!!errors.mensagem}
              />
              {errors.mensagem && <p className="mt-1 text-xs text-destructive">{errors.mensagem.message}</p>}
            </div>
            <button
              type="submit"
              disabled={enviando}
              className="text-xs tracking-[0.25em] uppercase bg-primary text-primary-foreground px-8 py-4 hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </Reveal>
      </section>
      </div>
    </>
  );
}