let handler = async (m, { conn, text, isROwner, isOwner }) => {

    // Si el usuario proporciona el mensaje de despedida
    if (text) {
        // Validar que el mensaje tenga una longitud mínima para evitar mensajes muy cortos
        if (text.length < 10) {
            return conn.reply(m.chat, '📏 *Tu mensaje de despedida es muy corto. Agrega más info o usa el @ para personalizar.*', m);
        }

        // Reemplazar los placeholders con ejemplos de usuarios
        let preview = text
            .replace(/@user/gi, '@' + m.sender.split('@')[0]);

        // Guardar el mensaje y dar feedback
        global.db.data.chats[m.chat].sBye = text;
        conn.reply(m.chat, `✅ *Despedida configurada con éxito*\n\n📝 _Este será el mensaje cuando alguien salga del grupo._\n\n🔧 Usa *@user* para personalizar.\n\n💬 *Vista previa:*\n${preview}`, m);

    } else {
        // Mensaje inicial de ayuda si no se proporciona un mensaje
        conn.reply(m.chat, `👋 *_ESCRIBE EL MENSAJE DE DESPEDIDA_*\n\n🛠️ *_OPCIONAL:_* Usa estos comandos con "@" para personalizar:\n\n📌 *@user* — Menciona al usuario que salió\n\n✨ *EJEMPLO:* _Adiós @user, te extrañaremos._\n\n🎨 ¡Hazlo a tu estilo!`, m);
    }
};

handler.help = ['setbye @user + texto'];
handler.tags = ['group'];
handler.command = ['setbye', 'despedida'];
handler.botAdmin = true;
handler.admin = true;
handler.group = true;

export default handler;
