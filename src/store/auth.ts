import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from 'firebase/auth'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { useFirebaseStore } from '~/store/firebase'
export const useAuthStore = defineStore('auth', () => {
  const firebaseStore = useFirebaseStore()
  /* const profileStore = useProfileStore() */
  const currentUser = ref<User | null>(firebaseStore.auth.currentUser)
  onAuthStateChanged(firebaseStore.auth, (user: User | null) => {
    currentUser.value = user
    if (user)
      localStorage.setItem('portal_integral_fim_logged_in', JSON.stringify(true))
    else
      localStorage.setItem('portal_integral_fim_logged_in', JSON.stringify(false))
  })

  function loginGoogle(): Promise<void> {
    return new Promise((resolve, reject) => {
      const provider = new GoogleAuthProvider()
      signInWithPopup(firebaseStore.auth, provider)
        .then(() => {
          resolve()
        }).catch((error) => {
          reject(error)
        })
    })
  }
  function signOut() {
    firebaseStore.auth.signOut()
  }
  return {
    currentUser,
    loginGoogle,
    signOut,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
