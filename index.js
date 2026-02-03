require('dotenv').config()
const { message } = require('telegraf/filters')
const { BOT } = require('./config/bot.config')
const { startCommand } = require('./commands/start.command')
const { helpCommand } = require('./commands/help.command')
const { settingsCommand } = require('./commands/settings.command')
const { textMessageHandler } = require('./handler/text.handler')
const { registerSettingsActions } = require('./actions/settings.actions')

BOT.start(startCommand)
BOT.help(helpCommand)
BOT.settings(settingsCommand)
BOT.on(message('text'), textMessageHandler)
registerSettingsActions()

BOT.launch()

process.once('SIGINT', () => BOT.stop('SIGINT'))
process.once('SIGTERM', () => BOT.stop('SIGTERM'))
