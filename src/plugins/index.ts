import { App } from 'vue'
import { isFunction } from '@/utils/is'
export function loadAllPlugins (app: App<Element>) {
  const files = require.context('./', true, /\.ts$/)
  files.keys().forEach(key => {
    if (key === './index.ts') return
    if (isFunction(files(key).default)) {
      files(key).default(app)
    }
  })
}
