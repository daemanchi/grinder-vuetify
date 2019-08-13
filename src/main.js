import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';

axios.defaults.baseURL = 'http://seasoning-api.ap-northeast-2.elasticbeanstalk.com/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

Vue.prototype.$YT = YT || window.YT;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
