import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import { loadAllPlugins } from './plugins'
import { loadAllIcons } from './assets/icons'
import '@/styles/index.scss'

import { mockXHR } from './mock'
mockXHR()

const app = createApp(App)
loadAllPlugins(app)
loadAllIcons(app)

app.use(store, key).use(router).mount('#app')
