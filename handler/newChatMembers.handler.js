const { CHATS } = require('../config/chats.config')
const { getChatId } = require('../utils/getChatId')

async function newChatMembersHandler(ctx) {
  const chatId = getChatId(ctx)
  const current = CHATS.get(chatId)

  if (!current || !current.settings.welcoming) return

  const newMembers = ctx.message.new_chat_members
  if (newMembers.length === 1) {
    const from = newMembers[0]
    if (from.is_bot) return

    const name = from.username ? `@${from.username}` : from.first_name
    await ctx.reply(`${name} hush kelibsiz. Iltimos odob saqlab qoling!`)
  }

  if (newMembers.length > 1) {
    const names = newMembers
      .filter((u) => !u.is_bot)
      .map((u) => (u.username ? `@${u.username}` : u.first_name))
    await ctx.reply(
      `Hush kelibsizlar. Iltimos odob saqlab qolinglar!\n\n${names.join(', ')}`,
    )
  }
}

module.exports = { newChatMembersHandler }
