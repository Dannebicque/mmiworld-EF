import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/AboutView.vue'),
      name: 'about'
    },
    {
      path: '/pays',
      component: () => import('@/views/PaysView.vue'),
      name: 'pays'
    },
    {
      path: '/recherche',
      component: () => import('@/views/RechercheView.vue'),
      name: 'recherche'
    },
    {
      path: '/regions',
      component: () => import('@/views/RegionView.vue'),
      name: 'regions',
      children: [
        {
          path: '/fiche-region/:region',
          component: () => import('@/views/FicheRegionView.vue'),
          name: 'fiche-region'
        }
      ]
    },
    {
      path: '/fournisseurs',
      component: () => import('@/views/FournisseursView.vue'),
      name: 'fournisseurs'
    },
    {
      path: '/fiche-pays/:pays',
      component: () => import('@/views/FichePaysView.vue'),
      name: 'fiche-pays'
    }
  ]
})

export default router
