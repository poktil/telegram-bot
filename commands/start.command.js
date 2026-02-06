async function startCommand(ctx) {
  const text = `Salom1, ${ctx.from.first_name}! \n\nMen Poktil, hoziroq meni guruhga qo'shing va men uni nazorat qilaman.`
  await ctx.reply(text)
}

module.exports = {
  startCommand,
}
