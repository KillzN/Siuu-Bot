import { spawn } from 'child_process';

let handler = async (m, { conn, isROwner, text }) => {

    if (!process.send) throw '*『✦』Reinicio imposible: node sunlight.js*\n*『✦』Reinicio fallido: node index.js*'

    if (conn.user.jid == conn.user.jid) {

        const { key } = await conn.sendMessage(m.chat, { text: `💻 *Cargando... Iniciando la actualización del sistema...*` }, { quoted: m });
        await delay(1000 * 1);
        await conn.sendMessage(m.chat, { text: `⚡ *Cargando... Activando procesos en segundo plano...*`, edit: key });
        await delay(1000 * 1);
        await conn.sendMessage(m.chat, { text: `♻️ *Cargando... Mejorando la conexión con el reino...*`, edit: key });
        await conn.sendMessage(m.chat, { text: `*『⛏️』Comenzando reinicio... Preparando el sistema para el próximo nivel...*`, edit: key });

        process.send('reset');
    } else {
        throw '❌ *Acción no permitida... Solo el líder puede ejecutar esta acción.*';
    }
}

handler.help = ['restart'];
handler.tags = ['owner'];
handler.command = ['restart', 'reiniciar'];
handler.rowner = true;

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
