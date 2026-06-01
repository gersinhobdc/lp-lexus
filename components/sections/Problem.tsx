"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

const PROBLEMS = [
  "Cabos expostos por toda a parede",
  "10+ controles diferentes na gaveta",
  "Câmeras de segurança que não gravam",
  "WiFi fraco nos quartos e garagem",
  "Luzes esquecidas acesas o dia todo",
  "Sistema de som que ninguém sabe usar",
];

const SOLUTIONS = [
  "Instalação 100% sem fios aparentes",
  "Um único app controla tudo",
  "CFTV 4K com gravação em nuvem 24/7",
  "Mesh WiFi cobertura total do imóvel",
  "Automações que desligam tudo ao sair",
  "Som multiroom simples e intuitivo",
];

export function Problem() {
  return (
    <section id="problemas" className="py-24 bg-[#0A1628]" aria-label="Problemas e soluções">
      <div className="section-container">
        <SectionTitle
          eyebrow="O que muda com a Lexus"
          title="Sua casa já tem"
          titleHighlight="essas soluções?"
          subtitle="Reconhece algum desses cenários? A Lexus resolve cada um com tecnologia premium e instalação sem dor de cabeça."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Problems column */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-red-400/70 mb-5">Antes da Lexus</p>
            <ul className="space-y-3" role="list">
              {PROBLEMS.map((problem) => (
                <motion.li
                  key={problem}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center" aria-hidden="true">
                    <X size={12} className="text-red-400" />
                  </span>
                  <span className="text-[#A1A1AA] text-sm leading-relaxed">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Solutions column */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[#22C55E]/70 mb-5">Com a Lexus</p>
            <ul className="space-y-3" role="list">
              {SOLUTIONS.map((solution) => (
                <motion.li
                  key={solution}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-4 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/15"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#22C55E]/15 flex items-center justify-center" aria-hidden="true">
                    <Check size={12} className="text-[#22C55E]" />
                  </span>
                  <span className="text-[#E8E8ED] text-sm leading-relaxed font-medium">{solution}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
