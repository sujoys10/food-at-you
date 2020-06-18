import * as firebase  from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyABGB_sM9IJLqWQvWtcwfAKZsxLyr3_lEw",
    authDomain: "food-at-you.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "food-at-you",
    storageBucket: "food-at-you.appspot.com",
    /* messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id", */
}

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { firebase, storage };
