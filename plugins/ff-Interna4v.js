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

    // Definir la diferencia horaria de cada país con respecto a México
    const diferenciasHorarias = {
        MX: 0, // México tiene la hora base
        CO: 1, // Colombia tiene una hora más
        CL: 2, // Chile tiene dos horas más
        AR: 3, // Argentina tiene tres horas más
        PE: 1  // Perú tiene la misma diferencia horaria que Colombia
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa MX para México, CO para Colombia, CL para Chile, AR para Argentina o PE para Perú.', m);
        return;
    }

    // Obtener la diferencia horaria del país seleccionado
    const diferenciaHoraria = diferenciasHorarias[pais];

    // Calcular la hora base en México restando la diferencia horaria
    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);
    const horaBase = new Date();
    horaBase.setHours(hora - diferenciaHoraria);
    horaBase.setMinutes(minutos);
    horaBase.setSeconds(0);
    horaBase.setMilliseconds(0);

    // Función para formatear la hora
    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Calcular las horas para cada país
    const horasPorPais = {};
    for (const [codigoPais, diferencia] of Object.entries(diferenciasHorarias)) {
        const nuevaHora = new Date(horaBase);
        nuevaHora.setHours(nuevaHora.getHours() + diferencia);
        horasPorPais[codigoPais] = formatTime(nuevaHora);
    }

    // Obtener la hora actual en el país seleccionado
    const horaActual = new Date();
    horaActual.setHours(horaActual.getHours() + diferenciaHoraria);
    const horaActualPais = formatTime(horaActual);

    // Construir el mensaje
    const mensaje = `
*4 𝐕𝐄𝐑𝐒𝐔𝐒 4*
  *𝐈𝐍𝐓𝐄𝐑𝐍𝐀*

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${horasPorPais.MX}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${horasPorPais.CO}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${horasPorPais.CL}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${horasPorPais.AR}
🇵🇪 𝐏𝐄𝐑𝐔 : ${horasPorPais.PE}

𝐇𝐎𝐑𝐀 𝐀𝐂𝐓𝐔𝐀𝐋 𝐄𝐍 ${pais} : ${horaActualPais}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 

ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ 
🥷🏻 ┇
`.trim();

    conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};

handler.help = ['interna4'];
handler.tags = ['freefire'];
handler.command = /^(interno4|invs4|interna4)$/i;
export default handler;
