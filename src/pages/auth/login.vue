<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
const firebaseStore = useFirebaseStore()
const authStore = useAuthStore()
const router = useRouter()
const auth = firebaseStore.auth
const db = firebaseStore.db
const unsubscribe = onAuthStateChanged(auth, (user) => {
  console.log('Login Button clicked: listening to auth state changed.')
  if (user != null) {
    // signed in
    localStorage.removeItem('toorFlag')
    console.log(`User: ${user.displayName}`)
    if (isUabc(user.email)) {
      const authRef = doc(db, 'auth', 'qVP5a8b4xdizVMEIXLma')
      getDoc(authRef).then((authDoc) => {
        if (authDoc.exists) {
          console.log('auth doc.exists')
          const toorRef = doc(db, 'auth', 'VNr0MNh0CFRHxjFP0UUb')
          getDoc(toorRef)
            .then((toorDoc) => {
              if (toorDoc.exists) {
                console.log('toorFlag doc.exists')
                localStorage.setItem('userEmail', user.email)
                localStorage.setItem('toorFlag', toorDoc.data().toorAccess)
              }
              else {
                localStorage.removeItem('toorFlag')
              }
            })
            .catch((error) => {
              console.log('Error getting toor document:', error)
            })
            .finally(() => {
              alert(
                `Bienvenido ${user.displayName} \n${authDoc.data().name}`,
              )
              router.push('/enlaces') // IMPORTANTE SE CAMBIO EL API PARA UTLIZAR EL ENRUTADOR DE LA SINGLE PAGE APPLICATION
            })
        }
      }).catch((error) => {
        console.log('Error getting auth document:', error)
        authStore.signOut().then(() => {
          // user.delete();
        })
        alert(
          'Lo sentimos este sitio tiene una lista de usuarios permitidos. \nSí requiere acceso por favor contactenos haciendo click en la parte inferior de la página.',
        )
      })
    }
    else {
      authStore.signOut().then(() => {
        user.delete()
      })
      alert('Porfavor utilice su correo institucional')
    }
  }
  else {
    // try forced sign out
    try {
      authStore.signOut()
    }
    catch (error) {
      console.log('Error trying to force Sign Out')
    }
    // not signed in you will always end up here after click login button
    console.log(`User not foud. User: ${user}\nRequire Login.`)
  }
})
function login() {
  if (!auth.currentUser) {
    authStore.loginGoogle()
  }
  else {
    try {
      authStore.signOut().then(() => {
        authStore.loginGoogle()
      })
    }
    catch (e) {
      console.log('Login btn click error trying to force signOut.')
    }
  }
}

function isUabc(email) {
  return /^[\w_\.]*?@uabc\.edu\.mx$/.test(email)
}
</script>

<template>
  <img id="img-background" class="portada " src="/assets/img/background.png" alt="Background ">

  <div id="div-body">
    <div id="div-aux-body" class="div-aux-body ">
      <h1>Bienvenidos al portal integral de la Facultad de Ingeniería Mexicali.</h1>
      <button @click="login()" class="div-button">
        Iniciar Sesión
        <img class="img-google" src="/assets/img/google.png" alt="">
      </button>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.header {
  background-color: white;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.671);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  z-index: 3;
}

.photoUser {
  width: 40px;
  height: 40px;
  margin-right: 2rem;
  border-radius: 50%;
  background-color: #f1a631;
}

.hamburger {
  display: none;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #101010;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.nav-item {
  margin-left: 5rem;
}

.nav-logo {
  font-size: 1.8rem;
  font-weight: 400;
  color: white;
}

.nav-logo :hover {
  background-color: #f1a631;
}

.nav-enlaces {
  font-size: 1.6rem;
  font-weight: 400;
  color: white;
}

.contacto:hover {
  color: #f1a631;
}

.contacto {
  font-size: 1.6rem;
  font-weight: 400;
  color: white;
}

.nav-enlaces:hover {
  color: #f1a631;
}

.nav-logo img {
  width: 20rem;
  display: flex;
  align-items: center;
}

.portada {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 100%;
  height: 100vh;
  filter: brightness(0.8);
  object-fit: cover;
}

.div-aux-body {
  position: absolute;
  z-index: 10;
  top: 50px;
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin: 5rem;
  width: 700px;
  font-size: xxx-large;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-stretch: ultra-condensed;
  color: whitesmoke;
  text-align: center;
  text-shadow: 5px 5px 10px rgb(46, 46, 46);
}

.div-button {
  background-color: #007141;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.623);
  width: 380px;
  padding: 2rem;
  padding-left: 5rem;
  padding-right: 5rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-content: center;
}

button {
  border: none;
  color: whitesmoke;
  background-color: transparent;
  font-size: large;
}

.div-button:hover {
  background-color: #f1a631;
  box-shadow: 0 0 10px rgba(197, 211, 0, 0.623);
}

.img-google {
  margin-left: 1rem;
  width: 30px;
  height: 30px;
}

.nextPage {
  margin: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f1a631;
  box-shadow: 0 0 10px rgba(95, 78, 0, 0.911);
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow {
  margin: 0px;
  width: 40px;
  height: 40px;
}

.nextPage :hover {
  background-color: #007141;
  box-shadow: 0 0 10px rgba(1, 77, 5, 0.911);
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.arrow :hover {
  width: 10px;
  height: 10px;
}

.uabclogo {
  background-color: whi;
}

footer {
  position: absolute;
  z-index: 20;
  top: 100vh;
  width: 100%;
  height: 80px;
  padding: 3rem;
  background-color: #007141;
}

footer a {
  font-size: 16px;
  height: 30px;
  color: #f1a631;
  text-decoration: none;
}

footer a:hover {
  color: #f1a631;
}

footer img {
  padding-right: 10px;
  height: 30px;
}
</style>
