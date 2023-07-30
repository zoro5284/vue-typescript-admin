import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useStore } from '@/store'
export async function beforeEach (to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {
  const store = useStore()
  const token = store.state.user.token
  if (token) {
    try {
      await store.dispatch('user/getUserInfo', token)
      if (to.path === '/login') {
        next('/')
      } else {
        next()
      }
    } catch (error) {
      await store.dispatch('user/loginOut')
      next(`/login?redirect=${to.path}`)
    }
  } else {
    if (!to.meta.noLogin) {
      next(`/login/?redirect=${to.path}`)
    } else {
      next()
    }
  }
}
export async function afterEach () {}
