// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyB8702FDvKlvTmO-Z2a7dAx7Pyc9a-Rboo",
	authDomain: "evkproject-e83b9.firebaseapp.com",
	projectId: "evkproject-e83b9",
	storageBucket: "evkproject-e83b9.appspot.com",
	messagingSenderId: "613043693095",
	appId: "1:613043693095:web:ad9ef44098b26bb7159002",
	measurementId: "G-96LVC2PL5B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
