require('dotenv').config()
const { message } = require('telegraf/filters')
const { BOT } = require('./config/bot.config')
const { isPaidMiddleware } = require('./middlewares/isPaid.middlewares')
const {
  isAdminCommandMiddleware,
} = require('./middlewares/isAdmin.middlewares')
const { startCommand } = require('./commands/start.command')
const { helpCommand } = require('./commands/help.command')
const { settingsCommand } = require('./commands/settings.command')
const { subscriptionCommand } = require('./commands/subscription.command')
const { textMessageHandler } = require('./handler/text.handler')
const { newChatTitleHandler } = require('./handler/newChatTitle.handler')
const { newChatMembersHandler } = require('./handler/newChatMembers.handler')
const { myChatMemberHandler } = require('./handler/myChatMember.handler')
const { registerSettingsActions } = require('./actions/settings.actions')
const { registerInsults } = require('./config/insults.config')
const { registerChats } = require('./config/chats.config')
const { launchBot } = require('./config/launch.config')

// TEMP
const {
  collectDataMiddleware,
  registerCollectedData,
} = require('./config/collectData.config')
// TEMP

BOT.use(isPaidMiddleware)
BOT.use(isAdminCommandMiddleware)

// TEMP
BOT.use(collectDataMiddleware)
// TEMP

BOT.start(startCommand)
BOT.help(helpCommand)
BOT.settings(settingsCommand)
BOT.command('subscription', subscriptionCommand)

BOT.on(message('text'), textMessageHandler)
BOT.on('photo', textMessageHandler)
BOT.on('video', textMessageHandler)
BOT.on('audio', textMessageHandler)
BOT.on('document', textMessageHandler)
BOT.on('edited_message', textMessageHandler)

BOT.on('new_chat_title', newChatTitleHandler)
BOT.on('new_chat_members', newChatMembersHandler)
BOT.on('my_chat_member', myChatMemberHandler)

registerSettingsActions()
registerInsults()
registerChats()

// TEMP
registerCollectedData()
// TEMP

launchBot()
