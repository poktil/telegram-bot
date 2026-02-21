const { scheduleTask } = require('../lib/schedule')

async function selfPing() {
  if (process.env.NODE_ENV === 'development') return

  try {
    await fetch(process.env.WEBHOOK_DOMAIN)
    console.log(`✅ Self-ping successful at ${new Date().toLocaleString()}`)
  } catch (err) {
    console.error(`❌ Self-ping failed at ${new Date().toLocaleString()}:`, err)
  }
}

async function registerSelfPing() {
  scheduleTask(selfPing)
}

module.exports = { registerSelfPing }
