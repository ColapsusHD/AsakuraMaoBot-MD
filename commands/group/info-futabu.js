// info-grupos.js
let handler = async (m, { conn, command, usedPrefix }) => {
    
    // APOYO
    if (/^(apoyo|mejorar|apoyobot|mejorarbot)$/i.test(command)) {
        let texto = `*_Aca tienes los 2 bancos para transferir dinero para la mejora del bot!_*

*💸 Paypal:* colapsuspaypal2005@gmail.com (Benjamin Chacon)

*🏦 Banco Virtual (Mercado Pago, Uala, Etc)*
• Alias: COLAPSUSHD2020.UALA
• CBU/CVU: 0000007900204654633937`
        m.reply(texto)
    }

    // COMUNIDAD
    if (/^(comunidad|grupocomunidad|grupoavisos)$/i.test(command)) {
        let texto = `*GRUPO DE LA COMUNIDAD*

_⚠️| Este grupo será solamente de avisos o noticias relacionada con los grupos de la comunidad Futabu, solo podran hablar los del Equipo de Staff y los miembros solo podran ver._

Link: https://chat.whatsapp.com/IKCpRmuyrNBL41wb9J2kNO?mode=ac_c`
        m.reply(texto)
    }

    // CONCURSO
    if (/^(concurso|concursofutabuclub)$/i.test(command)) {
        m.reply(`Nada aún!`)
    }

    // CONTENIDO
    if (/^(contenido|listacontenido|listcontenido|contenidopermitido)$/i.test(command)) {
        let texto = `*_✅|CONTENIDO PERMITIDO_*

*_❌|CONTENIDO PROHIBIDO_*

⭐| Recuerda que la temática tiene que ser más de.`
        m.reply(texto)
    }

    // DISCORD
    if (/^(serverdis|serverdiscord|discord|grupodiscord|linkdiscord)$/i.test(command)) {
        m.reply(`Nuestro Server de Discord!\nLink: https://discord.gg/UjdSaTESQG`)
    }

    // TELEGRAM
    if (/^(telegram|grupodetelegram|linktelegram)$/i.test(command)) {
        m.reply(`Nuestro grupo de Telegram!\nLink: https://t.me/FutabuClub`)
    }

    // EVENTOS
    if (/^(evento|eventos|eventofutabuclub)$/i.test(command)) {
        let texto = `*_Limpieza de Miembros Inactivos (6 de Septiembre 2025)_*

Esto se hace como un aviso para empezar a hacer activo en los meses que faltan.

*GUARDA ESTE LINK*: wa.me/+5492604849203`
        m.reply(texto)
    }
}

handler.help = ['apoyo', 'comunidad', 'concurso', 'contenido', 'discord', 'telegram', 'eventos']
handler.tags = ['grupo']
handler.command = /^(apoyo|mejorar|apoyobot|mejorarbot|comunidad|grupocomunidad|grupoavisos|concurso|concursofutabuclub|contenido|listacontenido|listcontenido|contenidopermitido|serverdis|serverdiscord|discord|grupodiscord|linkdiscord|telegram|grupodetelegram|linktelegram|evento|eventos|eventofutabuclub)$/i
handler.group = true

export default handler
