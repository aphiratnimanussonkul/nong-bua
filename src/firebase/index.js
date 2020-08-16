import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCkfngmSZmECs0KpUJxOXUG4N9yivT5J2U",
  authDomain: "nong-bua.firebaseapp.com",
  databaseURL: "https://nong-bua.firebaseio.com",
  projectId: "nong-bua",
  storageBucket: "nong-bua.appspot.com",
  messagingSenderId: "775046125379",
  appId: "1:775046125379:web:166f9e144211d6f51041f6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();
const storage = firebase.storage();

export default {
  firestore,
  storage,
};
