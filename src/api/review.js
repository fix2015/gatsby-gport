import { REVIEWS } from "@src/Constants"

export const createCollection = (db, review) => {
  delete review.documentId

  return db
    .collection(REVIEWS)
    .doc()
    .set({ ...review })
}

export const updateCollection = (db, { documentId, review }) => {
  delete review.documentId

  return db.collection(REVIEWS).doc(documentId).set(review)
}

export const deleteCollection = (db, documentId) => {
  return db.collection(REVIEWS).doc(documentId).delete()
}

export const getByDocumentId = (db, documentId) => {
  return db.collection(REVIEWS).where("documentId", "==", documentId)
}

export const getByPlaceId = (db, placeId) => {
  return db.collection(REVIEWS).where("placeId", "==", placeId)
}

export const loadFormatData = ref => {
  return new Promise((res, rej) => {
    ref
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          rej()
        }
        const collections = []
        snapshot.forEach(doc => {
          collections.push({
            ...doc.data(),
            documentId: doc.id,
          })
        })

        res(collections)
      })
      .catch(err => {
        rej()
      })
  })
}
