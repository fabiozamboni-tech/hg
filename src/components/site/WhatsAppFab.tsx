import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/5554981140507?text=Ol%C3%A1%20Marina%2C%20quero%20fazer%20um%20pedido"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[oklch(0.65_0.17_150)] px-5 py-4 text-sm font-medium text-white shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
      }`}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Peça agora</span>
    </a>
  );
}
