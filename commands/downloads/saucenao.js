import fs from 'fs'
import axios from 'axios'
import fetch from "node-fetch"
// Ajuste de rutas para YukiBot (generalmente en lib)
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    try {   
        let url
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || q.mediaType || ''
        
        if (text) {
            url = text
        } else if (m.quoted && /image\/(png|jpe?g)/.test(mime) || mime.startsWith('image/')) {
            let media = await q.download()
            url = await uploadImage(media)
        } else if (m.quoted && /image\/webp/.test(mime)) {
            let media = await q.download()
            url = await webp2png(media)
        } else {
            return m.reply('Ingrese un enlace o responda al mensaje con una imagen en formato PNG, JPG o Sticker.')
        }

        const apiKeys = ["45e67c4cbc3d784261ffc83806b5a1d7e3bd09ae", "d3a88baf236200c2ae23f31039e599c252034be8"]
        let response;
        let success = false;

        for (let i = 0; i < apiKeys.length; i++) {
            const apiKey = apiKeys[i]
            try {
                response = await axios.get(`https://saucenao.com/search.php?db=999&output_type=2&testmode=1&numres=6&api_key=${apiKey}&url=${encodeURIComponent(url)}`)
                success = true;
                break;
            } catch (error) {
                continue
            }
        }

        if (!success) {
            return m.reply("Error: No se pudo conectar con SauceNAO o las Keys están agotadas.")
        }

        const results = response.data.results;
        const primerResultado = results[0]
        
        let resultadoEnBruto = ''
        // Procesar header
        for (let prop in primerResultado.header) {
            let propName = prop;
            if (prop == 'similarity') propName = 'Puntuación de similitud';
            if (prop == 'author_name') propName = 'Nombre del autor';
            resultadoEnBruto += `*${propName}*\n${primerResultado.header[prop]}\n\n`
        }
        
        // Procesar data
        for (let prop in primerResultado.data) {
            let propName = prop;
            if (prop == 'title') propName = 'Título';
            if (prop == 'ext_urls') propName = 'URLs';
            if (prop == 'member_name') propName = 'Nombre del autor';
            resultadoEnBruto += `*${propName}*\n${primerResultado.data[prop]}\n\n`
        }
        
        let thumb = await (await fetch(primerResultado.header.thumbnail)).buffer()
        await conn.sendMessage(m.chat, { image: thumb, caption: `*◎ R E S U L T A D O*\n\n${resultadoEnBruto}` }, { quoted: m })

    } catch (e) {
        console.log(e)
        m.reply(`Ocurrió un error. Asegúrate de responder a una imagen válida.`)
    }
}
handler.help = ['sauce']
handler.tags = ['tools']
handler.command = /^sauce|source|salsa|zelda$/i
export default handler
