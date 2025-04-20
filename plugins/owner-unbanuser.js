let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who;

    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;

    let user = global.db.data.users[who];
    if (!who) return m.reply(`🚩 *Etiqueta a un usuario o menciona un mensaje. Solo aquellos destinados a ser más fuertes podrán volver.*`);

    let users = global.db.data.users;

    // Si el usuario no está baneado
    if (!users[who].banned) {
        return m.reply(`🚩 *Este usuario no está baneado, su existencia no ha sido erradicada por el Shadow Monarch.*`);
    }

    // Restaurar al usuario, como una especie de resurrección
    users[who].banned = false;

    // Responder con un mensaje de resurgimiento de un *Hunter*
    conn.reply(m.chat, `⚡ *¡Resurrección completada! @${who.split`@`[0]} ha vuelto al mundo de los *Hunters* con más fuerza que antes.* 🔥\n*Como el *Shadow Monarch*, he decidido darles una segunda oportunidad... pero recuerda, este mundo está lleno de peligros.*`, m, { mentions: [who] });
}

handler.help = ['unban *@user*'];
handler.tags = ['owner'];
handler.command = /^unban$/i;
handler.rowner = true;

export default handler;
