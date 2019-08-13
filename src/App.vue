<template>
  <v-app id="app">

    <AppBar v-if="$route.name === 'Home'"/>

<!--    <transition :name="transition">-->
      <router-view />
<!--    </transition>-->

  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppBar from '@/components/AppBar';

  export default {
    name: 'App',
    components: { AppBar },
    computed: {
      ...mapGetters([ 'transition' ]),
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

  .profile-in-transition {
    &-enter-to {
      transform: translateY(100vh);
    }
    &-enter-active, &-leave-active {
      transition: transform 1s ease-in-out;
    }
  }

  .profile-out-transition {
    &-leave-to {
      transform: translateY(100vh);
    }
    &-enter-active, &-leave-active {
      transition: transform 1s ease-in-out;
    }
  }
</style>
