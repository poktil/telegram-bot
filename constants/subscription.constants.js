const SUBSCRIPTION_PLANS = {
  base: {
    name: 'base',
    price: 0,
    features: [
      `Haqoratli so'zlarni aniqlash va o'chirish`,
      `50 ta so'zgacha bo'lgan xabarlarni tekshirish`,
    ],
  },
  premium: {
    name: 'premium',
    price: 345900,
    features: [
      'Barcha Base reja xususiyatlari',
      `70 ta so'zgacha bo'lgan xabarlarni tekshirish`,
      'Media captionlarini ham tekshiradi (audio, foto, hujjatlar)',
    ],
  },
  ultimate: {
    name: 'ultimate',
    price: 411900,
    features: [
      'Barcha Premium reja xususiyatlari',
      `Checksiz so'zlar soni bilan xabarlarni tekshirish`,
      'Tahrirlangan xabarlar va captionlarni aniqlash',
      'Guruh monitoringi va statistika (tez orada)',
    ],
  },
}

module.exports = { SUBSCRIPTION_PLANS }
