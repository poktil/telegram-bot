const { CHATS } = require('../config/chats.config')
const { updateOnFirestore } = require('../database/update')

function getChatSettings(chatId) {
  chatId = String(chatId)

  if (!CHATS.has(chatId)) return
  return CHATS.get(chatId).settings
}

async function updateChatSettings(chatId, localPatch, firestorePatch) {
  chatId = String(chatId)
  await updateOnFirestore('chats', chatId, firestorePatch)

  const current = CHATS.get(chatId)
  CHATS.set(chatId, {
    ...current,
    settings: { ...current.settings, ...localPatch },
  })
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
