"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type LucideProps, Home, Building2, ShieldCheck, Volume2, Wifi, Check, ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SERVICES } from "@/lib/constants";
import { staggerContainer, fadeUp, viewportConfig } from "@/lib/animations";
import { useRef } from "react";

const ICONS = { Home, Building2, ShieldCheck, Volume2, Wifi } as const;

export function Services() {
  return (
    <section id="servicos" className="py-24 bg-[#13284D]/35" aria-label="Nossos serviços">
      <div className="section-container">
        <SectionTitle
          eyebrow="O que fazemos"
          title="Soluções completas em"
          titleHighlight="automação"
          subtitle="Do diagnóstico à instalação, cuidamos de tudo para que você só precise apertar um botão."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <ServiceCard key={service.id} service={service} Icon={Icon} />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  Icon,
}: {
  service: (typeof SERVICES)[number];
  Icon: React.ComponentType<LucideProps>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      variants={fadeUp}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="group relative glass rounded-2xl p-6 overflow-hidden hover:border-white/15 transition-all duration-300 cursor-default"
    >
      {/* Colored glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${service.color}18 0%, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}
      >
        <Icon size={22} style={{ color: service.color }} aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="font-[var(--font-geist-sans)] text-lg font-bold text-[#E8E8ED] mb-2">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">{service.description}</p>

      {/* Features */}
      <ul className="space-y-1.5 mb-5" role="list">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
            <Check size={12} style={{ color: service.color }} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>

      {/* Bottom indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
        aria-hidden="true"
      />

      {/* CTA link */}
      <button
        className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
        style={{ color: service.color }}
        onClick={() =>
          document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Solicitar orçamento
        <ArrowRight size={12} aria-hidden="true" />
      </button>
    </motion.div>
  );
}
