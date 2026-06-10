import { z } from "zod";

export const leadSchema = z.object({
  projectType: z.enum(["residencial", "corporativo"]),
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome muito longo"),
  whatsapp: z
    .string()
    .min(10, "WhatsApp inválido")
    .max(20, "WhatsApp inválido")
    .regex(/^[\d\s()+\-]+$/, "Número inválido"),
  city: z
    .string()
    .min(2, "Informe sua cidade")
    .max(80, "Nome de cidade muito longo"),
  interest: z.string().max(500, "Mensagem muito longa").optional(),
  alsoCallable: z.boolean().optional(),
  recaptchaToken: z.string().min(1, "Token reCAPTCHA inválido"),
});

export type LeadInput = z.infer<typeof leadSchema>;
