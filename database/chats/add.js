const { SUPABASE } = require('../db.init')
const { getChatFromDb } = require('./get')

async function addChatToDb(chatId, ctx) {
  try {
    const data = {
      telegram_id: chatId,
      name: ctx.chat.title || 'No Title',
      type: ctx.chat.type,
      members: (await ctx.getChatMembersCount()) || null,
    }

    const { _, error } = await SUPABASE.from('chats').insert(data)
    if (error) throw error

    const newChatData = await getChatFromDb(chatId)
    if (!newChatData.ok) throw newChatData.error

    return { ok: true, data: newChatData.data }
  } catch (err) {
    console.error('Error adding chat to DB:', err)
    return { ok: false, error: err }
  }
}

module.exports = { addChatToDb }
