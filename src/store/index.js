import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import product from './modules/product'
import comment from './modules/comment';
import user from './modules/user';
import brand from './modules/brand';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  modules: {
    global, product, comment, user, brand
  },
});

export default store;
