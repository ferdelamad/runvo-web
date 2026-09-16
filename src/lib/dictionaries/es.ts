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
 *
 * The owner in every demo is Yaz, and her studio is fictional. The 555 number
 * is the one phone number that can't be real.
 */
export const es: Dictionary = {
  locale: "es",

  meta: {
    tagline: "Runvo pone el personal en negocios de una sola persona.",
    description:
      "El Front Desk, el Assistant y el Marketer que nunca pudiste contratar. Runvo contesta WhatsApp, Instagram y mensajes en español o inglés, agenda en tu calendario y te pasa el resto — en segundos.",
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
    { href: "#roles", label: "Qué hace" },
    { href: "#trust", label: "Confianza" },
    { href: "#pricing", label: "Precios" },
    { href: "#faq", label: "Preguntas" },
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
        text: "Listo — te aparté mañana a las 4:30 pm. Un depósito de $15 aparta el lugar: Zelle al (619) 555-0102 y me contestas “enviado” 🙂",
      },
    ],
    contact: "Ana R.",
    initials: "AR",
    channel: "WhatsApp · 9:02 pm",
    badge: "FRONT DESK",
    bookedTitle: "Agendado en tu calendario",
    bookedDetail: "Jue 4:30 pm · Lash fill · $65 · depósito solicitado",
    footnote: "Contestó en 4 segundos, a las 9:02 pm. Tu día ya había terminado.",
  },

  problem: {
    eyebrow: "El problema",
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
    roi: {
      line: "Contesta a las 9 pm, cuando la alternativa es que tú contestes a las 7 am.",
      sum: "A $150 la cita, con un solo mensaje que atrape ya pagó el mes.",
    },
  },

  stats: {
    eyebrow: "Resultados",
    title: "Hecho para hacer crecer tu negocio",
    lede: "Números reales de los estudios que usan Runvo.",
    items: [
      { value: "15hrs", plus: true, label: "ahorradas cada mes en tareas repetitivas" },
      {
        value: "60%",
        plus: true,
        label: "de las citas se agendan cuando estás cerrada o con una clienta",
      },
      { value: "30%", plus: true, label: "más ingresos en el primer año" },
    ],
    footnote:
      "Con base en los datos y comentarios de nuestras clientas actuales. Se actualiza conforme se suman más estudios.",
  },

  lifecycle: {
    eyebrow: "Cómo funciona",
    title: "Una cita no es un solo momento.",
    stages: [
      { label: "Descubrimiento" },
      { label: "Consulta" },
      { label: "Reserva" },
      { label: "Confirmación" },
      { label: "Servicio", isYou: true },
      { label: "Seguimiento" },
      { label: "Regreso" },
    ],
    youLabel: "TÚ",
    closer: { yours: "Tú haces una de estas.", runvo: "Runvo hace el resto." },
  },

  roles: {
    eyebrow: "Qué hace",
    title: "Contrata al primero. Después al segundo.",
    lede: "Tres roles, cada uno haciendo su trabajo a la vista.",
    items: [
      {
        name: "Front Desk",
        price: "desde $149/mes",
        status: "available",
        body: "Contesta WhatsApp, Instagram y mensajes en español o en inglés, en segundos. Da tus precios reales, ofrece tus horas reales, agenda en tu calendario y pide el depósito.",
        cta: "Apúntame",
      },
      {
        name: "Assistant",
        price: "$99/mes",
        status: "available",
        body: "Trabaja para ti, no para tus clientes. Escríbele para agendar a alguien o pregúntale cómo viene mañana. Y también te escribe primero: a quién pedirle reseña esta noche, quién dejó de venir y merece un mensaje el lunes.",
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
    integrations: "Funciona con Square. Pronto, más plataformas de agendamiento.",
    railLabel: "Qué hace Runvo",
    prev: "Anterior",
    next: "Siguiente",
    scenes: [
      {
        role: 0,
        title: "Contesta en el idioma en que le escriben.",
        body: "Emily escribió en inglés y le contestó en inglés — con tu precio real y tus horas reales, mientras tú estabas en una cita.",
        demo: {
          kind: "client-chat",
          contact: "Emily K.",
          initials: "EK",
          channel: "WhatsApp · 1:12 pm",
          thread: [
            { side: "in", text: "Hi! How much is a brow lamination?" },
            {
              side: "out",
              text: "Hi Emily! Brow lamination is $85 and takes about an hour. Want me to hold a spot for you?",
            },
            { side: "in", text: "yes, saturday if you can" },
            {
              side: "out",
              text: "Saturday I have 10:00 AM or 2:30 PM — which works better?",
            },
          ],
        },
      },
      {
        role: 1,
        title: "Agendado con un mensaje.",
        body: "Se lo escribes como se lo escribirías a alguien de tu equipo. Pregunta antes de adivinar y nunca agenda fuera de tu horario.",
        demo: {
          kind: "owner-chat",
          thread: [
            { side: "out", text: "métele a Ana mañana 4:30, lash fill" },
            { side: "in", text: "Hecho — jueves 4:30 pm, Ana R., lash fill, $65." },
            { side: "out", text: "qué tengo mañana" },
            {
              side: "in",
              text: "Jueves, 3 citas: Marisol 11:00 brow lamination · Kim 1:30 lash fill · Ana 4:30 lash fill. Directo de Square, así que también sale lo que agendaste por tu cuenta.",
            },
          ],
        },
      },
      {
        role: 1,
        title: "Pide la reseña. Tú tocas enviar.",
        body: "45 minutos después de cerrar te dice a quién falta pedirle reseña, redacta cada mensaje y te deja el envío a ti. Nunca le pide dos veces a la misma persona.",
        demo: {
          kind: "nudge",
          header: "ASSISTANT · ESTA NOCHE",
          link: "g.page/r/CTK4G…/review",
          steps: [
            {
              title: "🌙 Fin del día",
              body: "Atendiste a 4 clienta(s) hoy — 2 aún no reciben invitación de reseña.",
              buttons: [
                { label: "Ver la lista", tap: true },
                { label: "Hoy no", muted: true },
              ],
            },
            {
              title: "🌟 Reseñas — hoy",
              body: "2 clienta(s) aún sin invitación de reseña.",
              list: ["1. Valeria Ortiz Mena · 10:00", "2. Camila Rueda Soto · 17:00"],
              buttons: [
                { label: "✓ 1. Valeria" },
                { label: "🚫", muted: true },
                { label: "✓ 2. Camila" },
                { label: "🚫", muted: true },
                { label: "✍️ Redactar (2)", full: true, tap: true },
              ],
            },
            { body: "✍️ Redactando 2 mensaje(s)…" },
            {
              title: "1. Valeria Ortiz Mena",
              body: "Hola Valeria, ¡gracias por venir hoy! 🌟 Si te gustó tu cita, nos ayudarías muchísimo con una reseña rápida: {link}\n\nY como agradecimiento por tu confianza, tienes 15% en tu próxima cita con el código VUELVE15. ¡Nos vemos pronto! — Yaz",
              buttons: [{ label: "💬 WhatsApp ↗" }, { label: "📱 SMS ↗" }],
            },
            {
              title: "2. Camila Rueda Soto",
              body: "Hola Camila, ¡gracias por venir hoy! 🌟 Si te gustó tu cita, nos ayudarías muchísimo con una reseña rápida: {link}\n\nY como agradecimiento por tu confianza, tienes 15% en tu próxima cita con el código VUELVE15. ¡Nos vemos pronto! — Yaz",
              buttons: [{ label: "💬 WhatsApp ↗" }, { label: "📱 SMS ↗" }],
            },
            { body: "✅ 2 lista(s). Toca WhatsApp o SMS en cada una para enviarla." },
          ],
        },
      },
      {
        role: 1,
        title: "Se da cuenta de quién dejó de venir.",
        body: "Los lunes a las 9 te lista a quienes no han vuelto y no tienen nada agendado, con un mensaje listo para cada quien. No le escribe a nadie que ya tenga cita.",
        demo: {
          kind: "nudge",
          header: "ASSISTANT · LUNES 9:00 AM",
          link: "book.runvo.io/yaz",
          steps: [
            {
              title: "☀️ Lunes · recuperar clientas",
              body: "3 clienta(s) llevan más de 60 días sin venir y no tienen nada agendado:",
              list: [
                "1. Lucía Ferrer · última visita 12 jun",
                "2. Dani Rojas · 20 jun",
                "3. Rosa Peña · 2 jul",
              ],
              buttons: [
                { label: "✍️ Redactar (3)", tap: true },
                { label: "Esta semana no", muted: true },
              ],
            },
            { body: "✍️ Redactando 3 mensaje(s)…" },
            {
              title: "1. Lucía Ferrer",
              body: "¡Hola Lucía! Ya tiene rato 💛 Tengo unos espacios esta semana por si quieres tu cita de siempre — apártalo aquí: {link}",
              buttons: [{ label: "💬 WhatsApp ↗" }, { label: "📱 SMS ↗" }],
            },
            {
              body: "✅ 3 lista(s). Quien ya tenía cita agendada se quedó fuera de la lista.",
            },
          ],
        },
      },
      {
        role: 2,
        title: "Te mantiene visible.",
        body: "Publicaciones, contenido y los recordatorios que traen de vuelta a quienes ya te conocen — mientras tienes las manos ocupadas.",
        demo: { kind: "soon" },
      },
    ],
  },

  trust: {
    eyebrow: "Confianza",
    title: "Contesta. No inventa.",
    body: "Toda IA en internet dice que contesta mensajes. La pregunta que de verdad importa es si te va a dejar mal frente a alguien que lleva tres años viniendo contigo. Esto es exactamente lo que hace y lo que no.",
    rules: [
      {
        lead: "Los precios salen de tu catálogo real.",
        rest: "Nunca “más o menos”, nunca un rango que tú no pusiste.",
      },
      {
        lead: "Lo médico, los reembolsos, las quejas y lo legal te llegan directo.",
        rest: "Eso nunca pasa por la IA: hay un filtro antes, no una instrucción.",
      },
      {
        lead: "Cuando no sabe, te lo pasa y se calla.",
        rest: "Te avisa por Telegram y no vuelve a ese chat hasta que tú hayas contestado.",
      },
      {
        lead: "Dice que es virtual.",
        rest: "Una vez por conversación, porque California lo exige — y porque tus clientes merecen saberlo.",
      },
      {
        lead: "Nada le llega a un cliente sin tu dedo.",
        rest: "Las reseñas y los mensajes de regreso se redactan para ti. Tú los envías.",
      },
      {
        lead: "Se apaga con un toque.",
        rest: "Tu bandeja vuelve a ser tuya en el momento que quieras.",
      },
    ],
    proof: [
      { value: "4 seg", label: "de respuesta promedio, de día o de noche" },
      { value: "0", label: "mensajes enviados sin tu dedo" },
      { value: "4", label: "temas que te pasa directo, sin contestar nunca por su cuenta" },
    ],
    demo: {
      clientHeader: "WhatsApp · Ana R.",
      ask: "Hacen microblading? Cuánto sale?",
      reply: "Déjame confirmarlo con Yaz y te digo en un momento.",
      ownerHeader: "Telegram · tú",
      handoffTitle: "Te lo pasó a ti",
      handoffBody:
        "Ana preguntó por microblading. No está en tu lista de servicios, así que no le di ningún precio.",
      muted: "En silencio en el chat de Ana hasta que respondas",
    },
  },

  pricing: {
    eyebrow: "Precios",
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
    fine: "Mes a mes. Cancelas con un mensaje.",
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que preguntan primero.",
    lede: "Las respuestas cortas. Para todo lo demás, escribe a hola@runvo.io y te contesta una persona.",
    items: [
      {
        q: "¿Reemplaza mi app de citas?",
        a: "No. Runvo trabaja encima de Square, y pronto de más plataformas. Lo que agenda cae en el calendario que ya usas, y lo que agendes por tu cuenta aparece cuando le preguntas cómo viene tu día.",
      },
      {
        q: "¿Qué pasa cuando no sabe algo?",
        a: "Se detiene, le dice al cliente que lo va a confirmar contigo y te avisa por Telegram. No vuelve a esa conversación hasta que tú respondas. Los mensajes médicos, de reembolsos, quejas o legales nunca pasan por la IA: te llegan directo.",
      },
      {
        q: "¿En qué idiomas habla?",
        a: "Español e inglés, en el que escriba cada cliente. Si alguien cambia de idioma a mitad de la conversación, lo sigue.",
      },
      {
        q: "¿Mis clientes van a saber que hablan con un asistente?",
        a: "Sí. Lo dice una vez por conversación. Es la ley en California, y también es como se cuida su confianza.",
      },
      {
        q: "¿Qué hace el Assistant que no haga el Front Desk?",
        a: "El Front Desk habla con tus clientes. El Assistant habla contigo: agenda a alguien desde un mensaje, te dice cómo viene el día y te escribe primero — al cierre por las reseñas, los lunes por quienes dejaron de venir. Todo lo que redacta, lo envías tú.",
      },
      {
        q: "¿Cuánto tarda la instalación y hay contrato?",
        a: "Más o menos una semana. Nos pasas tus servicios, precios, horarios y las reglas que quieres que siga; conectamos Square y WhatsApp y lo acompañamos contigo los primeros días. Sin contrato: mes a mes, cancelas con un mensaje.",
      },
    ],
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
    otherLanguage: "Read in English",
  },
};
