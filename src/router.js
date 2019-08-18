import Vue from 'vue'
import Router from 'vue-router'
import store from './store';

import Start from '@/views/Account/Start';
import SignIn from '@/views/Account/SignIn';
import SignUpName from '@/views/Account/SignUpName';
import SignUpBirth from '@/views/Account/SignUpBirth';
import SignUpEmailAndPwd from '@/views/Account/SignUpEmailAndPwd';

import Home from '@/views/Home';
import Cart from '@/views/Cart';
import Profile from '@/views/Profile';
import Purchased from "@/views/Purchased";
import Reviews from "@/views/Reviews";

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start,
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'name',
          name: 'SignUpName',
          component: SignUpName,
        },
        {
          path: 'birth',
          name: 'SignUpBirth',
          component: SignUpBirth,
        },
        {
          path: 'email',
          name: 'SignUpEmailAndPwd',
          component: SignUpEmailAndPwd,
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        requiresAuth: true
      },
      component: Home
    },
    {
      path: '/reviews',
      name: 'Reviews',
      meta: {
        requiresAuth: true,
      },
      component: Reviews
    },
    {
      path: '/cart',
      name: 'Cart',
      meta: {
        requiresAuth: true
      },
      component: Cart,
    },
    {
      path: '/user/:id',
      name: 'UserProfile',
      meta: {
        requiresAuth: true
      },
      component: Profile,
    },
    {
      path: '/brand/:id',
      name: 'BrandProfile',
      meta: {
        requiresAuth: true,
      },
      component: Profile,
    },
    {
      path: '/purchased',
      name: 'Purchased',
      meta: {
        requiresAuth: true
      },
      component: Purchased,
    }
  ]
});

// 로그인 가드
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['user/auth']) {
      return next({
        name: 'Start',
        query: { redirect: to.fullPath },
      });
    } else {
      return next();
    }
  } else {
    return next();
  }
});

Vue.use(Router);

export default router;
