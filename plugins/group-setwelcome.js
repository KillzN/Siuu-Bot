let handler = async (m, { conn, text, isROwner, isOwner }) => {
    let fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    // Si el usuario proporciona el mensaje de bienvenida
    if (text) {
        // Validar que el mensaje tenga una longitud mínima para evitar mensajes muy cortos
        if (text.length < 10) {
            return conn.reply(m.chat, '📏 *Tu mensaje es muy corto. Agrega más info o usa los @ para personalizar.*', m);
        }

        // Reemplazar los placeholders con ejemplos de usuarios, grupos y descripción
        let preview = text
            .replace(/@user/gi, '@' + m.sender.split('@')[0])
            .replace(/@group/gi, 'Grupo Épico')
            .replace(/@desc/gi, 'Esta es una descripción ficticia');

        // Guardar el mensaje y dar feedback
        global.db.data.chats[m.chat].sWelcome = text;
        conn.reply(m.chat, `✅ *Bienvenida actualizada con éxito*\n\n📨 _Este será el mensaje cuando alguien entre al grupo._\n\n🔧 Usa *@user*, *@group* o *@desc* para personalizar.\n\n💬 *Vista previa:*\n${preview}`, fkontak, m);

    } else {
        // Mensaje inicial de ayuda si no se proporciona un mensaje
        conn.reply(m.chat, `👋 *_ESCRIBE EL MENSAJE DE BIENVENIDA_*\n\n🛠️ *_OPCIONAL:_* Usa estos comandos con "@" para personalizar:\n\n📌 *@user* — Menciona al nuevo usuario\n🏷️ *@group* — Nombre del grupo\n📝 *@desc* — Descripción del grupo\n\n✨ *EJEMPLO:* _Bienvenido @user a @group. Lee la descripción: @desc_\n\n🎨 ¡Hazlo tu estilo!`, m);
    }
};

handler.help = ['setwelcome @user + texto'];
handler.tags = ['group'];
handler.command = ['setwelcome', 'bienvenida'];
handler.botAdmin = true;
handler.admin = true;
handler.group = true;

export default handler;
