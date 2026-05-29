export const SITE = {
  name: "Lexus Automação Inteligente",
  tagline: "Automação residencial e corporativa premium em São Paulo",
  description:
    "Transformamos sua casa e empresa em ambientes inteligentes com automação premium. Especialistas em Control4, Alexa, CFTV, Home Theater e Mesh WiFi em São Paulo.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexusbr.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_LINK ?? "https://wa.link/czw9nk",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+551156687773",
  phoneDisplay: "(11) 5668-7773",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "lexus.automacao@gmail.com",
  instagram: "https://www.instagram.com/lexus.automacao",
  youtube: "https://www.youtube.com",
  facebook: "https://www.facebook.com",
  address: {
    street: "Rua Juan Gonzales Vila, 166 - Sala 02",
    neighborhood: "Vila Santo Antônio",
    city: "São Paulo",
    state: "SP",
    zip: "04375-090",
    full: "Rua Juan Gonzales Vila, 166 - Sala 02, Vila Santo Antônio, São Paulo - SP",
    mapsUrl: "https://maps.google.com/?q=Rua+Juan+Gonzales+Vila+166+Vila+Santo+Antonio+Sao+Paulo",
  },
} as const;

export const STATS = [
  { value: 500, suffix: "+", label: "Projetos entregues" },
  { value: 16, suffix: "+", label: "Anos de experiência" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 24, suffix: "h", label: "Suporte técnico" },
] as const;

export const SERVICES = [
  {
    id: "residential",
    icon: "Home",
    title: "Automação Residencial",
    description:
      "Controle iluminação, climatização, áudio, cortinas e segurança de qualquer lugar. Integração total com Alexa, Google Home e Apple HomeKit.",
    color: "#22C55E",
    features: ["Controle por voz e app", "Cenas e automações", "Integração universal"],
  },
  {
    id: "corporate",
    icon: "Building2",
    title: "Automação Corporativa",
    description:
      "Salas de reunião inteligentes, controle de acesso, monitoramento e eficiência energética para escritórios e comércios.",
    color: "#1E40AF",
    features: ["Salas de reunião smart", "Controle de acesso", "Eficiência energética"],
  },
  {
    id: "cftv",
    icon: "ShieldCheck",
    title: "CFTV & Segurança",
    description:
      "Câmeras 4K com visão noturna, gravação em nuvem, alertas inteligentes e monitoramento remoto 24h para sua tranquilidade.",
    color: "#FACC15",
    features: ["Câmeras 4K HDR", "Alertas por IA", "Acesso remoto 24h"],
  },
  {
    id: "theater",
    icon: "Volume2",
    title: "Áudio & Home Theater",
    description:
      "Experiência cinematográfica em casa. Sistemas multiroom, home theater 4K/8K, projetores e acústica profissional.",
    color: "#EC4899",
    features: ["Som multiroom", "Home theater 4K/8K", "Acústica profissional"],
  },
  {
    id: "wifi",
    icon: "Wifi",
    title: "Rede Mesh WiFi",
    description:
      "Cobertura total sem pontos cegos, velocidade gigabit e rede segmentada para IoT, garantindo que todos os dispositivos funcionem perfeitamente.",
    color: "#22C55E",
    features: ["Cobertura total", "Gigabit WiFi 6E", "Rede IoT dedicada"],
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
