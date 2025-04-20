let handler = async (m, { conn, usedPrefix, text }) => {
  if (isNaN(text) && !text.match(/@/g)) {
    // No hace nada si no es un número o un @
  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  // Si no se proporciona texto ni se responde a un mensaje
  if (!text && !m.quoted)
    return conn.reply(
      m.chat,
      '🚩 ¡Ups! Usa el comando correctamente\n\n*Ejemplo :*\n\n> .promote @usuario (¡Dale el poder de admin a alguien!)',
      m
    );

  // Validación del número (debe ser un número válido de teléfono)
  if (number.length > 13 || (number.length < 11 && number.length > 0))
    return conn.reply(m.chat, `🧸 *¡Oye! Ese número está un poco raro, ¿me puedes dar uno válido?*`, m);

  try {
    // Obtener el número o la mención del usuario
    if (text) {
      var user = number + "@s.whatsapp.net";
    } else if (m.quoted.sender) {
      var user = m.quoted.sender;
    } else if (m.mentionedJid) {
      var user = number + "@s.whatsapp.net";
    }
  } catch (e) {
    // Si hay un error, no hacer nada
  } finally {
    // Dar admin al usuario especificado
    conn.groupParticipantsUpdate(m.chat, [user], "promote");

    // Mostrar el nombre de quien ejecutó el comando
    const admin = m.pushName || "Un misterioso héroe"; // Nombre de quien da el poder
    conn.reply(m.chat, `🚩 *¡Acción realizada!* 🎉\n\n💼 *El gran, increíble, y genial admin ${admin} ha decidido darle el poder de administrador a este afortunado ser.*`, m);
  }
};

handler.help = ["@usuario*"].map((v) => "promote " + v);
handler.tags = ["group"];
handler.command = /^(promote|daradmin|darpoder)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
