const { CHATS } = require('../config/chats.config')
const { updateOnFirestore } = require('../database/update')

async function newChatTitle(ctx) {
  const chatId = String(ctx.chat.id)
  const current = CHATS.get(chatId)
  if (!current) return

  const newTitle = ctx.message.new_chat_title

  await updateOnFirestore('chats', chatId, { name: newTitle })
  CHATS.set(chatId, { ...current, name: newTitle })
}

module.exports = { newChatTitle }
