<template>
  <v-app-bar height="44px" color="transparent" flat fixed class="iphone-padding">

    <v-btn icon small @click="$router.push({ name: 'UserProfile', params: { id: user.userId } })">
      <img src="@/assets/icons/icon-menu@3x.png" alt="menu"
           srcset="@/assets/icons/icon-menu.png,
                   @/assets/icons/icon-menu@2x.png 2x,
                   @/assets/icons/icon-menu@3x.png 3x" />
    </v-btn>

    <v-spacer></v-spacer>

    <v-tabs v-model="selectedTab"
            background-color="transparent"
            hide-slider
            centered>
      <v-tab v-for="tab in tabs"
             class="home-tab px-0"
             active-class="home-tab-active"
             :key="tab.value"
             :ripple="false"
             :href="`#${tab.value}`">
        {{ tab.text }}
      </v-tab>
    </v-tabs>

    <v-spacer></v-spacer>

    <v-btn icon small to="/cart">
      <img src="@/assets/icons/icon-cart@3x.png" alt="cart"
           srcset="@/assets/icons/icon-cart.png,
                   @/assets/icons/icon-cart@2x.png 2x,
                   @/assets/icons/icon-cart@3x.png 3x" />
    </v-btn>

  </v-app-bar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AppBar',
    computed: {
      ...mapGetters([ 'tab', 'tabs' ]),
      ...mapGetters('user', [ 'user' ]),
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

<style lang="scss" scoped>
  .iphone-padding {
    padding-top: env(safe-area-inset-top);
    padding-top: constant(safe-area-inset-top);
    &::v-deep .v-toolbar__content {
      padding: 10px 24px;
    }
  }
  .home-tab {
    color: white !important;
    font-size: 16px;
    font-weight: 500;
    min-width: 76px;
  }
  .home-tab-active {
    font-weight: 700;
    &:before {
      display: none;
    }
  }
</style>
