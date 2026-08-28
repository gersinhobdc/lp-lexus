"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { SITE } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import { ArrowRight, MessageCircle } from "lucide-react";

export function MidCTA() {
  return (
    <section className="py-20 relative overflow-hidden" aria-label="Call to action">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 border-y border-[#22C55E]/10" aria-hidden="true" />

      <div className="section-container relative z-10 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#22C55E] mb-4"
        >
          Visita técnica e consultoria
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="font-[var(--font-geist-sans)] text-3xl md:text-5xl font-bold text-[#E8E8ED] mb-6 leading-tight"
        >
          Descubra o potencial da
          <br />
          <span className="gradient-text">sua casa.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-[#A1A1AA] text-lg mb-10 max-w-xl mx-auto"
        >
          Realizamos visitas técnicas e consultorias em São Paulo para definir o melhor projeto para seu ambiente.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="text-base font-bold"
            onClick={() =>
              document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Quero meu diagnóstico
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("cta_meio")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-[#E8E8ED] hover:border-[#22C55E]/40 hover:text-[#22C55E] transition-all duration-300"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
