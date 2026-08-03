import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Obrigado pelo contato",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-[#0C1F40] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-[#22C55E]" />
        </div>
        <h1 className="text-3xl font-bold text-[#E8E8ED]">
          Mensagem enviada!
        </h1>
        <p className="text-[#A1A1AA] text-lg">
          Recebemos seu contato e entraremos em breve via WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#22C55E] text-[#0A0A0A] font-bold text-sm hover:bg-[#16A34A] transition-colors"
          >
            Falar no WhatsApp agora
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 text-[#E8E8ED] font-medium text-sm hover:border-white/30 transition-colors"
          >
            Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  );
}
