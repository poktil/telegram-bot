const { firestore } = require('./firebase.init')

async function setToFirestore(colName, docName, data) {
  const dataRef = firestore.collection(colName).doc(docName)

  try {
    await dataRef.set(data, { merge: true })
    return { ok: true }
  } catch (err) {
    console.error('Error setting document:', err)
    return { ok: false, error: err }
  }
}

module.exports = { setToFirestore }
