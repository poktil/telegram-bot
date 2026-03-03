const { CHATS } = require('../config/chats.config')
const { BOT } = require('../config/bot.config')
const { getChatId, getTelegramId } = require('../utils/getChatId')
const { updateChatMembersInDb } = require('../database/chats/update')
const { getDaysLeftText } = require('../utils/subscription.util')

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

async function isBotInChat(telegramId) {
  try {
    const me = await BOT.telegram.getMe()
    const member = await BOT.telegram.getChatMember(telegramId, me.id)

    return !['left', 'kicked'].includes(member.status)
  } catch {
    return false
  }
}

async function processChats(chats, handler) {
  if (!chats?.length) return

  await Promise.all(
    chats.map(async (chat) => {
      const chatId = chat.telegram_id
      const localChat = CHATS.get(chatId)
      const telegramId = getTelegramId(chatId, chat?.type)

      if (!telegramId) return

      try {
        const botInChat = await isBotInChat(telegramId)
        if (!botInChat) return

        await handler({ chat, chatId, telegramId, localChat })
      } catch (err) {
        console.error(
          `Error processing chat ${chatId} - ${localChat?.name}:`,
          err,
        )
      }
    }),
  )
}

async function updateMembersNumber(chats) {
  await processChats(chats, async ({ chatId, telegramId, localChat }) => {
    const members = await BOT.telegram.getChatMembersCount(telegramId)

    if (localChat?.members !== members) {
      await updateChatMembersInDb(chatId, members)
      CHATS.set(chatId, { ...localChat, members })
    }
  })
}

async function subscriptionExpirationCheck(chats) {
  await processChats(chats, async ({ chat, chatId, telegramId }) => {
    const expiresAt = chat.subscriptions?.expires_at
    if (!expiresAt) return

    const daysLeft = getDaysLeftText(expiresAt)
    if ([1, 2, 3, 7].includes(daysLeft.days)) {
      await BOT.telegram.sendMessage(
        telegramId,
        `⚠️ Diqqat!\n\nObuna tugashiga ${daysLeft.text.toLowerCase()}.\nIltimos, obunani yangilang! @akbarswe_bot`,
      )
    }

    if (daysLeft.days < 0) {
      await BOT.telegram.sendMessage(
        telegramId,
        '⚠️ Diqqat!\n\nObuna tugadi!\nIltimos, obunani yangilang! @akbarswe_bot',
      )

      console.log(`Chat ${chatId} subscription expired.`)
    }
  })
}

module.exports = {
  isPaidChat,
  isAdminChatMember,
  updateMembersNumber,
  subscriptionExpirationCheck,
}
