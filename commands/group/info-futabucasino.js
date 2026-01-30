export default {
  command: [
    'reglasfutabucasino', 'rulesfutabucasino', 'reglasfc',
    'rolcasino', 'casinoinfo', 'infoc',
    'rolgacha', 'gachainfo', 'infog'
  ],
  category: 'grupo',
  
  run: async (client, m, args, usedPrefix, command, text) => {
    
    // REGLAS CASINO
    if (['reglasfutabucasino', 'rulesfutabucasino', 'reglasfc'].includes(command)) {
       return m.reply(`╰Futabu Casino╯\n\n📝| Reglas:\n❖ Futabu Club: Es *OBLIGATORIO* estar en el grupo principal.\n❖ Respeto, Cero Toxicidad y No Flood.`);
    }

    // INFO ROL CASINO
    if (['rolcasino', 'casinoinfo', 'infoc'].includes(command)) {
       return m.reply(`🎰|Comandos Casino/RPG/Economia:

_*[BOT MITAMA]*_
• #bal, #work, #slut, #crime, #dep, #with, #pay
_*[BOT ASAKURA]*_
• .adventure, .cazar, .cofre, .balance, .minar`);
    }

    // INFO GACHA
    if (['rolgacha', 'gachainfo', 'infog'].includes(command)) {
       return m.reply(`🌸| Comandos Gacha:

_*[BOT MITAMA]*_
• #rw - Girar waifu.
• #waifus - Ver tus waifus.
• #c - Reclamar waifu.
• #trade - Intercambiar waifu.`);
    }
  }
}
