importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyC1KwPA9bLa89tsiFlmhLnc548bW-Yovfk',
  authDomain: 'fluttershare-1ab94.firebaseapp.com',
  projectId: 'fluttershare-1ab94',
  storageBucket: 'fluttershare-1ab94.appspot.com',
  messagingSenderId: '928337012028',
  appId: '1:928337012028:web:416ebcb578b699ee54ea39',
  measurementId: 'G-FVFJF6FM6F'
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
