const { SUPABASE } = require('../database/db.init')
const { scheduleDailyTask } = require('../lib/schedule')
const { getChatId } = require('../utils/getChatId')
const { CHATS } = require('./chats.config')

const COLLECTED_DATA = new Map()

async function addAllDataToDb() {
  for (const [chatId, collectedData] of COLLECTED_DATA.entries()) {
    try {
      console.log(`Updating data for chat ${chatId} in DB...`, collectedData)
      const { _, error } = await SUPABASE.from('chats')
        .update(collectedData)
        .eq('telegram_id', chatId)
        .select()
      if (error) throw error
    } catch (err) {
      console.error('Error updating chat settings in DB:', err)
    }
  }
}

async function collectDataMiddleware(ctx, next) {
  const chatId = getChatId(ctx)
  if (!CHATS.get(chatId)) return next()

  const memberCount = await ctx.getChatMembersCount()

  COLLECTED_DATA.set(chatId, {
    type: ctx.chat.type,
    members: memberCount,
  })

  console.log(COLLECTED_DATA)

  return next()
}

async function registerCollectedData() {
  scheduleDailyTask(addAllDataToDb, 24 * 60 * 60 * 1000) // 24 hours
}

module.exports = {
  COLLECTED_DATA,
  collectDataMiddleware,
  registerCollectedData,
}
