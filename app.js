const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente'])
.addAnswer(['📄 El siguiente paso es la contratación de tu ChatbotPublia, ingresa la descripción del Chatbot que deseas para recibir una cotización en línea.'])

const flowDocs = addKeyword(['info', 'informacion', 'información']).addAnswer(
    [
        '📄 Publia.Club es la Agencia digital Colaborativa que te brinda el mejor servicio a los mejores costos.',
    ]
)
.addAnswer(
    [
        '💻 Realizamos sitios web, 📱 programación de aplicaciones, 🤖 Chatbots, 🎬 Multimedia, 📢 Campañas y mucho más ✨',
    ],
)
    .addAnswer(
       [
        '\n*2* Para siguiente paso.',
        ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['chatbot', 'chatbots']).addAnswer(
    [
        '🙌 Éste es un ejemplo de Chatbot, sin embargo los Chatbots pueden hacer mucho más',
        '🌐 Automatizar respuestas frecuentes',
        '📊 Conectar con CRMs y sistemas de ventas',
        '🛒 Procesar pedidos y pagos',
        '🤝 Dar soporte al cliente 24/7',
        '🎯 Enviar campañas personalizadas',
        '📈 Generar métricas de interacción en tiempo real',
        '\n👉 Aquí un ejemplo práctico:',
        'https://bot-whatsapp.netlify.app/docs/example/',
    ]
)
.addAnswer(
    [
        '⚠️ Importante: Se recomienda **ampliamente** usar la *API Oficial de Meta* para WhatsApp.',
        '✅ Mayor estabilidad y soporte oficial',
        '✅ Cumplimiento con las políticas de WhatsApp',
        '✅ Seguridad y cifrado garantizado',
        '✅ Menos riesgo de bloqueos de número',
        '✅ Escalabilidad para empresas y proyectos grandes',
        '\n👉 Usar librerías no oficiales puede funcionar en pruebas, pero no es confiable en producción.',
    ],
    )
    .addAnswer(
       [
        '\n*2* Para siguiente paso.',
        ],

    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['API', 'api', 'meta']).addAnswer(
    [
        '📱 **Cómo agregar un número a la API oficial de Meta WhatsApp:**',
        '1️⃣ Crear una cuenta de Facebook Business Manager: https://business.facebook.com/',
        '2️⃣ Verificar tu empresa ✅ (documentos legales, dirección, RFC si aplica)',
        '3️⃣ Crear un WhatsApp Business Account (WABA) desde el Business Manager',
        '4️⃣ Vincular tu número de teléfono 📞 al WABA (el número debe poder recibir llamadas o SMS)',
        '5️⃣ Configurar un **token de acceso** para la API en la sección de WhatsApp -> Configuración -> Generar Token 🔑',
        '6️⃣ Elegir la plataforma o librería oficial para tu bot (por ejemplo, *Meta for Developers*)',
        '7️⃣ Probar el número con mensajes de prueba 🧪 y asegurarte que recibe y envía correctamente',
        '8️⃣ Revisar límites y políticas de mensajes 📜 para no ser bloqueado',
        '9️⃣ Escalar tu bot a producción 🚀 y monitorear métricas de uso 📊',
        '\n💡 **Tips:**',
        '✅ Usa la API oficial siempre para evitar bloqueos y problemas legales',
        '✅ No uses números personales ni librerías no oficiales en producción',
        '✅ Mantén tu token seguro y renueva antes de que expire 🔒',
    ],
)
    .addAnswer(
       [
        '\n*2* Para siguiente paso.',
        ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

// Flujo principal
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido al *Chatbot Publia.Club*')
    .addAnswer('❌ Éste es un Chatbot de prueba que no está hecho con la API Oficial de Meta, por lo que sus funcionalidades son limitadas, no tiene botones e incluso presenta algunas fallas')
    .addAnswer('😺 No obstante se muestran algunas opciones favor de responder mensaje con alguna de las palabras exactas resaltadas con negritas.')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *info* para conocer la info de Publia.MX',
            '👉 *chatbot*  para conocer los Chatbots para Whatsapp',
            '👉 *API* para las intrucciones para registrar tu número con la API oficial de Meta',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )


// Flujo de respaldo (catch-all)
const flowFallback = addKeyword([''], { sensitive: false, catchAll: true })
    .addAnswer('🙌 Hola bienvenido al *Chatbot Publia.Club*')
    .addAnswer('❌ Éste es un Chatbot de prueba que no está hecho con la API Oficial de Meta, por lo que sus funcionalidades son limitadas, no tiene botones e incluso presenta algunas fallas')
    .addAnswer('😺 No obstante se muestran algunas opciones favor de responder mensaje con alguna de las palabras exactas resaltadas con negritas.')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *info* para conocer la info de Publia.MX',
            '👉 *chatbot*  para conocer los Chatbots para Whatsapp',
            '👉 *API* para las intrucciones para registrar tu número con la API oficial de Meta',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowFallback]) // ojo aquí, incluimos el fallback
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}


main()
