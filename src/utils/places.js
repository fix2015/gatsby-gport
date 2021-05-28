import { firestore } from "./firebase"

const getPlaces = async () => {
  const snapshot = await firestore.collection("places").get()
  snapshot.docs.forEach(doc => console.log(doc.data()))
}

export { getPlaces }
