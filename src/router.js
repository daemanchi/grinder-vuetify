import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home';
import Cart from '@/views/Cart';
import Profile from '@/views/Profile';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/@:id',
      name: 'Profile',
      component: Profile,
    },
  ]
})
