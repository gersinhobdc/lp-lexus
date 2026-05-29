# Revisão da LP Lexus — Feedback do Patrão (Rafael) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar 30+ ajustes textuais e estruturais na landing page da Lexus a partir de revisão presencial com o sócio Rafael — eliminando vocabulário negativo, marcas sem autorização (Alexa/Google Home/HomeKit/Control4/Lutron), garantias inexistentes (12 meses), serviços não prestados (monitoramento, controle de acesso, projeto 3D, visita gratuita) e simplificando densidade de conteúdo (formulário acima da dobra, remoção de portfólio em vídeo, FAQ enxuta).

**Architecture:** Mudanças são em sua maioria **content/copy** centralizadas em `lib/constants.ts` (SITE, STATS, SERVICES, BRANDS, FAQS, HOW_IT_WORKS, PROJECT_SHOWCASE) e em strings hardcoded em componentes de seção (`Hero.tsx`, `Problem.tsx`, `MidCTA.tsx`, `FinalCTA.tsx`, `Projects.tsx`, `Footer.tsx`, `app/page.tsx`). Há também uma mudança estrutural pequena: duplicar `<LeadForm />` para aparecer logo após o Hero (atualmente só existe perto do final). Não há novos componentes, nem alteração de stack. Trabalho é sequencial e baixo risco — cada Task é uma seção lógica que compila e renderiza sozinha.

## Intenções adicionais de copy e visual
- Remover a fala de garantia de 90 dias na foto da equipe Lexus.
- Ajustar a estatística de projetos para usar o sinal de `+` junto ao número 2500, em vez de formatos como `16+` ou `2500+` no copy principal.
- Mudar o texto de `equipe 100% Lexus` para `equipe 100% própria da Lexus`.
- Reforçar a mudança de visual: fundo do site deve ir para um azul mais tecnológico, com inspiração em UX/UI.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19.2.4, TypeScript 5, Tailwind v4, framer-motion. Sem testes automatizados no projeto — verificação é **visual via `npm run dev`** e checagem de `npm run build` (type-check + lint).

**Nota sobre TDD:** Este plano é majoritariamente content-edit em UI estática. TDD clássico (test → fail → impl → pass) não se aplica. Cada Task usa o ciclo: **read → edit → type-check via `npm run build` ou `tsc --noEmit` → visual check no dev → commit**. Quando houver lógica nova (ex.: Task 11, criar variante do LeadForm), incluímos verificação extra de comportamento.

---

## Pre-flight (faça antes de começar qualquer Task)

- [ ] **Pre-flight 1: Garantir branch limpa**

```bash
cd "C:\Users\Lexus - JR\Desktop\lp-lexus"
git status
```

Expected: working tree clean ou apenas arquivos `docs/` novos. Se houver mudanças não commitadas em `components/` ou `lib/`, parar e perguntar ao usuário antes de prosseguir.

- [ ] **Pre-flight 2: Criar branch de feature**

```bash
git checkout -b feat/revisao-feedback-rafael
```

- [ ] **Pre-flight 3: Subir o dev server em terminal separado**

```bash
npm run dev
```

Deixa rodando em http://localhost:3000 — vamos voltar pra olhar depois de cada Task.

- [ ] **Pre-flight 4: Validar que projeto compila do estado atual**

```bash
npx tsc --noEmit
```

Expected: zero erros. Se houver erro, NÃO prosseguir até resolver — qualquer erro nosso ficaria misturado com erro pré-existente.

---

## File Structure (mapa de arquivos tocados)

| Arquivo | Mudança principal | Tasks |
|---|---|---|
| `lib/constants.ts` | SITE (CNPJ, endereço, horário), STATS, SERVICES, BRANDS, FAQS, HOW_IT_WORKS, PROJECT_SHOWCASE | 1, 2, 3, 4, 7, 8, 10 |
| `components/sections/Hero.tsx` | Headline, subheadline, trust bar, remover scroll indicator, CTA copy | 5 |
| `components/sections/Problem.tsx` | Inversão de paradigma: "problemas" → "soluções que sua casa já tem?" | 6 |
| `components/sections/Services.tsx` | Sem mudanças diretas — herda de SERVICES em constants.ts | (via Task 7) |
| `components/sections/Projects.tsx` | Remover framing "Portfólio em vídeo", remover "Monitoramento 24h" no card CFTV | 9 |
| `components/sections/HowItWorks.tsx` | Sem mudanças diretas — herda de HOW_IT_WORKS em constants.ts | (via Task 8) |
| `components/sections/MidCTA.tsx` | Remover "gratuita", "projeto 3D", "sem compromisso"; ajustar headline | 11 |
| `components/sections/FinalCTA.tsx` | Remover "Visita gratuita · Sem compromisso · Garantia 12 meses" da trust line | 12 |
| `components/sections/About.tsx` | Auditoria leve — remover menções a serviços/marcas eliminados se existirem | 13 |
| `components/sections/Footer.tsx` | Exibir CNPJ, horário de funcionamento | 14 |
| `app/page.tsx` | Schema.org: ajustar horário (08:00–17:30), adicionar `taxID` (CNPJ), reordenar seções para incluir `<LeadForm />` após Hero | 15, 16 |

**Não criar arquivos novos.** Toda a mudança é em arquivos existentes.

---

## Task 1: Atualizar dados de contato em SITE (CNPJ, endereço, horário)

**Files:**
- Modify: `lib/constants.ts:1-23` (objeto SITE)

**Contexto:** Conforme alinhamento prévio: CNPJ `30.768.901/0001-99`, endereço `Av. Adolfo Pinheiro, 1800` (capital), horário comercial `08:00 às 17:30`.

- [ ] **Step 1.1: Adicionar campos `cnpj` e `hours` em SITE; atualizar `address.street` e `address.full`**

Edite `lib/constants.ts`. Substitua todo o bloco `export const SITE = { ... } as const;` por:

```ts
export const SITE = {
  name: "Lexus Automação Inteligente",
  tagline: "Automação residencial premium em São Paulo",
  description:
    "Transformamos sua casa em ambiente inteligente com automação premium. Especialistas em iluminação, som ambiente, climatização, segurança e Wi-Fi mesh em São Paulo.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexusbr.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_LINK ?? "https://wa.link/czw9nk",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+551156687773",
  phoneDisplay: "(11) 5668-7773",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "lexus.automacao@gmail.com",
  cnpj: "30.768.901/0001-99",
  hours: {
    weekdays: "Seg a Sex · 08:00 às 17:30",
    opens: "08:00",
    closes: "17:30",
  },
  instagram: "https://www.instagram.com/lexus.automacao",
  youtube: "https://www.youtube.com",
  facebook: "https://www.facebook.com",
  address: {
    street: "Av. Adolfo Pinheiro, 1800",
    neighborhood: "Santo Amaro",
    city: "São Paulo",
    state: "SP",
    zip: "04734-003",
    full: "Av. Adolfo Pinheiro, 1800, Santo Amaro, São Paulo - SP",
    mapsUrl: "https://maps.google.com/?q=Av+Adolfo+Pinheiro+1800+Sao+Paulo",
  },
} as const;
```

**Atenção:** `tagline` perdeu "e corporativa" porque o sócio pediu para remover automação corporativa do escopo. `description` foi reescrita para refletir o portfólio real (sem Control4, sem HomeKit, sem corporativo). CEP `04734-003` é aproximado para Av. Adolfo Pinheiro 1800 — se houver CEP exato, ajustar.

- [ ] **Step 1.2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros. Se aparecer erro tipo "Property 'cnpj' does not exist on type ...", é porque o uso do SITE é com `as const` e algum consumidor tipou estreito demais — investigar e ajustar.

- [ ] **Step 1.3: Visual check**

Abra http://localhost:3000 → vá até o Footer. Endereço novo deve aparecer no link do mapa e no texto da Col 3. O iframe do Google Maps no Footer (col 4) deve recarregar mostrando Av. Adolfo Pinheiro.

- [ ] **Step 1.4: Commit**

```bash
git add lib/constants.ts
git commit -m "chore(site): atualiza dados de contato — CNPJ, endereco, horario

- Adiciona campo cnpj (30.768.901/0001-99)
- Adiciona campo hours (08:00 as 17:30, seg-sex)
- Atualiza endereco para Av. Adolfo Pinheiro 1800 / Santo Amaro
- Remove 'corporativa' da tagline (fora do escopo)
- Reescreve description sem Control4/HomeKit"
```

---

## Task 2: Reescrever STATS (remover negativos, atualizar números)

**Files:**
- Modify: `lib/constants.ts:25-30` (constante STATS)

**Contexto:** O sócio: *"A gente só tem que colocar coisas positivas. Mais de 2.500 projetos, 16 anos de experiência. Equipe técnica 100% funcionários Lexus. 98% não é 100%."* Ou seja: remover "98% clientes satisfeitos" (pode virar argumento de quem é o 2%) e remover "24h suporte" (vamos remover toda promessa de tempo).

- [ ] **Step 2.1: Substituir STATS pela versão com 3 stats positivos**

Em `lib/constants.ts`, substitua o bloco:

```ts
export const STATS = [
  { value: 500, suffix: "+", label: "Projetos entregues" },
  { value: 16, suffix: "+", label: "Anos de experiência" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 24, suffix: "h", label: "Suporte técnico" },
] as const;
```

Por:

```ts
export const STATS = [
  { value: 2500, suffix: "+", label: "Projetos entregues" },
  { value: 16, suffix: "+", label: "Anos de experiência" },
  { value: 100, suffix: "%", label: "Equipe Lexus" },
] as const;
```

**Notas:**
- "Equipe Lexus" é abreviação do que o sócio falou ("Equipe técnica 100% funcionários Lexus / colaboradores Lexus"). Mantém ideia de zero terceirização.
- O componente `SocialProof.tsx` faz `STATS.slice(0, 3)` (linha 18) — vai continuar funcionando porque agora tem exatamente 3 itens.
- `AnimatedCounter` precisa lidar com `value: 2500` — confirmar no próximo step.

- [ ] **Step 2.2: Verificar AnimatedCounter suporta 4 dígitos**

```bash
type components\ui\AnimatedCounter.tsx
```

Confirme que o componente não tem cap em 999 ou 3 dígitos. Se tiver, ajustar. Se for só formatação de número, ok.

- [ ] **Step 2.3: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros.

- [ ] **Step 2.4: Visual check**

Abra http://localhost:3000 → role até a seção "parceiros" (SocialProof). Deve mostrar 3 stats: `2500+`, `16+`, `100%` com labels `Projetos entregues`, `Anos de experiência`, `Equipe Lexus`. Verifique também o Hero trust bar (Task 5 ainda vai mexer lá).

- [ ] **Step 2.5: Commit**

```bash
git add lib/constants.ts
git commit -m "feat(stats): atualiza numeros para 2500+ projetos e 100% equipe Lexus

- Remove '98% clientes satisfeitos' (deixa brecha para quem e o 2%)
- Remove '24h suporte tecnico' (promessa de tempo nao cumprivel)
- Atualiza 500+ projetos para 2500+ (numero real)
- Adiciona '100% Equipe Lexus' (sem terceirizacao)"
```

---

## Task 3: Atualizar BRANDS (remover Control4/Lutron/Alexa/Google Home/HomeKit; adicionar Intelbras/Nova Digital)

**Files:**
- Modify: `lib/constants.ts:80-89` (constante BRANDS)
- Conditional create: `public/images/brands/intelbras.png`, `public/images/brands/nova-digital.png` (se ainda não existirem)

**Contexto:** O sócio pediu literalmente: *"tira Control4, Lutron. Coloca Intelbras e Nova Digital."* Sobre Alexa/Google Home/HomeKit, o sócio foi explícito: *"a gente não tem autorização para usar esses nomes. Amanhã, se os caras chegarem aqui e falarem que você está usando o meu nome..."*. Então removemos esses 3 também.

- [ ] **Step 3.1: Checar quais imagens já existem em public/images/brands/**

```powershell
Get-ChildItem "C:\Users\Lexus - JR\Desktop\lp-lexus\public\images\brands" | Select-Object Name
```

Expected: deve listar control4.png, sonos.png, lutron.png, alexa.png, google-home.png, homekit.svg, hikvision.png, ubiquiti.png.

- [ ] **Step 3.2: Decidir como obter logos Intelbras e Nova Digital**

Se os arquivos `intelbras.png` e `nova-digital.png` **não existem**, parar e perguntar ao usuário onde estão (ou pedir para colocar em `public/images/brands/`). Não tente baixar de fontes não autorizadas — mesma armadilha do que o sócio falou sobre Alexa.

**Se os arquivos existirem**, prosseguir para 3.3.

**Se não existirem e o usuário não tiver os arquivos**, prosseguir para 3.3 com `src` apontando para um placeholder local (`/images/brands/placeholder.png`) e adicionar um TODO no commit message — assim a marquee não quebra em runtime.

- [ ] **Step 3.3: Substituir BRANDS pela versão sem marcas proibidas, com Intelbras e Nova Digital**

Em `lib/constants.ts`, substitua o bloco BRANDS por:

```ts
export const BRANDS = [
  { name: "Sonos", src: "/images/brands/sonos.png" },
  { name: "Hikvision", src: "/images/brands/hikvision.png" },
  { name: "Ubiquiti", src: "/images/brands/ubiquiti.png" },
  { name: "Intelbras", src: "/images/brands/intelbras.png" },
  { name: "Nova Digital", src: "/images/brands/nova-digital.png" },
] as const;
```

Removidas: Control4, Lutron, Amazon Alexa, Google Home, Apple HomeKit (5 marcas sem autorização ou fora de escopo). Adicionadas: Intelbras, Nova Digital.

- [ ] **Step 3.4: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 → role até a seção "parceiros". O carrossel de logos deve mostrar 5 marcas. Se Intelbras/Nova Digital aparecerem quebradas (image broken), confirmar arquivos em `public/images/brands/`.

- [ ] **Step 3.5: Commit**

```bash
git add lib/constants.ts public/images/brands/
git commit -m "feat(brands): remove marcas sem autorizacao, adiciona Intelbras e Nova Digital

- Remove Control4 e Lutron (fora do escopo de atendimento)
- Remove Amazon Alexa, Google Home, Apple HomeKit (uso de marca sem autorizacao)
- Adiciona Intelbras e Nova Digital (parceiros oficiais)"
```

---

## Task 4: Reescrever SERVICES (remover Automação Corporativa, monitoramento, controle de acesso, nomes de marca)

**Files:**
- Modify: `lib/constants.ts:32-78` (constante SERVICES)

**Contexto detalhado:** Várias instruções do sócio aplicam aqui:
1. Remover **Automação Corporativa** inteira (não atendemos esse mercado).
2. CFTV: remover **monitoramento** ("a gente não faz monitoramento. Quem faz é Verisure"), remover **alertas por IA** ("alerta por IA é monitoramento"), remover **acesso remoto 24h**. Substituir por: instalação de câmeras + fechaduras eletrônicas com app.
3. Home Theater: remover **8K** (só 4K), remover **5.1** da feature (manter apenas "Sistema de Home Theater"), trocar "acústica profissional" por "caixas acústicas premium" ou "bookshelf/embutidas no gesso" + "cabeamento profissional". Headline: "Tenha a sensação de cinema em casa."
4. Residencial: trocar "integração total com Alexa, Google Home e Apple HomeKit" por "integração com apps de inteligência artificial e secretárias virtuais".
5. Padronizar ordem nas descrições/features: **Controle, iluminação, som, climatização e segurança**.
6. Wi-Fi: simplificar — "Para você andar pela casa e não perder a conexão". Manter "Mesh" no título técnico mas explicar de forma leiga.
7. Som Ambiente: adicionar como categoria explícita ("Som ambiente, sistema de som 5.1, cinema em casa com tela e projetor, tudo integrado").

- [ ] **Step 4.1: Substituir SERVICES pela versão alinhada ao feedback**

Em `lib/constants.ts`, substitua todo o bloco `export const SERVICES = [...] as const;` por:

```ts
export const SERVICES = [
  {
    id: "residential",
    icon: "Home",
    title: "Automação Residencial",
    description:
      "Controle, iluminação, som, climatização e segurança em um único toque. Integração com apps de secretárias virtuais e inteligência artificial.",
    color: "#22C55E",
    features: ["Controle por voz e app", "Cenas e automações", "Um único toque"],
  },
  {
    id: "audio",
    icon: "Volume2",
    title: "Som Ambiente",
    description:
      "Tenha sua casa com o melhor sistema de som ambiente, integrado à automação. Música em todos os cômodos, simples e intuitivo.",
    color: "#EC4899",
    features: ["Som multiroom", "Integrado à automação", "Controle pelo app"],
  },
  {
    id: "theater",
    icon: "Volume2",
    title: "Home Theater",
    description:
      "Tenha a sensação de cinema em casa. Sistema de Home Theater com caixas acústicas bookshelf ou embutidas no gesso e cabeamento profissional.",
    color: "#FACC15",
    features: ["Cinema em casa", "Caixas premium", "Cabeamento profissional"],
  },
  {
    id: "cftv",
    icon: "ShieldCheck",
    title: "CFTV & Segurança",
    description:
      "Instalação de câmeras de segurança 4K com visão noturna e gravação em nuvem. Venda e instalação de fechaduras eletrônicas com acesso via app.",
    color: "#1E40AF",
    features: ["Câmeras 4K", "Gravação em nuvem", "Fechadura via app"],
  },
  {
    id: "wifi",
    icon: "Wifi",
    title: "Rede Wi-Fi Mesh",
    description:
      "Cobertura Wi-Fi em todos os ambientes da casa. Para você andar pela sua casa e não perder a conexão — sem travamento no filme ou no app.",
    color: "#22C55E",
    features: ["Cobertura total", "Sem travamento", "Sinal em toda casa"],
  },
] as const;
```

**Mudanças explícitas:**
- ❌ Removido: bloco inteiro `id: "corporate"` (Automação Corporativa).
- ❌ Removido: "Integração total com Alexa, Google Home e Apple HomeKit" → trocado por "apps de secretárias virtuais e inteligência artificial".
- ❌ Removido CFTV: "monitoramento remoto 24h", "Alertas por IA", "Acesso remoto 24h" — substituído por gravação em nuvem + fechaduras via app.
- ❌ Removido Theater: "8K", "5.1/7.1" no título, "acústica profissional" → trocado por bookshelf/embutidas + cabeamento profissional.
- ✅ Adicionado: bloco novo `id: "audio"` (Som Ambiente como categoria separada).
- ✅ Padronizado: ordem "Controle, iluminação, som, climatização e segurança" na description do Residencial.

**Importante sobre ícones:** o componente `Services.tsx:10` faz `const ICONS = { Home, Building2, ShieldCheck, Volume2, Wifi }`. Como removemos o serviço corporativo (único que usava `Building2`), o ícone vira morto. Decisão: deixar o import — TypeScript não vai reclamar, é só código não usado. Em uma Task futura podemos limpar, mas YAGNI.

- [ ] **Step 4.2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros. O id `"audio"` é novo — se houver algum lugar que faz lookup por id literal de serviço, vai falhar. Espero que não tenha.

- [ ] **Step 4.3: Visual check**

Abra http://localhost:3000 → role até "Serviços". Deve mostrar **5 cards** (era 5 antes também, mas agora sem o Corporativo e com Som Ambiente novo). Cada card deve mostrar 3 features. Ícones devem renderizar (Home, Volume2 para 2 cards, ShieldCheck, Wifi).

**Atenção visual:** dois cards (audio e theater) usam o mesmo ícone `Volume2`. Aceitável por enquanto — se ficar feio, podemos trocar Home Theater para outro ícone (ex.: `Film` da lucide). Não é bloqueante.

- [ ] **Step 4.4: Commit**

```bash
git add lib/constants.ts
git commit -m "feat(services): remove escopo fora de operacao, padroniza linguagem

- Remove Automacao Corporativa (nao atendemos esse mercado)
- CFTV: remove monitoramento/alertas IA/acesso remoto 24h
       adiciona fechaduras eletronicas via app
- Home Theater: remove 8K, 5.1; usa bookshelf/embutidas e cabeamento pro
- Residencial: troca nomes de marca por 'apps de secretarias virtuais'
- Adiciona categoria Som Ambiente separada
- Padroniza ordem 'controle, iluminacao, som, climatizacao, seguranca'"
```

---

## Task 5: Reescrever Hero (headline, subheadline, trust bar, remover scroll indicator, ajustar CTAs)

**Files:**
- Modify: `components/sections/Hero.tsx:71-128` (H1, subtitle, CTAs, trust bar)
- Modify: `components/sections/Hero.tsx:131-151` (remover scroll indicator)

**Contexto da nova copy (transcrito):**
- H1: **"Viva em uma casa que pensa por você"**
- Subhead: **"Iluminação, som ambiente, climatização e segurança, tudo junto e integrado em um único toque. Com mais de 2.500 ambientes inteligentes entregues em São Paulo. Com a expertise e inteligência da Lexus, pensando no melhor acabamento que o seu projeto merece."**
- Trust bar: trocar "98% clientes satisfeitos" por "100% equipe Lexus". Atualizar "500+" para "2500+".
- Remover botão "Quero meu orçamento gratuito" → trocar por "Descubra o potencial da sua casa".
- Remover o scroll indicator (chevron animado embaixo) — o sócio: "esse scroll tem que tirar".

- [ ] **Step 5.1: Substituir H1**

Em `components/sections/Hero.tsx`, encontre o bloco `<motion.h1 ...>` (linhas 71-78) e substitua por:

```tsx
        <motion.h1
          variants={fadeUp}
          className="font-[var(--font-geist-sans)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#E8E8ED] leading-[1.05] tracking-tight mb-6"
        >
          Viva em uma casa
          <br />
          que <span className="gradient-text">pensa por você.</span>
        </motion.h1>
```

(O H1 já estava nesse formato — confirma que não precisa mexer. Mas a subhead muda.)

- [ ] **Step 5.2: Substituir subhead**

Encontre `<motion.p variants={fadeUp} className="text-lg md:text-xl text-[#A1A1AA] ...">` (linhas 81-88) e substitua o **conteúdo** por:

```tsx
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-[#A1A1AA] max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Iluminação, som ambiente, climatização e segurança — tudo junto e integrado
          em um único toque. Mais de{" "}
          <strong className="text-[#E8E8ED]">2.500 ambientes inteligentes</strong>{" "}
          entregues em São Paulo, com a expertise da Lexus e o acabamento que o seu
          projeto merece.
        </motion.p>
```

(Trocado `max-w-2xl` por `max-w-3xl` porque a nova frase é mais longa. Versão final condensada — pegamos a essência dos 3 trechos do sócio sem ficar gigante.)

- [ ] **Step 5.3: Substituir copy dos CTAs**

Encontre o bloco `<motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 ...">` (linhas 91-110) e substitua os dois `<Button>` por:

```tsx
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <Button
            size="lg"
            className="text-base font-bold shadow-xl shadow-[#22C55E]/20"
            onClick={() =>
              document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Descubra o potencial da sua casa
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver projetos
          </Button>
        </motion.div>
```

- [ ] **Step 5.4: Reescrever trust bar**

Encontre o bloco `<motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm ...">` (linhas 113-128) e substitua os 3 `<span>` internos por:

```tsx
          <span>
            <strong className="text-[#E8E8ED]">2.500+</strong> projetos entregues
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
          <span>
            <strong className="text-[#E8E8ED]">16+</strong> anos de experiência
          </span>
          <span className="hidden sm:block w-px h-4 bg-white/10" aria-hidden="true" />
          <span>
            <strong className="text-[#E8E8ED]">100%</strong> equipe Lexus
          </span>
```

- [ ] **Step 5.5: Remover scroll indicator**

Remova todo o bloco `<motion.button ...>` ao fim do `<section>` (linhas 131-151 — começa em `{/* Scroll indicator */}`). Remova também o import de `ChevronDown` do lucide-react se ele não for mais usado em nenhum outro lugar do arquivo.

Linha 4 atual:
```tsx
import { ChevronDown, Zap } from "lucide-react";
```

Deve virar:
```tsx
import { Zap } from "lucide-react";
```

- [ ] **Step 5.6: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros. Se aparecer "ChevronDown is declared but never used" — você esqueceu de remover o import.

- [ ] **Step 5.7: Visual check**

Abra http://localhost:3000. Hero deve mostrar:
- Eyebrow "Automação Premium · São Paulo" (sem mudança).
- H1 "Viva em uma casa que pensa por você." (sem mudança visual, mas vamos validar a leitura).
- Subhead nova, mais longa, mencionando 2.500.
- 2 CTAs: "Descubra o potencial da sua casa" + "Ver projetos".
- Trust bar com `2.500+`, `16+`, `100% equipe Lexus`.
- **Nada** no canto inferior central (scroll indicator removido).

- [ ] **Step 5.8: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat(hero): aplica nova copy do feedback Rafael

- Subhead reescrita: 'controle, iluminacao, som, climatizacao e seguranca'
- Atualiza '500+' para '2.500+' projetos
- Substitui '98% clientes satisfeitos' por '100% equipe Lexus'
- CTA primario: 'Descubra o potencial da sua casa' (sem 'gratuito')
- Remove scroll indicator (feedback explicito do socio)"
```

---

## Task 6: Reescrever Problem (inverter paradigma — não mais "problemas")

**Files:**
- Modify: `components/sections/Problem.tsx:8-15` (constante PROBLEMS — renomear conceito)
- Modify: `components/sections/Problem.tsx:26-84` (JSX e copy do header)

**Contexto crítico do sócio:** *"Primeiro, sua casa tem esses problemas? Não. Primeiro, sua casa já tem essas soluções? Reconhece algum desses cenários? Porque se você fala 'sua casa tem esses problemas', a pessoa vai falar 'ah, eu tenho problema, não vou contratar a Lexus'. Vira 'sua casa já tem essas soluções? Não, minha casa não tem essa solução'."*

**O paradigma vira:** ainda mostramos as duas colunas (antes/depois) — mas o **título superior pergunta "Sua casa já tem essas soluções?"** e a coluna da esquerda é rotulada **"Antes da Lexus"** (não "Problemas"), reforçando que é um cenário a ser substituído, não uma acusação ao visitante.

Os 6 pares de itens **não mudam de conteúdo** (a versão atual já está correta nas SOLUTIONS) — só mudam os títulos de cabeçalho e a copy do `<SectionTitle>`.

- [ ] **Step 6.1: Atualizar SectionTitle e o eyebrow conceitual**

Em `components/sections/Problem.tsx`, encontre o bloco `<SectionTitle ...>` (linhas 30-35) e substitua por:

```tsx
        <SectionTitle
          eyebrow="O que muda com a Lexus"
          title="Sua casa já tem"
          titleHighlight="essas soluções?"
          subtitle="Reconhece algum desses cenários? A Lexus resolve cada um com tecnologia premium e instalação sem dor de cabeça — sem quebra-quebra."
        />
```

- [ ] **Step 6.2: Trocar label "Antes da Lexus" (mantém) — mas garantir que estado emocional não é negativo**

A coluna esquerda já está rotulada `"Antes da Lexus"` (linha 46). **Mantém.** A direita `"Com a Lexus"` (linha 65). **Mantém.** Só queremos que o leitor leia **a chamada de cima** sem se identificar como tendo problema.

Nenhuma mudança nessas linhas — mas confirme manualmente que os textos estão lá no JSX.

- [ ] **Step 6.3: Confirmar que PROBLEMS e SOLUTIONS já refletem o pedido do sócio**

Os 6 pares já casam com o que o sócio descreveu:

| Antes da Lexus (atual) | Com a Lexus (atual) | Status |
|---|---|---|
| Cabos expostos por toda a parede | Instalação 100% sem fios aparentes | ✅ ok |
| 10+ controles diferentes na gaveta | Um único app controla tudo | ✅ ok |
| Câmeras de segurança que não gravam | CFTV 4K com gravação em nuvem 24/7 | ✅ ok |
| WiFi fraco nos quartos e garagem | Mesh WiFi cobertura total do imóvel | ✅ ok |
| Luzes esquecidas acesas o dia todo | Automações que desligam tudo ao sair | ✅ ok |
| Sistema de som que ninguém sabe usar | Som multiroom simples e intuitivo | ✅ ok |

Nenhuma mudança nos arrays.

- [ ] **Step 6.4: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros.

- [ ] **Step 6.5: Visual check**

Abra http://localhost:3000 → role até a seção #problemas. O título deve ler **"Sua casa já tem essas soluções?"**. As duas colunas (Antes da Lexus / Com a Lexus) devem mostrar os 6 pares já existentes.

- [ ] **Step 6.6: Commit**

```bash
git add components/sections/Problem.tsx
git commit -m "feat(problem): inverte paradigma para 'sua casa ja tem essas solucoes?'

Feedback Rafael: 'Sua casa tem esses problemas?' faz visitante se
identificar como problematico. 'Sua casa ja tem essas solucoes?'
faz ele se identificar como quem ainda nao tem o upgrade."
```

---

## Task 7: Reescrever FAQS (sem valor, sem tempo, sem marca, sem garantia 12 meses)

**Files:**
- Modify: `lib/constants.ts:130-171` (constante FAQS)

**Contexto detalhado:** O sócio passou por cada pergunta e ditou nova resposta. Críticas:
1. **Quanto custa**: tirar qualquer valor (atual diz "R$ 8.000"). Resposta: "Varia de acordo com a necessidade de cada ambiente."
2. **Funciona em apartamentos prontos**: "Sim, funciona em apartamentos já prontos, às vezes sendo necessário ajustes de detalhes." (NÃO usar "estrutura" — palavra gatilho de "vou ter que quebrar parede").
3. **Posso integrar com a Alexa**: **REMOVER essa pergunta inteira** — sócio: *"eu já tiraria essa questão de Alexa"*.
4. **Qual o prazo de instalação**: tirar tempo. "Varia de acordo com o projeto. Pode ser meia hora ou dez dias."
5. **Vocês atendem qual região**: "Atendemos preferencialmente na capital de São Paulo. Porém atendemos a grande São Paulo."
6. **Tem garantia**: NÃO existe 12 meses. Resposta: "Garantia de 7 dias do produto vendido pela Lexus, 90 dias da instalação. Após 90 dias, oferecemos suporte remoto. Produtos têm garantia de 1 ano direto com o fabricante."
7. **Preciso reformar**: "Não. Porém, é necessária uma visita técnica para readequação."
8. **Como funciona o orçamento gratuito**: **REMOVER essa pergunta** — sócio: *"tira essa porra de orçamento gratuito"*.

Resultado: 8 FAQs → 6 FAQs (removidas Alexa e Orçamento gratuito).

- [ ] **Step 7.1: Substituir FAQS pela versão reescrita**

Em `lib/constants.ts`, substitua todo o bloco `export const FAQS = [...] as const;` por:

```ts
export const FAQS = [
  {
    question: "Quanto custa automatizar minha casa?",
    answer:
      "Varia de acordo com a necessidade de cada ambiente. Realizamos uma visita técnica para entender o seu projeto e elaborar um orçamento personalizado.",
  },
  {
    question: "Funciona em apartamentos já prontos?",
    answer:
      "Sim, funciona em apartamentos já prontos. Em alguns casos é necessário ajustar alguns detalhes, mas sem necessidade de reforma.",
  },
  {
    question: "Qual o prazo de instalação?",
    answer:
      "Varia de acordo com o projeto. Cada imóvel tem sua particularidade — pode demorar algumas horas ou alguns dias. Definimos o cronograma exato após a visita técnica.",
  },
  {
    question: "Vocês atendem qual região de SP?",
    answer:
      "Atendemos preferencialmente a capital de São Paulo. Porém atendemos também a Grande São Paulo conforme o projeto.",
  },
  {
    question: "Tem garantia e suporte depois da instalação?",
    answer:
      "Sim. Garantia de 7 dias para produtos vendidos pela Lexus e 90 dias da instalação. Após esse período, oferecemos suporte remoto. Produtos seguem a garantia oficial do fabricante (geralmente 1 ano).",
  },
  {
    question: "Preciso reformar para automatizar?",
    answer:
      "Não. Porém, é necessária uma visita técnica para avaliar a readequação de alguns detalhes do imóvel.",
  },
] as const;
```

**Removido explicitamente:**
- ❌ Pergunta "Posso integrar com a Alexa que já tenho?" (uso de marca + sócio pediu remover).
- ❌ Pergunta "Como funciona o orçamento gratuito?" (sócio: *"tira essa porra"*).
- ❌ Em "Quanto custa": valor R$ 8.000 e a palavra "gratuito".
- ❌ Em "Funciona em apartamentos": menções a Zigbee/Z-Wave/WiFi (jargão) e a "tecnologia sem fio" agressiva.
- ❌ Em "Prazo": dias específicos por m² (não cumprível).
- ❌ Em "Garantia": "12 meses" — substituído por estrutura real (7d produto / 90d instalação / 1 ano fabricante).
- ❌ Em "Preciso reformar": menções a Zigbee/Z-Wave.

- [ ] **Step 7.2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros. Se aparecer erro tipo "Index out of bounds" em algum componente que faz `FAQS[7]` ou `FAQS.length === 8`, investigar. Espero que `FAQ.tsx` use `.map` (sim, linha 30 — usa map).

- [ ] **Step 7.3: Visual check**

Abra http://localhost:3000 → role até #faq. Devem aparecer **6 perguntas** (eram 8). Cada uma abre e fecha corretamente. Confirme que **não aparece** mais "Posso integrar com a Alexa" nem "Como funciona o orçamento gratuito".

- [ ] **Step 7.4: Commit**

```bash
git add lib/constants.ts
git commit -m "feat(faq): reescreve FAQs conforme feedback Rafael

- Remove pergunta sobre Alexa (uso de marca sem autorizacao)
- Remove pergunta 'orcamento gratuito' (palavra-armadilha)
- Tira valor R$8.000 (varia por projeto)
- Tira prazos especificos por m2 (varia por projeto)
- Substitui '12 meses de garantia' pela estrutura real:
  7d produto / 90d instalacao / 1 ano fabricante"
```

---

## Task 8: Reescrever HOW_IT_WORKS (sem "gratuito", sem "12 meses", sem "projeto 3D")

**Files:**
- Modify: `lib/constants.ts:173-195` (constante HOW_IT_WORKS)

**Contexto:** O sócio passou pelos 3 passos:
1. **Diagnóstico**: tirar "gratuito". Texto: "Nossa equipe vai até você. Analisa o imóvel. Entende o que você precisa. Através de uma visita técnica."
2. **Projeto sob medida**: tirar "projeto 3D". Texto: "Realizamos um orçamento de acordo com as suas necessidades."
3. **Instalação premium**: tirar "Garantia 12 meses". Tirar "com capricho". Texto: "Equipe especializada 100% colaboradores Lexus."

- [ ] **Step 8.1: Substituir HOW_IT_WORKS**

Em `lib/constants.ts`, substitua o bloco por:

```ts
export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Nossa equipe vai até você, analisa o imóvel e entende o que você precisa através de uma visita técnica.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Projeto sob medida",
    description:
      "Elaboramos um orçamento personalizado de acordo com as suas necessidades, com lista de materiais e cronograma.",
    icon: "FileText",
  },
  {
    step: "03",
    title: "Instalação premium",
    description:
      "Equipe especializada 100% colaboradores Lexus. Garantia de 7 dias do produto, 90 dias da instalação e suporte contínuo.",
    icon: "CheckCircle",
  },
] as const;
```

**Mudanças:**
- ❌ "Diagnóstico gratuito" → "Diagnóstico" (sem gratuito).
- ❌ "projeto 3D" removido.
- ❌ "Garantia de 12 meses" → "7 dias do produto, 90 dias da instalação".
- ❌ "instala tudo com capricho" → removido.
- ✅ "100% colaboradores Lexus" explícito.

- [ ] **Step 8.2: Reescrever subtitle do HowItWorks**

Em `components/sections/HowItWorks.tsx`, encontre o `<SectionTitle ...>` (linhas 16-21) e troque o `subtitle` para:

```tsx
          subtitle="Três etapas simples para transformar seu espaço, sem obras desnecessárias e sem surpresas."
```

(Era: `"Três etapas simples para transformar seu espaço. Sem obras desnecessárias, sem surpresas."` — o sócio especificou vírgula em vez de ponto, e ele falou "sem obras necessárias" mas a versão atual já está correta com "desnecessárias" — confirmar antes que ele não quis dizer "necessárias" mesmo. Manter "desnecessárias" — faz sentido lógico.)

- [ ] **Step 8.3: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 → role até #como-funciona. Deve mostrar:
- Subtitle com vírgula (não ponto).
- Card 01: "Diagnóstico" (sem "gratuito").
- Card 02: "Projeto sob medida" (sem "3D").
- Card 03: "Instalação premium" + menção a 7d/90d e 100% Lexus (sem "12 meses").

- [ ] **Step 8.4: Commit**

```bash
git add lib/constants.ts components/sections/HowItWorks.tsx
git commit -m "feat(how-it-works): remove 'gratuito', 'projeto 3D' e garantia falsa de 12 meses

- Step 1: 'Diagnostico gratuito' -> 'Diagnostico'
- Step 2: remove 'projeto 3D'
- Step 3: substitui '12 meses' pela garantia real (7d/90d)
- Subtitle: troca ponto por virgula"
```

---

## Task 9: Reescrever Projects (remover framing "Portfólio em vídeo", remover "Monitoramento 24h" no card CFTV)

**Files:**
- Modify: `components/sections/Projects.tsx:33-36` (SectionTitle)
- Modify: `lib/constants.ts:202-238` (PROJECT_SHOWCASE — remover "Automação Corporativa", trocar "Monitoramento 24h")

**Contexto:** Sócio: *"então portfólio em vídeo posso tirar. Pode. Tem muita coisa ainda."* Manter os depoimentos, redes sociais, mas remover o framing de "Portfólio em vídeo" e simplificar.

E o card "CFTV & Segurança" tem categoria "Monitoramento 24h" — sócio: *"esquece monitoramento, pelo amor de Deus"*.

Também: card "Automação Corporativa" precisa sair (não temos esse serviço).

- [ ] **Step 9.1: Atualizar SectionTitle do Projects**

Em `components/sections/Projects.tsx`, encontre (linhas 33-36) e substitua:

```tsx
        <SectionTitle
          eyebrow="Projetos entregues"
          title="Veja a automação"
          titleHighlight="funcionando de verdade"
          subtitle="Mais de 2.500 ambientes entregues em São Paulo. Acompanhe os bastidores e o resultado final de cada projeto no nosso Instagram."
        />
```

(Eyebrow: "Portfólio em vídeo" → "Projetos entregues". Subtitle: "500" → "2.500".)

- [ ] **Step 9.2: Reescrever PROJECT_SHOWCASE em constants.ts**

Em `lib/constants.ts`, substitua todo o bloco `export const PROJECT_SHOWCASE = [...] as const;` por:

```ts
export const PROJECT_SHOWCASE = [
  {
    title: "Residências automatizadas",
    category: "Casa Inteligente",
    description: "Iluminação, cortinas, clima e cenas — tudo controlado por voz ou app.",
    color: "#22C55E",
    span: "lg:col-span-2",
  },
  {
    title: "Home Theater & Som Ambiente",
    category: "Cinema em casa",
    description: "Salas de cinema e som multiroom com caixas premium e cabeamento profissional.",
    color: "#EC4899",
    span: "",
  },
  {
    title: "CFTV & Segurança",
    category: "Câmeras 4K",
    description: "Instalação de câmeras 4K e fechaduras eletrônicas com acesso via app.",
    color: "#FACC15",
    span: "",
  },
  {
    title: "Rede Wi-Fi em toda casa",
    category: "Sinal sem travamento",
    description: "Cobertura total para você andar pela casa e não perder a conexão.",
    color: "#1E40AF",
    span: "",
  },
  {
    title: "Projetos completos",
    category: "Do zero ao detalhe",
    description: "Integração total de automação, som, rede e segurança em um só projeto.",
    color: "#22C55E",
    span: "lg:col-span-2",
  },
] as const;
```

**Mudanças:**
- ❌ Removido card "Automação Corporativa".
- ❌ Card CFTV: categoria "Monitoramento 24h" → "Câmeras 4K". Descrição troca "alertas inteligentes" por "fechaduras eletrônicas com acesso via app".
- ❌ Card Theater: "acústica profissional" → "caixas premium e cabeamento profissional".
- ✅ Adicionado card "Rede Wi-Fi em toda casa" no lugar do Corporativo (mantém o layout 5-cards com span balanceado).

- [ ] **Step 9.3: Verificar copy do CTA Instagram do Projects.tsx**

Em `components/sections/Projects.tsx:138-140`, o texto `"Novos projetos toda semana — bastidores, antes e depois e tutoriais."` mantém. Ok.

Em `Projects.tsx:128`, o link "Acompanhe @lexus.automacao" mantém.

Nenhuma mudança nessas linhas.

- [ ] **Step 9.4: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 → role até #projetos. Deve mostrar 5 cards (era 5 antes). Card CFTV agora tem categoria "Câmeras 4K" (não mais "Monitoramento 24h"). Eyebrow no topo lê "Projetos entregues" (não "Portfólio em vídeo"). Subtitle menciona 2.500.

- [ ] **Step 9.5: Commit**

```bash
git add components/sections/Projects.tsx lib/constants.ts
git commit -m "feat(projects): remove 'portfolio em video' e 'monitoramento 24h'

- Eyebrow: 'Portfolio em video' -> 'Projetos entregues'
- Atualiza 500 para 2.500 no subtitle
- Card CFTV: 'Monitoramento 24h' -> 'Cameras 4K'
- Remove card 'Automacao Corporativa' (fora de escopo)
- Adiciona card 'Rede Wi-Fi em toda casa' no lugar"
```

---

## Task 10: Atualizar SCARCITY (remover "gratuitas")

**Files:**
- Modify: `lib/constants.ts:244-251` (constante SCARCITY)

**Contexto:** O label atual é `"visitas técnicas gratuitas disponíveis este mês"`. Como removemos toda menção a "gratuito", precisamos ajustar.

- [ ] **Step 10.1: Atualizar label do SCARCITY**

Em `lib/constants.ts`, substitua o bloco SCARCITY por:

```ts
export const SCARCITY = {
  slotsTotal: 15,
  slotsTaken: 11,
  get slotsLeft() {
    return this.slotsTotal - this.slotsTaken;
  },
  label: "agendas para visita técnica disponíveis este mês",
} as const;
```

- [ ] **Step 10.2: Buscar uses de SCARCITY**

```bash
grep -rn "SCARCITY" components/ lib/
```

Expected: ver onde está sendo usado. Provavelmente em `LeadForm.tsx` ou `Hero.tsx`. **Se houver uso que combine `SCARCITY.label` com palavras como "gratuita" ao redor, ajustar essas strings também.**

- [ ] **Step 10.3: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 e procure onde aparece o contador de slots. Texto deve ler "X agendas para visita técnica disponíveis este mês" sem "gratuita".

- [ ] **Step 10.4: Commit**

```bash
git add lib/constants.ts
git commit -m "chore(scarcity): remove 'gratuitas' do label de visita tecnica"
```

---

## Task 11: Reescrever MidCTA (remover "gratuita", "projeto 3D", "sem compromisso"; ajustar headline)

**Files:**
- Modify: `components/sections/MidCTA.tsx:30-53` (eyebrow, headline, subhead)

**Contexto:** O sócio: *"Descubra o potencial da sua casa. Tira esse 'inteligente'. Tira esse 'visita técnica gratuita', 'projeto 3D', 'sem compromisso'. Realizamos visitas técnicas, damos consultoria."*

- [ ] **Step 11.1: Substituir eyebrow, headline e subhead do MidCTA**

Em `components/sections/MidCTA.tsx`, encontre os 3 blocos `<motion.p variants={fadeUp} ...>` / `<motion.h2 ...>` / `<motion.p ...>` (linhas 23-53) e substitua-os por:

```tsx
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="font-mono text-xs tracking-[0.2em] uppercase text-[#22C55E] mb-4"
        >
          Visita técnica e consultoria
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="font-[var(--font-geist-sans)] text-3xl md:text-5xl font-bold text-[#E8E8ED] mb-6 leading-tight"
        >
          Descubra o potencial da
          <br />
          <span className="gradient-text">sua casa.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-[#A1A1AA] text-lg mb-10 max-w-xl mx-auto"
        >
          Realizamos visitas técnicas e damos consultoria em automação residencial,
          home theater, segurança e rede Wi-Fi — em São Paulo / Capital.
        </motion.p>
```

**Mudanças explícitas:**
- ❌ Eyebrow "Diagnóstico sem compromisso" → "Visita técnica e consultoria".
- ❌ Headline tinha "sua casa **inteligente**" → trocou para "sua casa." (sócio: *"tira esse inteligente, porque se ele está contratando, ele quer que a casa dele seja inteligente"*).
- ❌ Subhead tinha "Visita técnica gratuita, projeto 3D e orçamento sem compromisso" → trocou para "Realizamos visitas técnicas e damos consultoria... em São Paulo / Capital".

- [ ] **Step 11.2: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 → role até o MidCTA (entre Services e HowItWorks). Headline lê "Descubra o potencial da sua casa." (sem "inteligente"). Subhead menciona "São Paulo / Capital", sem "gratuita", "projeto 3D" ou "sem compromisso".

- [ ] **Step 11.3: Commit**

```bash
git add components/sections/MidCTA.tsx
git commit -m "feat(mid-cta): remove 'gratuita', 'projeto 3D', 'sem compromisso', 'inteligente'

- Eyebrow: 'Diagnostico sem compromisso' -> 'Visita tecnica e consultoria'
- Headline: tira 'inteligente' (cliente quer que casa seja inteligente,
  nao precisa ser convencido)
- Subhead: troca '3D' e 'gratuita' por 'realizamos visitas e consultoria'"
```

---

## Task 12: Atualizar FinalCTA (remover "Visita gratuita · Sem compromisso · Garantia 12 meses")

**Files:**
- Modify: `components/sections/FinalCTA.tsx:50-85` (subhead, trust line)

**Contexto:** A trust line atual lê literalmente: `"Visita técnica gratuita · Sem compromisso · Garantia de 12 meses"`. Todos os 3 itens precisam mudar.

- [ ] **Step 12.1: Reescrever subhead e trust line do FinalCTA**

Em `components/sections/FinalCTA.tsx`, encontre:

```tsx
          <motion.p
            variants={fadeUp}
            className="text-[#A1A1AA] text-lg max-w-xl mx-auto mb-10"
          >
            Agende sua visita técnica gratuita e descubra como transformar seu espaço em
            um ambiente inteligente, seguro e eficiente.
          </motion.p>
```

E substitua por:

```tsx
          <motion.p
            variants={fadeUp}
            className="text-[#A1A1AA] text-lg max-w-xl mx-auto mb-10"
          >
            Agende sua visita técnica e descubra como transformar seu espaço em
            um ambiente inteligente, seguro e eficiente.
          </motion.p>
```

(Remove apenas a palavra "gratuita".)

Encontre o bloco de trust line (linhas 79-85):

```tsx
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 text-sm text-[#A1A1AA]"
          >
            <ShieldCheck size={16} className="text-[#22C55E]" aria-hidden="true" />
            <span>Visita técnica gratuita · Sem compromisso · Garantia de 12 meses</span>
          </motion.div>
```

E substitua por:

```tsx
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 text-sm text-[#A1A1AA]"
          >
            <ShieldCheck size={16} className="text-[#22C55E]" aria-hidden="true" />
            <span>Atendimento em SP / Capital · Equipe 100% Lexus · Garantia de 90 dias da instalação</span>
          </motion.div>
```

- [ ] **Step 12.2: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 → role até o fim (FinalCTA, antes do Footer). Trust line deve ler "Atendimento em SP / Capital · Equipe 100% Lexus · Garantia de 90 dias da instalação".

- [ ] **Step 12.3: Commit**

```bash
git add components/sections/FinalCTA.tsx
git commit -m "feat(final-cta): remove 'gratuita', '12 meses' da trust line

- Subhead: 'visita tecnica gratuita' -> 'visita tecnica'
- Trust line: substitui '12 meses' pela garantia real (90d instalacao)
- Trust line: adiciona 'Equipe 100% Lexus' e 'SP / Capital'"
```

---

## Task 13: Auditoria do About.tsx (remover marcas/serviços eliminados se mencionados)

**Files:**
- Read: `components/sections/About.tsx`
- Modify: dependendo do conteúdo

**Contexto:** Não foi explicitamente revisado no feedback, mas o About pode mencionar Control4, Alexa, automação corporativa, etc. Precisamos auditar.

- [ ] **Step 13.1: Ler About.tsx**

```bash
type components\sections\About.tsx
```

- [ ] **Step 13.2: Buscar termos proibidos**

```bash
grep -n -i "Control4\|Lutron\|Alexa\|Google Home\|HomeKit\|corporativa\|monitoramento\|12 meses\|projeto 3D\|gratuita\|gratuito\|98%" components/sections/About.tsx
```

Para cada match:
- "Control4" / "Lutron" / "Alexa" / "Google Home" / "HomeKit" → substituir por "tecnologias premium de automação"
- "corporativa" / "corporativo" → remover ou substituir por "residencial"
- "monitoramento" → remover
- "12 meses" → substituir pela estrutura real (7d/90d/1ano)
- "projeto 3D" → remover ou "projeto personalizado"
- "gratuita" / "gratuito" → remover
- "98%" → substituir por "100% equipe Lexus"
- "500" projetos → "2.500"

Aplique as substituições. Se nenhum dos termos for encontrado, nenhuma mudança.

- [ ] **Step 13.3: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 → role até #sobre. Verifique que não há menção a marcas proibidas ou termos eliminados.

- [ ] **Step 13.4: Commit (se houve mudança)**

```bash
git add components/sections/About.tsx
git commit -m "chore(about): remove mencoes a marcas e servicos fora do escopo

Auditoria pos-feedback Rafael. Remove ocorrencias de Control4/Alexa/
HomeKit, automacao corporativa, monitoramento, garantia 12 meses,
projeto 3D, e palavras 'gratuita/gratuito'."
```

Se não houve mudança, pular o commit.

---

## Task 14: Atualizar Footer (CNPJ, horário, links rápidos sem âncoras removidas)

**Files:**
- Modify: `components/sections/Footer.tsx` (Col 3 Contato — adicionar CNPJ e horário)

**Contexto:** Agora que SITE tem `cnpj` e `hours`, precisamos exibir essas informações no Footer (rodapé é o lugar canônico). Também garantir que `QUICK_LINKS` não aponte para seções removidas.

- [ ] **Step 14.1: Adicionar item de horário e item de CNPJ na col Contato**

Em `components/sections/Footer.tsx`, encontre o `<ul className="space-y-3" role="list">` dentro do `Col 3: Contact` (linhas 64-94) e adicione **dois novos `<li>`** após o de endereço:

```tsx
              <li>
                <div className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                  <Clock size={15} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden="true" />
                  {SITE.hours.weekdays}
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                  <FileText size={15} className="mt-0.5 shrink-0 text-[#22C55E]" aria-hidden="true" />
                  CNPJ: {SITE.cnpj}
                </div>
              </li>
```

E adicione `Clock` e `FileText` ao import de `lucide-react` na linha 5:

```tsx
import { Phone, Mail, MapPin, Clock, FileText } from "lucide-react";
```

- [ ] **Step 14.2: Verificar QUICK_LINKS**

Em `Footer.tsx:9-16`, o `QUICK_LINKS` tem:
- `#servicos` ✅
- `#projetos` ✅
- `#como-funciona` ✅
- `#depoimentos` ✅ (assumindo que Testimonials usa `id="depoimentos"`)
- `#faq` ✅
- `#diagnostico` ✅ (LeadForm)

Nenhuma menção a `#corporativo` ou `#monitoramento`. Manter como está.

- [ ] **Step 14.3: Type-check + visual**

```bash
npx tsc --noEmit
```

Abra http://localhost:3000 → role até o Footer → Col Contato deve mostrar: telefone, email, endereço (Av. Adolfo Pinheiro), **horário (Seg-Sex 08:00-17:30)**, **CNPJ**.

- [ ] **Step 14.4: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat(footer): exibe horario de funcionamento e CNPJ

- Adiciona linha com horario 'Seg a Sex 08:00 as 17:30'
- Adiciona linha com CNPJ 30.768.901/0001-99"
```

---

## Task 15: Atualizar Schema.org em app/page.tsx (horário, CNPJ como taxID)

**Files:**
- Modify: `app/page.tsx:22-54` (objeto schema)

**Contexto:** O schema atual tem `opens: "08:00", closes: "18:00"`. Precisa virar `17:30`. E adicionar `taxID: SITE.cnpj` (campo padrão schema.org para CNPJ no Brasil).

- [ ] **Step 15.1: Atualizar opens/closes e adicionar taxID no schema**

Em `app/page.tsx`, encontre o objeto `schema` (linhas 22-54) e substitua por:

```ts
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    taxID: SITE.cnpj,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.6334,
      longitude: -46.7043,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SITE.hours.opens,
        closes: SITE.hours.closes,
      },
    ],
    sameAs: [SITE.instagram, SITE.youtube, SITE.facebook],
    priceRange: "$$",
    image: `${SITE.url}/og-image.jpg`,
  };
```

**Atenção sobre coordenadas:** Av. Adolfo Pinheiro fica em Santo Amaro — `latitude: -23.6334, longitude: -46.7043` é aproximadamente correto (perto de Santo Amaro). Se precisar coordenada exata do número 1800, ajustar manualmente em uma Task posterior. Não bloqueante.

- [ ] **Step 15.2: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros.

- [ ] **Step 15.3: Visual + Schema validator**

Abra http://localhost:3000 → View Source → procure pelo `<script type="application/ld+json">`. Confirme que tem `"taxID":"30.768.901/0001-99"` e `"closes":"17:30"`.

Opcional: cole o JSON em https://search.google.com/test/rich-results e confirme que é válido.

- [ ] **Step 15.4: Commit**

```bash
git add app/page.tsx
git commit -m "chore(schema): atualiza horario para 17:30 e adiciona CNPJ como taxID"
```

---

## Task 16: Adicionar LeadForm acima da dobra (após Hero)

**Files:**
- Modify: `app/page.tsx:62-83` (ordem dos componentes em `<main>`)

**Contexto crítico do sócio:** *"Cara, eu já falei o seguinte, eu deixaria esse formulário lá em cima, irmão. Devia ter dois. Pega esse formulário, sobe lá."* — quer dois formulários: um logo depois do Hero, outro mantém no fim.

**Análise técnica:** O componente `<LeadForm />` já existe e é importado em `app/page.tsx:12`. Ele já está sendo renderizado uma vez (depois de FAQ, antes de FinalCTA). Vamos renderizá-lo **duas vezes** — uma logo após SocialProof, outra mantém onde está.

**Risco:** O componente provavelmente tem um `<section id="diagnostico">`. **Dois elementos com mesmo `id` é HTML inválido** e quebra o scroll dos CTAs (que fazem `getElementById("diagnostico")` e sempre encontram o primeiro).

**Solução:** Renderizar duas instâncias com `id` diferenciado. Vamos passar uma prop `id` ao `LeadForm` (ou aceitar que o primeiro `id="diagnostico"` é o âncora oficial e o segundo recebe `id="diagnostico-2"` ou simplesmente vira `id="diagnostico-final"`).

Para minimizar mudança, vou propor: a primeira instância (após Hero) recebe `id="diagnostico"` (vira a âncora principal — todos os CTAs já apontam pra `#diagnostico` e vão dar scroll pra um lugar muito perto do topo). A segunda (depois da FAQ) vira `id="diagnostico-final"`. **Mas** isso exige uma prop nova em `LeadForm`.

**Decisão pragmática:** vou **inspecionar** `LeadForm` primeiro pra ver se ele aceita prop `id` ou hardcoda.

- [ ] **Step 16.1: Inspecionar LeadForm**

```bash
type components\sections\LeadForm.tsx | findstr /N "id="
```

Procure pela section principal. Espera-se algo como `<section id="diagnostico" ...>`.

- [ ] **Step 16.2: Adicionar prop opcional `sectionId` ao LeadForm**

Em `components/sections/LeadForm.tsx`, mude a assinatura do componente para aceitar uma prop opcional:

```tsx
export function LeadForm({ sectionId = "diagnostico" }: { sectionId?: string } = {}) {
  // ...
  return (
    <section id={sectionId} ...>
      ...
    </section>
  );
}
```

Substitua `id="diagnostico"` hardcoded (se houver) por `id={sectionId}`.

- [ ] **Step 16.3: Renderizar LeadForm em dois lugares em app/page.tsx**

Em `app/page.tsx`, encontre o bloco `<main id="main-content">` (linhas 63-76) e substitua por:

```tsx
      <main id="main-content">
        <Hero />
        <SocialProof />
        <LeadForm />
        <Problem />
        <Services />
        <MidCTA />
        <HowItWorks />
        <Projects />
        <Testimonials />
        <About />
        <FAQ />
        <LeadForm sectionId="diagnostico-final" />
        <FinalCTA />
      </main>
```

**Mudanças:**
- Adicionado `<LeadForm />` (sem props, fica com `id="diagnostico"`) **depois de SocialProof** — visível no scroll inicial.
- O `<LeadForm sectionId="diagnostico-final" />` existente (era único, antes da FinalCTA) agora tem id diferente.

**Verificação de links:** todos os CTAs que fazem `getElementById("diagnostico")` vão acertar o **primeiro** (próximo do topo). Bom — é o desejado.

- [ ] **Step 16.4: Type-check**

```bash
npx tsc --noEmit
```

Expected: zero erros.

- [ ] **Step 16.5: Visual check (importante)**

Abra http://localhost:3000:
- Hero → SocialProof → **LeadForm aparece logo após** (formulário acima da dobra ou bem perto).
- Continue rolando: Problem → Services → MidCTA → HowItWorks → Projects → Testimonials → About → FAQ → **LeadForm segunda vez** → FinalCTA → Footer.
- Clique no CTA "Descubra o potencial da sua casa" do Hero. Deve dar scroll pro **primeiro** LeadForm.
- Clique em "Solicitar orçamento" em qualquer ServiceCard. Deve dar scroll pro **primeiro** LeadForm.
- Use teclado/inspector pra confirmar que existem **duas** `<section>` com ids diferentes (`#diagnostico` e `#diagnostico-final`) — HTML válido.

- [ ] **Step 16.6: Commit**

```bash
git add app/page.tsx components/sections/LeadForm.tsx
git commit -m "feat(page): adiciona LeadForm acima da dobra (apos SocialProof)

Feedback Rafael: 'Devia ter dois. Um no comeco e um no final.'

- Renderiza LeadForm 2x: apos SocialProof (id=diagnostico) e
  antes da FinalCTA (id=diagnostico-final)
- LeadForm ganha prop opcional sectionId para evitar id duplicado"
```

---

## Task 17: Build de validação final

**Files:** nenhum

- [ ] **Step 17.1: Limpar artefatos e build limpo**

```bash
npm run build
```

Expected: build sucesso. Sem erros TS, sem warnings críticos. Se houver warning sobre Image alt vazio, link sem rel, etc., investigar.

- [ ] **Step 17.2: Lint**

```bash
npm run lint
```

Expected: zero erros. Avisos aceitáveis se forem em código pré-existente que não tocamos.

- [ ] **Step 17.3: Rodar dev e fazer passada completa por todas as seções**

```bash
npm run dev
```

Abra http://localhost:3000 e role do topo ao Footer. **Procure por qualquer ocorrência** das palavras-armadilha:

```
grep -rn -i "gratuit\|projeto 3D\|3D\|monitoramento\|12 meses\|Alexa\|Google Home\|HomeKit\|Control4\|Lutron\|98%\|automacao corporativa\|cliente satisfeito" components/ lib/ app/
```

Cada match precisa ser justificado. Se não estiver intencional, voltar e ajustar.

Também valide visualmente:
- Hero sem scroll indicator ✅
- Trust bar com 2.500+ / 16+ / 100% Lexus ✅
- SocialProof marquee com Sonos/Hikvision/Ubiquiti/Intelbras/Nova Digital ✅
- Problem com "Sua casa já tem essas soluções?" ✅
- Services com 5 cards e sem Corporativa ✅
- MidCTA sem "inteligente"/"gratuita"/"3D" ✅
- HowItWorks sem "12 meses"/"gratuito"/"3D" ✅
- Projects com "Projetos entregues" e card CFTV sem "Monitoramento" ✅
- FAQ com 6 perguntas (sem Alexa, sem orçamento gratuito) ✅
- LeadForm aparece 2x ✅
- FinalCTA sem "gratuita"/"12 meses" ✅
- Footer com horário + CNPJ ✅

- [ ] **Step 17.4: Merge ou PR**

Decisão do usuário:

**Opção A (merge direto na main):**
```bash
git checkout main
git merge --no-ff feat/revisao-feedback-rafael
```

**Opção B (abrir PR):**
```bash
git push -u origin feat/revisao-feedback-rafael
gh pr create --title "Revisao LP — feedback Rafael" --body "Aplica 30+ ajustes textuais e estruturais conforme reuniao com socio."
```

Apresentar as duas opções ao usuário antes de decidir.

---

## Self-Review (executor: rodar este checklist antes de declarar pronto)

**1. Cobertura de spec — para cada ponto do feedback de áudio, há Task que cobre?**

| Ponto do feedback | Task |
|---|---|
| Headline "Viva em uma casa que pensa por você" | Task 5 |
| Subhead "iluminação, som ambiente, climatização e segurança..." | Task 5 |
| "Mais de 2.500 ambientes inteligentes em SP" | Task 2, 5, 9 |
| "Com a expertise e inteligência da Lexus" | Task 5 |
| Remover scroll indicator | Task 5 |
| "2.500 projetos entregues, 16 experiências" | Task 2 |
| Remover "cliente satisfeito" | Task 2 |
| "Equipe técnica 100% funcionários Lexus" | Task 2, 8 |
| Remover Control4, Lutron | Task 3 |
| Adicionar Intelbras, Nova Digital | Task 3 |
| "Sua casa já tem essas soluções?" (não "problemas") | Task 6 |
| Remover Alexa, Google Home, HomeKit | Task 3, 4, 7 |
| Remover Automação Corporativa | Task 4, 9 |
| Remover Monitoramento | Task 4, 9 |
| Remover Controle de acesso | Task 4 |
| Som Ambiente como categoria | Task 4 |
| Home Theater simplificado (sem 8K, sem 5.1, sem "profissional") | Task 4 |
| Wi-Fi Mesh em linguagem leiga | Task 4 |
| Remover "responde em 5 min" | (Vai no LeadForm? checar) |
| "Descubra o potencial da sua casa" (sem "inteligente") | Task 5, 11 |
| Remover "Visita técnica gratuita" | Task 8, 11, 12 |
| Remover "Projeto 3D" | Task 8, 11 |
| Remover "Sem compromisso" | Task 11, 12 |
| "Três etapas... sem obras desnecessárias, sem surpresas" (vírgula) | Task 8 |
| Garantia: 7 dias / 90 dias / 1 ano (não 12 meses) | Task 7, 8, 12 |
| FAQ sem valor R$ | Task 7 |
| FAQ sem prazo específico | Task 7 |
| FAQ sem Alexa | Task 7 |
| FAQ sem "orçamento gratuito" | Task 7 |
| FAQ "atendemos SP capital, porém grande SP" | Task 7 |
| FAQ "Funciona em apto pronto" sem "estrutura" | Task 7 |
| LeadForm acima da dobra (2 instâncias) | Task 16 |
| Remover portfólio em vídeo | Task 9 |
| Manter depoimentos + redes sociais | (não muda — ok) |
| CNPJ 30.768.901/0001-99 | Task 1, 14, 15 |
| Endereço Av. Adolfo Pinheiro 1800 | Task 1 |
| Horário 08:00 às 17:30 | Task 1, 14, 15 |

**Lacuna identificada:** "Remover 'responde em menos de 5 minutos'" não foi mapeado em nenhuma task acima. Esse texto provavelmente está no `LeadForm.tsx` (subtítulo) ou em `FloatingWhatsApp.tsx`. Adicionar Task 18 abaixo.

**2. Placeholder scan:** 

Buscar no plano por "TBD", "TODO", "implement later":
- Task 3.2: "Não tente baixar de fontes não autorizadas" — instrução condicional, não placeholder. OK.
- Task 13.2: "Aplique as substituições. Se nenhum dos termos for encontrado, nenhuma mudança." — condicional. OK.

Nenhum placeholder de código.

**3. Consistência de tipos:**

- `SITE.cnpj` e `SITE.hours` introduzidos em Task 1, usados em Tasks 14, 15. Coerente.
- `SCARCITY.label` mudou em Task 10 sem impacto em código de runtime (só string).
- `STATS` agora tem 3 elementos; `SocialProof.tsx` faz `.slice(0, 3)` — ok, retorna os 3.
- `SERVICES` perdeu `id: "corporate"` (Task 4). Nenhum consumidor faz lookup por id literal "corporate" — confirmar no Step 17.3 com grep.
- `LeadForm` ganha prop `sectionId` opcional (Task 16). Compatível retroativamente.

---

## Task 18 (descoberta no self-review): Remover "responde em 5 minutos" do LeadForm e/ou microcopy

**Files:**
- Modify: `components/sections/LeadForm.tsx` (provável)
- Modify: `components/conversion/FloatingWhatsApp.tsx` (possível)

**Contexto:** Sócio: *"Responde em menos de cinco minutos. Tira isso daí, irmão. Pelo amor de Deus. Porque se for final de semana, se você coloca em cinco minutos, falou lá. Coloca em cinco minutos e responde. Se minha televisão parar de funcionar, tô perdido porque ele não vai me responder."*

- [ ] **Step 18.1: Buscar ocorrências**

```bash
grep -rn -i "5 minutos\|cinco minutos\|responde em\|resposta em" components/ app/
```

Para cada ocorrência, substituir por uma promessa que não envolve tempo. Sugestões:
- "Responde em 5 minutos" → "Atendimento personalizado"
- "Resposta em até X" → "Retorno via WhatsApp"

- [ ] **Step 18.2: Type-check + visual**

```bash
npx tsc --noEmit
```

Validar que não aparece mais essa promessa em nenhuma seção.

- [ ] **Step 18.3: Commit**

```bash
git add components/
git commit -m "fix(copy): remove promessa 'responde em 5 minutos'

Feedback Rafael: promessa de SLA cria expectativa nao cumprivel em
fim de semana e gera reclamacao. Trocado por 'atendimento personalizado'."
```

---

## Resumo executivo (para o usuário ler antes de aprovar o plano)

- **18 Tasks** sequenciais (16 originais + 2 descobertas no self-review).
- **Arquivos tocados:** `lib/constants.ts` (6 blocos), `app/page.tsx` (schema + ordem), 9 componentes em `components/sections/`, e talvez `components/conversion/FloatingWhatsApp.tsx`.
- **Sem testes automatizados criados** — projeto não usa Jest/Vitest/Playwright no estado atual. Verificação é via `tsc --noEmit`, `npm run build`, e visual no dev server.
- **Branch isolada** `feat/revisao-feedback-rafael` — sem risco para main.
- **Cada Task termina em commit** — fácil reverter ponto a ponto se algum item não bater com o pretendido.
- **Imagens de Intelbras e Nova Digital** podem ser bloqueio em Task 3 — o plano para e pergunta se não existirem.

