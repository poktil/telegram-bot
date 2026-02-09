const { CHATS } = require('../config/chats.config')
const { getChatId } = require('../utils/getChatId')
const {
  buildPlansMessage,
  buildSubscriptionMessage,
} = require('../utils/subscription.util')

async function subscriptionCommand(ctx) {
  const chatId = getChatId(ctx)

  if (ctx.chat.type === 'private') {
    await ctx.reply(buildPlansMessage(), {
      parse_mode: 'HTML',
    })
    return
  }

  const subscription = CHATS.get(chatId)?.subscriptions

  const text = buildSubscriptionMessage(subscription)
  await ctx.reply(text, { parse_mode: 'HTML' })
}

module.exports = {
  subscriptionCommand,
}
