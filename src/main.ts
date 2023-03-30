import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '~/modules/router'
import '~/theme/tailwind.scss'
import '~/theme/cip.css'
import '~/theme/enlaces.css'
import '~/theme/style.css'
import '~/theme/the-datepicker.css'
import '~/theme/variables.css'

/* Theme variables */
const pinia = createPinia()

const app = createApp(App)
  .use(pinia)
  .use(router)

router.isReady().then(() => {
  app.mount('#app')
})
