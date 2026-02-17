const { CHATS } = require('../config/chats.config')
const { SETTINGS } = require('../constants/settings.constants')
const { updateChatSettingsInDb } = require('../database/chats/update')
const { getChatId } = require('../utils/getChatId')

function getChatSettings(ctx) {
  const chatId = getChatId(ctx)

  if (!CHATS.has(chatId)) return
  return CHATS.get(chatId).settings
}

async function updateChatSettings(ctx, patch) {
  const chatId = getChatId(ctx)
  await updateChatSettingsInDb(chatId, patch)

  const current = CHATS.get(chatId)
  CHATS.set(chatId, {
    ...current,
    settings: { ...current.settings, ...patch },
  })
}

function showSettings(ctx) {
  const current = getChatSettings(ctx)
  if (!current)
    return {
      ok: false,
      message: 'Sozlamalar topilmadi.',
    }

  let message = 'Sozlamalar:\n'
  for (const [key, value] of Object.entries(current)) {
    if (key === 'telegram_id') continue
    if (key === 'mode') {
      message += `Rejim: ${SETTINGS.MODE[value]?.text || value}\n`
      continue
    }
    if (key === 'welcoming') {
      message += `Hush kelibsiz: ${SETTINGS.WELCOMING[value.toString().toUpperCase()]?.text || value}\n`
      continue
    }
    message += `${key}: ${value}\n`
  }

  return { ok: true, message }
}

module.exports = {
  getChatSettings,
  updateChatSettings,
  showSettings,
}
