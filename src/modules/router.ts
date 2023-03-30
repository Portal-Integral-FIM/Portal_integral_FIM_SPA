import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/auth/login']
  const authRequired = !publicPages.includes(to.path)
  const isLogin = localStorage.getItem('portal_integral_fim_logged_in') === 'true'
  if (authRequired && !isLogin)
    next('/auth/login')
  else
    next()
})

export default router
