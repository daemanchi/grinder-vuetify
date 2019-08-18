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
