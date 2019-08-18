import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Ripple, Touch } from 'vuetify/lib/directives';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default
  },
  theme: {
    primary: '#000000',
  },
  directives: {
    Ripple,
    Touch
  },
});
