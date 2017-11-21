import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Galery from '@/components/Galery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/galery',
      name: 'Galery',
      component: Galery
    }
  ]
})
