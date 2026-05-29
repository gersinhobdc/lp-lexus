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

export const STATS = [
  { value: 2500, suffix: "+", label: "Projetos entregues" },
  { value: 16, suffix: "+", label: "Anos de experiência" },
  { value: 100, suffix: "%", label: "Equipe Lexus" },
] as const;

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

export const BRANDS = [
  { name: "Control4", src: "/images/brands/control4.png" },
  { name: "Sonos", src: "/images/brands/sonos.png" },
  { name: "Lutron", src: "/images/brands/lutron.png" },
  { name: "Amazon Alexa", src: "/images/brands/alexa.png" },
  { name: "Google Home", src: "/images/brands/google-home.png" },
  { name: "Apple HomeKit", src: "/images/brands/homekit.svg" },
  { name: "Hikvision", src: "/images/brands/hikvision.png" },
  { name: "Ubiquiti", src: "/images/brands/ubiquiti.png" },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ricardo M.",
    role: "Cliente Google",
    content:
      "Melhor experiência, muito comprometimento, e profissionais bem qualificados. Recomendo demais!",
    rating: 5,
    initials: "RM",
  },
  {
    id: 2,
    name: "Fernanda S.",
    role: "Cliente Google",
    content:
      "A equipe é sensacional, são super atenciosos e experts no que fazem. Minha casa ficou incrível.",
    rating: 5,
    initials: "FS",
  },
  {
    id: 3,
    name: "Carlos A.",
    role: "Cliente Verificado",
    content:
      "Automatizaram meu escritório inteiro em 3 dias. Sem fios aparentes, controle total pelo celular. Qualidade premium.",
    rating: 5,
    initials: "CA",
  },
  {
    id: 4,
    name: "Mariana L.",
    role: "Cliente Verificado",
    content:
      "Instalação impecável, suporte rápido e sistema que realmente funciona. Valeu cada centavo investido.",
    rating: 5,
    initials: "ML",
  },
] as const;

export const FAQS = [
  {
    question: "Quanto custa automatizar minha casa?",
    answer:
      "O investimento varia conforme o tamanho do imóvel e os sistemas desejados. Projetos básicos começam a partir de R$ 8.000, mas oferecemos diagnóstico gratuito para dar um orçamento preciso sem compromisso.",
  },
  {
    question: "Funciona em apartamentos já prontos?",
    answer:
      "Sim! A maioria dos nossos projetos usa tecnologia sem fio (Zigbee, Z-Wave, WiFi) que não exige quebrar paredes. Instalamos sem reforma na grande maioria dos casos.",
  },
  {
    question: "Posso integrar com a Alexa que já tenho?",
    answer:
      "Absolutamente. Todos os nossos projetos são compatíveis com Alexa, Google Home e Apple HomeKit. Podemos expandir o que você já tem ou criar uma automação totalmente integrada.",
  },
  {
    question: "Qual o prazo de instalação?",
    answer:
      "Imóveis menores (até 100m²): 1 a 2 dias. Residências médias: 3 a 5 dias. Projetos maiores ou corporativos: acordado no projeto. Trabalhamos com planejamento detalhado para minimizar impacto na sua rotina.",
  },
  {
    question: "Vocês atendem qual região de SP?",
    answer:
      "Atendemos toda a Grande São Paulo e interior. Para projetos especiais, podemos atender outras cidades. Entre em contato para verificar disponibilidade.",
  },
  {
    question: "Tem garantia? E suporte depois da instalação?",
    answer:
      "Sim! Todos os projetos têm 12 meses de garantia na instalação. Oferecemos suporte técnico 24h por WhatsApp e planos de manutenção preventiva para manter tudo funcionando perfeitamente.",
  },
  {
    question: "Preciso reformar para automatizar?",
    answer:
      "Não necessariamente. Usamos tecnologias sem fio avançadas que funcionam sem obras. Em casos onde a fiação existente é aproveitada, o processo é ainda mais simples.",
  },
  {
    question: "Como funciona o orçamento gratuito?",
    answer:
      "Agendamos uma visita técnica gratuita onde analisamos seu imóvel, entendemos suas necessidades e apresentamos um projeto 3D com lista de materiais e valores. Tudo sem compromisso.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Diagnóstico gratuito",
    description:
      "Nosso especialista vai até você, analisa o imóvel e entende o que você precisa. Visita técnica sem custo.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Projeto sob medida",
    description:
      "Desenvolvemos um projeto 3D personalizado com lista completa de materiais e cronograma de instalação.",
    icon: "FileText",
  },
  {
    step: "03",
    title: "Instalação premium",
    description:
      "Equipe especializada instala tudo com capricho. Garantia de 12 meses e suporte contínuo após entrega.",
    icon: "CheckCircle",
  },
] as const;

/**
 * Cards de showcase de projetos.
 * Como a Lexus possui vídeos editados no Instagram (e não fotos avulsas),
 * cada card representa um tipo de projeto e leva o visitante ao @lexus.automacao.
 */
export const PROJECT_SHOWCASE = [
  {
    title: "Residências automatizadas",
    category: "Casa Inteligente",
    description: "Iluminação, cortinas, clima e cenas — tudo controlado por voz ou app.",
    color: "#22C55E",
    span: "lg:col-span-2",
  },
  {
    title: "Home Theater & Áudio",
    category: "Cinema em casa",
    description: "Salas de cinema e som multiroom com acústica profissional.",
    color: "#EC4899",
    span: "",
  },
  {
    title: "CFTV & Segurança",
    category: "Monitoramento 24h",
    description: "Câmeras 4K com alertas inteligentes e acesso remoto.",
    color: "#FACC15",
    span: "",
  },
  {
    title: "Automação Corporativa",
    category: "Escritórios & Comércio",
    description: "Salas de reunião smart, controle de acesso e eficiência energética.",
    color: "#1E40AF",
    span: "",
  },
  {
    title: "Projetos completos",
    category: "Do zero ao detalhe",
    description: "Integração total de automação, rede, áudio e segurança em um só projeto.",
    color: "#22C55E",
    span: "lg:col-span-2",
  },
] as const;

/**
 * Escassez honesta — agenda mensal de visitas técnicas gratuitas.
 * Ajuste SLOTS_TOTAL/SLOTS_TAKEN a cada mês conforme a real disponibilidade da equipe.
 */
export const SCARCITY = {
  slotsTotal: 15,
  slotsTaken: 11,
  get slotsLeft() {
    return this.slotsTotal - this.slotsTaken;
  },
  label: "visitas técnicas gratuitas disponíveis este mês",
} as const;
