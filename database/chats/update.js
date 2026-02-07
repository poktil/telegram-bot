const { SUPABASE } = require('../db.init')

async function updateChatSettingsInDb(telegramId, newData) {
  try {
    const { data, error } = await SUPABASE.from('settings')
      .update(newData)
      .eq('telegram_id', telegramId)
    if (error) throw error

    return { ok: true, data }
  } catch (err) {
    console.error('Error updating chat settings in DB:', err)
    return { ok: false, error: err }
  }
}

async function updateChatTitleInDb(telegramId, newTitle) {
  try {
    const { data, error } = await SUPABASE.from('chats')
      .update({ name: newTitle })
      .eq('telegram_id', telegramId)
    if (error) throw error

    return { ok: true, data }
  } catch (err) {
    console.error('Error updating chat title in DB:', err)
    return { ok: false, error: err }
  }
}

module.exports = { updateChatSettingsInDb, updateChatTitleInDb }
