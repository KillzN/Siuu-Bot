const handler = async (m, { conn, usedPrefix, text }) => {
  if (isNaN(text) && !text.match(/@/g)) {

  } else if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  // Verificar si no se ha proporcionado el número o mensaje
  if (!text && !m.quoted) return conn.reply(m.chat, `*🚨 ERROR DE USO: ¡No me hagas perder el tiempo!*\n\n*┯┷*\n*┠≽ ${usedPrefix}quitaradmin @tag* → *Para quitar a alguien de su superpoder de admin.*\n*┠≽ ${usedPrefix}quitaradmin -> *Responde a un mensaje de alguien que quieras demotear, ¡no seas tímido!*\n*┷┯*`, m);

  // Validación del número para asegurarse que sea correcto
  if (number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `🧸 *¡Este número parece más largo que un libro! 🤷‍♂️*\n*Por favor, ingresa un número válido... o si estás jugando, ¡mejor para ti!*`, m);

  try {
    if (text) {
      var user = number + '@s.whatsapp.net'; // Obtener el número del usuario
    } else if (m.quoted.sender) {
      var user = m.quoted.sender; // Si responde a un mensaje
    } else if (m.mentionedJid) {
      var user = number + '@s.whatsapp.net'; // Si menciona a alguien
    }
  } catch (e) {
    // Si algo sale mal, no hacer nada (gracia al "finally")
  } finally {
    // Aquí es donde demoteamos al usuario, lo volvemos a un simple mortal
    conn.groupParticipantsUpdate(m.chat, [user], 'demote');

    // Ahora, mostramos quién fue el que le quitó el admin
    const admin = m.pushName || "Un misterioso ser"; // Quien ejecutó el comando (usualmente el dueño o admin)
    conn.reply(m.chat, `🚩 *¡Ups! ¡El superpoder de admin ha sido quitado!*\n\n😱 *El valiente, audaz, y algo cruel admin ${admin} acaba de quitarle el poder a este desafortunado ser.*`, m);
  }
};

handler.help = ['*@usuario*'].map((v) => 'demote ' + v); // Cómo usar el comando
handler.tags = ['group'];
handler.command = /^(demote|quitarpoder|quitaradmin)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
