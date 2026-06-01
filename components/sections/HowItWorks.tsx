"use client";

import { motion } from "framer-motion";
import { Search, FileText, CheckCircle } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { HOW_IT_WORKS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

const ICONS = { Search, FileText, CheckCircle } as const;

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-[#0F1E3D]/30" aria-label="Como funciona">
      <div className="section-container">
        <SectionTitle
          eyebrow="Processo"
          title="Do contato à"
          titleHighlight="casa inteligente"
          subtitle="Três etapas simples para transformar seu espaço. Sem obras desnecessárias, sem surpresas."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="relative"
        >
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-[#22C55E]/30 to-transparent"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = ICONS[step.icon as keyof typeof ICONS];
              return (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="relative text-center lg:text-left"
                >
                  {/* Step number + icon */}
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 mb-5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center glow-green">
                        <Icon size={28} className="text-[#22C55E]" aria-hidden="true" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#22C55E] text-[#0A0A0A] text-xs font-bold flex items-center justify-center font-mono">
                        {i + 1}
                      </span>
                    </div>
                    <div className="hidden lg:block">
                      <p className="font-mono text-4xl font-bold text-[#22C55E]/15 leading-none">
                        {step.step}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-[var(--font-geist-sans)] text-xl font-bold text-[#E8E8ED] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
