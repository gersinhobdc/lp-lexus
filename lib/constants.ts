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
  { value: 100, suffix: "%", label: "Equipe própria Lexus" },
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
      "Cobertura Wi-Fi em todos os ambientes da casa. Para você andar pela sua casa e não perder a conexão, sem travamento no filme ou no app.",
    color: "#22C55E",
    features: ["Cobertura total", "Sem travamento", "Sinal em toda casa"],
  },
] as const;

export const BRANDS = [
  { name: "Intelbras", src: "/images/brands/intelbras.png" },
  { name: "Sonos", src: "/images/brands/sonos.png" },
  { name: "Nova Digital", src: "/images/brands/nova-digital.png" },
  { name: "Aparelhos de comando de voz", src: undefined },
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
      "Varia de acordo com o projeto. Cada imóvel tem sua particularidade, podendo demorar de algumas horas a alguns dias. Definimos o cronograma exato após a visita técnica.",
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
      "Equipe especializada 100% colaboradores próprios da Lexus. Garantia de 7 dias do produto, 90 dias da instalação e suporte contínuo.",
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

/**
 * Escassez honesta — agenda mensal de visitas técnicas disponíveis.
 * Ajuste SLOTS_TOTAL/SLOTS_TAKEN a cada mês conforme a real disponibilidade da equipe.
 */
export const SCARCITY = {
  slotsTotal: 15,
  slotsTaken: 11,
  get slotsLeft() {
    return this.slotsTotal - this.slotsTaken;
  },
  label: "agendas para visita técnica disponíveis este mês",
} as const;
