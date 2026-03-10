import { format } from 'util'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { tmpdir } from 'os'
import Crypto from 'crypto'

export default {
    command: ['toimg', 'tovideo', 'tomp4'],
    category: 'tools',
    run: async (client, m, { usedPrefix, command }) => {
        if (!m.quoted) return client.reply(m.chat, `《✧》 Responde a un sticker para convertirlo.`, m)
        if (!/sticker/.test(m.quoted.mimetype)) return client.reply(m.chat, `《✧》 Solo puedes convertir stickers con este comando.`, m)

        await m.react('🕒')
        let media = await m.quoted.download()
        
        if (!media) {
            await m.react('✖️')
            return client.reply(m.chat, `《✧》 No se pudo descargar el sticker.`, m)
        }

        // Si el sticker NO es animado, lo enviamos como imagen simple
        if (!m.quoted.isAnimated) {
            await client.sendMessage(m.chat, { image: media, caption: 'ꕥ *Aquí tienes tu imagen ฅ^•ﻌ•^ฅ*' }, { quoted: m })
            return await m.react('✔️')
        }

        // Si es animado, procedemos a convertir WebP -> MP4 usando FFmpeg
        try {
            const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
            const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)
            
            fs.writeFileSync(tmpFileIn, media)

            // Ejecutamos ffmpeg para la conversión
            // Nota: Usamos una configuración estándar compatible con WhatsApp
            const process = spawn('ffmpeg', [
                '-i', tmpFileIn,
                '-movflags', 'faststart',
                '-pix_fmt', 'yuv420p',
                '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', // WhatsApp requiere dimensiones pares
                tmpFileOut
            ])

            process.on('close', async (code) => {
                if (code === 0) {
                    const videoBuffer = fs.readFileSync(tmpFileOut)
                    await client.sendMessage(m.chat, { video: videoBuffer, caption: 'ꕥ *Aquí tienes tu video ฅ^•ﻌ•^ฅ*' }, { quoted: m })
                    await m.react('✔️')
                } else {
                    await m.react('✖️')
                    client.reply(m.chat, '《✧》 Error al procesar el video.', m)
                }
                
                // Limpieza de archivos temporales
                if (fs.existsSync(tmpFileIn)) fs.unlinkSync(tmpFileIn)
                if (fs.existsSync(tmpFileOut)) fs.unlinkSync(tmpFileOut)
            })

        } catch (e) {
            console.error(e)
            await m.react('✖️')
            client.reply(m.chat, '《✧》 Ocurrió un error inesperado.', m)
        }
    }
}
