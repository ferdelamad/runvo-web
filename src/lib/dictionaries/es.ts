import type { Dictionary } from "@/lib/dictionary";

/**
 * Escrita, no traducida. Two rules hold this copy together:
 *
 * 1. Nothing here is gendered at the reader. Spanish leaks assumptions through
 *    its articles and adjectives, so the copy leans on verbs and neutral nouns
 *    ("tienes las manos ocupadas", "quienes", "atiendes") rather than any
 *    -o/-a ending that would guess who is reading.
 * 2. Role names stay in English. "Front Desk", "Assistant" and "Marketer" are
 *    product names, the way the founder already says them out loud.
 */
export const es: Dictionary = {
  locale: "es",

  meta: {
    tagline: "Runvo pone el personal en negocios de una sola persona.",
    description:
      "El Front Desk, el Assistant y el Marketer que nunca pudiste contratar. Runvo contesta WhatsApp, Instagram y mensajes en español o inglés, agenda en tu calendario y da seguimiento — en segundos.",
    keywords: [
      "recepción con IA",
      "citas por WhatsApp",
      "agenda para salón de belleza",
      "recepción bilingüe",
      "negocio de una persona",
    ],
  },

  common: {
    skipToContent: "Saltar al contenido",
    navLabel: "Principal",
    footerNavLabel: "Pie de página",
    languageLabel: "Idioma",
    menuLabel: "Menú",
    joinShort: "Únete",
    join: "Únete a la lista",
  },

  navLinks: [
    { href: "#how", label: "Cómo funciona" },
    { href: "#roles", label: "Roles" },
    { href: "#pricing", label: "Precios" },
  ],

  hero: {
    badge: "Dando de alta a los primeros negocios",
    titleLines: ["Runvo pone el personal", "en negocios de una sola persona."],
    lede: "El Front Desk, el Assistant y el Marketer que nunca pudiste contratar. Empieza con uno. Suma los demás cuando estés listo para más.",
    ctaPrimary: "Únete a la lista",
    ctaSecondary: "Mira cómo funciona",
    proofPoints: ["Contesta en segundos", "Habla español e inglés", "Listo en una semana"],
  },

  frontDesk: {
    thread: [
      { side: "in", text: "Hola! Tienes espacio mañana para lash fill?" },
      {
        side: "out",
        text: "¡Hola Ana! Sí — mañana tengo 11:00 am o 4:30 pm. El fill son $65 y toma una hora.",
      },
      { side: "in", text: "4:30 porfa" },
      {
        side: "out",
        text: "Listo. Te aparté mañana 4:30 pm. Te mando el recordatorio esta noche.",
      },
    ],
    contact: "Ana R.",
    initials: "AR",
    channel: "WhatsApp · 9:02 pm",
    badge: "FRONT DESK",
    bookedTitle: "Agendado en tu calendario",
    bookedDetail: "Jue 4:30 pm · Lash fill · $65 · recordatorio programado",
    footnote: "Contestó en 4 segundos. Tú seguías atendiendo.",
  },

  problem: {
    title: "No tienes recepción. Tienes un teléfono en silencio.",
    body: [
      "Todo negocio que puede pagar una recepción tiene una. La tuya está en silencio, dentro de un cajón, mientras tienes las manos ocupadas.",
      "Los mensajes se acumulan. WhatsApp. Instagram. Texto. Y todavía te toca contestarlos después de ocho horas de pie, cuando el día ya debería haber terminado.",
    ],
    punchline:
      "Te escribieron a las 9 pm. Contestaste a las 7 am. A las 9:15 pm ya habían agendado en otro lado.",
    bars: {
      slow: {
        label: "Hoy, sin recepción",
        value: "10 hrs",
        from: "9:00 pm — preguntan",
        to: "7:00 am — contestas",
      },
      fast: {
        label: "Hoy, con Runvo",
        value: "4 seg",
        from: "9:00 pm — preguntan",
        to: "9:00 pm — ya agendaron",
      },
    },
  },

  stats: {
    items: [
      { value: "61%", label: "de las consultas esperaron más de doce horas por una respuesta" },
      { value: "28%", label: "nunca recibieron respuesta" },
      { value: "3,4×", label: "más citas agendadas cuando la respuesta es rápida" },
    ],
    pendingChip: "Contando ahora — dos semanas, un estudio en Vacaville",
    measuredChip: "Medido en un estudio de Vacaville, dos semanas",
    closer: "Runvo contesta en segundos. En todos los canales. Aunque sean las 9 pm.",
  },

  lifecycle: {
    title: "Una cita no es un solo momento.",
    stages: [
      { label: "Descubrimiento" },
      { label: "Consulta" },
      { label: "Reserva" },
      { label: "Recordatorio" },
      { label: "Servicio", isYou: true },
      { label: "Seguimiento" },
      { label: "Regreso" },
    ],
    youLabel: "TÚ",
    closer: { yours: "Tú haces una de estas.", runvo: "Runvo hace el resto." },
  },

  roles: {
    title: "Contrata al primero. Después al segundo.",
    items: [
      {
        name: "Front Desk",
        price: "desde $149/mes",
        status: "available",
        body: "Contesta WhatsApp, Instagram y mensajes — en español o en inglés, en segundos. Da tus precios, agenda en tu calendario, manda el recordatorio, busca a quienes se quedaron callados y al final pide la reseña.",
        cta: "Apúntame",
      },
      {
        name: "Assistant",
        price: "$99/mes",
        status: "available",
        body: "Trabaja para ti, no para tus clientes. Escríbele para agendar a alguien. Pregúntale cómo viene mañana. Te marca los huecos de la semana antes de que se vuelvan horas vacías.",
        cta: "Apúntame",
      },
      {
        name: "Marketer",
        price: null,
        status: "soon",
        body: "Te mantiene visible mientras tienes las manos ocupadas. Publicaciones, contenido y los recordatorios que traen de vuelta a quienes ya te conocen.",
        cta: "Avísame",
      },
    ],
    badges: { available: "DISPONIBLE YA", soon: "PRÓXIMAMENTE" },
    integrations: "Funciona con Square y con lo que ya uses.",
    assistantHeader: "ASSISTANT · TU PROPIO CHAT",
    assistantThread: [
      { side: "out", text: "métele a Ana mañana 4:30, lash fill" },
      { side: "in", text: "Hecho — jueves 4:30 pm, Ana R., lash fill, $65." },
      {
        side: "in",
        // "quienes" rather than "las que": Spanish carries the assumption in its
        // articles, so a neutral relative pronoun is what keeps this agnostic.
        text: "Tu jueves tiene tres huecos entre 12 y 4. ¿Le escribo a quienes no han reagendado desde junio?",
      },
      { side: "out", text: "sí, nada más junio" },
    ],
  },

  trust: {
    title: "Contesta. No inventa.",
    body: "Runvo trabaja con tus precios reales, tus servicios reales y tu calendario real. Cuando algo se sale de lo que tú definiste, se detiene y te pasa la conversación en lugar de inventarse una respuesta.",
    chips: [
      "Nadie está siendo reemplazado, porque nunca hubo nadie",
      "Tú decides qué puede decir",
      "Lo apagas con un toque",
    ],
    demoTitle: "CUANDO NO SABE",
    ask: "Hacen microblading? Cuánto sale?",
    reply: "Déjame confirmarlo con Yaz y te digo en un momento.",
    handoffStrong: "Te lo pasó a ti",
    handoffRest: " — microblading no está en tu lista de servicios.",
  },

  pricing: {
    title: "Una cita al mes lo paga.",
    tiers: [
      {
        name: "Front Desk",
        price: "desde $149",
        note: "El precio depende de cuántas bandejas de entrada llevas — no de la plataforma.",
        featured: false,
      },
      {
        name: "Assistant",
        price: "$99",
        note: "El que trabaja para ti en vez de para tus clientes.",
        featured: false,
      },
      {
        name: "Los dos",
        price: "$199",
        note: "Tu recepción y tu asistente, contratados juntos.",
        featured: true,
      },
    ],
    perMonth: "/mes",
    closer:
      "A $150 la cita, el Front Desk se paga solo la primera vez que atrapa una que se te habría escapado. Y un cliente que conservas no es una cita — son todas las visitas que iba a hacer este año.",
  },

  waitlist: {
    title: "Llega primero.",
    lede: "Estamos dando de alta a los primeros diez negocios. Te va a escribir una persona, no un autorespondedor.",
    promises: ["Listo en una semana", "Español e inglés", "Cancelas cuando quieras"],
    emailLabel: "Tu correo",
    placeholder: "tu@tunegocio.com",
    submit: "Únete a la lista",
    submitting: "Enviando…",
    success: "Ya estás en la lista. Te escribo yo esta semana, en persona.",
    errors: {
      "invalid-email": "Ese correo no se ve bien — ¿lo revisas?",
      "save-failed": "Algo falló de nuestro lado. Inténtalo otra vez o escríbenos a hola@runvo.io.",
    },
  },

  footer: {
    legal: "Runvo · California · El equipo de los negocios de una sola persona.",
  },
};
