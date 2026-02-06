const { RETRIEVE_CHATS_PERIOD } = require('../constants/chats.constants')
const { getAllFromFirestore } = require('../database/get')
const { scheduleDailyTask } = require('../lib/schedule')

const CHATS = new Map([])

async function updateChats() {
  const now = Date.now()

  const chats = await getAllFromFirestore('chats')
  if (!chats.ok) return

  chats.data.forEach((chat) => {
    const expiresAt = chat.subscription?.expiresAt.toMillis()
    if (chat?.active && expiresAt && expiresAt > now) CHATS.set(chat.id, chat)
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
