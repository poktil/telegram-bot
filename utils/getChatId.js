function getChatId(ctx) {
  const { type, id } = ctx.chat

  if (type === 'private') return id
  if (type === 'group') return -id
  if (type === 'supergroup' || type === 'channel')
    return Number(String(id).replace(/^-?100/, ''))

  return null
}

module.exports = { getChatId }
