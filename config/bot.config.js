const { Telegraf } = require('telegraf')

const BOT = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

module.exports = { BOT }
