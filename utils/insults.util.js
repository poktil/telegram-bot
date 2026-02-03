const { INSULTS } = require('../config/insults.config')
const { INSULTS_KEYS } = require('../constants/insults.constants')
const { MAX_INSULTS_PER_TEXT } = require('../constants/insults.constants')
const { normalizer } = require('../lib/normalizer.lib')

function tokenize(text) {
  return text.match(/\p{L}+/gu) || []
}

function checkWordsLimit(words) {
  if (words.length <= MAX_INSULTS_PER_TEXT) return null

  return {
    error: `Matnda ${words.length}ta so'z bor. Maksimal: ${MAX_INSULTS_PER_TEXT}ta`,
  }
}

function scanWords(words, containsOnly) {
  const found = []
  let levelSum = 0

  for (let i = 0; i < words.length; i++) {
    const w1 = normalizer(words[i])
    const w2 = words[i + 1] ? normalizer(words[i + 1]) : null

    const phraseHit = w2 && findByPhrase(`${w1} ${w2}`)
    if (phraseHit) {
      if (containsOnly) return { containsInsult: true }

      found.push(phraseHit)
      levelSum += phraseHit.level
      i++
      continue
    }

    const wordHit = findByWord(w1)
    if (wordHit) {
      if (containsOnly) return { containsInsult: true }

      found.push(wordHit)
      levelSum += wordHit.level
    }
  }

  return { found, levelSum }
}

function findByPhrase(phrase) {
  const pool = INSULTS[INSULTS_KEYS.PHRASES] || []

  for (const item of pool) {
    const match = phrase.match(item.pattern)
    if (match) return { ...item, insult: match[0] }
  }

  return null
}

function findByWord(word) {
  if (!word) return null

  const pool = [
    ...(INSULTS[word[0]] || []),
    ...(INSULTS[INSULTS_KEYS.OTHERS] || []),
  ]

  return pool.find((i) => i.pattern.test(word)) || null
}

module.exports = {
  tokenize,
  checkWordsLimit,
  scanWords,
  findByPhrase,
  findByWord,
}
