async function startCommand(ctx) {
  const texts = {
    private: `Salom, ${ctx.from.first_name}! \n\nMen Poktil, hoziroq meni guruhga qo'shing va men uni nazorat qilaman.`,
    group: 'Guruh nazoratim ostida ✅',
    supergroup: 'Guruh nazoratim ostida ✅',
  }

  const text = texts[ctx.chat.type] || texts['private']
  await ctx.reply(text)
}

module.exports = {
  startCommand,
}
