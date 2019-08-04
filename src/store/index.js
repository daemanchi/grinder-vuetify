import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import product from './modules/product'

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  modules: {
    global, product
  },
});

export default store;
