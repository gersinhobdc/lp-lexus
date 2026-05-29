"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SITE, PROJECT_SHOWCASE } from "@/lib/constants";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";

const InstagramIcon = ({ size = 18, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Projects() {
  return (
    <section id="projetos" className="py-24 bg-[#1C1D27]" aria-label="Projetos realizados">
      <div className="section-container">
        <SectionTitle
          eyebrow="Portfólio"
          title="Veja nossa automação"
          titleHighlight="em ação"
          subtitle="Mais de 500 ambientes entregues em São Paulo. Acompanhe nossos projetos e resultados reais no Instagram."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        >
          {PROJECT_SHOWCASE.map((project) => (
            <motion.a
              key={project.title}
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className={`group relative rounded-2xl overflow-hidden bg-[#282A36] border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between p-6 min-h-[220px] ${project.span}`}
            >
              {/* Glow de fundo na cor do projeto */}
              <div
                className="absolute inset-0 opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse 70% 80% at 80% 20%, ${project.color}1f 0%, transparent 65%)`,
                }}
                aria-hidden="true"
              />

              {/* Topo: badge + play */}
              <div className="relative flex items-start justify-between">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: `${project.color}1f`,
                    color: project.color,
                    border: `1px solid ${project.color}33`,
                  }}
                >
                  {project.category}
                </span>
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${project.color}1f`,
                    border: `1px solid ${project.color}40`,
                  }}
                >
                  <ArrowUpRight
                    size={16}
                    className="translate-x-0.5"
                    style={{ color: project.color }}
                    aria-hidden="true"
                  />
                </span>
              </div>

              {/* Base: título + descrição */}
              <div className="relative mt-8">
                <h3 className="font-[var(--font-geist-sans)] font-bold text-[#E8E8ED] text-xl mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">
                  {project.description}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: project.color }}
                >
                  <InstagramIcon size={13} color={project.color} />
                  Ver no Instagram
                  <ArrowUpRight
                    size={13}
                    className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Instagram */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center"
        >
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#FACC15] via-[#EC4899] to-[#1E40AF] text-white font-bold text-sm hover:opacity-90 transition-opacity duration-300 group"
          >
            <InstagramIcon size={18} color="#fff" />
            Acompanhe @lexus.automacao
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              aria-hidden="true"
            />
          </a>
          <p className="text-xs text-[#A1A1AA]/70 mt-3">
            Novos projetos toda semana.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
