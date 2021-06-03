// import { auth } from '@utils/firebase'
// import {createUser} from '@api/user'

export const signUp = async ({ email, password }) => {
  console.log(email, password)
  try {
    debugger
    // const auth = firebase.auth()
    // const userCredential = await auth.createUserWithEmailAndPassword(email, password)

    // createUser((user) => ({
    //   email: userCredential.user.email,
    //   auth: true,
    // }))

    // return userCredential.user
  } catch (e) {
    const { code, message } = e

    return { code, message }
  }
}

const login = async ({ email, password }) => {
  // auth.createUserWithEmailAndPassword(email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     var user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ..
  //   });
  // const snapshot = await firestore.collection("places").get()
  // snapshot.docs.forEach(doc => console.log(doc.data()))

  // setUser((user) => ({
  //   email: email,
  //   auth: true,
  // }))
}

// const logout = () => {
//   setUser((user) => ({
//     name: '',
//     auth: false,
//   }))
// }


