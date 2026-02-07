const { showSettings } = require('../lib/settings.lib')
const { InlineKeyboardMaker } = require('../utils/keyboard.util')

async function settingsCommand(ctx, edit = false) {
  const keyboard = InlineKeyboardMaker(
    {
      'Rejim (mode)': 'mode',
    },
    'settings',
  )

  const result = showSettings(ctx)
  if (!result.ok) {
    await ctx.reply(result.message)
    return
  }

  if (edit && ctx.callbackQuery) {
    await ctx.editMessageText(result.message, keyboard)
    return
  }
  await ctx.reply(result.message, keyboard)
}

module.exports = { settingsCommand }
