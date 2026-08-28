"use client";

import { SITE } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * Link de WhatsApp com rastreamento, para uso dentro de Server Components
 * (que nao podem ter onClick). Nas secoes que ja sao client o onClick e
 * aplicado direto no <a>.
 */
export function TrackedWhatsAppLink({
  origem,
  className,
  children,
}: {
  origem: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(origem)}
      className={className}
    >
      {children}
    </a>
  );
}
