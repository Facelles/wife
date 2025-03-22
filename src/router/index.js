import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import PointsView from '../views/PointsView.vue'
import MoodView from '../views/MoodView.vue'
import SleepView from '../views/SleepView.vue'
import TasksView from '../views/TasksView.vue'
import ChatView from '../views/ChatView.vue'
import StatsView from '../views/StatsView.vue'
import LoginView from '../views/LoginView.vue'
import GalleryView from '../views/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/points',
      name: 'points',
      component: PointsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/mood',
      name: 'mood',
      component: MoodView,
      meta: { requiresAuth: true }
    },
    {
      path: '/sleep',
      name: 'sleep',
      component: SleepView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: { requiresAuth: true }
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { requiresAuth: true }
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log('Router Guard:', {
    to: to.path,
    from: from.path,
    isAuthenticated: authStore.isAuthenticated,
    requiresAuth: to.meta.requiresAuth,
    user: authStore.user
  })
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Router Guard: Перенаправлення на логін - користувач не авторизований')
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    console.log('Router Guard: Перенаправлення на головну - користувач вже авторизований')
    next('/')
  } else {
    console.log('Router Guard: Дозволяємо перехід')
    next()
  }
})

export default router 