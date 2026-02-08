const { SUPABASE } = require('../db.init')

async function getChatFromDb(telegramId) {
  try {
    const chatColumns = 'telegram_id, name, active, created_at'
    const settingsColumns = 'telegram_id, mode'
    const subscriptionsColumns = 'telegram_id, plan, expires_at'

    const { data: chat, error: chatError } = await SUPABASE.from('chats')
      .select(chatColumns)
      .eq('telegram_id', telegramId)
      .single()
    if (chatError) throw chatError

    const { data: settings, error: settingsError } = await SUPABASE.from(
      'settings',
    )
      .select(settingsColumns)
      .eq('telegram_id', telegramId)
      .single()
    if (settingsError) throw settingsError

    const { data: subscription, error: subsError } = await SUPABASE.from(
      'subscriptions',
    )
      .select(subscriptionsColumns)
      .eq('telegram_id', telegramId)
      .single()
    if (subsError) throw subsError

    return {
      ok: true,
      data: {
        ...chat,
        settings: settings || null,
        subscriptions: subscription || null,
      },
    }
  } catch (err) {
    console.error('Error fetching chat by telegramId:', err)
    return { ok: false, error: err }
  }
}

async function getAllChatsFromDb() {
  try {
    const chatColumns = 'telegram_id, name, active, created_at'
    const settingsColumns = 'telegram_id, mode'
    const subscriptionsColumns = 'telegram_id, plan, expires_at'

    const { data: chats, error: chatsError } =
      await SUPABASE.from('chats').select(chatColumns)
    if (chatsError) throw chatsError

    const { data: settings, error: settingsError } =
      await SUPABASE.from('settings').select(settingsColumns)
    if (settingsError) throw settingsError

    const { data: subscriptions, error: subsError } =
      await SUPABASE.from('subscriptions').select(subscriptionsColumns)
    if (subsError) throw subsError

    const merged = chats.map((chat) => ({
      ...chat,
      settings:
        settings.find((s) => s.telegram_id === chat.telegram_id) || null,
      subscriptions:
        subscriptions.find((sub) => sub.telegram_id === chat.telegram_id) ||
        null,
    }))

    return { ok: true, data: merged }
  } catch (err) {
    console.error('Error fetching chats with settings and subscriptions:', err)
    return { ok: false, error: err }
  }
}

module.exports = { getChatFromDb, getAllChatsFromDb }
