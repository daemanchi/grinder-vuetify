import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';
import { Ripple, Touch } from 'vuetify/lib/directives';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.shades.white,
      },
    },
  },
  directives: {
    Ripple,
    Touch
  },
});
