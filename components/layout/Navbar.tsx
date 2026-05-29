"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Navbar minimal — sem menu de navegação (landing page de conversão).
 * Apenas logo + 1 CTA único, para não distrair o visitante do objetivo.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToForm = () =>
    document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" });

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-white/5 py-3" : "bg-transparent py-5"
      )}
      role="banner"
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" aria-label="Lexus Automação Inteligente — topo da página">
          <LexusLogo />
        </a>

        {/* CTA único */}
        <div className="flex items-center gap-3">
          {/* Telefone clicável — desktop */}
          <a
            href={`tel:${SITE.phone}`}
            className="hidden sm:flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#22C55E] transition-colors"
          >
            <Phone size={15} aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <Button size="sm" onClick={scrollToForm}>
            Orçamento gratuito
          </Button>
        </div>
      </div>
    </header>
  );
}

function LexusLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/images/logo-lexus.png"
        alt="Lexus Automação Inteligente"
        width={120}
        height={108}
        priority
        className="h-9 md:h-10 w-auto"
      />
      <div className="leading-none">
        <p className="font-[var(--font-geist-sans)] font-bold text-base md:text-lg text-[#E8E8ED] tracking-wide">
          LEXUS
        </p>
        <p className="font-mono text-[8px] tracking-[0.18em] text-[#A1A1AA] uppercase mt-0.5">
          Automação Inteligente
        </p>
      </div>
    </div>
  );
}
