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
const { textMessageHandler } = require('./handler/text.handler')
const { newChatTitle } = require('./handler/newChatTitle.handler')
const { newChatMembers } = require('./handler/newChatMembers.handler')
const { registerSettingsActions } = require('./actions/settings.actions')
const { registerInsults } = require('./config/insults.config')
const { registerChats } = require('./config/chats.config')
const { launchBot } = require('./config/launch.config')

BOT.use(isPaidMiddleware)
BOT.use(isAdminCommandMiddleware)

BOT.start(startCommand)
BOT.help(helpCommand)
BOT.settings(settingsCommand)

BOT.on(message('text'), textMessageHandler)
BOT.on('photo', textMessageHandler)
BOT.on('video', textMessageHandler)
BOT.on('audio', textMessageHandler)
BOT.on('document', textMessageHandler)
BOT.on('edited_message', textMessageHandler)

BOT.on('new_chat_title', newChatTitle)
BOT.on('new_chat_members', newChatMembers)

registerSettingsActions()
registerInsults()
registerChats()
launchBot()
