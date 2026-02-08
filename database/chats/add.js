const { SUPABASE } = require('../db.init')
const { getChatFromDb } = require('./get')

async function addChatToDb(chatId, chatTitle) {
  try {
    const { _, error } = await SUPABASE.from('chats').insert({
      telegram_id: chatId,
      name: chatTitle,
    })
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
