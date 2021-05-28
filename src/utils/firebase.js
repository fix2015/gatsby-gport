import firebase from "firebase/app"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyDAPWIbiOnOQ7zXdN3ElLIPSZYdj3f2jIU",
  authDomain: "gport-c1f90.firebaseapp.com",
  projectId: "gport-c1f90",
  storageBucket: "gport-c1f90.appspot.com",
  messagingSenderId: "116451773110",
  appId: "1:116451773110:web:1543812a8b6f2bf6d43417",
  measurementId: "G-EB9NM5R270"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const firestore = firebase.firestore()

export { firestore }
