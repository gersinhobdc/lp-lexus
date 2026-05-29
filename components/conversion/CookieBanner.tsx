"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const COOKIE_KEY = "lexus-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 glass rounded-2xl p-5 shadow-xl shadow-black/30"
        >
          <div className="flex items-start gap-3 mb-4">
            <Cookie size={20} className="text-[#FACC15] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-[#E8E8ED] mb-1">Usamos cookies</p>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Para melhorar sua experiência e analisar o uso do site. Veja nossa{" "}
                <a href="/politica-privacidade" className="text-[#22C55E] hover:underline">
                  Política de Privacidade
                </a>
                .
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="flex-1 py-2 rounded-lg bg-[#22C55E] text-[#0A0A0A] text-xs font-bold hover:bg-[#16A34A] transition-colors"
            >
              Aceitar
            </button>
            <button
              onClick={decline}
              className="flex-1 py-2 rounded-lg border border-white/10 text-[#A1A1AA] text-xs font-medium hover:text-[#E8E8ED] hover:border-white/20 transition-colors"
            >
              Recusar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
