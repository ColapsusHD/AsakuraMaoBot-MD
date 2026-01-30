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
           caption: `🎰|Comandos Casino/RPG/Economia:

_*[BOT MITAMA]*_
• #bal, #work, #slut, #crime, #dep, #with, #pay
_*[BOT ASAKURA]*_
• .adventure, .cazar, .cofre, .balance, .minar`
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
