const { RETRIEVE_CHATS_PERIOD } = require('../constants/chats.constants')
const { getAllChatsFromDb } = require('../database/chats/get')
const { scheduleDailyTask } = require('../lib/schedule')

const CHATS = new Map([])

async function updateChats() {
  const now = Date.now()

  const chats = await getAllChatsFromDb()
  if (!chats.ok) return

  chats.data.forEach((chat) => {
    const expiresAtStr = chat.subscriptions?.expires_at
    if (!chat?.active || !expiresAtStr) return

    const expiresAt = new Date(expiresAtStr).getTime()
    if (expiresAt > now) CHATS.set(chat.telegram_id, chat)
  })

  logChatsUpdate(Array.from(CHATS.values()))
}

function logChatsUpdate(chats) {
  console.log(
    `✅ Chats updated at ${new Date().toLocaleString()} — Total: ${chats.length}`,
  )
}

async function registerChats() {
  scheduleDailyTask(updateChats, RETRIEVE_CHATS_PERIOD)
}

module.exports = { CHATS, registerChats }
