const {
  INSULTS_KEYS,
  RETRIEVE_INSULTS_PERIOD,
} = require('../constants/insults.constants')
const { fetchFromGitHub } = require('../lib/github/fetch.github')
const { scheduleDailyTask } = require('../lib/schedule')

const INSULTS = {
  [INSULTS_KEYS.PHRASES]: [],
  [INSULTS_KEYS.OTHERS]: [],
}

function resetInsults() {
  INSULTS[INSULTS_KEYS.PHRASES] = []
  INSULTS[INSULTS_KEYS.OTHERS] = []

  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i)
    INSULTS[letter] = []
  }
}

function processInsultsJSON(insultsJSON) {
  insultsJSON.forEach(({ id, pattern, insult, ...rest }) => {
    const regex = new RegExp(pattern, 'i')
    const data = { ...rest, insult, pattern: regex }

    if (pattern.includes('\\s+')) {
      INSULTS[INSULTS_KEYS.PHRASES].push(data)
      return
    }

    let key = INSULTS_KEYS.OTHERS
    const fChar = pattern[1]
    const nChar = pattern[2]

    if (fChar >= 'a' && fChar <= 'z' && !['?', '*', '+'].includes(nChar)) {
      key = fChar
      if (!INSULTS[key]) INSULTS[key] = []
    }

    INSULTS[key].push(data)
  })
}

function logInsultsUpdate(insultsJSON) {
  console.log(
    `✅ Insults updated at ${new Date().toLocaleString()} — Total: ${insultsJSON.length}, Phrases: ${INSULTS[INSULTS_KEYS.PHRASES].length}, Others: ${INSULTS[INSULTS_KEYS.OTHERS].length}`,
  )
}

async function updateInsults() {
  const insultsJSON = await fetchFromGitHub('insults.json')
  if (!insultsJSON) return

  resetInsults()
  processInsultsJSON(insultsJSON)
  logInsultsUpdate(insultsJSON)
}

async function registerInsults() {
  scheduleDailyTask(updateInsults, RETRIEVE_INSULTS_PERIOD)
}

module.exports = { INSULTS, registerInsults }
