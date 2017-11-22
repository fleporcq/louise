import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Gallery from '@/components/Gallery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/gallery',
      name: 'gallery-all',
      component: Gallery
    },
    {
      path: '/gallery/:tag',
      name: 'gallery-search',
      component: Gallery
    }
  ]
})
