import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/points',
      name: 'points',
      component: () => import('../views/PointsView.vue')
    },
    {
      path: '/mood',
      name: 'mood',
      component: () => import('../views/MoodView.vue')
    },
    {
      path: '/sleep',
      name: 'sleep',
      component: () => import('../views/SleepView.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue')
    }
  ]
})

export default router 