/**
 * Disparo de eventos para o gtag.js (GA4 + Google Ads).
 *
 * O gtag e carregado em app/layout.tsx apenas quando as variaveis de
 * ambiente existem, e pode ser bloqueado por adblock ou pela recusa de
 * cookies. Por isso todo disparo passa por aqui, que vira no-op quando o
 * gtag nao esta disponivel — nenhum clique deve quebrar por causa de
 * rastreamento.
 */

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * `origem` identifica qual botao gerou o clique (hero, rodape, barra
 * mobile...). No GA4 vira um parametro do evento, o que permite ver de
 * onde vem cada contato sem criar um evento por botao.
 */
export function trackWhatsAppClick(origem: string) {
  trackEvent("contato_whatsapp", { origem });
}

export function trackPhoneClick(origem: string) {
  trackEvent("contato_telefone", { origem });
}
