const handler = async (m, { conn, args }) => {
    // Verificar si se proporcionaron los argumentos necesarios
    if (args.length < 2) {
        conn.reply(m.chat, 'Debes proporcionar la hora (HH:MM) y el país (MX, CO, CL, AR, PE).', m);
        return;
    }

    // Validar el formato de la hora
    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, 'Formato de hora incorrecto. Debe ser HH:MM en formato de 24 horas.', m);
        return;
    }

    const horaUsuario = args[0]; // Hora proporcionada por el usuario
    const pais = args[1].toUpperCase(); // País proporcionado por el usuario
    const color = args.slice(2).join(' ') || null; // Color opcional

    // Definir la diferencia horaria de cada país con respecto a México
    const diferenciasHorarias = {
        MX: 0,
        CO: 1,
        CL: 2,
        AR: 3,
        PE: 1
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa MX para México, CO para Colombia, CL para Chile, AR para Argentina o PE para Perú.', m);
        return;
    }

    const diferenciaHoraria = diferenciasHorarias[pais];

    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);
    const horaBase = new Date();
    horaBase.setHours(hora - diferenciaHoraria);
    horaBase.setMinutes(minutos);
    horaBase.setSeconds(0);
    horaBase.setMilliseconds(0);

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const horasPorPais = {};
    for (const [codigoPais, diferencia] of Object.entries(diferenciasHorarias)) {
        const nuevaHora = new Date(horaBase);
        nuevaHora.setHours(nuevaHora.getHours() + diferencia);
        horasPorPais[codigoPais] = formatTime(nuevaHora);
    }

    const horaActual = new Date();
    horaActual.setHours(horaActual.getHours() + diferenciaHoraria);
    const horaActualPais = formatTime(horaActual);

    const mensaje = `
*CUADRILATERO*

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${horasPorPais.MX}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${horasPorPais.CO}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${horasPorPais.CL}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${horasPorPais.AR}
🇵🇪 𝐏𝐄𝐑𝐔 : ${horasPorPais.PE}

𝐇𝐎𝐑𝐀 𝐀𝐂𝐓𝐔𝐀𝐋 𝐄𝐍 ${pais} : ${horaActualPais}

¬ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐄𝐒
    
   𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1  
 👑 ┇ 
 🥷🏻 ┇  
 🥷🏻 ┇ 
 🥷🏻 ┇ 

  𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
 👑 ┇ 
 🥷🏻 ┇ 
 🥷🏻 ┇ 
 🥷🏻 ┇ 
    
   𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3
 👑 ┇ 
 🥷🏻 ┇ 
 🥷🏻 ┇ 
 🥷🏻 ┇ 

ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
 🥷🏻 ┇ 
 🥷🏻 ┇

${color ? `🎽 𝗖𝗢𝗟𝗢𝗥 𝗗𝗘 𝗥𝗢𝗣𝗔: ${color.toUpperCase()}` : ''}
`.trim();

    conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

handler.help = ['cuadrilatero'];
handler.tags = ['freefire'];
handler.command = /^(cuadri|cuadrilatero)$/i;
export default handler;
