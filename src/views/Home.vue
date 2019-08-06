<template>
  <v-content>
    <v-container fluid fill-height pa-0>
      <v-tabs-items v-model="selectedTab"
                    class="fill-height"
                    style="width:100vw; height: 100vh; overflow: hidden;"
                    touchless>

        <v-tab-item value="tour">
          <Tour />
        </v-tab-item>

        <v-tab-item value="collection">
          <Collection />
        </v-tab-item>

      </v-tabs-items>
    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import Tour from '@/views/Tour';
  import Collection from '@/views/Collection';

  export default {
    name: 'Home',
    components: { Tour, Collection },
    computed: {
      ...mapGetters([ 'tab' ]),
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
  };
</script>

<style lang="scss" scoped>
  .theme--dark.v-tabs-items {
    background-color: black;
  }
</style>
