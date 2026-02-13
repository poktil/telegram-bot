const {
  CYRILLIC_TO_LATIN_MAP,
} = require('../constants/cyrillicToLatin.constants')

const LEET_MAP = {
  1: 'i',
  0: 'o',
  '@': 'a',
  $: 's',
}
const LEET_REGEX = new RegExp(`[${Object.keys(LEET_MAP).join('')}]`, 'g')

function normalizer(word) {
  if (!word || typeof word !== 'string') return ''

  word = word.toLowerCase()

  // Normalize + remove diacritics (ş → s, ū → u, ś → s, ā → a)
  word = word.normalize('NFD').replace(/\p{Diacritic}+/gu, '')

  // Replace leet-style characters
  word = word.replace(LEET_REGEX, (char) => LEET_MAP[char] ?? char)

  // Remove other non-letter/number chars
  word = word.replace(/[^\p{L}0-9 ]+/gu, '')

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
