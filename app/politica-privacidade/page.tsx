import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Saiba como a Lexus Automação Inteligente coleta, usa e protege seus dados pessoais conforme a LGPD.",
};

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-[#1C1D27] text-[#E8E8ED]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#22C55E] hover:underline mb-10"
        >
          ← Voltar à página inicial
        </Link>

        <h1 className="font-[var(--font-geist-sans)] text-4xl font-bold mb-2">
          Política de Privacidade
        </h1>
        <p className="text-[#A1A1AA] text-sm mb-10">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-[#A1A1AA] leading-relaxed">
          <section>
            <h2 className="text-[#E8E8ED] text-xl font-semibold mb-3">1. Quem somos</h2>
            <p>
              <strong className="text-[#E8E8ED]">{SITE.name}</strong>,
              localizada em {SITE.address.full}, é responsável pelo tratamento dos dados
              pessoais coletados neste site, conforme a Lei Geral de Proteção de Dados (LGPD —
              Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-[#E8E8ED] text-xl font-semibold mb-3">2. Dados coletados</h2>
            <p>Coletamos os seguintes dados quando você preenche nosso formulário de contato:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de WhatsApp</li>
              <li>Informações sobre o imóvel (tipo e metragem)</li>
            </ul>
            <p className="mt-3">
              Também coletamos dados de navegação automaticamente via cookies e ferramentas de
              analytics (Google Analytics, Meta Pixel) para melhorar nossa experiência.
            </p>
          </section>

          <section>
            <h2 className="text-[#E8E8ED] text-xl font-semibold mb-3">3. Finalidade do uso</h2>
            <p>Seus dados são utilizados exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Entrar em contato para agendar visita técnica</li>
              <li>Enviar orçamento personalizado</li>
              <li>Comunicações relacionadas ao serviço solicitado</li>
              <li>Melhoria contínua do nosso site e serviços</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#E8E8ED] text-xl font-semibold mb-3">4. Compartilhamento</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para
              fins comerciais. Podemos compartilhar dados com prestadores de serviço essenciais
              (como plataformas de email) sob obrigação contratual de confidencialidade.
            </p>
          </section>

          <section>
            <h2 className="text-[#E8E8ED] text-xl font-semibold mb-3">5. Seus direitos (LGPD)</h2>
            <p>Você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Confirmar a existência de tratamento</li>
              <li>Acessar seus dados</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
            </ul>
            <p className="mt-3">
              Para exercer seus direitos, entre em contato:{" "}
              <a href={`mailto:${SITE.email}`} className="text-[#22C55E] hover:underline">
                {SITE.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-[#E8E8ED] text-xl font-semibold mb-3">6. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso
              não autorizado, perda ou divulgação indevida. Nosso site usa HTTPS e não armazena
              dados de cartão de crédito.
            </p>
          </section>

          <section>
            <h2 className="text-[#E8E8ED] text-xl font-semibold mb-3">7. Contato</h2>
            <p>
              Dúvidas sobre esta política? Fale conosco:{" "}
              <a href={`mailto:${SITE.email}`} className="text-[#22C55E] hover:underline">
                {SITE.email}
              </a>{" "}
              ou{" "}
              <a href={`tel:${SITE.phone}`} className="text-[#22C55E] hover:underline">
                {SITE.phoneDisplay}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
