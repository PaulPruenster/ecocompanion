// Standard router setup with manually defined routes
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Layout wrapper
import DefaultLayout from '@/layouts/default.vue'

// Route components (lazy-loaded)
const Home = () => import('@/pages/index.vue')
const About = () => import('@/pages/about.vue')
const Hardware = () => import('@/pages/hardware.vue')
const Settings = () => import('@/pages/settings.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'about', name: 'about', component: About },
      { path: 'hardware', name: 'hardware', component: Hardware },
      { path: 'settings', name: 'settings', component: Settings },
    ],
  },
  // 404 fallback (optional)
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
