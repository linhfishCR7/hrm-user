import firebase from 'firebase/app'
// import { getMessaging, getToken } from 'firebase/messaging'
// import { TOKEN } from 'src/constants/Config'



const firebaseConfig = {
  apiKey: 'AIzaSyC1KwPA9bLa89tsiFlmhLnc548bW-Yovfk',
  authDomain: 'fluttershare-1ab94.firebaseapp.com',
  projectId: 'fluttershare-1ab94',
  storageBucket: 'fluttershare-1ab94.appspot.com',
  messagingSenderId: '928337012028',
  appId: '1:928337012028:web:416ebcb578b699ee54ea39',
  measurementId: 'G-FVFJF6FM6F'
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}else {
  firebase.app() // if already initialized, use that one
}
export const vapidKey = 'BCL90hDFViJNkFwrHObVBRWv9a7WP98GFUOkpCKOz2qYW1fWYJZGvBTONVOUm8PrwvBcFGSSe9wItynQJoovc-I'
export default firebase

