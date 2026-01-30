export default {
  command: [
    'reglasfutabucasino', 'rulesfutabucasino', 'reglasfc',
    'rolcasino', 'casinoinfo', 'infoc',
    'rolgacha', 'gachainfo', 'infog'
  ],
  category: 'grupo',
  
  run: async (client, m, args, usedPrefix, command, text) => {
    
    // 1. REGLAS CASINO (Con Imagen)
    if (['reglasfutabucasino', 'rulesfutabucasino', 'reglasfc'].includes(command)) {
       await client.sendMessage(m.chat, { 
           image: { url: 'https://i.imgur.com/cGvNorx.jpeg' }, // <--- Link imagen reglas
           caption: `╰Futabu Casino╯

📝| *Reglas:*

❖ *Futabu Club*
➥ Es OBLIGATORIO estar en el grupo Futabu Club y participar ahí.

❖ *Respeto* 
➥ Respeta a todos, evitando insultos hacia personas de otros países.

❖ *Peleas o Discusiones*
➥ Los conflictos deben resolverse en privado.

❖ *Pedofilia*
➥ Prohibido acosar sexualmente a menores.

❖ *Doxeo*
➥ No se puede compartir información privada de ningún miembro.

❖ *Toxicidad*
➥ No insultar ni usar humor inapropiado hacia personas no receptivas.

❖ *Spam*
➥ No mandar enlaces, stickers o promociones repetidamente sin permiso.

❖ *Binarios o Inmune*
➥ Prohibido enviar archivos que causen crasheos o cierres en WhatsApp.

❖ *Acoso*
➥ No acoses a miembros ni administradores, sea en grupo o privado.

❖ *Mandar Packs*
➥ Prohibido enviar packs tuyos o de otras personas (tetas, pene, trasero, vagina).

❖ *Flood*
➥ No enviar mensajes repetidos de forma excesiva.`
       }, { quoted: m });
       return;
    }

    // 2. INFO ROL CASINO (Con Imagen)
    if (['rolcasino', 'casinoinfo', 'infoc'].includes(command)) {
       await client.sendMessage(m.chat, { 
           image: { url: 'https://i.imgur.com/dUy9AUp.png' }, // <--- Link imagen casino
           caption: `🎰| *Comandos Casino/RPG/Economía:*

_*[BOT "#"]*_
• #bal - Ver tu balance.

• #einfo - Ver info de tu economía.

• #work - Gana Futacoins trabajando.

• #slut - Gana Futacoins prostituyéndote.

• #crime - Gana Futacoins haciendo un crimen.

• #dep - Depositar tus Futacoins en el banco.

• #with - Retirar tus Futacoins del banco.

• #flip - Apostar Futacoins en un cara o cruz.

• #pay [usuario] [cantidad] - Dar Futacoins.

• #rt [rojo/negro] [cantidad] - Apuesta Futacoins en la ruleta.

• #rob [usuario] - Intentar robar Futacoins.

• #d - Recompensa diaria.

_° Más comandos usando #menu → sección Economy._

_*[BOT ASAKURA]*_
• .adventure - Comenzar una aventura.

• .slut - Prostituirte a cambio de monedas o perder en el intento.

• .cazar - Cazar algún animal.

• .cofre - Abrir un cofre.

• .balance - Ver tu balance.

• .deposit [cantidad o all si quieres depositar todo] - Depositar tus monedas al banco.

• .work - Trabajar para ganar coins.

• .minar - Obtener monedas.

• .robar [cantidad] [usuario] - Robar a un usuario.

• .crime - Cometer un crimen.

_° Más comandos usando .menu → sección Economía._`
       }, { quoted: m });
       return;
    }

    // 3. INFO GACHA (Con Imagen)
    if (['rolgacha', 'gachainfo', 'infog'].includes(command)) {
       await client.sendMessage(m.chat, { 
           image: { url: 'https://i.imgur.com/fHVo6NU.png' }, // <--- Link imagen gacha
           caption: `🌸| *Comandos Gacha:*

_*[BOT "#"]*_
• #rw - Girar waifu.

• #waifus - Ver tus waifus.

• #c - Reclamar waifu.

• #ginfo - Ver tu información de gacha (cooldown).

• #trade [Tu waifu] [Waifu del otro usuario] - Intercambiar waifus.

• #wshop - Ver waifus en venta.

• #sell [Precio] [Waifu] - Poner waifu en venta.

• #buyc [Waifu] - Comprar waifu en venta.

• #delwaifu [Waifu] - Eliminar waifu reclamada.

• #givechar [@usuario] [Waifu] - Regalar waifu a un usuario.

_° Más comandos usando #menu → sección Gacha._`
       }, { quoted: m });
       return;
    }
  }
}
