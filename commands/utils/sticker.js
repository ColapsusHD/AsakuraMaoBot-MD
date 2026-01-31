import fs from 'fs'
import exif from '../../lib/exif.js'
const { writeExif } = exif

// Intentamos importar wa-sticker-formatter para hacer el recorte FULL
let Sticker, StickerTypes
try {
  const module = await import('wa-sticker-formatter')
  Sticker = module.Sticker
  StickerTypes = module.StickerTypes
} catch (e) {
  console.error('Instala wa-sticker-formatter: npm install wa-sticker-formatter')
}

export default {
  command: ['sticker', 's'],
  category: 'utils',
  run: async (client, m, args, usedPrefix, command) => {
    try {
      const quoted = m.quoted ? m.quoted : m
      const mime = (quoted.msg || quoted).mimetype || ''       
      let user = globalThis.db.data.users[m.sender] || {}
      
      // Metadatos
      const name = user.name
      let texto1 = user.metadatos || `Sticker`
      let texto2 = user.metadatos2 || `ᴀꜱᴀᴋᴜʀᴀ ᴍᴀᴏ ʙᴏᴛ 👑`       
      
      // Procesar argumentos de URL
      let urlArg = null
      let argsWithoutUrl = []       
      for (let arg of args) {
        if (isUrl(arg)) urlArg = arg
        else argsWithoutUrl.push(arg)
      }       
      
      let filteredText = argsWithoutUrl.join(' ').trim()
      let marca = filteredText.split(/[\u2022|]/).map(part => part.trim())
      let pack = marca[0] || texto1
      let author = marca.length > 1 ? marca[1] : texto2    

      // --- LOGICA PARA IMAGENES Y WEBP ---
      if (/image/.test(mime) || /webp/.test(mime)) {
        let buffer = await quoted.download()
        
        // Intentamos usar wa-sticker-formatter para hacerlo FULL (Grande)
        if (Sticker && StickerTypes) {
            try {
                const sticker = new Sticker(buffer, {
                    pack: pack,
                    author: author,
                    type: StickerTypes.FULL, // <--- ESTO ES LO QUE LO HACE GRANDE
                    quality: 60
                })
                return await client.sendMessage(m.chat, { sticker: await sticker.toBuffer() }, { quoted: m })
            } catch (e) {
                console.error('Error en wa-sticker-formatter, usando fallback:', e)
            }
        }

        // --- FALLBACK (Si falla lo de arriba, usa el método antiguo) ---
        const isWebpAnimated = /webp/.test(mime) && buffer.toString('hex', 0, 4) === '52494646'    
        if (isWebpAnimated) {
          const media = { mimetype: 'webp', data: buffer };
          const metadata = { packname: pack, author: author, categories: [''] };
          const stickerPath = await writeExif(media, metadata);
          await client.sendMessage(m.chat, { sticker: { url: stickerPath }}, { quoted: m });
          await fs.unlinkSync(stickerPath)
        } else {
          const tmpFile = `./tmp-${Date.now()}.webp`
          await fs.writeFileSync(tmpFile, buffer)
          await client.sendImageAsSticker(m.chat, tmpFile, m, { packname: pack, author: author })
          await fs.unlinkSync(tmpFile)
        }        

      // --- LOGICA PARA VIDEO ---
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 20) return m.reply('《✧》 El video no puede ser muy largo')
        let buffer = await quoted.download()
        const tmpFile = `./tmp-video-${Date.now()}.mp4`
        await fs.writeFileSync(tmpFile, buffer)
        // Los videos suelen respetar el aspect ratio por limitaciones de ffmpeg en el core
        await client.sendVideoAsSticker(m.chat, tmpFile, m, { packname: pack, author: author })
        await fs.unlinkSync(tmpFile)        

      // --- LOGICA PARA URL ---
      } else if (urlArg) {
        const url = urlArg    
        if (!url.match(/\.(jpe?g|png|gif|webp|mp4|mov|avi|mkv|webm)$/i)) {
          return client.reply(m.chat, '《✧》 La URL debe ser de una imagen o video válido.', m)
        }        
        const response = await fetch(url)
        const buffer = Buffer.from(await response.arrayBuffer())
        
        if (url.match(/\.(jpe?g|png|gif|webp)$/i)) {
             // Aplicamos la misma lógica FULL para URLs de imagen
             if (Sticker && StickerTypes) {
                const sticker = new Sticker(buffer, {
                    pack: pack,
                    author: author,
                    type: StickerTypes.FULL, // <--- GRANDE
                    quality: 60
                })
                return await client.sendMessage(m.chat, { sticker: await sticker.toBuffer() }, { quoted: m })
            }
            // Fallback URL... (El resto del código original para URL sigue aquí si falla lo de arriba)
             const tmpFile = `./tmp-url-${Date.now()}.webp`
             await fs.writeFileSync(tmpFile, buffer)
             await client.sendImageAsSticker(m.chat, tmpFile, m, { packname: pack, author: author })
             await fs.unlinkSync(tmpFile)

        } else if (url.match(/\.(mp4|mov|avi|mkv|webm)$/i)) {
          const tmpFile = `./tmp-video-url-${Date.now()}.mp4`
          await fs.writeFileSync(tmpFile, buffer)
          await client.sendVideoAsSticker(m.chat, tmpFile, m, { packname: pack, author: author })
          await fs.unlinkSync(tmpFile)
        }       
      } else {
        return client.reply(m.chat, `《✧》 Por favor, responde a una imagen o video.`, m)
      }
    } catch (e) {
      console.log(e)
      return m.reply(`> Error: *${e.message}*`)
    }
  }
}

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(jpe?g|gif|png|webp|mp4|mov|avi|mkv|webm)/, 'gi'))
}
