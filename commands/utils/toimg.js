export default {
  command: ['toimg', 'toimage', 'tovideo'],
  category: 'tools',
  run: async (client, m, { usedPrefix, command }) => {
    // 1. Validar que se esté citando algo
    if (!m.quoted) return client.reply(m.chat, `《✧》 Debes citar un sticker para convertir.`, m)
    
    // 2. Validar que sea específicamente un sticker
    if (!/sticker/.test(m.quoted.mtype)) return client.reply(m.chat, `《✧》 Solo puedes convertir stickers con este comando.`, m)

    await m.react('🕒')

    try {
      // Descargar el contenido del sticker
      let media = await m.quoted.download()
      if (!media) throw new Error('No se pudo descargar el medio')

      // 3. Lógica de detección: Sticker Animado vs Estático
      // Si m.quoted.isAnimated es true, lo enviamos como video
      if (m.quoted.isAnimated) {
        await client.sendMessage(m.chat, { 
          video: media, 
          caption: 'ꕥ *Aquí tienes tu video ฅ^•ﻌ•^ฅ*',
          gifPlayback: false // Cambiar a true si prefieres que se vea como GIF
        }, { quoted: m })
      } else {
        // Si no es animado, lo enviamos como imagen
        await client.sendMessage(m.chat, { 
          image: media, 
          caption: 'ꕥ *Aquí tienes tu imagen ฅ^•ﻌ•^ฅ*' 
        }, { quoted: m })
      }

      await m.react('✔️')
    } catch (e) {
      console.error(e)
      await m.react('✖️')
      client.reply(m.chat, `《✧》 Ocurrió un error al procesar el archivo.`, m)
    }
  }
}
