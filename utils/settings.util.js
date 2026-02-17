const { SETTINGS } = require('../constants/settings.constants')

function buildLabels(config) {
  return {
    ...Object.fromEntries(
      Object.values(config).map(({ text, value }) => [text, value]),
    ),
    '⬅️ Sozlamalarga qaytish': 'settings',
  }
}

function getModeLabels() {
  return buildLabels(SETTINGS.MODE)
}

function getWelcomingLabels() {
  return buildLabels(SETTINGS.WELCOMING)
}

module.exports = { getModeLabels, getWelcomingLabels }
