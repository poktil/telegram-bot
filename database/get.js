const { firestore } = require('./firebase.init')

async function getAllFromFirestore(colName) {
  try {
    const snapshot = await firestore.collection(colName).get()
    const data = []
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() })
    })

    return { ok: true, data }
  } catch (err) {
    console.error('Error getting documents:', err)
    return { ok: false, error: err }
  }
}

module.exports = { getAllFromFirestore }
