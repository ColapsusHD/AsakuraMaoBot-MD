let handler = async (m, { conn, command }) => {
    
    if (/^(reglasfutabucasino|rulesfutabucasino|reglasfc)$/i.test(command)) {
        let texto = `╰Futabu Casino╯

📝| Reglas:
❖ Futabu Club
➥ Es *OBLIGATORIO* que estes a la vez en grupo de Futabu Club y que tambien aportes o hables por ahi.
❖ Respeto
➥ Se debe respetar a todos en el grupo.
❖ Peleas o Discusiones
➥ Resolver en privado.
❖ Flood
➥ Prohibido inundar el chat.`
        return m.reply(texto)
    }

    if (/^(rolcasino|casinoinfo|infoc)$/i.test(command)) {
        let texto = `🎰|Comandos Casino/RPG/Economia:

_*[BOT MITAMA]*_
• #bal - Ver tu balance.
• #work - Gana Futacoins trabajando.
• #slut - Gana Futacoins prostituyéndote.
• #crime - Gana Futacoins haciendo un crimen.
• #dep - Depositar tus Futacoins.
• #with - Retirar tus Futacoins.
• #pay - Darle Futacoins a un usuario.

_*[BOT ASAKURA]*_
• .adventure - Comenzar un adventura.
• .cazar - Caza algún objeto.
• .balance - Ver tu balance.
• .minar - Mina para obtener diamantes.`
        return m.reply(texto)
    }

    if (/^(rolgacha|gachainfo|infog)$/i.test(command)) {
        let texto = `🌸| Comandos Gacha:

_*[BOT MITAMA]*_
• #rw - Girar waifu.
• #waifus - Ver tus waifus.
• #c - Reclamar waifu.
• #trade - Intercambiar waifu.
• #sell - Vender waifu.`
        return m.reply(texto)
    }
}

handler.help = ['reglasfutabucasino', 'rolcasino', 'rolgacha']
handler.tags = ['grupo']
handler.command = /^(reglasfutabucasino|rulesfutabucasino|reglafutabucasino|rulefutabucasino|reglasfc|rolcasino|casinoinfo|infoc|rolgacha|gachainfo|infog)$/i
handler.group = true
export default handler
