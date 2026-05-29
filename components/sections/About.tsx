"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";
import { slideInLeft, slideInRight, viewportConfig } from "@/lib/animations";
import { Shield, Award } from "lucide-react";

export function About() {
  return (
    <section id="sobre" className="py-24 bg-[#1C1D27]" aria-label="Sobre a Lexus">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image / visual side */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#282A36] border border-white/5">
              <Image
                src="/images/sobre/showroom.jpeg"
                alt="Showroom da Lexus Automação Inteligente em São Paulo"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay para legibilidade dos badges */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,15,0.1) 0%, transparent 30%, transparent 60%, rgba(10,10,15,0.6) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Badge */}
              <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 flex items-center gap-3">
                <Award size={20} className="text-[#FACC15]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#E8E8ED]">Empresa Premium</p>
                  <p className="text-[10px] text-[#A1A1AA]">16+ anos em SP</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 glass rounded-xl p-4 flex items-center gap-2 glow-green">
              <Shield size={18} className="text-[#22C55E]" aria-hidden="true" />
              <p className="text-xs font-semibold text-[#E8E8ED]">Garantia 12 meses</p>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#22C55E] mb-4">
              Sobre nós
            </p>
            <h2 className="font-[var(--font-geist-sans)] text-3xl md:text-4xl font-bold text-[#E8E8ED] mb-5 leading-tight">
              Referência em automação{" "}
              <span className="gradient-text">inteligente em SP</span>
            </h2>
            <p className="text-[#A1A1AA] leading-relaxed mb-8">
              Há mais de 16 anos transformamos residências e empresas em São Paulo com tecnologia de
              ponta. Nossa equipe é formada por técnicos certificados, apaixonados por
              criar experiências que unem conforto, segurança e eficiência energética.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4">
                  <p className="text-2xl font-bold text-[#22C55E] font-[var(--font-geist-sans)]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-[#A1A1AA] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
