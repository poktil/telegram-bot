const { CHATS } = require('../config/chats.config')
const { BOT } = require('../config/bot.config')
const { getChatId, getTelegramId } = require('../utils/getChatId')
const { updateChatMembersInDb } = require('../database/chats/update')

function isPaidChat(ctx) {
  const chatId = getChatId(ctx)
  if (!chatId) return { ok: false, message: 'Chat ID topilmadi' }

  if (ctx.chat.type === 'private') return { ok: true }

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

async function updateMembersNumber(chats) {
  if (!chats?.length) return

  await Promise.all(
    chats.map(async (chat) => {
      const chatId = chat.telegram_id
      const localChat = CHATS.get(chatId)
      if (!localChat) return

      const telegramId = getTelegramId(chatId, chat?.type)
      if (!telegramId) return

      try {
        const members = await BOT.telegram.getChatMembersCount(telegramId)
        CHATS.set(chatId, { ...localChat, members })
        await updateChatMembersInDb(chatId, members)
      } catch (err) {
        console.error(`Error updating members for chat ${chatId}:`, err)
      }
    }),
  )
}

module.exports = { isPaidChat, isAdminChatMember, updateMembersNumber }
