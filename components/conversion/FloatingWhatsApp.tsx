"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { SITE } from "@/lib/constants";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-2" aria-label="Contato WhatsApp">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="glass rounded-xl px-4 py-3 max-w-[180px] text-right relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#282A36] border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#E8E8ED]"
              aria-label="Fechar tooltip"
            >
              <X size={10} aria-hidden="true" />
            </button>
            <p className="text-xs font-medium text-[#E8E8ED]">Responde em menos de 5 min!</p>
            <p className="text-[10px] text-[#A1A1AA] mt-0.5">Fale com um especialista</p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp — responde em menos de 5 minutos"
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
