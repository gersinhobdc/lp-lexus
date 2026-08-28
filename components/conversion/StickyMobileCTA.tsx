"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { SITE } from "@/lib/constants";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.3);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-area-pb"
          aria-label="CTA mobile fixo"
        >
          <div className="glass border-t border-white/10 px-4 py-3 grid grid-cols-3 gap-2">
            <button
              onClick={() =>
                document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex flex-col items-center gap-1 py-2 rounded-xl bg-[#22C55E] text-[#0A0A0A] transition-all active:scale-95"
            >
              <CalendarCheck size={20} aria-hidden="true" />
              <span className="text-[10px] font-bold leading-none">Orçamento</span>
            </button>
            <a
              href={`tel:${SITE.phone}`}
              onClick={() => trackPhoneClick("barra_mobile")}
              className="flex flex-col items-center gap-1 py-2 rounded-xl border border-white/10 text-[#E8E8ED] hover:border-white/20 transition-all active:scale-95"
            >
              <Phone size={20} aria-hidden="true" />
              <span className="text-[10px] font-semibold leading-none">Ligar</span>
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("barra_mobile")}
              className="flex flex-col items-center gap-1 py-2 rounded-xl border border-[#22C55E]/30 text-[#22C55E] hover:bg-[#22C55E]/10 transition-all active:scale-95"
            >
              <MessageCircle size={20} aria-hidden="true" />
              <span className="text-[10px] font-semibold leading-none">WhatsApp</span>
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
