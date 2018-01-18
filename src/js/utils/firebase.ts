import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBb6qwPOYcdhnh1_qIKTsLF_-I3a8anTU0",
  authDomain: "head-to-head-8efe2.firebaseapp.com",
  databaseURL: "https://head-to-head-8efe2.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;

// references to out children in our database
// export const headToHeadsRef = ref.child('headToHeads');
// export const playersRef = ref.child('players');
// export const gamesRef = ref.child('games');

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function off () {
  return ref.off()
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}