async function newChatMembers(ctx) {
  const newMembers = ctx.message.new_chat_members
  if (newMembers.length === 1) {
    const from = newMembers[0]
    const name = from.username ? `@${from.username}` : from.first_name
    await ctx.reply(`${name} hush kelibsiz. Iltimos odob saqlab qoling!`)
  }

  if (newMembers.length > 1) {
    const names = newMembers.map((u) =>
      u.username ? `@${u.username}` : u.first_name,
    )
    await ctx.reply(
      `Hush kelibsizlar. Iltimos odob saqlab qolinglar!\n\n${names.join(', ')}`,
    )
  }
}

module.exports = { newChatMembers }
