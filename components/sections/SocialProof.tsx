"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRANDS, STATS } from "@/lib/constants";
import { fadeUp, viewportConfig } from "@/lib/animations";

export function SocialProof() {
  return (
    <section
      id="parceiros"
      className="py-16 border-y border-white/5 bg-[#282A36]/40"
      aria-label="Parceiros e estatísticas"
    >
      {/* Stats */}
      <div className="section-container mb-10">
        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
          {STATS.slice(0, 3).map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-[#22C55E] font-[var(--font-geist-sans)]">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="text-xs text-[#A1A1AA] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Label */}
      <p className="text-center font-mono text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA]/60 mb-6">
        Integramos as melhores tecnologias do mundo
      </p>

      {/* Marquee de logos */}
      <div
        className="relative overflow-hidden"
        aria-label="Marcas e tecnologias parceiras"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div
          className="flex gap-14 items-center"
          style={{ animation: "marquee 36s linear infinite", width: "max-content" }}
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <BrandLogo key={`${brand.name}-${i}`} name={brand.name} src={brand.src} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="shrink-0 flex items-center justify-center h-16 w-36 rounded-xl bg-white/90 px-4 py-3 opacity-70 hover:opacity-100 transition-opacity duration-300">
      <Image
        src={src}
        alt={name}
        width={160}
        height={56}
        className="max-h-10 w-auto object-contain"
      />
    </div>
  );
}
