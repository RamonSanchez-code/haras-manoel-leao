/**
 * ============================================================
 *  CONTEÚDO EDITÁVEL — HARAS MANOEL LEÃO
 * ============================================================
 *  Todos os textos, links, imagens, horários, preços e serviços do
 *  site ficam neste arquivo. Os componentes apenas leem estes dados,
 *  o que facilita uma futura migração para CMS.
 *
 *  Convenções:
 *  - `status: 'confirmado'`  → informação publicada em fonte oficial.
 *  - `status: 'consultar'`   → ainda NÃO confirmada; o site exibe
 *    "Sob consulta" e direciona o visitante para o WhatsApp.
 *  - `image.src` vazio       → espaço reservado com o arquivo esperado.
 *    Fotos novas: coloque em /assets-src e rode `npm run images`.
 *
 *  Fontes (consultadas em 25/11/2026):
 *  [IG]   Instagram @harasmanoelleao — bio, legendas e cartazes de
 *         maio e novembro/2026.
 *  [MAPS] Ficha do Google Maps do Haras — telefone, CEP, horários,
 *         descrição e fotos enviadas pelo próprio Haras/agências.
 * ============================================================
 */

export type Status = 'confirmado' | 'consultar'

export interface SiteImage {
  /** Caminho da foto (ex.: '/images/maps/salao-eventos.webp'). Vazio = pendente. */
  src: string
  alt: string
  /** Nome/descrição da foto esperada — aparece no espaço reservado. */
  hint: string
  /** Tom do espaço reservado enquanto não há foto. */
  tone?: 'forest' | 'earth' | 'sand' | 'copper'
  /** Enquadramento (CSS object-position), ex.: 'center 30%'. */
  position?: string
  /** Origem da foto (exibida no lightbox da galeria). */
  credit?: string
  /**
   * true = foto de banco de imagens (não é do Haras). O site mostra o selo
   * "Imagem ilustrativa". Troque por foto oficial assim que possível.
   */
  illustrative?: boolean
}

/* ---------------- Contatos e links ---------------- */

export const contact = {
  whatsapp: {
    /** [IG]+[MAPS] Mesmo número do link da bio e da ficha do Google. */
    number: '5516982190004',
    /** Link publicado na bio oficial do Instagram (usado se `number` ficar vazio). */
    fallbackUrl: 'https://bit.ly/whatsappdoharas',
    defaultMessage: 'Olá! Vim pelo site do Haras Manoel Leão e gostaria de mais informações.',
  },
  instagram: {
    handle: '@harasmanoelleao',
    url: 'https://www.instagram.com/harasmanoelleao/',
  },
  /** PENDENTE: e-mail comercial, se houver. Vazio = não exibido. */
  email: '',
  /** [MAPS] Telefone exibido na ficha do Google. */
  phone: '(16) 98219-0004',
}

export const location = {
  name: 'Haras Manoel Leão',
  street: 'Rodovia Cândido Portinari, km 327',
  district: 'Jurucê',
  city: 'Jardinópolis',
  state: 'SP',
  country: 'BR',
  postalCode: '14680-000',
  /** [IG] "entre Ribeirão Preto e Brodowski". */
  region: 'Entre Ribeirão Preto e Brodowski, no interior de São Paulo',
  lat: -21.0717303,
  lng: -47.7087124,
  mapsUrl: 'https://maps.app.goo.gl/F2USZ7BUYhMBr6CD8',
  /** Dicas de acesso. Itens `consultar` só aparecem com VITE_SHOW_PENDING=true. */
  accessNotes: [
    { text: 'Acesso pela Rodovia Cândido Portinari (km 327), no bairro Jurucê, entre Ribeirão Preto e Brodowski.', status: 'confirmado' as Status },
    { text: 'Entrada acessível para cadeirantes, segundo a ficha do Google Maps.', status: 'confirmado' as Status },
    { text: 'Em feriados e datas especiais o horário pode mudar — confira no Instagram ou no WhatsApp antes de sair.', status: 'confirmado' as Status },
    { text: 'Informações sobre estacionamento: a confirmar com o Haras.', status: 'consultar' as Status },
  ],
}

/* ---------------- Horário de funcionamento ---------------- */

/**
 * [MAPS] Horários da ficha do Google (nov/2026).
 * `weekdays`: 0 = domingo … 6 = sábado. `open`/`close` no fuso de Brasília.
 * Usados no selo "Aberto agora" e no planejador de visita.
 */
export const openingHours = [
  { days: 'Segunda a sexta', hours: '10h às 16h', schema: 'Mo-Fr 10:00-16:00', weekdays: [1, 2, 3, 4, 5], open: '10:00', close: '16:00' },
  { days: 'Sábado', hours: '8h às 17h', schema: 'Sa 08:00-17:00', weekdays: [6], open: '08:00', close: '17:00' },
  { days: 'Domingo', hours: '8h às 18h', schema: 'Su 08:00-18:00', weekdays: [0], open: '08:00', close: '18:00' },
]

/* ---------------- Marca ---------------- */

export const brand = {
  name: 'Haras Manoel Leão',
  shortName: 'Manoel Leão',
  /**
   * Logotipo oficial. Hoje usamos a imagem de perfil do Instagram (150 px,
   * exibida como selo redondo). Substitua pelo arquivo vetorial (SVG/PNG
   * em alta) quando o Haras enviar.
   */
  logo: '/brand/logo-perfil.webp',
  /** true = logo é um selo quadrado (exibido em círculo ao lado do nome). */
  logoIsBadge: true,
  tagline: 'Comida rústica e muita diversão para toda a família',
}

/* ---------------- Navegação ---------------- */

export const nav = [
  { id: 'o-haras', label: 'O Haras' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'planeje', label: 'Planeje' },
  { id: 'localizacao', label: 'Como chegar' },
  { id: 'contato', label: 'Contato' },
]

/* ---------------- Hero ---------------- */

export const hero = {
  eyebrow: 'Jardinópolis · SP',
  title: ['Mais do que um lugar.', 'Uma experiência para viver.'],
  subtitle: 'Natureza, tradição, gastronomia e momentos especiais esperam por você no Haras Manoel Leão.',
  primaryCta: { label: 'Conheça o Haras', target: 'o-haras' },
  secondaryCta: { label: 'Planeje sua visita', target: 'planeje' },
  /**
   * Vídeo de fundo (MP4/WebM leve, idealmente < 6 MB, 1080p, sem áudio).
   * PENDENTE: vídeo oficial. Vazio = usa a imagem abaixo.
   */
  video: { mp4: '', webm: '' },
  image: {
    src: '/images/maps/pista-ao-ar-livre.webp',
    alt: 'Pista ao ar livre do Haras Manoel Leão, cercada de gramado e palmeiras, sob céu azul',
    hint: 'hero.webp — cavalos e paisagem, horizontal, 2400px',
    tone: 'forest',
    position: 'center 60%',
    credit: 'Google Maps (TradeMaps, 2023)',
  } as SiteImage,
}

/* ---------------- Sobre ---------------- */

export const about = {
  eyebrow: 'Conheça o Haras',
  title: 'Um refúgio no campo, pertinho de Ribeirão Preto',
  lead:
    'O Haras Manoel Leão é um convite para desacelerar: cavalos, paisagem aberta, comida rústica e espaço para a família aproveitar o dia juntos.',
  /**
   * História e tradição. PENDENTE: texto oficial do Haras.
   * Não publicar datas, fundadores ou fatos históricos sem confirmação.
   */
  history: '',
  pillars: [
    {
      title: 'Natureza',
      text: 'Área verde aberta, gramados e palmeiras para aproveitar o dia ao ar livre.',
      icon: 'trees',
    },
    {
      title: 'Cavalos',
      text: 'Passeios a cavalo e de charrete, e etapas do ranking de hipismo de salto.',
      icon: 'horseshoe',
    },
    {
      title: 'Comida rústica',
      text: 'Buffet variado com saladas, massas, legumes e culinária caseira.',
      icon: 'utensils',
    },
    {
      title: 'Família',
      text: 'Atividades para as crianças, animais para alimentar e espaço para celebrar.',
      icon: 'heart',
    },
  ],
  images: [
    { src: '/images/maps/varanda-restaurante.webp', alt: 'Varanda do restaurante com mesas de madeira voltada para o gramado', hint: 'sobre-1.webp', tone: 'earth', position: 'center', credit: 'Google Maps (Conecta Group Marketing, 2026)' },
    { src: '/images/maps/salao-eventos.webp', alt: 'Salão do Haras com teto de madeira, decorado para uma festa', hint: 'sobre-2.webp', tone: 'forest', credit: 'Google Maps (Haras Manoel Leão, 2017)' },
    { src: '/images/maps/area-verde.webp', alt: 'Área verde do Haras com palmeiras e cerca branca', hint: 'sobre-3.webp', tone: 'sand', credit: 'Google Maps (Alvo Marketing Digital, 2024)' },
  ] as SiteImage[],
}

/* ---------------- Experiências ---------------- */

export interface PriceItem {
  label: string
  price: string
  note?: string
}

export interface Experience {
  id: string
  title: string
  summary: string
  details: string[]
  /** Valores divulgados (sempre com fonte/data em `pricesNote`). */
  prices?: PriceItem[]
  pricesNote?: string
  status: Status
  icon: 'horse' | 'utensils' | 'family' | 'riding' | 'party' | 'therapy'
  image: SiteImage
  whatsappMessage: string
}

const PRICES_NOTE = 'Valores divulgados no Instagram oficial em novembro/2026. Podem mudar — confirme pelo WhatsApp.'

export const experiences: Experience[] = [
  {
    id: 'passeios',
    title: 'Passeios a cavalo e de charrete',
    summary: 'Sinta o ritmo do campo no lombo do cavalo ou num passeio tranquilo de charrete.',
    details: [
      'Passeios a cavalo e de charrete fazem parte das atividades do dia no Haras.',
      'Idade mínima e regras de segurança: consulte a equipe na chegada.',
    ],
    prices: [
      { label: 'Passeio a cavalo', price: 'R$ 12,00', note: 'a cada 4 voltas' },
      { label: 'Charrete', price: 'R$ 6,00', note: 'por pessoa' },
    ],
    pricesNote: PRICES_NOTE,
    status: 'confirmado',
    icon: 'horse',
    image: { src: '/images/maps/pista-ao-ar-livre.webp', alt: 'Pista ao ar livre do Haras', hint: 'exp-passeios.webp — passeio a cavalo / charrete', tone: 'earth', position: 'center 70%' },
    whatsappMessage: 'Olá! Gostaria de saber mais sobre os passeios a cavalo e de charrete.',
  },
  {
    id: 'gastronomia',
    title: 'Gastronomia rústica',
    summary: 'Almoço self-service com espetinhos de carne, frango e linguiça.',
    details: [
      'Buffet variado com saladas, massas, legumes e culinária caseira.',
      'Almoço das 12h às 15h. Aos domingos, café da manhã self-service das 8h às 11h.',
    ],
    prices: [
      { label: 'Almoço — adulto', price: 'R$ 60,00' },
      { label: 'Almoço — criança (5 a 10 anos)', price: 'R$ 50,00' },
      { label: 'Café da manhã de domingo — adulto', price: 'R$ 50,00' },
      { label: 'Café da manhã de domingo — criança (5 a 10 anos)', price: 'R$ 35,00' },
    ],
    pricesNote: PRICES_NOTE,
    status: 'confirmado',
    icon: 'utensils',
    image: { src: '/images/maps/comida-rustica.webp', alt: 'Panelas de barro com comida caseira no buffet', hint: 'exp-gastronomia.webp', tone: 'copper' },
    whatsappMessage: 'Olá! Gostaria de informações sobre o almoço no Haras.',
  },
  {
    id: 'familia',
    title: 'Lazer em família',
    summary: 'Animais para alimentar, Eskiunda e espaço livre para as crianças.',
    details: [
      'Kit para alimentar os animais e Eskiunda (escorregador) para a criançada.',
      'Em fins de semana e feriados, programação especial com música ao vivo — confira no Instagram.',
    ],
    prices: [
      { label: 'Kit para alimentar os animais', price: 'R$ 6,00' },
      { label: 'Eskiunda', price: 'R$ 12,00', note: 'por criança, a cada 15 min' },
    ],
    pricesNote: PRICES_NOTE,
    status: 'confirmado',
    icon: 'family',
    image: { src: '/images/maps/area-verde.webp', alt: 'Gramado amplo do Haras com palmeiras', hint: 'exp-familia.webp — família / crianças', tone: 'sand' },
    whatsappMessage: 'Olá! Gostaria de saber o que há para fazer em família no Haras.',
  },
  {
    id: 'hipismo',
    title: 'Hipismo e equitação',
    summary: 'O Haras recebe etapas do ranking de hipismo clássico (salto).',
    details: [
      'Etapas do Ranking Haras Manoel Leão de hipismo clássico, com pistas de grama (60 × 90 m) e de areia (55 × 90 m).',
      'Aulas de equitação: consulte disponibilidade, idades e horários pelo WhatsApp.',
    ],
    status: 'confirmado',
    icon: 'riding',
    image: { src: '/images/maps/pista-ao-ar-livre.webp', alt: 'Pista de hipismo do Haras', hint: 'exp-hipismo.webp — pista / salto', tone: 'forest', position: 'left 60%' },
    whatsappMessage: 'Olá! Gostaria de informações sobre hipismo e aulas de equitação no Haras.',
  },
  {
    id: 'eventos',
    title: 'Eventos e celebrações',
    summary: 'Aniversários, casamentos, batizados, chás revelação e comemorações.',
    details: [
      'O Haras reserva as mesas e oferece o buffet do dia (pago à parte, conforme o consumo).',
      'Há uma mesa de apoio para você trazer sua decoração, bolo e docinhos.',
    ],
    status: 'confirmado',
    icon: 'party',
    image: { src: '/images/maps/salao-eventos.webp', alt: 'Salão do Haras decorado para aniversário', hint: 'exp-eventos.webp', tone: 'copper' },
    whatsappMessage: 'Olá! Gostaria de informações para realizar um evento no Haras.',
  },
  {
    id: 'equoterapia',
    title: 'Equoterapia',
    summary: 'Informações para famílias e profissionais interessados no programa.',
    details: [
      'PENDENTE: confirmar se o programa de equoterapia está ativo, responsáveis técnicos e como se inscrever.',
    ],
    status: 'consultar',
    icon: 'therapy',
    image: {
      src: '/images/ilustrativas/vinculo-com-cavalo.webp',
      alt: 'Pessoa abraçando a cabeça de um cavalo preto em um campo',
      hint: 'exp-equoterapia.webp — equoterapia',
      tone: 'sand',
      position: 'center 35%',
      illustrative: true,
      credit: 'Imagem ilustrativa — Sinisa Lekovic / Unsplash',
    },
    whatsappMessage: 'Olá! Gostaria de saber se o Haras oferece equoterapia.',
  },
]

/* ---------------- Galeria ---------------- */

export interface GalleryItem extends SiteImage {
  /** Formato no mosaico editorial. */
  shape: 'tall' | 'wide' | 'square' | 'big'
  caption?: string
}

export const gallery: GalleryItem[] = [
  { shape: 'big', src: '/images/maps/pista-ao-ar-livre.webp', alt: 'Pista ao ar livre do Haras cercada por gramado e palmeiras', hint: '', caption: 'A pista', credit: 'Foto: Google Maps (TradeMaps, 2023)' },
  { shape: 'tall', src: '/images/maps/comida-rustica.webp', alt: 'Panelas de barro com comida caseira', hint: '', caption: 'Comida rústica', credit: 'Foto: Haras Manoel Leão (Google Maps, 2018)' },
  { shape: 'square', src: '/images/maps/varanda-restaurante.webp', alt: 'Varanda do restaurante com vista para o gramado', hint: '', caption: 'A varanda', credit: 'Foto: Google Maps (Conecta Group Marketing, 2026)' },
  { shape: 'square', src: '/images/instagram/DgDFklCh9MB.webp', alt: 'Salada, molho e caldo servidos no buffet', hint: '', caption: 'O buffet', position: 'center 20%', credit: 'Foto: Instagram @harasmanoelleao' },
  { shape: 'wide', src: '/images/maps/area-verde.webp', alt: 'Área verde com palmeiras e cerca branca', hint: '', caption: 'Área verde', credit: 'Foto: Google Maps (Alvo Marketing Digital, 2024)' },
  { shape: 'wide', src: '/images/maps/salao-eventos.webp', alt: 'Salão com teto de madeira decorado para festa', hint: '', caption: 'Salão de festas', credit: 'Foto: Haras Manoel Leão (Google Maps, 2017)' },
  { shape: 'square', src: '/images/ilustrativas/cavalos-no-pasto.webp', alt: 'Três cavalos no pasto verde sob céu azul com nuvens', hint: 'galeria-cavalos.webp', caption: 'Cavalos', illustrative: true, credit: 'Imagem ilustrativa — Heyzeus Escribo / Unsplash' },
  { shape: 'square', src: '/images/ilustrativas/crianca-com-cavalos.webp', alt: 'Criança acariciando cavalos por cima de uma cerca de madeira', hint: 'galeria-familia.webp', caption: 'Família', position: '35% center', illustrative: true, credit: 'Imagem ilustrativa — Lucia Macedo / Unsplash' },
]

/* ---------------- Gastronomia ---------------- */

export interface MenuItem {
  name: string
  description?: string
  /** Ex.: 'R$ 00,00'. Vazio = não exibido. */
  price?: string
}

export const gastronomy = {
  eyebrow: 'Experiência gastronômica',
  title: 'Comida rústica, mesa farta e tempo para aproveitar',
  lead:
    'Buffet variado com saladas, massas, legumes e culinária caseira, servido em um ambiente rústico e de clima familiar.',
  highlights: [
    { title: 'Almoço self-service', text: 'Com espetinhos de carne, frango e linguiça, das 12h às 15h.', status: 'confirmado' as Status },
    { title: 'Café da manhã de domingo', text: 'Self-service, das 8h às 11h.', status: 'confirmado' as Status },
    { title: 'Música ao vivo', text: 'Em fins de semana e datas especiais — programação no Instagram.', status: 'confirmado' as Status },
  ],
  /** Horários. `value` vazio = mostra "Consulte pelo WhatsApp". */
  hours: [
    { label: 'Almoço', value: '12h às 15h' },
    { label: 'Café da manhã', value: 'Domingos, 8h às 11h' },
    ...openingHours.map((h) => ({ label: h.days, value: h.hours })),
  ],
  /** Valores divulgados [IG] nov/2026. Lista vazia = "Cardápio sob consulta". */
  menu: [
    { name: 'Almoço self-service — adulto', description: 'Buffet + espetinhos de carne, frango e linguiça', price: 'R$ 60,00' },
    { name: 'Almoço self-service — criança', description: '5 a 10 anos', price: 'R$ 50,00' },
    { name: 'Café da manhã de domingo — adulto', description: 'Self-service, 8h às 11h', price: 'R$ 50,00' },
    { name: 'Café da manhã de domingo — criança', description: '5 a 10 anos', price: 'R$ 35,00' },
  ] as MenuItem[],
  menuNote: PRICES_NOTE,
  /** PDF do cardápio em /public (opcional). */
  menuPdf: '',
  images: [
    { src: '/images/maps/comida-rustica.webp', alt: 'Panelas de barro com feijão e comida caseira', hint: '', tone: 'copper' },
    { src: '/images/maps/varanda-restaurante.webp', alt: 'Varanda do restaurante com mesas de madeira', hint: '', tone: 'earth' },
    { src: '/images/instagram/DfxFbuHhmW5.webp', alt: 'Salada e caldos servidos no almoço', hint: '', tone: 'sand', position: 'center 15%' },
  ] as SiteImage[],
  ctaMessage: 'Olá! Gostaria de saber o cardápio e os horários do almoço.',
}

/* ---------------- Família ---------------- */

export const family = {
  eyebrow: 'Um lugar para toda a família',
  title: 'O dia em que as crianças conhecem o campo de perto',
  lead:
    'Espaço aberto, animais, natureza e tempo juntos. Um passeio simples, daqueles que ficam na memória de quem vem.',
  moments: [
    { title: 'Contato com a natureza', text: 'Gramados, palmeiras e o ar do interior.', status: 'confirmado' as Status },
    { title: 'Alimentar os animais', text: 'Kit de ração para a criançada interagir com os bichos.', status: 'confirmado' as Status },
    { title: 'Passeios a cavalo e de charrete', text: 'Um jeito tranquilo de conhecer o Haras.', status: 'confirmado' as Status },
    { title: 'Eskiunda', text: 'O escorregador que a criançada adora.', status: 'confirmado' as Status },
  ],
  images: [
    { src: '/images/maps/area-verde.webp', alt: 'Gramado amplo com palmeiras no Haras', hint: 'familia-1.webp — criança e cavalo, vertical', tone: 'sand', position: '30% center' },
    { src: '/images/maps/varanda-restaurante.webp', alt: 'Varanda do restaurante', hint: 'familia-2.webp — família na charrete', tone: 'forest' },
  ] as SiteImage[],
}

/* ---------------- Eventos ---------------- */

export interface UpcomingEvent {
  title: string
  /** Data ISO; o destaque some automaticamente depois desse dia. */
  date: string
  dateLabel: string
  details: string
  url: string
}

export const events = {
  eyebrow: 'Eventos e experiências especiais',
  title: 'Celebre em um cenário que ninguém esquece',
  lead:
    'Aniversários, casamentos, batizados, chás revelação e comemorações: o Haras reserva as mesas, oferece o buffet do dia e deixa espaço para a sua decoração.',
  types: [
    { title: 'Aniversários', status: 'confirmado' as Status },
    { title: 'Casamentos', status: 'confirmado' as Status },
    { title: 'Batizados e chás revelação', status: 'confirmado' as Status },
    { title: 'Eventos corporativos', status: 'consultar' as Status },
  ],
  /** [IG] Post de 18/05/2026. */
  facts: [
    { label: 'Mesas', value: 'Reservadas para o seu grupo' },
    { label: 'Buffet', value: 'Disponível no dia (pago à parte)' },
    { label: 'Decoração, bolo e docinhos', value: 'Você pode trazer' },
  ],
  /** Próximos eventos públicos. Itens com data passada não aparecem. */
  upcoming: [
    {
      title: '5ª Etapa do Ranking Haras Manoel Leão 2026 — Hipismo clássico (salto)',
      date: '2026-11-28',
      dateLabel: 'Sábado, 28 de novembro · provas a partir das 9h',
      details: 'Entrada franca. Almoço com espetinhos das 12h às 15h.',
      url: 'https://www.instagram.com/harasmanoelleao/reel/DgH5UlZBdMz/',
    },
  ] as UpcomingEvent[],
  image: { src: '/images/maps/salao-eventos.webp', alt: 'Salão do Haras com teto de madeira decorado para festa', hint: 'eventos.webp', tone: 'earth' } as SiteImage,
  cta: 'Organize seu evento no Haras',
  ctaMessage: 'Olá! Gostaria de organizar um evento no Haras Manoel Leão.',
}

/* ---------------- Instagram ---------------- */

export interface InstagramPost {
  /** Link da publicação original. */
  url: string
  image: SiteImage
  isVideo?: boolean
}

/**
 * Galeria administrável do Instagram: miniaturas das publicações oficiais
 * (salvas em /public/images/instagram) com link para o post original.
 * Para atualizar: baixe a capa do post, coloque em /assets-src/instagram,
 * rode `npm run images` e edite a lista abaixo.
 */
const ig = (id: string, kind: 'p' | 'reel', alt: string): InstagramPost => ({
  url: `https://www.instagram.com/harasmanoelleao/${kind}/${id}/`,
  image: { src: `/images/instagram/${id}.webp`, alt, hint: '' },
  isVideo: kind === 'reel',
})

export const instagramPosts: InstagramPost[] = [
  ig('DgLLtOSB_nM', 'reel', 'Convite para a 5ª etapa do Ranking de hipismo do Haras Manoel Leão'),
  ig('DgH5UlZBdMz', 'reel', 'Cartaz da 5ª etapa do Ranking de hipismo clássico, 28 de novembro'),
  ig('DgDFklCh9MB', 'reel', 'Buffet do almoço servido no Haras'),
  ig('Df8X10VBOfF', 'reel', 'Cartaz do feriado com almoço e atividades do Haras'),
  ig('DfxFbuHhmW5', 'reel', 'Almoço de domingo no Haras'),
  ig('DYeh0E6FROp', 'p', 'Cartaz sobre eventos e comemorações no Haras'),
]

/* ---------------- Contato ---------------- */

export const contactSection = {
  title: 'Seu próximo momento especial começa aqui.',
  lead: 'Tire dúvidas, planeje sua visita ou peça informações sobre eventos. A equipe do Haras responde pelo WhatsApp.',
  subjects: [
    'Visita e passeios',
    'Almoço / gastronomia',
    'Eventos e celebrações',
    'Hipismo / aulas de equitação',
    'Equoterapia',
    'Outro assunto',
  ],
}

/* ---------------- Rodapé ---------------- */

export const footer = {
  about:
    'Comida rústica, cavalos, natureza e muita diversão para toda a família, entre Ribeirão Preto e Brodowski.',
  /** PENDENTE: razão social e CNPJ para o rodapé, se o Haras quiser exibir. */
  legalName: '',
  cnpj: '',
}

/* ---------------- SEO ---------------- */

export const seo = {
  title: 'Haras Manoel Leão | Passeios a cavalo, comida rústica e lazer em família em Jardinópolis - SP',
  description:
    'Passeios a cavalo e de charrete, almoço self-service rústico, eventos e hipismo no Haras Manoel Leão, em Jardinópolis, entre Ribeirão Preto e Brodowski.',
}

/* ---------------- Manifesto (texto revelado no scroll) ---------------- */

export const manifesto = {
  text: 'Aqui o dia passa devagar. Tem cheiro de comida no fogão, cavalo na pista, criança correndo no gramado e mesa cheia de gente querida. É o interior do jeito que ele é.',
  /** Fatos verificáveis — nada de números inventados. */
  facts: [
    { value: 7, suffix: '', label: 'dias por semana abertos', source: 'Google Maps' },
    { value: 2, suffix: '', label: 'pistas de hipismo: grama e areia', source: 'Instagram' },
    { value: 327, prefix: 'km ', suffix: '', label: 'da Rodovia Cândido Portinari', source: 'Endereço' },
  ],
}

/** Palavras da faixa animada entre seções. */
export const marqueeWords = ['Natureza', 'Cavalos', 'Comida rústica', 'Charrete', 'Família', 'Hipismo', 'Celebrações']

/* ---------------- Planejador de visita ---------------- */

export interface PlannerItem {
  id: string
  label: string
  detail: string
  group: 'refeicao' | 'atividade'
  /** Preço por adulto e por criança (5 a 10 anos). Para atividades, preço unitário. */
  adult: number
  child?: number
  /** Para atividades: quantidade inicial = 'pessoas' | 'criancas'. */
  defaultQty?: 'pessoas' | 'criancas'
  /** Dias em que está disponível (0 = domingo). Vazio = todos. */
  weekdays?: number[]
}

/**
 * [IG] Valores divulgados nos cartazes de novembro/2026.
 * O planejador mostra uma ESTIMATIVA e sempre pede confirmação pelo WhatsApp.
 */
export const planner = {
  eyebrow: 'Planeje seu dia',
  title: 'Monte sua visita e veja uma estimativa na hora',
  lead: 'Escolha o dia, quantas pessoas vêm e o que vocês querem fazer. Depois é só enviar o plano para a equipe pelo WhatsApp.',
  note: 'Estimativa com valores divulgados no Instagram oficial em novembro/2026. O valor do almoço pode variar conforme o dia (ex.: domingos e feriados com churrasco). Crianças fora da faixa de 5 a 10 anos: consulte.',
  items: [
    { id: 'almoco', label: 'Almoço self-service', detail: 'Buffet + espetinhos · 12h às 15h', group: 'refeicao', adult: 60, child: 50 },
    { id: 'cafe', label: 'Café da manhã', detail: 'Self-service · só aos domingos, 8h às 11h', group: 'refeicao', adult: 50, child: 35, weekdays: [0] },
    { id: 'cavalo', label: 'Passeio a cavalo', detail: 'R$ 12 a cada 4 voltas', group: 'atividade', adult: 12, defaultQty: 'pessoas' },
    { id: 'charrete', label: 'Charrete', detail: 'R$ 6 por pessoa', group: 'atividade', adult: 6, defaultQty: 'pessoas' },
    { id: 'kit', label: 'Kit para alimentar os animais', detail: 'R$ 6 por kit', group: 'atividade', adult: 6, defaultQty: 'criancas' },
    { id: 'eskiunda', label: 'Eskiunda', detail: 'R$ 12 por criança a cada 15 min', group: 'atividade', adult: 12, defaultQty: 'criancas' },
  ] as PlannerItem[],
}
