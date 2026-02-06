const { BOT } = require('../config/bot.config')
const { SETTINGS } = require('../constants/settings.constants')
const { InlineKeyboardMaker } = require('../utils/keyboard.util')
const { updateChatSettings } = require('../lib/settings.lib')

const MODE_LABELS = Object.fromEntries(
  Object.entries(SETTINGS.MODE).map(([key, label]) => [label, key]),
)

function registerSettingsActions() {
  BOT.action('settings:mode', async (ctx) => {
    const keyboard = InlineKeyboardMaker(MODE_LABELS, 'mode')
    await ctx.editMessageText('Rejimni tanlang:', keyboard)
  })

  BOT.action(/^mode:/, async (ctx) => {
    const mode = ctx.callbackQuery.data.split(':')[1]
    const modeText = SETTINGS.MODE[mode] || mode

    await updateChatSettings(ctx.chat.id, { mode }, { 'settings.mode': mode })
    await ctx.editMessageText(`✅ Rejim o'rnatildi: ${modeText}`)
  })
}

module.exports = { registerSettingsActions }
