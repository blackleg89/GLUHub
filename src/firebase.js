import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyDN86Y3l0lF_m6281bW_N5KyheQp-lIPiE",
    authDomain: "gluhub.firebaseapp.com",
    databaseURL: "https://gluhub.firebaseio.com",
    projectId: "gluhub",
    storageBucket: "gluhub.appspot.com",
    messagingSenderId: "262128277617",
    appId: "1:262128277617:web:aa22d0f8a737cdf8e3a3d0",
    measurementId: "G-9X5PQN0JP9"
};
firebase.initializeApp(firebaseConfig);
export default firebase