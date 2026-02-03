const { CHATS_SETTINGS } = require('../config/settings.config')
const { DEFAULT_CHAT_SETTINGS } = require('../constants/settings.constants')

function getChatSettings(chatId) {
  if (!CHATS_SETTINGS.has(chatId))
    CHATS_SETTINGS.set(chatId, DEFAULT_CHAT_SETTINGS)

  return CHATS_SETTINGS.get(chatId)
}

function updateChatSettings(chatId, patch) {
  const current = getChatSettings(chatId)
  CHATS_SETTINGS.set(chatId, { ...current, ...patch })
}

function showSettings(chatId) {
  const current = getChatSettings(chatId)

  let message = 'Sozlamalar:\n'
  for (const [key, value] of Object.entries(current)) {
    message += `${key}: ${value}\n`
  }

  return message
}

module.exports = {
  getChatSettings,
  updateChatSettings,
  showSettings,
}
