const { BOT } = require('../config/bot.config')
const { ALLOWED_COMMANDS } = require('../constants/allowedCommands.constants')
const { isAdminChatMember } = require('../lib/chats.lib')

async function isAdminCommandMiddleware(ctx, next) {
  const text = ctx.updateType === 'message' ? ctx.message.text : null
  const isCommand =
    typeof text === 'string' && /^\/[a-zA-Z0-9_]+(@[a-zA-Z0-9_]+)?$/.test(text)

  for (const cmd of ALLOWED_COMMANDS) {
    if (text !== `/${cmd}` && text !== `/${cmd}@${BOT.botInfo.username}`)
      continue

    const isAdmin = await isAdminChatMember(ctx)
    if (!isAdmin && isCommand) {
      await ctx.reply(
        'Bu chat uchun siz administrator yoki yaratuvchi emassiz.',
        {
          reply_to_message_id: ctx.message.message_id,
        },
      )
      return
    }
  }

  await next()
}

module.exports = { isAdminCommandMiddleware }
