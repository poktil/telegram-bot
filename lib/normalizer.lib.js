const {
  CYRILLIC_TO_LATIN_MAP,
} = require('../constants/cyrillicToLatin.constants')

function normalizer(word) {
  if (!word || typeof word !== 'string') return ''

  word = word.toLowerCase()
  word = word.normalize('NFKC')

  // Replace leet-style characters
  word = word
    .replace(/1/g, 'i')
    .replace(/0/g, 'o')
    .replace(/@/g, 'a')
    .replace(/ō/g, 'o')
    .replace(/ʻ/g, '')

  // Remove other non-letter/number chars
  word = word.replace(/[^\p{L}0-9 ]+/gu, ' ')

  // Collapse 3+ repeated letters to 1
  word = word.replace(/(.)\1{2,}/g, '$1')

  // Cyrillic → Latin
  word = cyrillicToLatin(word)

  return word.trim()
}

function cyrillicToLatin(word) {
  return word
    .split('')
    .map((char) => CYRILLIC_TO_LATIN_MAP[char] || char)
    .join('')
}

module.exports = {
  normalizer,
}
