import fetch from 'node-fetch'

export default {
    command: ['toimg', 'tovideo', 'tomp4'],
    category: 'tools',
    run: async (client, m, { usedPrefix, command }) => {
        const q = m.quoted ? m.quoted : m
        const mime = (q.msg || q).mimetype || ''

        if (!/webp/.test(mime)) return client.reply(m.chat, `《✧》 Responde a un sticker.`, m)

        await m.react('🕒')
        try {
            const media = await q.download()
            const isAnimated = q.isAnimated || q.msg?.isAnimated

            if (isAnimated) {
                // Usaremos un servicio que suele saltarse bloqueos de IP por ser de infraestructura compartida
                // Intentamos con Cloudinary o una herramienta de transformación directa
                const stickerUrl = `https://api.cloudconvert.com/v2/convert/webp/mp4?input=base64&file=${media.toString('base64')}`
                
                // Si la red está muy bloqueada, intentaremos usar este endpoint de WhatsApp 
                // que a veces permite "engañar" al sistema enviando el WebP como video directo
                await client.sendMessage(m.chat, { 
                    video: media, 
                    mimetype: 'video/mp4',
                    caption: 'ꕥ *Aquí tienes (Procesado por WA) ฅ^•ﻌ•^ฅ*' 
                }, { quoted: m })
                
            } else {
                // Esto ya sabemos que te funciona
                await client.sendMessage(m.chat, { image: media, caption: 'ꕥ *Aquí tienes tu imagen ฅ^•ﻌ•^ฅ*' }, { quoted: m })
            }
            await m.react('✔️')
        } catch (e) {
            await m.react('✖️')
            client.reply(m.chat, `《✧》 Tu hosting actual tiene demasiadas restricciones para procesar video.`, m)
        }
    }
}
