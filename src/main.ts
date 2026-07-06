import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { useAuthStore } from '@/stores/auth'
import { syncAll } from '@/utils/sync'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')

// 启动：恢复登录态 → 已登录则拉取云端最新数据
const auth = useAuthStore(pinia)
auth.init().then(() => {
  if (auth.isLoggedIn) syncAll()
})
