<template>
  <v-app>

    <AppBar v-if="$route.name === 'Home'"/>

    <transition :name="transition">
      <router-view />
    </transition>

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
    data: () => ({
      //
    }),
  };
</script>

<style lang="scss">
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
