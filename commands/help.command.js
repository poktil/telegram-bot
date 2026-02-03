async function helpCommand(ctx) {
  const texts = {
    private: "Meni guruhga qo'shing va men uni nazorat qilaman.",
    supergroup: 'Guruhga nazoratim ostida ✅',
  }

  let text = texts[ctx.chat.type] || texts['private']
  text += `\n\nMuammo bo'lsa: @akbarswe_bot`

  await ctx.reply(text)
}

module.exports = {
  helpCommand,
}
