"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Monitor, Sun, Check, ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { LED_PANELS } from "@/lib/constants";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

const ICONS = { Monitor, Sun } as const;

export function LedPanels() {
  return (
    <section id="paineis-led" className="py-24 tech-divider" aria-label="Painéis de LED">
      <div className="section-container">
        <SectionTitle
          eyebrow="Comunicação visual"
          title="Painéis de LED"
          titleHighlight="indoor e outdoor"
          subtitle="Venda e instalação de painéis de LED de alto brilho para lojas, empresas e fachadas."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid md:grid-cols-2 gap-6"
        >
          {LED_PANELS.map((panel) => {
            const Icon = ICONS[panel.icon as keyof typeof ICONS];
            return (
              <motion.article
                key={panel.id}
                variants={fadeUp}
                className="group relative glass rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300"
              >
                {/* Imagem do painel */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0C1F40]">
                  <Image
                    src={panel.image}
                    alt={panel.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, rgba(12,31,64,0.85) 100%)",
                    }}
                    aria-hidden="true"
                  />
                </div>

                <div className="relative p-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${panel.color}18`,
                      border: `1px solid ${panel.color}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: panel.color }} aria-hidden="true" />
                  </div>

                  <h3 className="font-[var(--font-geist-sans)] text-lg font-bold text-[#E8E8ED] mb-2">
                    {panel.title}
                  </h3>

                  <p className="text-sm text-[#E8E8ED]/85 leading-relaxed mb-4">
                    {panel.description}
                  </p>

                  <ul className="space-y-1.5 mb-5" role="list">
                    {panel.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-[#E8E8ED]/75">
                        <Check size={12} style={{ color: panel.color }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                    style={{ color: panel.color }}
                    onClick={() =>
                      document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Solicitar orçamento
                    <ArrowRight size={12} aria-hidden="true" />
                  </button>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: `linear-gradient(90deg, ${panel.color}, transparent)` }}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
