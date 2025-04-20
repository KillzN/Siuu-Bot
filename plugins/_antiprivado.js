export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
  if (m.isBaileys && m.fromMe) return !0;
  if (m.isGroup) return !1;
  if (!m.message) return !0;

  // Ignorar ciertos comandos/juegos
  if (/PIEDRA|PAPEL|TIJERA|serbot|jadibot/i.test(m.text)) return !0;

  const chat = global.db.data.chats[m.chat];
  const bot = global.db.data.settings[this.user.jid] || {};

  // Activar castigo si el usuario no es un Ruler
  if (bot.antiPrivate && !isOwner && !isROwner) {
    const user = `@${m.sender.split`@`[0]}`;
    await m.reply(
      `☠️ *INTRUSO DETECTADO EN EL DOMINIO DEL MONARCA* ☠️\n\n` +
      `> ${user}, has cruzado la puerta dimensional sin permiso...\n\n` +
      `🛑 Este dominio pertenece al *Monarca de las Sombras*, y los no elegidos serán ejecutados sin juicio.\n\n` +
      `⚔️ *Tu insolencia será castigada*.\n` +
      `Las sombras han sido enviadas para sellar tu existencia de este plano.\n\n` +
      `🕳️ *¿Deseas vivir?* Solo hay una forma:\n` +
      `📜 Solicita audiencia al Soberano: wa.me/56983073328\n\n` +
      `💀 De lo contrario... prepárate para ser *devorado por las sombras* 🕷️.`,
      false,
      { mentions: [m.sender] }
    );

    await this.updateBlockStatus(m.chat, 'block');
  }

  return !1;
}
