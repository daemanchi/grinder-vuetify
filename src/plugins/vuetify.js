import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Ripple, Touch } from 'vuetify/lib/directives';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    primary: '#000000',
  },
  directives: {
    Ripple,
    Touch
  },
});
