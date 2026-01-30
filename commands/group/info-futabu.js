export default {
  // Aquí ponemos TODAS las palabras clave que activan estos comandos
  command: [
    'apoyo', 'mejorar', 'apoyobot', 'mejorarbot',
    'comunidad', 'grupocomunidad', 'grupoavisos',
    'concurso', 'concursofutabuclub',
    'contenido', 'contenidopermitido',
    'discord', 'serverdiscord', 'grupodiscord',
    'telegram', 'grupodetelegram',
    'evento', 'eventos'
  ],
  category: 'grupo',
  
  run: async (client, m, args, usedPrefix, command, text) => {
    
    switch (command) {
      case 'apoyo':
      case 'mejorar':
      case 'apoyobot':
      case 'mejorarbot':
        m.reply(`*_Aca tienes los 2 bancos para transferir dinero para la mejora del bot!_*

*💸 Paypal:* colapsuspaypal2005@gmail.com (Benjamin Chacon)

*🏦 Banco Virtual (Mercado Pago, Uala, Etc)*
• Alias: COLAPSUSHD2020.UALA
• CBU/CVU: 0000007900204654633937`);
        break;

      case 'comunidad':
      case 'grupocomunidad':
      case 'grupoavisos':
        m.reply(`*GRUPO DE LA COMUNIDAD*

_⚠️| Este grupo será solamente de avisos o noticias relacionada con los grupos de la comunidad Futabu._

Link: https://chat.whatsapp.com/IKCpRmuyrNBL41wb9J2kNO?mode=ac_c`);
        break;

      case 'concurso':
      case 'concursofutabuclub':
        m.reply(`Nada aún!`);
        break;

      case 'contenido':
      case 'contenidopermitido':
        m.reply(`*_✅|CONTENIDO PERMITIDO_* \n\n*_❌|CONTENIDO PROHIBIDO_* \n\n⭐| Recuerda que la temática tiene que ser más de.`);
        break;

      case 'discord':
      case 'serverdiscord':
      case 'grupodiscord':
        m.reply(`Nuestro Server de Discord!\nLink: https://discord.gg/UjdSaTESQG`);
        break;

      case 'telegram':
      case 'grupodetelegram':
        m.reply(`Nuestro grupo de Telegram!\nLink: https://t.me/FutabuClub`);
        break;
        
      case 'evento':
      case 'eventos':
        m.reply(`*_Limpieza de Miembros Inactivos (7 de Septiembre 2025)_*

Guarda este link para recordartelo: wa.me/+5492604849203
Buena suerte si sobrevives a la purga ese dia ;)`);
        break;
    }
  }
}
