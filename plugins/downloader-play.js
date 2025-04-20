import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🚩 *Por favor ingrese el nombre de la canción.*`, m);

    await m.react('🕒');  // Indicador de que el bot está buscando

    try {
        // Llamada a la API para buscar la canción en SoundCloud
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
        let json = await api.json();
        if (!json || json.length === 0) return conn.reply(m.chat, `🚩 *No se encontraron resultados para:* ${text}`, m);

        // Obtiene el primer resultado y busca el enlace de la canción
        let { url } = json[0];
        let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
        let json2 = await api2.json();

        // Obtiene el enlace de descarga y la calidad
        let { link: dl_url, quality, image } = json2;

        // Obtiene el archivo de audio en formato buffer
        let audio = await getBuffer(dl_url);

        // Prepara el mensaje con la información de la canción con signos llamativos
        let txt = `🎧 *¡Tu Canción Está Aquí! 🎶*\n\n`;
        txt += `🔥 *Título:* ${json[0].title}\n`;
        txt += `🎤 *Artista:* ${json[0].creator}\n`;
        txt += `⚡ *Calidad:* ${quality}\n`;
        txt += `🔗 *Reproducir:* ${json[0].url}\n\n`;  // Link directo de SoundCloud
        txt += `🌟 *¡Disfruta de la Música!* 🎵\n`;
        txt += `> 🚩 *Powered by Mvrco*`;

        // Enviar la imagen de la canción y luego el archivo de audio
        await conn.sendFile(m.chat, image, 'thumbnail.jpg', txt, m);
        await conn.sendMessage(m.chat, { audio: audio, fileName: `${json[0].title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

        await m.react('✅');  // Indica que la operación fue exitosa
    } catch (error) {
        console.error(error);
        await m.react('✖️');  // Indicador de error
        conn.reply(m.chat, '🚩 *Hubo un error al intentar obtener la canción.*', m);
    }
};

// Función para obtener el buffer del audio
const getBuffer = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'get',
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1,
            },
            ...options,
            responseType: 'arraybuffer',
        });
        return res.data;
    } catch (e) {
        console.error(`Error al obtener el archivo: ${e}`);
        throw e;  // Lanza el error para que pueda ser manejado en el bloque catch
    }
};

// Ayuda y comandos del handler
handler.help = ['play *<búsqueda>*'];
handler.tags = ['downloader'];
handler.command = ['play'];

export default handler;
