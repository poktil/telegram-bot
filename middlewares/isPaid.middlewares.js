const { isPaidChat } = require('../lib/chats.lib')

async function isPaidMiddleware(ctx, next) {
  const isCommand =
    ctx.updateType === 'message' &&
    ctx.message.text &&
    ctx.message.text.startsWith('/')

  const isPaid = isPaidChat(ctx)
  if (!isPaid.ok && isCommand) {
    await ctx.reply(isPaid.message)
    return
  }

  if (isPaid.ok) await next()
}

module.exports = { isPaidMiddleware }
