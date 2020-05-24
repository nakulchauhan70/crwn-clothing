import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDapm4V3Td-5qfhGXO5qgaJo8I5QyYjJ74",
    authDomain: "crwn-db-fc5af.firebaseapp.com",
    databaseURL: "https://crwn-db-fc5af.firebaseio.com",
    projectId: "crwn-db-fc5af",
    storageBucket: "crwn-db-fc5af.appspot.com",
    messagingSenderId: "231649803996",
    appId: "1:231649803996:web:00de5e2857fe298a5f3e19",
    measurementId: "G-6DSRCZDKJE"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
