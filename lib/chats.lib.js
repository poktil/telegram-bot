const { CHATS } = require('../config/chats.config')
const { getChatId } = require('../utils/getChatId')

function isPaidChat(ctx) {
  const chatId = getChatId(ctx)
  if (!chatId) return { ok: false, message: 'Chat ID topilmadi' }

  const current = CHATS.get(chatId)
  if (!current)
    return {
      ok: false,
      message:
        "Bu chat uchun to'lov qilinmagan\n\nTo'lov uchun @akbarswe_bot'ga murojaat qiling.",
    }

  return { ok: true }
}

async function isAdminChatMember(ctx) {
  if (ctx.chat.type === 'private') return true

  try {
    const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id)
    return (
      member.status === 'administrator' || member.status === 'creator' || false
    )
  } catch (err) {
    console.error('Error fetching chat member:', err)
    return false
  }
}

module.exports = { isPaidChat, isAdminChatMember }
