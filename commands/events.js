import fetch from 'node-fetch'
let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import chalk from 'chalk'

export default async (client, m) => {
  client.ev.on('group-participants.update', async (anu) => {
    try {
      const metadata = await client.groupMetadata(anu.id).catch(() => null)
      const groupAdmins = metadata?.participants.filter(p => (p.admin === 'admin' || p.admin === 'superadmin')) || []
      const chat = global?.db?.data?.chats?.[anu.id]
      const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
      const primaryBotId = chat?.primaryBot
      const memberCount = metadata.participants.length      
      const isSelf = global.db.data.settings[botId]?.self ?? false
      if (isSelf) return
      for (const p of anu.participants) {
        const jid = p.phoneNumber
        const phone = p.phoneNumber?.split('@')[0] || jid.split('@')[0]
        //const pp = await client.profilePictureUrl(jid, 'image').catch(_ => 'https://cdn.yuki-wabot.my.id/files/nufq.jpeg')       
        const mensajes = { add: chat.sWelcome ? `\n┊➤ ${chat.sWelcome.replace(/{usuario}/g, `@${phone}`).replace(/{grupo}/g, `*${metadata.subject}*`).replace(/{desc}/g, metadata?.desc || '✿ Sin Desc ✿')}` : '', remove: chat.sGoodbye ? `\n┊➤ ${chat.sGoodbye.replace(/{usuario}/g, `@${phone}`).replace(/{grupo}/g, `*${metadata.subject}*`).replace(/{desc}/g, metadata?.desc || '✿ Sin Desc ✿')}` : '', leave: chat.sGoodbye ? `\n┊➤ ${chat.sGoodbye.replace(/{usuario}/g, `@${phone}`).replace(/{grupo}/g, `*${metadata.subject}*`).replace(/{desc}/g, metadata?.desc || '✿ Sin Desc ✿')}` : ''     
        }
        if (anu.action === 'add' && chat?.welcome && (!primaryBotId || primaryBotId === botId)) {
          const caption = `╭┈─────◯────
Hola @${phone}!

 _*🔞| Bienvenidx/Welcome al grupo Futabu Club!*_

_📋| Usa el comando *.Reglas*, Para verlas en el chat!._

_📝| Usa el comando *.Contenido*, Para ver que contenido está permitido en el grupo!._

_💙| Usa el comando *.Telegram*, Para obtener el link del grupo de Telegram de Futabu Club!._

_💜| Usa el comando *.Discord*, Para obtener el link a nuestro servidor de Discord!._

Eres el miembro ${memberCount}! ${mensajes[anu.action]}
╰──────────────╯`
         await client.sendMessage(anu.id, { image: { url: 'https://i.imgur.com/uYBExH3.png' }, caption, mentionedJid: [jid] })     
        }
        if ((anu.action === 'remove' || anu.action === 'leave') && chat?.goodbye && (!primaryBotId || primaryBotId === botId)) {
          const caption = `╭┈──̇─̇─̇────̇─̇─̇──◯◝
┊「 *Hasta pronto (⁠╥⁠﹏⁠╥⁠)* 」
┊︶︶︶︶︶︶︶︶︶︶︶
┊  *Nombre ›* @${phone}
┊  *Grupo ›* ${metadata.subject}
┊┈─────̇─̇─̇─────◯◝
┊➤ *Ojalá que vuelva pronto.*
┊➤ *Ahora somos ${memberCount} miembros.* ${mensajes[anu.action]}
┊ ︿︿︿︿︿︿︿︿︿︿︿
╰─────────────────╯`
          await client.sendMessage(anu.id, { image: { url: '' }, caption, mentionedJid: [jid] })
        }
        if (anu.action === 'promote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author
          await client.sendMessage(anu.id, { text: `「✎」 *@${phone}* ha sido promovido a Administrador por *@${usuario.split('@')[0]}.*`, mentions: [jid, usuario, ...groupAdmins.map(v => v.id)] })
        }
        if (anu.action === 'demote' && chat?.alerts && (!primaryBotId || primaryBotId === botId)) {
          const usuario = anu.author
          await client.sendMessage(anu.id, { text: `「✎」 *@${phone}* ha sido degradado de Administrador por *@${usuario.split('@')[0]}.*`, mentions: [jid, usuario, ...groupAdmins.map(v => v.id)] })
        }
      }
    } catch (err) {
      console.log(chalk.gray(`[ BOT  ]  → ${err}`))
    }
  })
  client.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0]
  if (!m.messageStubType) return
  const id = m.key.remoteJid
  const chat = global.db.data.chats[id]
  const botId = client.user.id.split(':')[0] + '@s.whatsapp.net'
  const primaryBotId = chat?.primaryBot
  if (!chat?.alerts || (primaryBotId && primaryBotId !== botId)) return
  const isSelf = global.db.data.settings[botId]?.self ?? false
  if (isSelf) return
  const actor = m.key?.participant || m.participant || m.key?.remoteJid
  const phone = actor.split('@')[0]
  const groupMetadata = await client.groupMetadata(id).catch(() => null)
  const groupAdmins = groupMetadata?.participants.filter(p => (p.admin === 'admin' || p.admin === 'superadmin')) || []
  if (m.messageStubType == 21) {
    await client.sendMessage(id, { text: `「✎」 @${phone} cambió el nombre del grupo a *${m.messageStubParameters[0]}*`, mentions: [actor, ...groupAdmins.map(v => v.id)] })
  }
  if (m.messageStubType == 22) {
    await client.sendMessage(id, { text: `「✎」 @${phone} cambió el icono del grupo.`, mentions: [actor, ...groupAdmins.map(v => v.id)] })
  }
  if (m.messageStubType == 23) {
    await client.sendMessage(id, { text: `「✎」 @${phone} restableció el enlace del grupo.`, mentions: [actor, ...groupAdmins.map(v => v.id)] })
  }
  if (m.messageStubType == 24) {
    await client.sendMessage(id, { text: `「✎」 @${phone} cambió la descripción del grupo.`, mentions: [actor, ...groupAdmins.map(v => v.id)] })
  }
  if (m.messageStubType == 25) {
    await client.sendMessage(id, { text: `「✎」 @${phone} cambió los ajustes del grupo para permitir que ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo.`, mentions: [actor, ...groupAdmins.map(v => v.id)] })
  }
  if (m.messageStubType == 26) {
    await client.sendMessage(id, { text: `「✎」 @${phone} cambió los ajustes del grupo para permitir que ${m.messageStubParameters[0] === 'on' ? 'solo los administradores puedan enviar mensajes al grupo.' : 'todos los miembros puedan enviar mensajes al grupo.'}`, mentions: [actor, ...groupAdmins.map(v => v.id)] })
  }
})
}
