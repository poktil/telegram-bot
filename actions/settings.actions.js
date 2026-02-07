const { BOT } = require('../config/bot.config')
const { SETTINGS } = require('../constants/settings.constants')
const { InlineKeyboardMaker } = require('../utils/keyboard.util')
const { updateChatSettings } = require('../lib/settings.lib')
const { settingsCommand } = require('../commands/settings.command')
const { getModeLabels } = require('../utils/settings.util')

function registerSettingsActions() {
  BOT.action('settings:mode', async (ctx) => {
    const keyboard = InlineKeyboardMaker(getModeLabels(), 'mode')
    await ctx.editMessageText('Rejimni tanlang:', keyboard)
  })

  BOT.action(/^mode:/, async (ctx) => {
    const mode = ctx.callbackQuery.data.split(':')[1]
    if (mode === 'settings') {
      await settingsCommand(ctx, true)
      return
    }

    const modeText = SETTINGS.DISPLAY[mode] || mode

    await updateChatSettings(ctx, { mode })
    await ctx.editMessageText(`✅ Rejim o'rnatildi: ${modeText}`)
  })
}

module.exports = { registerSettingsActions }
