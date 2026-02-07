const { isAdminChatMember } = require('../lib/chats.lib')

async function isAdminCommandMiddleware(ctx, next) {
  const isCommand =
    ctx.updateType === 'message' &&
    ctx.message.text &&
    ctx.message.text.startsWith('/')

  const isAdmin = await isAdminChatMember(ctx)
  if (!isAdmin && isCommand) {
    await ctx.reply('Bu chat uchun siz administrator yoki yaratuvchi emassiz.')
    return
  }

  await next()
}

module.exports = { isAdminCommandMiddleware }
