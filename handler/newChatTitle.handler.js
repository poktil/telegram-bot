const { CHATS } = require('../config/chats.config')
const { updateChatTitleInDb } = require('../database/chats/update')
const { getChatId } = require('../utils/getChatId')

async function newChatTitle(ctx) {
  const chatId = getChatId(ctx)
  const current = CHATS.get(chatId)
  if (!current) return

  const newTitle = ctx.message.new_chat_title
  await updateChatTitleInDb(chatId, newTitle)

  CHATS.set(chatId, { ...current, name: newTitle })
}

module.exports = { newChatTitle }
