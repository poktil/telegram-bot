async function helpCommand(ctx) {
  const texts = {
    private: "Meni guruhga qo'shing va men uni nazorat qilaman.",
    group: 'Guruh nazoratim ostida ✅',
    supergroup: 'Guruh nazoratim ostida ✅',
  }

  let text = texts[ctx.chat.type] || texts['private']
  text += `\n\nMuammo bo'lsa: @akbarswe_bot`

  await ctx.reply(text)
}

module.exports = {
  helpCommand,
}
