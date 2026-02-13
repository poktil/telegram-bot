const { INSULT_LEVELS } = require('../constants/insults.constants')
const {
  tokenize,
  checkWordsLimit,
  scanWords,
} = require('../utils/insults.util')

function findInsult(text, chatId, options = {}) {
  const { containsOnly = false } = options

  const words = tokenize(text)

  const limitError = checkWordsLimit(words, chatId)
  if (limitError) return limitError

  const result = scanWords(words, containsOnly)

  if (containsOnly) return result
  if (!result.found.length) return { containsInsult: false }

  const avgLevel = Math.round(result.levelSum / result.found.length)
  const level = INSULT_LEVELS[avgLevel]

  return {
    containsInsult: true,
    level: avgLevel,
    insults: result.found,
    message: `Haqoratlar: ${result.found.length}ta\nDaraja: ${level.TEXT} ${level.EMOJI}`,
  }
}

module.exports = { findInsult }
