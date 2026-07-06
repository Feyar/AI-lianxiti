import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
  { path: '/practice/:mode', name: 'practice', component: () => import('@/views/PracticeView.vue'), props: true },
  { path: '/result', name: 'result', component: () => import('@/views/ResultView.vue') },
  { path: '/wrong', name: 'wrong', component: () => import('@/views/WrongBookView.vue') },
  { path: '/stats', name: 'stats', component: () => import('@/views/StatsView.vue') },
  { path: '/browse', name: 'browse', component: () => import('@/views/BrowseView.vue') },
  { path: '/settings', name: 'settings', component: () => import('@/views/SettingsView.vue') },
  { path: '/flashcards', name: 'flashcards', component: () => import('@/views/FlashcardsView.vue') },
  { path: '/map', name: 'map', component: () => import('@/views/KnowledgeMapView.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
