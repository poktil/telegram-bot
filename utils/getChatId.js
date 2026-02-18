function getChatId(ctx) {
  const { type, id } = ctx.chat

  if (type === 'private') return id
  if (type === 'group') return -id
  if (type === 'supergroup' || type === 'channel')
    return Number(String(id).replace(/^-?100/, ''))

  return null
}

function getTelegramId(chatId, type = 'supergroup') {
  if (type === 'private') return chatId
  if (type === 'group') return -chatId
  if (type === 'supergroup' || type === 'channel')
    return Number(`-100${chatId}`)
}

module.exports = { getChatId, getTelegramId }
