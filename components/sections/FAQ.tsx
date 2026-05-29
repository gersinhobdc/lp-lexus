"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FAQS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#282A36]/20" aria-label="Perguntas frequentes">
      <div className="section-container">
        <SectionTitle
          eyebrow="FAQ"
          title="Perguntas"
          titleHighlight="frequentes"
          subtitle="Tire suas dúvidas antes de entrar em contato. Respondemos tudo com transparência."
        />

        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="max-w-3xl mx-auto space-y-3"
        >
          {FAQS.map((faq, i) => (
            <motion.div key={i} variants={fadeUp}>
              <dt>
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 rounded-xl glass text-left hover:border-[#22C55E]/20 transition-colors duration-200 group"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="font-semibold text-[#E8E8ED] text-sm group-hover:text-[#22C55E] transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] group-hover:border-[#22C55E]/30 group-hover:text-[#22C55E] transition-all duration-200"
                    aria-hidden="true"
                  >
                    {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
              </dt>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.dd
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-2 text-[#A1A1AA] text-sm leading-relaxed border-x border-b border-white/5 rounded-b-xl">
                      {faq.answer}
                    </div>
                  </motion.dd>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
