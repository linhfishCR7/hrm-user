import axios from 'src/utils/axios'
import { messaging } from 'src/utils/firebase-setup'
import { vapidKey } from 'src/utils/firebase'

const getTokenFCM = (setTokenFound, user) => {
  if (messaging.isSupported()) {
    messaging()
      .getToken({
        vapidKey: vapidKey
      })
      .then(token => {
        if (token) {
            console.log('token')
            console.log(token)
          setTokenFound(true)
          const data = { token: token, device: '', meid: '', user: user }
          axios
            .post('/auth/me/fcm-device/', data, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
              withCredentials: true
            })
            .then(res => {console.log(res.data)})
            .catch(function (error) {})
        } else {
          setTokenFound(false)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export default getTokenFCM
