import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { WhatsAppFab } from "./WhatsAppFab";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

export function SiteLayout({ children }: { children: ReactNode }) {
  useSmoothScroll();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
