//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who;

    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    else who = m.chat;

    if (!who) return m.reply(`🚩 *Etiqueta a un usuario o menciona un mensaje. Solo los más poderosos pueden ser eliminados.*`);

    let users = global.db.data.users;

    // Verificar si el usuario existe en la base de datos
    if (!users[who]) {
        return m.reply(`🚩 *Este usuario no está registrado en el sistema... No puedo ejecutar la sentencia.*`);
    }

    // Establecer la propiedad 'banned' a true
    users[who].banned = true;

    // Responder con un mensaje de confirmación con más estilo Solo Leveling
    conn.reply(m.chat, `⚡ *¡Sentencia ejecutada, @${who.split`@`[0]} ha sido baneado con éxito!* 🔨\n*El *Shadow Monarch* ha decidido que este *Hunter* ya no puede caminar en este mundo. Su existencia ha sido erradicada.*`, m, { mentions: [who] });
}

handler.help = ['ban *@user*'];
handler.tags = ['owner'];
handler.command = /^ban$/i;
handler.rowner = true;

export default handler;
