const { BOT } = require('../config/bot.config')
const {
  ALLOWED_COMMANDS,
  ONLY_ADMIN_COMMANDS,
} = require('../constants/allowedCommands.constants')
const { isAdminChatMember } = require('../lib/chats.lib')

const allowedSet = new Set(ALLOWED_COMMANDS)
const adminOnlySet = new Set(ONLY_ADMIN_COMMANDS)

async function isAdminCommandMiddleware(ctx, next) {
  if (ctx.updateType !== 'message') return next()

  const text = ctx.message?.text
  if (typeof text !== 'string' || !text.startsWith('/')) return next()

  const match = text.match(/^\/([a-zA-Z0-9_]+)(?:@([a-zA-Z0-9_]+))?$/)
  if (!match) return next()

  const [, command, username] = match

  if (username && username !== BOT.botInfo.username) return next()
  if (!allowedSet.has(command)) return next()
  if (!adminOnlySet.has(command)) return next()

  const isAdmin = await isAdminChatMember(ctx)
  if (isAdmin) return next()

  await ctx.reply('Bu chat uchun siz admin yoki yaratuvchi emassiz!', {
    reply_to_message_id: ctx.message.message_id,
  })
}

module.exports = { isAdminCommandMiddleware }
