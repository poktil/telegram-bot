const { CHATS } = require('../config/chats.config')
const { addChatToDb } = require('../database/chats/add')
const { getChatId } = require('../utils/getChatId')

async function myChatMemberHandler(ctx) {
  const chatId = getChatId(ctx)
  const oldStatus = ctx.myChatMember.old_chat_member.status
  const newStatus = ctx.myChatMember.new_chat_member.status

  const wasAdded = oldStatus === 'left' && newStatus === 'member'

  if (wasAdded) {
    if (CHATS.get(chatId)) {
      await ctx.reply(`Salom, guruh nazoratim ostida ✅`)
      return
    }

    const res = await addChatToDb(chatId, ctx.chat.title || 'No Title')
    if (!res.ok) {
      await ctx.reply(
        `Xatolik yuz berdi\n\n Menga murojaat qiling: @akbarswe_bot`,
      )
      return
    }

    CHATS.set(chatId, res.data)
    await ctx.reply('Salom, men bu guruhni 1 oy davomida nazorat qilaman ✅')
  }
}

module.exports = { myChatMemberHandler }
