<template>
  <v-app-bar dense color="transparent" flat fixed>

    <v-btn icon small>
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-tabs v-model="selectedTab"
            background-color="transparent"
            hide-slider
            centered>
      <v-tab v-for="tab in tabs"
             :key="tab.value"
             :ripple="false"
             :href="`#${tab.value}`">
        {{ tab.text }}
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-btn icon to="/cart">
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AppBar',
    computed: {
      ...mapGetters([ 'tab', 'tabs' ]),
      selectedTab: {
        get () {
          return this.tab;
        },
        set (tab) {
          this.selectTab(tab);
        }
      },
    },
    methods: {
      ...mapActions([ 'selectTab' ]),
    }
  }
</script>

<style scoped>

</style>
