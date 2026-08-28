"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

export function FloatingWhatsApp() {
  return (
    <div className="hidden md:block fixed bottom-6 right-4 md:right-6 z-50" aria-label="Contato WhatsApp">
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        onClick={() => trackWhatsAppClick("botao_flutuante")}
        className="relative group"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#22C55E] opacity-20 animate-ping" aria-hidden="true" />
        <span className="absolute inset-[-6px] rounded-full border border-[#22C55E]/20 animate-pulse" aria-hidden="true" />

        <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#22C55E] shadow-xl shadow-[#22C55E]/40 group-hover:bg-[#16A34A] group-hover:scale-110 transition-all duration-300">
          <MessageCircle size={26} className="text-[#0A0A0A]" aria-hidden="true" />
        </span>
      </a>
    </div>
  );
}
