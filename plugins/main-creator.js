let handler = async (m, { conn, usedPrefix, isOwner }) => {
    m.react('👤');
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:KILL BOT;;\nFN:KILL BOT\nORG:KILL BOT\nTITLE:Shadow Monarch\nitem1.TEL;waid=56983073328:56983073328\nitem1.X-ABLabel:KILL BOT\nX-WA-BIZ-DESCRIPTION:El creador de las sombras, el gran KILL BOT, líder de la oscuridad.\nX-WA-BIZ-NAME:KILL BOT\nEND:VCARD`;

    let mensaje = `✨ *¡Tú has invocado al Shadow Monarch!* ✨\n\n🖤 *${m.pushName}*, tu consulta sobre el *creador* ha sido respondida. El gran *KILL BOT* se presenta ante ti. 🖤\n\nAquí está el contacto del rey de las sombras:`;

    await conn.sendMessage(m.chat, { text: mensaje, contacts: { displayName: '@bykillzn⁩', contacts: [{ vcard }] } }, { quoted: m });
}

handler.help = ['staff', 'dueño', 'creador', 'monarca']
handler.tags = ['main']
handler.command = ['owner', 'dueño', 'creador']

export default handler;
