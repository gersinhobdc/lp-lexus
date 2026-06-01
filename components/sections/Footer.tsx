"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/constants";
import { fadeUp, viewportConfig } from "@/lib/animations";

const QUICK_LINKS = [
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
  { label: "Diagnóstico", href: "#diagnostico" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#282A36]/60 border-t border-white/5" aria-label="Rodapé">
      <div className="section-container py-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Col 1: Brand */}
          <div>
            <FooterLogo />
            <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed max-w-xs">
              Especialistas em automação residencial premium em São Paulo. Tecnologia de ponta, instalação sem obra.
            </p>
            <div className="flex gap-3 mt-5">
              <SocialLinkSvg href={SITE.instagram} label="Instagram" icon="instagram" />
              <SocialLinkSvg href={SITE.youtube} label="YouTube" icon="youtube" />
              <SocialLinkSvg href={SITE.facebook} label="Facebook" icon="facebook" />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-[#A1A1AA]">
              <Clock size={14} className="text-[#22C55E]" aria-hidden="true" />
              {SITE.hours.weekdays}
            </div>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h3 className="font-semibold text-[#E8E8ED] mb-4 text-sm">Links Rápidos</h3>
            <ul className="space-y-2" role="list">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#A1A1AA] hover:text-[#22C55E] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="font-semibold text-[#E8E8ED] mb-4 text-sm">Contato</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-start gap-2.5 text-sm text-[#A1A1AA] hover:text-[#22C55E] transition-colors"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2.5 text-sm text-[#A1A1AA] hover:text-[#22C55E] transition-colors"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-[#A1A1AA] hover:text-[#22C55E] transition-colors"
                >
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden="true" />
                  {SITE.address.full}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Map */}
          <div>
            <h3 className="font-semibold text-[#E8E8ED] mb-4 text-sm">Localização</h3>
            <div className="rounded-xl overflow-hidden border border-white/5 aspect-video">
              <iframe
                title="Localização da Lexus Automação Inteligente"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.address.full)}&output=embed&z=15`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background: "linear-gradient(90deg, transparent, #22C55E30, #EC489930, transparent)",
          }}
          aria-hidden="true"
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A1A1AA]">
          <p>
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="/politica-privacidade" className="hover:text-[#22C55E] transition-colors">
              Política de Privacidade
            </a>
            <span className="text-sm">CNPJ {SITE.cnpj}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SOCIAL_SVGS: Record<string, React.ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
};

function SocialLinkSvg({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#22C55E] hover:border-[#22C55E]/30 transition-all duration-200"
    >
      {SOCIAL_SVGS[icon]}
    </a>
  );
}

function FooterLogo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/images/logo-lexus.png"
        alt="Lexus Automação Inteligente"
        width={120}
        height={108}
        className="h-11 w-auto"
      />
      <div className="leading-none">
        <p className="font-[var(--font-geist-sans)] font-bold text-lg text-[#E8E8ED] tracking-wide">
          LEXUS
        </p>
        <p className="font-mono text-[8px] tracking-[0.18em] text-[#A1A1AA] uppercase mt-0.5">
          Automação Inteligente
        </p>
      </div>
    </div>
  );
}
