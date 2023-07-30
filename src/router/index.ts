import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { beforeEach, afterEach } from './config'

const files = require.context('./modules', true, /.ts$/)
const routes: Array<RouteRecordRaw> = files.keys().reduce((routes: Array<RouteRecordRaw>, key: string) => {
  if (key === './base.ts' || key === './index.ts') return routes.concat(files(key).default)
  const reg = /\.\/([^\s]+)\.ts$/
  const route = files(key).default.map((routeItem: RouteRecordRaw) => {
    if (!key.match(reg)) return []
    const prefix = key.match(reg)

    return {
      ...routeItem,
      path: `/${prefix && prefix[1]}${routeItem.path}`
    }
  })
  return route.concat(routes)
}, [])

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

console.log('router', routes)
router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router
