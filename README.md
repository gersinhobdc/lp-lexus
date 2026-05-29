# Lexus Automação Inteligente — Landing Page

Landing page de alta conversão para a **Lexus Automação Inteligente**, empresa premium de automação residencial e corporativa em São Paulo. Construída com Next.js 16, Tailwind CSS v4, Framer Motion e integração completa de captura de leads.

---

## 🎯 KPIs e Objetivos

| Métrica | Meta |
|---|---|
| Lighthouse Mobile Performance | ≥ 85 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Taxa de conversão (leads/visitas) | > 3% |

---

## 🛠 Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Estilização | Tailwind CSS v4 (CSS-based config) |
| Animações | Framer Motion 12 |
| Ícones | Lucide React |
| Scroll suave | Lenis |
| Formulário | React Hook Form + Zod |
| Email | Resend |
| Anti-spam | reCAPTCHA v3 |
| Rate limiting | Upstash Redis |
| Carrossel | Embla Carousel + Autoplay |
| Toasts | Sonner |
| Analytics | @vercel/analytics + @vercel/speed-insights |
| SEO | next-sitemap + Schema.org LocalBusiness |
| Deploy | Vercel |

---

## 🚀 Setup Local

### Pré-requisitos

- Node.js 20+
- npm 10+
- Conta no [Resend](https://resend.com) (email)
- Conta no [Upstash](https://console.upstash.com) (rate limiting)
- Chaves do [Google reCAPTCHA v3](https://www.google.com/recaptcha/admin/create)

### 1. Clone e instale

```bash
git clone <seu-repositório>
cd lp-lexus
npm install
```

### 2. Configure variáveis de ambiente

```bash
cp .env.example .env.local
# Edite .env.local com seus valores reais
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
# Acesse http://localhost:3000
```

---

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Onde obter |
|---|---|---|
| `RESEND_API_KEY` | Chave da API Resend | [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Email remetente (domínio verificado) | Resend → Domains |
| `RESEND_TO_EMAIL` | Email destino dos leads | — |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Site Key reCAPTCHA v3 | [google.com/recaptcha](https://www.google.com/recaptcha/admin/create) |
| `RECAPTCHA_SECRET_KEY` | Secret Key reCAPTCHA v3 | Mesmo painel |
| `UPSTASH_REDIS_REST_URL` | URL REST do Upstash | [console.upstash.com](https://console.upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Token do Upstash | Mesmo painel |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | Google Analytics |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | GTM |
| `NEXT_PUBLIC_SITE_URL` | URL de produção | — |
| `NEXT_PUBLIC_WHATSAPP_LINK` | Link WhatsApp (wa.link) | wa.me |
| `NEXT_PUBLIC_PHONE` | Telefone E.164 | — |
| `NEXT_PUBLIC_EMAIL` | Email de contato | — |

> ⚠️ Nunca commite `.env.local`. Apenas `.env.example` vai para o repositório.

---

## ☁️ Deploy na Vercel

### Passo a passo

1. **Crie o projeto** em [vercel.com/new](https://vercel.com/new) → importe o repositório GitHub

2. **Adicione as variáveis de ambiente**:
   - Dashboard → Settings → Environment Variables
   - Adicione todas as variáveis do `.env.example` com valores reais
   - Escopos: Production + Preview + Development

3. **Instale a Vercel CLI** (opcional):
   ```bash
   npm i -g vercel
   vercel deploy --prod
   ```

4. **Configure o domínio**:
   - Dashboard → Settings → Domains → adicione `lexusbr.com`

5. **Verifique o sitemap** (pós-deploy):
   ```
   https://lexusbr.com/sitemap.xml
   ```
   Submeta no [Google Search Console](https://search.google.com/search-console).

---

## 📁 Estrutura de Pastas

```
lp-lexus/
├── app/
│   ├── api/lead/route.ts           # API: captura de leads (rate limit + reCAPTCHA + Resend)
│   ├── politica-privacidade/       # Página LGPD
│   ├── globals.css                 # Tema Tailwind v4 + variáveis da marca
│   ├── layout.tsx                  # Root layout + fontes + providers + metadados SEO
│   └── page.tsx                    # Landing page + Schema.org LocalBusiness
│
├── components/
│   ├── layout/Navbar.tsx           # Navbar glassmorphism + menu mobile animado
│   ├── sections/                   # Seções da landing (funil AIDA em ordem)
│   │   ├── Hero.tsx                # Hero 100vh, vídeo de fundo, gradiente animado
│   │   ├── SocialProof.tsx         # Marquee de marcas parceiras + 3 stats
│   │   ├── Problem.tsx             # Dores (X vermelho) vs Soluções (✓ verde)
│   │   ├── Services.tsx            # 5 cards glassmorphism com tilt 3D
│   │   ├── MidCTA.tsx              # CTA de quebra de seção
│   │   ├── HowItWorks.tsx          # Timeline 3 passos (horizontal/vertical)
│   │   ├── Projects.tsx            # Grid masonry de projetos
│   │   ├── Testimonials.tsx        # Carrossel Embla autoplay 5s
│   │   ├── About.tsx               # Counters animados + split layout
│   │   ├── FAQ.tsx                 # Accordion com AnimatePresence
│   │   ├── LeadForm.tsx            # Formulário multi-step 3 etapas + reCAPTCHA
│   │   ├── FinalCTA.tsx            # CTA final com mesh gradient
│   │   └── Footer.tsx              # 4 colunas + mapa Google
│   ├── conversion/                 # Elementos de conversão fixos
│   │   ├── FloatingWhatsApp.tsx    # Botão WA flutuante, pulse, tooltip 3s
│   │   ├── StickyMobileCTA.tsx     # Barra CTA mobile (scroll > 30%)
│   │   ├── ExitIntentPopup.tsx     # Popup exit intent (desktop, mouseleave topo)
│   │   └── CookieBanner.tsx        # Banner LGPD cookies
│   ├── ui/
│   │   ├── Button.tsx              # Button: primary / outline / secondary / ghost
│   │   ├── SectionTitle.tsx        # Título padronizado com eyebrow + gradient
│   │   └── AnimatedCounter.tsx     # Counter numérico animado on-scroll
│   └── providers/
│       ├── SmoothScrollProvider.tsx  # Lenis smooth scroll
│       └── RecaptchaProvider.tsx     # Google reCAPTCHA v3
│
├── lib/
│   ├── constants.ts                # ← EDITE AQUI o conteúdo do site
│   ├── utils.ts                    # cn() utilitário
│   ├── animations.ts               # Variantes Framer Motion reutilizáveis
│   ├── validations.ts              # Schema Zod do formulário
│   └── ratelimit.ts                # Upstash rate limiter (singleton)
│
├── public/
│   ├── videos/hero-bg.mp4          # ← Adicione o vídeo do hero aqui
│   ├── images/projects/            # ← Adicione fotos dos projetos aqui
│   ├── images/brands/              # ← Adicione logos das marcas parceiras aqui
│   └── og-image.jpg                # ← OG Image 1200×630px
│
├── .env.example                    # Template (commitar)
├── .env.local                      # Valores reais (NÃO commitar)
├── next.config.ts                  # Headers CSP + configuração de imagens
└── next-sitemap.config.js          # Configuração do sitemap
```

---

## ✏️ Como Editar o Conteúdo

Todo conteúdo editorial está em **`lib/constants.ts`**. Edite sem tocar nos componentes:

| Constante | O que controla |
|---|---|
| `SITE` | Nome, telefone, email, endereço, redes sociais, WhatsApp |
| `STATS` | 4 estatísticas da seção "Sobre" |
| `SERVICES` | 5 cards de serviços (título, descrição, cor, features) |
| `BRANDS` | Marcas do marquee (nome + caminho do SVG) |
| `TESTIMONIALS` | Depoimentos do carrossel |
| `FAQS` | Perguntas e respostas do accordion |
| `HOW_IT_WORKS` | 3 passos da timeline |

### Adicionar imagens reais dos projetos

1. Coloque em `public/images/projects/projeto-nome.jpg`
2. Edite o array `PROJECTS` em `components/sections/Projects.tsx`
3. Substitua o `<div>` placeholder por `<Image src="..." alt="..." fill />`

### Adicionar o vídeo do hero

1. Exporte em H.264, 1920×1080, máx. 8MB
2. Coloque em `public/videos/hero-bg.mp4`
3. Exporte um frame como `public/images/hero-poster.jpg` (substituir o SVG atual)

### Adicionar logos das marcas parceiras

1. Exporte SVGs das marcas em `public/images/brands/nome.svg`
2. No `SocialProof.tsx`, substitua o `BrandBadge` por um `<Image>` com o SVG

---

## 🔌 Serviços Externos — Como Configurar

### Resend
1. Crie conta → adicione domínio `lexusbr.com` → verifique DNS
2. Crie API Key com permissão de envio
3. Configure `RESEND_FROM_EMAIL` com email do domínio verificado

### Google reCAPTCHA v3
1. [google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create)
2. Tipo: **reCAPTCHA v3** | Domínios: `lexusbr.com`, `localhost`
3. Copie Site Key e Secret Key para o `.env.local`

### Upstash Redis
1. [console.upstash.com](https://console.upstash.com) → New Database
2. Region: **South America (São Paulo)**
3. Copie REST URL e REST Token

---

## 🧪 Comandos

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Build produção + gera sitemap
npm run start        # Serve o build de produção
npm run lint         # ESLint
npx tsc --noEmit     # Type-check TypeScript
```

---

## 📈 Próximos Passos Sugeridos

### Curto prazo (antes do lançamento)
- [ ] Adicionar vídeo real do hero (`public/videos/hero-bg.mp4`)
- [ ] Adicionar fotos reais dos projetos (`public/images/projects/`)
- [ ] Criar OG Image (`public/og-image.jpg`, 1200×630px)
- [ ] Verificar domínio no Resend e testar envio de email
- [ ] Submeter sitemap no Google Search Console
- [ ] Configurar Google Analytics e GTM

### Médio prazo
- [ ] **A/B Testing** do headline e CTA com Vercel Edge Config
- [ ] **Blog SEO** em `/blog` com artigos sobre automação (MDX)
- [ ] **CRM Webhook** no `/api/lead` para HubSpot / Pipedrive
- [ ] **Chat ao vivo** — Chatwoot ou Crisp para atendimento imediato

### Longo prazo
- [ ] **Calculadora de preços** interativa
- [ ] **CMS headless** (Sanity/Contentful) para edição sem código
- [ ] **Área do cliente** para acompanhamento de projetos

---

## 🛡️ Segurança

- Headers CSP configurados em `next.config.ts` (X-Frame-Options, X-Content-Type-Options, etc.)
- Inputs validados com Zod antes de qualquer processamento
- Rate limiting: 3 req / 10 min por IP via Upstash
- reCAPTCHA v3 com score mínimo 0.5
- Secrets apenas no servidor (sem `NEXT_PUBLIC_` onde não é seguro)

---

## 📞 Contato

**Lexus Automação Inteligente**
📍 Rua Juan Gonzales Vila, 166 - Sala 02, Vila Santo Antônio, São Paulo - SP
📱 (11) 5668-7773 | comercial@lexusbr.com
🌐 [lexusbr.com](https://lexusbr.com) | [@lexus.automacao](https://instagram.com/lexus.automacao)

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
