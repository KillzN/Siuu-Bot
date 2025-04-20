import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://i.ibb.co/HDRLD7S7/Mid.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    if (chat.sWelcome) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let welcome = chat.sWelcome
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, welcome, img, img, canal)
    } else {
      let bienvenida = `╔══════════════
╟❧ ${groupMetadata.subject}
╠══════════════
╟❧ @${m.messageStubParameters[0].split('@')[0]}
╟❧ 𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾/𝙰 
║
╟❧ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾:
╟❧ ${groupMetadata.desc}
║
╟❧ 𝙳𝙸𝚂𝙵𝚁𝚄𝚃𝙰 𝚃𝚄 𝙴𝚂𝚃𝙰𝙳𝙸𝙰!!
╚══════════════`;

      await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img)
    }
  }

  if (chat.bienvenida && m.messageStubType == 28) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    } else {
      let bye = `╔═════💩
╟❧ @${m.messageStubParameters[0].split('@')[0]}
╟❧ 𝚂𝙴 𝙵𝚄𝙴 𝙴𝙻 𝙿𝙴𝙽𝙳𝙴𝙹𝙾... ¡𝚄𝙽 𝙰𝙿𝙻𝙰𝚄𝚂𝙾 𝙿𝙰𝚁𝙰 𝙴𝙻 𝚀𝚄𝙴 𝙽𝙾 𝚃𝙷𝙰𝙶𝚄𝙴 𝙽𝙰𝙳𝙰! 👏
╟❧ 𝙲𝙸𝙴𝚁𝚁𝙰 𝙻𝙰 𝙿𝚄𝙴𝚁𝚃𝙰 𝙰𝙻 𝚂𝙰𝙻𝙸𝚁, 𝙽𝙾 𝚅𝙰𝚈𝙰 𝚂𝙴𝚁 𝚀𝚄𝙴 𝙴𝙽𝚃𝚁𝙴 𝙾𝚃𝚁𝙰 𝙿𝙴𝚂𝙰𝙳𝙸𝙻𝙻𝙰 🤡
╚═════🚪`
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    }
  }

  if (chat.bienvenida && m.messageStubType == 32) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye
        .replace('@user', () => user)
        .replace('@group', () => groupMetadata.subject)
        .replace('@desc', () => groupMetadata.desc || 'sin descripción');
      await conn.sendAi(m.chat, botname, textbot, bye, img, img)
    } else {
      let kick = `╔═════🚫
╟❧ @${m.messageStubParameters[0].split('@')[0]}
╟❧ 𝙽𝙾 𝚃𝙴 𝙵𝚄𝙸𝚂𝚃𝙴... 𝚃𝙴 𝚂𝙰𝙲𝙰𝚁𝙾𝙽, 𝙿𝙴𝚁𝙾 𝙲𝙾𝙽 𝙶𝙰𝙽𝙰𝚂 👢
╟❧ 𝙿𝙾𝚁 𝚃𝙾𝚇𝙸𝙲𝙾, 𝙿𝙴𝙽𝙳𝙴𝙹𝙾 𝚈 𝙿𝙾𝚁 𝚂𝙴𝚁 𝚄𝙽𝙰 𝙲𝙰𝚁𝙶𝙰 𝙿𝚄𝚁𝙰 💀
╟❧ ¡𝙻𝙸𝙼𝙿𝙸𝙰𝙽𝙳𝙾 𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 𝙲𝙾𝙼𝙾 𝚂𝙴 𝙳𝙴𝙱𝙴! 🧹
╚═════🗑️`
      await conn.sendAi(m.chat, botname, textbot, kick, img, img)
    }
  }
}
