"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "lexus-exit-popup-shown";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // desktop only
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-title"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-full max-w-md glass rounded-2xl p-8"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#E8E8ED] transition-colors"
              aria-label="Fechar popup"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center mb-5">
              <Download size={22} className="text-[#22C55E]" aria-hidden="true" />
            </div>

            <h2 id="exit-popup-title" className="font-[var(--font-geist-sans)] text-2xl font-bold text-[#E8E8ED] mb-2">
              Antes de sair...
            </h2>
            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6">
              Receba nosso <strong className="text-[#E8E8ED]">catálogo exclusivo de projetos</strong> com
              inspirações reais de casas e escritórios inteligentes em São Paulo.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                close();
              }}
              className="space-y-3"
            >
              <input
                type="email"
                placeholder="seu@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8 text-[#E8E8ED] placeholder-[#A1A1AA]/50 text-sm focus:outline-none focus:border-[#22C55E]/60 transition-colors"
              />
              <Button type="submit" size="md" className="w-full">
                Quero receber
              </Button>
            </form>

            <button
              onClick={close}
              className="mt-4 w-full text-xs text-[#A1A1AA]/60 hover:text-[#A1A1AA] transition-colors"
            >
              Não, obrigado
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
