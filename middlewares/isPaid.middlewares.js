const { isPaidChat } = require('../lib/chats.lib')

async function isPaidMiddleware(ctx, next) {
  if (ctx.updateType === 'my_chat_member') return next()

  const text = ctx.message?.text
  const isCommand = typeof text === 'string' && text.startsWith('/')

  const isPaid = await isPaidChat(ctx)
  if (!isPaid.ok && isCommand) {
    await ctx.reply(isPaid.message)
    return
  }

  return next()
}

module.exports = { isPaidMiddleware }
