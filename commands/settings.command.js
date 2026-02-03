const { showSettings } = require('../lib/settings.lib')
const { InlineKeyboardMaker } = require('../utils/keyboard.util')

async function settingsCommand(ctx) {
  const keyboard = InlineKeyboardMaker(
    {
      'Rejim (mode)': 'mode',
    },
    'settings',
  )

  await ctx.reply(showSettings(ctx.chat.id), keyboard)
}

module.exports = { settingsCommand }
