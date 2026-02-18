import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/project/:id',
      component: () => import("@/pages/project-board/ui/ProjectBoard.vue")
    }
  ],
})

export default router
