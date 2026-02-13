const { SUBSCRIPTION_PLANS } = require('../constants/subscription.constants')

function formatPrice(price) {
  if (!price) return 'Tekin (1 oy)'

  return `${price.toLocaleString('uz-UZ')} so'm/oy`
}

function buildPlansMessage() {
  return `
<b>Mavjud obuna rejalari:</b>
${Object.values(SUBSCRIPTION_PLANS)
  .map(
    (plan) => `
<b>${plan.name.toUpperCase()}</b>
<b>Narxi:</b> <code>${formatPrice(plan.price)}</code>
<b>Imkoniyatlar:</b>
${plan.features.map((f) => `• <i>${f}</i>`).join('\n')}
`,
  )
  .join('\n')}
`
}

function getDaysLeftText(expires_at) {
  const now = new Date()
  const expires = new Date(expires_at)

  const diffMs = expires - now
  const daysLeft = Math.ceil(diffMs / (24 * 60 * 60 * 1000) /* 1 day */)

  if (daysLeft === 1) return 'Ertaga tugaydi'
  if (daysLeft === 2) return 'Indinga tugaydi'
  if (daysLeft <= 0) return 'Muddati tugagan'

  return `${daysLeft} kun qoldi`
}

function formatExpireDate(expires_at) {
  return new Date(expires_at).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function buildSubscriptionMessage(subscription) {
  const planDetails = SUBSCRIPTION_PLANS[subscription.plan]

  return `
<b>Sizning obunangiz:</b> <code>${planDetails.name}</code>

<b>Narxi:</b> <code>${formatPrice(planDetails.price)}</code>
<b>Tugash sanasi:</b> <code>${formatExpireDate(subscription.expires_at)}</code>
<b>Qolgan vaqt:</b> <code>${getDaysLeftText(subscription.expires_at)}</code>

Murojaat yoki oldindan to'lov uchun: @akbarswe_bot
`
}

module.exports = {
  buildPlansMessage,
  buildSubscriptionMessage,
}
