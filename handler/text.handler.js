const { CHATS } = require('../config/chats.config')
const { SETTINGS } = require('../constants/settings.constants')
const { getChatId } = require('../utils/getChatId')
const { getChatSettings } = require('../lib/settings.lib')
const { findInsult } = require('../lib/insults.lib')

async function textMessageHandler(ctx) {
  const chatId = getChatId(ctx)
  if (!CHATS.has(chatId)) return

  const { from, message_id, text } = ctx.message
  const settings = getChatSettings(ctx)

  if (settings.mode === SETTINGS.MODE.QUITE) return

  const result = findInsult(text, { containsOnly: true })

  if (result.error) {
    await ctx.reply(result.error, { reply_to_message_id: message_id })
    return
  }

  if (!result.containsInsult) return

  const shouldDeleteWarn = settings.mode === SETTINGS.MODE.DELETE_WARN
  const name = from.username ? `@${from.username}` : from.first_name
  if (shouldDeleteWarn) {
    await ctx.deleteMessage()
    await ctx.reply(`${name} odob saqlang!`)
    return
  }

  const shouldDelete = settings.mode === SETTINGS.MODE.DELETE
  if (shouldDelete) await ctx.deleteMessage()

  const shouldWarn = settings.mode === SETTINGS.MODE.WARN
  if (shouldWarn) {
    await ctx.reply(`${name} odob saqlang!`, {
      reply_to_message_id: message_id,
    })
  }
}

module.exports = { textMessageHandler }
