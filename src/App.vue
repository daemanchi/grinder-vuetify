<template>
  <v-app id="app">

    <AppBar v-if="$route.name === 'Home' && appBar"/>

    <router-view />

  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import AppBar from '@/components/AppBar';

  export default {
    name: 'App',
    components: { AppBar },
    computed: {
      ...mapGetters([ 'appBar' ]),
    },
    created () {
      // testuser 자동로그인
      this.selectUser('testuser').then(response => {
        console.log(response);
        this.setUser(response.rspBody);
        this.setAuth(true);
      }).catch(err => {
        console.error(err);
      });
    },
    methods: {
      ...mapActions('user', [ 'selectUser', 'setUser', 'setAuth' ]),
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: 'Noto Sans KR', sans-serif;
    background-color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    -webkit-overflow-scrolling: auto;
    background-color: black;
  }
  .theme--dark.v-application {
    background-color: black;
  }
</style>
