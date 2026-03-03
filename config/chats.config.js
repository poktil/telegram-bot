const { getAllChatsFromDb } = require('../database/chats/get')
const { scheduleDailyTask } = require('../lib/schedule')

const CHATS = new Map([])

async function updateChats() {
  const {
    updateMembersNumber,
    subscriptionExpirationCheck,
  } = require('../lib/chats.lib')
  const now = Date.now()

  const chats = await getAllChatsFromDb()
  if (!chats.ok) return

  chats.data.forEach((chat) => {
    const expiresAtStr = chat.subscriptions?.expires_at
    if (!chat?.active || !expiresAtStr) return

    const expiresAt = new Date(expiresAtStr).getTime()
    if (expiresAt > now) CHATS.set(chat.telegram_id, chat)
  })

  await updateMembersNumber(chats.data)
  await subscriptionExpirationCheck(chats.data)
  logChatsUpdate(Array.from(CHATS.values()))
}

function logChatsUpdate(chats) {
  console.log(
    `✅ Chats updated at ${new Date().toLocaleString()} — Total: ${chats.length}`,
  )
}

async function registerChats() {
  scheduleDailyTask(updateChats)
}

module.exports = { CHATS, registerChats }
