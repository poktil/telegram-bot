const crypto = require('crypto')
const { BOT } = require('./bot.config')
const { createServer } = require('http')

async function launchBot() {
  const ENV = process.env.NODE_ENV

  if (ENV === 'development') {
    BOT.launch()
    console.log('✅ Poktil bot running in development mode (long polling)')
  } else {
    const webhookDomain = process.env.WEBHOOK_DOMAIN
    const port = process.env.PORT || 3000
    const webhookPath = `/bot${process.env.TELEGRAM_BOT_TOKEN}`
    const secretToken =
      process.env.WEBHOOK_SECRET || crypto.randomBytes(32).toString('hex')

    const webhookInfo = await BOT.createWebhook({
      domain: webhookDomain,
      port,
      path: webhookPath,
      secretToken,
    })

    createServer(webhookInfo).listen(port, () => {
      console.log(
        `✅ Poktil bot running in webhook mode at ${webhookDomain}/botTELEGRAM_BOT_TOKEN`,
      )
    })
  }

  process.once('SIGINT', () => BOT.stop('SIGINT'))
  process.once('SIGTERM', () => BOT.stop('SIGTERM'))
}

module.exports = { launchBot }
