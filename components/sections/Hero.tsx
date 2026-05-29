"use client";

import { motion } from "framer-motion";
import { ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ParticleField } from "@/components/ui/ParticleField";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background video + gradient fallback */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/hero-poster.svg"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          aria-hidden="true"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay — escurece o suficiente para o texto, deixando o vídeo visível */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.12) 0%, transparent 60%), linear-gradient(180deg, rgba(28,29,39,0.55) 0%, rgba(28,29,39,0.45) 40%, rgba(28,29,39,0.75) 80%, #1C1D27 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Animated particle network — circuitos/conexões inteligentes */}
      <ParticleField className="absolute inset-0 z-0" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 section-container text-center pt-28 pb-20"
      >
        {/* Eyebrow */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-4 py-2 rounded-full">
            <Zap size={12} aria-hidden="true" />
            Automação Premium · São Paulo
          </span>
        </motion.div>

        {/* H1 — foco na transformação, não no produto */}
        <motion.h1
          variants={fadeUp}
          className="font-[var(--font-geist-sans)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#E8E8ED] leading-[1.05] tracking-tight mb-6"
        >
          Viva em uma casa
          <br />
          que <span className="gradient-text">pensa por você.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Iluminação, segurança, climatização e som integrados em um único toque.
          Mais de <strong className="text-[#E8E8ED]">500 ambientes inteligentes</strong> entregues
          em São Paulo — com a engenharia e o acabamento que o seu projeto merece.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Button
            size="lg"
            className="text-base font-bold shadow-xl shadow-[#22C55E]/20"
            onClick={() =>
              document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Quero meu orçamento gratuito
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver projetos
          </Button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#A1A1AA]"
        >
          <span>
            <strong className="text-[#E8E8ED]">500+</strong> projetos entregues
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
          <span>
            <strong className="text-[#E8E8ED]">16+</strong> anos de experiência
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
          <span>
            <strong className="text-[#E8E8ED]">98%</strong> clientes satisfeitos
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#A1A1AA] hover:text-[#22C55E] transition-colors cursor-pointer group"
        onClick={() =>
          document.getElementById("parceiros")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Rolar para baixo"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} aria-hidden="true" />
        </motion.div>
      </motion.button>
    </section>
  );
}
