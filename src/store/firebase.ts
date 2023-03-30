import { acceptHMRUpdate, defineStore } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined
}
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_APIKEY,
  authDomain: import.meta.env.VITE_FB_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECTID,
  storageBucket: import.meta.env.VITE_FB_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FB_APPID,
  measurementid: import.meta.env.VITE_FB_MEASUREMENTID,
  vapidkey: import.meta.env.VITE_FB_VAPIDKEY,
}
export const useFirebaseStore = defineStore('firebase', () => {
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const auth = getAuth(app)
  const db = getFirestore(app)
  // DESCOMENTAR SI SE INTEGRA FLUJO DE EMULADOR LOCAL PARA DESARROLLO
  /*  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
     connectFirestoreEmulator(db, 'localhost', 8080)
     connectAuthEmulator(auth, 'http://localhost:9099')
     self.FIREBASE_APPCHECK_DEBUG_TOKEN = import.meta.env.VITE_FB_APP_CHECK_DEBUG_TOKEN
   } */
  // DESCOMENTAR SI SE IMPLEMENTA DEPLOY CON APP CHECK
  /*  const appCheck = initializeAppCheck(app, {
     provider: new ReCaptchaV3Provider(import.meta.env.VITE_FB_APP_CHECK_PUBLIC_KEY),
     isTokenAutoRefreshEnabled: true,
   }) */
  logEvent(analytics, 'notification_received')
  return {
    app,
    db,
    analytics,
    auth,
    // appCheck,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFirebaseStore, import.meta.hot))
