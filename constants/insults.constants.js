const MAX_INSULTS_PER_TEXT = {
  base: 50,
  premium: 70,
  ultimate: Infinity,
}
const INSULTS_KEYS = {
  OTHERS: 'others',
  PHRASES: 'phrases',
}
const INSULT_LEVELS = {
  1: { EMOJI: '🟢', TEXT: 'Past' },
  2: { EMOJI: '🟡', TEXT: "O'rta" },
  3: { EMOJI: '🔴', TEXT: 'Yuqori' },
}

module.exports = {
  MAX_INSULTS_PER_TEXT,
  INSULTS_KEYS,
  INSULT_LEVELS,
}
