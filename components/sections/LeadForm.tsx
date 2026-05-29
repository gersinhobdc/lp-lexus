"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import {
  CheckCircle,
  Home,
  Building2,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { leadSchema, type LeadInput } from "@/lib/validations";
import { SITE, SCARCITY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

type ProjectType = "residencial" | "corporativo";

const PROJECT_OPTIONS: {
  value: ProjectType;
  label: string;
  description: string;
  icon: typeof Home;
}[] = [
  {
    value: "residencial",
    label: "Residencial",
    description: "Casa, apartamento ou cobertura",
    icon: Home,
  },
  {
    value: "corporativo",
    label: "Corporativo",
    description: "Escritório, loja ou empresa",
    icon: Building2,
  },
];

const TRUST_SEALS = [
  { icon: ShieldCheck, label: "Sem spam" },
  { icon: Clock, label: "Resposta em até 1h" },
  { icon: BadgeCheck, label: "Avaliação gratuita" },
];

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      projectType: undefined,
      name: "",
      whatsapp: "",
      city: "",
      recaptchaToken: "pending",
    },
  });

  const onSubmit = async (data: LeadInput) => {
    if (!projectType) return;

    let token = "no-recaptcha";
    if (executeRecaptcha) {
      try {
        token = await executeRecaptcha("lead_form");
      } catch {
        /* segue sem token se reCAPTCHA falhar */
      }
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, projectType, recaptchaToken: token }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Erro ao enviar");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.";
      toast.error(message);
    }
  };

  const progress = submitted ? 100 : ((step - 1) / 2) * 100;

  return (
    <section
      id="diagnostico"
      className="py-24 relative overflow-hidden"
      aria-label="Formulário de orçamento"
    >
      {/* Glow de fundo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="max-w-xl mx-auto text-center mb-8">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-[#22C55E] mb-3"
          >
            Orçamento gratuito
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-[var(--font-geist-sans)] text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8E8ED] leading-tight"
          >
            Sua casa inteligente começa com{" "}
            <span className="gradient-text">uma conversa.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 text-[#A1A1AA]"
          >
            Responda 2 perguntas rápidas e um especialista entra em contato para agendar
            sua visita técnica — sem custo e sem compromisso.
          </motion.p>

          {/* Escassez honesta */}
          {SCARCITY.slotsLeft > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/25"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FACC15] opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FACC15]" />
              </span>
              <span className="text-xs font-medium text-[#FACC15]">
                Apenas {SCARCITY.slotsLeft} {SCARCITY.label}
              </span>
            </motion.div>
          )}
        </div>

        <div className="max-w-xl mx-auto">
          {/* Progress bar */}
          {!submitted && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-[#A1A1AA] mb-2 font-mono">
                <span>Etapa {step} de 2</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#22C55E] rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            </div>
          )}

          <div className="glass rounded-2xl p-6 md:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center mx-auto mb-6 glow-green"
                  >
                    <CheckCircle size={40} className="text-[#22C55E]" aria-hidden="true" />
                  </motion.div>
                  <h3 className="font-[var(--font-geist-sans)] text-2xl font-bold text-[#E8E8ED] mb-3">
                    Solicitação recebida!
                  </h3>
                  <p className="text-[#A1A1AA] leading-relaxed">
                    Nossa equipe entrará em contato em até{" "}
                    <strong className="text-[#22C55E]">1 hora</strong> para agendar sua
                    visita técnica gratuita.
                  </p>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#22C55E] text-[#0A0A0A] font-bold text-sm hover:bg-[#16A34A] transition-colors"
                  >
                    Falar agora no WhatsApp
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </motion.div>
              ) : step === 1 ? (
                <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible">
                  <h3 className="font-semibold text-[#E8E8ED] mb-1 text-lg">
                    Qual é o tipo de projeto?
                  </h3>
                  <p className="text-sm text-[#A1A1AA] mb-6">
                    Selecione para começar.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PROJECT_OPTIONS.map(({ value, label, description, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setProjectType(value);
                          setStep(2);
                        }}
                        className={cn(
                          "flex flex-col items-start gap-3 p-5 rounded-xl border text-left transition-all duration-200",
                          projectType === value
                            ? "border-[#22C55E] bg-[#22C55E]/10"
                            : "border-white/8 bg-white/[0.02] hover:border-[#22C55E]/30"
                        )}
                        aria-pressed={projectType === value}
                      >
                        <span
                          className={cn(
                            "w-11 h-11 rounded-lg flex items-center justify-center transition-colors",
                            projectType === value
                              ? "bg-[#22C55E]/20 text-[#22C55E]"
                              : "bg-white/5 text-[#A1A1AA]"
                          )}
                        >
                          <Icon size={22} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-[#E8E8ED]">
                            {label}
                          </span>
                          <span className="block text-xs text-[#A1A1AA] mt-0.5">
                            {description}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible">
                  <h3 className="font-semibold text-[#E8E8ED] mb-1 text-lg">
                    Quase lá! Como podemos te chamar?
                  </h3>
                  <p className="text-sm text-[#A1A1AA] mb-6">
                    Só precisamos do essencial para entrar em contato.
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <input type="hidden" {...register("projectType")} value={projectType ?? ""} />
                    <input type="hidden" {...register("recaptchaToken")} value="pending" />

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#E8E8ED] mb-1.5">
                        Nome completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="João Silva"
                        {...register("name")}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-[#E8E8ED] placeholder-[#A1A1AA]/50 text-sm transition-colors",
                          "focus:outline-none focus:border-[#22C55E]/60 focus:bg-[#22C55E]/5",
                          errors.name ? "border-red-500/50" : "border-white/8"
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-[#E8E8ED] mb-1.5">
                        WhatsApp
                      </label>
                      <input
                        id="whatsapp"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(11) 99999-9999"
                        {...register("whatsapp")}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-[#E8E8ED] placeholder-[#A1A1AA]/50 text-sm transition-colors",
                          "focus:outline-none focus:border-[#22C55E]/60 focus:bg-[#22C55E]/5",
                          errors.whatsapp ? "border-red-500/50" : "border-white/8"
                        )}
                      />
                      {errors.whatsapp && (
                        <p className="mt-1 text-xs text-red-400" role="alert">
                          {errors.whatsapp.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-[#E8E8ED] mb-1.5">
                        Cidade
                      </label>
                      <input
                        id="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="São Paulo"
                        {...register("city")}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-[#E8E8ED] placeholder-[#A1A1AA]/50 text-sm transition-colors",
                          "focus:outline-none focus:border-[#22C55E]/60 focus:bg-[#22C55E]/5",
                          errors.city ? "border-red-500/50" : "border-white/8"
                        )}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-400" role="alert">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <Button type="submit" size="lg" className="w-full mt-2" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Falar com um especialista agora
                          <ArrowRight size={18} aria-hidden="true" />
                        </>
                      )}
                    </Button>

                    {/* Selos de confiança */}
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1">
                      {TRUST_SEALS.map(({ icon: Icon, label }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-1.5 text-[11px] text-[#A1A1AA]"
                        >
                          <Icon size={13} className="text-[#22C55E]" aria-hidden="true" />
                          {label}
                        </span>
                      ))}
                    </div>

                    <p className="text-[10px] text-[#A1A1AA]/60 text-center">
                      Protegido por reCAPTCHA. Seus dados são tratados conforme nossa{" "}
                      <a
                        href="/politica-privacidade"
                        className="text-[#22C55E]/70 hover:text-[#22C55E]"
                      >
                        Política de Privacidade
                      </a>
                      .
                    </p>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="block mx-auto text-xs text-[#A1A1AA] hover:text-[#22C55E] transition-colors"
                    >
                      ← Voltar
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
