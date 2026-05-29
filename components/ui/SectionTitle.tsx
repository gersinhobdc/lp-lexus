"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, viewportConfig } from "@/lib/animations";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#22C55E] mb-3"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="font-[var(--font-geist-sans)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8E8ED] leading-tight"
      >
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className={cn(
            "mt-4 text-[#A1A1AA] text-lg max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
