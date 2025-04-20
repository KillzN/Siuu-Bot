let handler = async (m, { conn, groupMetadata }) => {
    // Verificar si el mensaje es en un grupo
    if (!m.isGroup) return m.reply(`⚠️ *¡Este comando solo se puede usar en grupos!* 🧐`);

    // Verificar si el usuario que envió el comando es administrador
    let participant = groupMetadata.participants.find(p => p.id === m.sender);
    if (!participant || participant.admin !== 'admin' && participant.admin !== 'superadmin') {
        return m.reply(`⚠️ *¡Solo los administradores pueden usar este comando! Los mortales no tienen poder aquí.* 😎`);
    }

    // Filtrar participantes (excluye al bot y a los administradores)
    let psmap = groupMetadata.participants
        .filter(v => v.id !== conn.user.jid && v.admin !== 'admin' && v.admin !== 'superadmin')
        .map(v => v.id);

    // Verificar si hay candidatos disponibles
    if (psmap.length === 0) return m.reply(`⚠️ *¡Ups! No hay suficientes jugadores para la ruleta de la eliminación... ¡Ni modo! 😜*`);

    // Elegir un usuario al azar
    let user = psmap[Math.floor(Math.random() * psmap.length)];

    // Formatear menciones
    let format = a => '@' + a.split('@')[0];

    // Anunciar la ejecución al azar
    m.reply(`*💀 ¡Atención! ${format(user)} ha sido elegido por la ruleta... ¡Sus últimas palabras por favor! 💀*\n*⏳ Tienes 10 segundos para hacer tu última broma, antes de ser eliminado...*`, null, { mentions: [user] });

    // Esperar 10 segundos antes de eliminar al usuario
    await delay(10000);

    // Ejecutar la eliminación
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

    // Anunciar que el usuario fue eliminado
    m.reply(`*🎤 Y así, ${format(user)} ya no será parte de este glorioso grupo... 😈 ¡Adiós!*\n*💀 Ruleta mortal completada. ¡Gracias a todos por participar! 😂*`);
};

// Definir el comando, la ayuda y los permisos
handler.command = /^(ruletaban)$/i;
handler.group = true;
handler.tags = ['group'];
handler.help = ['ruletaban'];
handler.admin = true; // Solo administradores pueden ejecutar
handler.botAdmin = true; // El bot debe ser administrador
export default handler;

// Función delay para esperar un tiempo
const delay = time => new Promise(res => setTimeout(res, time));
