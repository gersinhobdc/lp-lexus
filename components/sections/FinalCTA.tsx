"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden" aria-label="CTA final">
      {/* Mesh gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(34,197,94,0.1) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 80% 50%, rgba(30,64,175,0.1) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 50% 100%, rgba(236,72,153,0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #22C55E40, #EC489940, transparent)" }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs tracking-[0.2em] uppercase text-[#22C55E] mb-4"
          >
            Pronto para começar?
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-[var(--font-geist-sans)] text-4xl md:text-6xl font-bold text-[#E8E8ED] mb-6 leading-tight"
          >
            Pronto para viver
            <br />
            <span className="gradient-text">no futuro?</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[#A1A1AA] text-lg max-w-xl mx-auto mb-10"
          >
            Agende sua visita técnica e descubra como transformar seu espaço em
            um ambiente inteligente, seguro e eficiente.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#22C55E] text-[#0A0A0A] px-8 py-4 rounded-full font-bold text-base hover:bg-[#16A34A] transition-all duration-300 shadow-xl shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40 active:scale-95"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Falar no WhatsApp
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-[#E8E8ED] px-8 py-4 rounded-full font-semibold text-base hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <Phone size={20} aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 text-sm text-[#A1A1AA]"
          >
            <ShieldCheck size={16} className="text-[#22C55E]" aria-hidden="true" />
            <span>Atendimento em SP / Capital · Equipe 100% própria da Lexus</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
