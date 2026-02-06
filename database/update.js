const { firestore } = require('./firebase.init')

async function updateOnFirestore(colName, docName, newData) {
  try {
    const cityRef = firestore.collection(colName).doc(docName)
    await cityRef.update(newData)

    return { ok: true }
  } catch (err) {
    console.error('Error updating document:', err)
    return { ok: false, error: err }
  }
}

module.exports = { updateOnFirestore }
