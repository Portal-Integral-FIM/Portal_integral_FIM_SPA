import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'
/* Theme variables */
import './theme/variables.css' // TODO: IMPORTAR TODOS LOS CSS DE LA CARPETA CSS
const pinia = createPinia()
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

const app = createApp(App)
    .use(pinia)
    .use(router)

router.isReady().then(() => {
    app.mount('#app')
})
