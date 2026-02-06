const { CHATS } = require('../config/chats.config')
const { SETTINGS } = require('../constants/settings.constants')
const { findInsult } = require('../lib/insults.lib')
const { getChatSettings } = require('../lib/settings.lib')

async function textMessageHandler(ctx) {
  const chatId = String(ctx.chat.id)

  if (!CHATS.has(chatId)) return

  const { chat, from, message_id, text } = ctx.message
  const settings = getChatSettings(chat.id)

  if (settings.mode === SETTINGS.MODE.QUITE) return

  const result = findInsult(text, { containsOnly: true })

  if (result.error) {
    await ctx.reply(result.error, { reply_to_message_id: message_id })
    return
  }

  if (!result.containsInsult) return

  const shouldWarn =
    settings.mode === SETTINGS.MODE.WARN ||
    settings.mode === SETTINGS.MODE.DELETE_WARN

  if (shouldWarn) {
    const name = from.username ? `@${from.username}` : from.first_name
    await ctx.reply(`${name} odob saqlang!`, {
      reply_to_message_id: message_id,
    })
  }

  const shouldDelete =
    settings.mode === SETTINGS.MODE.DELETE ||
    settings.mode === SETTINGS.MODE.DELETE_WARN

  if (shouldDelete) await ctx.deleteMessage()
}

module.exports = { textMessageHandler }
