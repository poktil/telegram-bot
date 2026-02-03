const { Markup } = require('telegraf')

function InlineKeyboardMaker(options, prefix = '') {
  const buttons = Object.entries(options).map(([label, value]) =>
    Markup.button.callback(label, `${prefix}:${value}`),
  )

  const keyboard = buttons.map((btn) => [btn])
  return Markup.inlineKeyboard(keyboard)
}

module.exports = { InlineKeyboardMaker }
