const { SETTINGS } = require('../constants/settings.constants')

function getModeLabels() {
  const MODE_LABELS = {
    ...Object.fromEntries(
      Object.entries(SETTINGS.DISPLAY).map(([key, label]) => [label, key]),
    ),
    '⬅️ Sozlamalarga qaytish': 'settings',
  }

  return MODE_LABELS
}

module.exports = { getModeLabels }
