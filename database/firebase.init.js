const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_INIT)),
})

const firestore = admin.firestore()

module.exports = { firestore }
