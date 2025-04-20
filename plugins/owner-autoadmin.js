const handler = async (m, { conn, isAdmin, groupMetadata }) => {
  const name = await conn.getName(m.sender);
  const grupo = groupMetadata.subject;

  if (isAdmin) {
    return m.reply(`🧙‍♂️ *${name}*, ya formas parte del Olimpo. No necesitas más poder... por ahora.`);
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('⚡');

    // Mensaje épico en el grupo
    m.reply(`
⚡ *¡El poder ha sido concedido!* ⚡

${name.toUpperCase()} se ha auto-proclamado *ADMINISTRADOR SUPREMO*.

Los cielos tronaron, el grupo tembló y los mortales se arrodillaron. 😱

Pero cuidado... el *Dios del bot* observa desde lo alto. ☁️👁️
`);

    // Notificación divina al dueño
    await conn.reply('56983073328@s.whatsapp.net',
      `
📡 *ALERTA CELESTIAL*

📍 *${name}* ha tocado el fuego sagrado y se ha auto-promovido en el grupo:

> *${grupo}*

👁️ El juicio divino está en tus manos, Oh Gran KILL BOT.`, m);

  } catch (e) {
    console.error(e);
    m.reply(`❌ El ritual ha fallado. El poder fue rechazado por los dioses.`);
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin', 'tenerpoder'];
handler.command = ['autoadmin', 'tenerpoder'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
