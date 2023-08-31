// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPW_QOSrZV4amUo5OEtmTZSssuTeXvEjs",
  authDomain: "crudtask-app.firebaseapp.com",
  projectId: "crudtask-app",
  storageBucket: "crudtask-app.appspot.com",
  messagingSenderId: "296050718099",
  appId: "1:296050718099:web:76c58efb2d0a17559ba466",
  measurementId: "G-3FH5XHTQHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);