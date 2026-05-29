"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, viewportConfig } from "@/lib/animations";

export function Testimonials() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="depoimentos" className="py-24 bg-[#282A36]/30 overflow-hidden" aria-label="Depoimentos de clientes">
      <div className="section-container">
        <SectionTitle
          eyebrow="Depoimentos"
          title="O que nossos clientes"
          titleHighlight="dizem"
        />
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 px-8">
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex-none w-[85vw] sm:w-[420px] glass rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1" role="img" aria-label={`${t.rating} estrelas`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[#FACC15] text-[#FACC15]" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#E8E8ED] text-sm leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-9 h-9 rounded-full bg-[#22C55E] flex items-center justify-center text-[#0A0A0A] text-xs font-bold"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#E8E8ED]">{t.name}</p>
                  <p className="text-xs text-[#A1A1AA]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="section-container mt-8 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Indicadores do carrossel">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Depoimento ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "bg-[#22C55E] w-6" : "bg-white/20 w-1.5"
              }`}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Depoimento anterior"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#22C55E] hover:border-[#22C55E]/30 transition-all duration-200"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Próximo depoimento"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#22C55E] hover:border-[#22C55E]/30 transition-all duration-200"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
