const { BOT } = require('../config/bot.config')
const { SETTINGS } = require('../constants/settings.constants')
const { InlineKeyboardMaker } = require('../utils/keyboard.util')
const { updateChatSettings } = require('../lib/settings.lib')
const { settingsCommand } = require('../commands/settings.command')
const { getModeLabels, getWelcomingLabels } = require('../utils/settings.util')

function registerSettingsActions() {
  BOT.action('settings:mode', async (ctx) => {
    const keyboard = InlineKeyboardMaker(getModeLabels(), 'mode')
    await ctx.editMessageText('Rejimni tanlang:', keyboard)
  })

  BOT.action('settings:welcoming', async (ctx) => {
    const keyboard = InlineKeyboardMaker(getWelcomingLabels(), 'welcoming')
    await ctx.editMessageText('Hush kelibsiz sozlamasini tanlang:', keyboard)
  })

  BOT.action(/^mode:/, async (ctx) => {
    const mode = ctx.callbackQuery.data.split(':')[1]
    if (mode === 'settings') {
      await settingsCommand(ctx, true)
      return
    }

    const modeText = SETTINGS.MODE[mode]?.text || mode

    await updateChatSettings(ctx, { mode })
    await ctx.editMessageText(`✅ Rejim o'rnatildi: ${modeText}`)
  })

  BOT.action(/^welcoming:/, async (ctx) => {
    const welcoming = ctx.callbackQuery.data.split(':')[1]
    if (welcoming === 'settings') {
      await settingsCommand(ctx, true)
      return
    }

    const welcomingText =
      SETTINGS.WELCOMING[welcoming.toUpperCase()]?.text || welcoming

    await updateChatSettings(ctx, { welcoming: welcoming === 'true' })
    await ctx.editMessageText(
      `✅ Hush kelibsiz sozlamasi o'rnatildi: ${welcomingText}`,
    )
  })
}

module.exports = { registerSettingsActions }
