import firebase from "firebase/app";
// import serviceAccount from "./nong-bua-firebase.json";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyCkfngmSZmECs0KpUJxOXUG4N9yivT5J2U",
  // authDomain: "sutplan01.firebaseapp.com",
  databaseURL: "https://nong-bua.firebaseio.com",
  projectId: "nong-bua",
  // storageBucket: "",
  // messagingSenderId: "294848106873",
  appId: "1:775046125379:web:166f9e144211d6f51041f6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export default {
  firestore,
};
