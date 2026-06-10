import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { leadSchema } from "@/lib/validations";
import { getRatelimit } from "@/lib/ratelimit";

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY || token === "no-recaptcha") return true;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });
    const data = (await res.json()) as { success: boolean; score: number };
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

function emailTemplate(data: {
  name: string;
  whatsapp: string;
  city: string;
  projectType: string;
}): string {
  const projectLabels: Record<string, string> = {
    residencial: "Residencial",
    corporativo: "Corporativo",
  };

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#1C1D27;font-family:system-ui,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:linear-gradient(135deg,#FACC1520,#22C55E20);border:1px solid #22C55E30;border-radius:16px;overflow:hidden">
      <div style="background:#22C55E;padding:20px 28px">
        <p style="margin:0;color:#1C1D27;font-weight:700;font-size:18px">🏠 Novo Lead — Lexus Automação</p>
      </div>
      <div style="padding:28px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #ffffff10;color:#A1A1AA;font-size:13px;width:40%">Nome</td><td style="padding:10px 0;border-bottom:1px solid #ffffff10;color:#E8E8ED;font-size:13px;font-weight:600">${data.name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #ffffff10;color:#A1A1AA;font-size:13px">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #ffffff10;color:#E8E8ED;font-size:13px;font-weight:600">${data.whatsapp}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #ffffff10;color:#A1A1AA;font-size:13px">Cidade</td><td style="padding:10px 0;border-bottom:1px solid #ffffff10;color:#E8E8ED;font-size:13px;font-weight:600">${data.city}</td></tr>
          <tr><td style="padding:10px 0;color:#A1A1AA;font-size:13px">Tipo de projeto</td><td style="padding:10px 0;color:#E8E8ED;font-size:13px;font-weight:600">${projectLabels[data.projectType] ?? data.projectType}</td></tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:#22C55E15;border-radius:10px;border:1px solid #22C55E30">
          <p style="margin:0;color:#22C55E;font-size:13px;font-weight:600">🆕 Novo lead recebido — entre em contato</p>
        </div>
        <p style="margin:20px 0 0;color:#A1A1AA;font-size:12px">Lexus Automação Inteligente · lexus.automacao@gmail.com · (11) 5668-7773</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const rl = getRatelimit();
  if (rl) {
    try {
      const { success } = await rl.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: "Muitas tentativas. Tente novamente em 10 minutos." },
          { status: 429 }
        );
      }
    } catch (e) {
      console.warn("[RATELIMIT] Upstash unavailable, skipping:", e);
    }
  }

  // Parse + validate
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, whatsapp, city, projectType, recaptchaToken } = parsed.data;

  // reCAPTCHA
  const captchaOk = await verifyRecaptcha(recaptchaToken);
  if (!captchaOk) {
    return NextResponse.json({ error: "Falha na verificação de segurança." }, { status: 403 });
  }

  // Send email
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_placeholder")) {
    console.log("[LEAD]", { name, whatsapp, city, projectType });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "noreply@lexusbr.com",
    to: process.env.RESEND_TO_EMAIL ?? "lexus.automacao@gmail.com",
    subject: `🏠 Novo lead: ${name} — ${projectType} (${city})`,
    html: emailTemplate({ name, whatsapp, city, projectType }),
  });

  if (error) {
    console.error("[RESEND ERROR]", JSON.stringify(error, null, 2));
    console.error("[RESEND ERROR] from=", process.env.RESEND_FROM_EMAIL, "to=", process.env.RESEND_TO_EMAIL);
    return NextResponse.json({ error: "Erro ao enviar email. Tente novamente." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
