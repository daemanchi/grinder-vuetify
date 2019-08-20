<template>
  <v-content style="background-color: black;">
    <v-container fluid grid-list-md px-2
                 class="iphone-padding-top iphone-padding-bottom"
                 style="height:100vh; overflow: scroll;">
      <v-layout row wrap>

        <v-flex xs6 v-for="(brand, index) of brands" :key="index">
          <v-img :aspect-ratio="173/314"
                 :src="brand.cardImage"
                 style="border-radius: 16px;"
                 @click="openBrandProfile(brand.id)">
            <v-layout column align-center pt-5>
              <div class="brand-name">{{ brand.name }}</div>
              <div class="brand-id">@{{ brand.brandId }}</div>
            </v-layout>
          </v-img>
        </v-flex>

      </v-layout>
    </v-container>
    </v-content>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Collection',
    computed: {
      ...mapGetters('brand', [ 'brands' ])
    },
    methods: {
      openBrandProfile (id) {
        this.$router.push({ name: 'BrandProfile', params: { id: id } });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .iphone-padding-top {
    padding-top: 74px;
    padding-top: calc(74px + env(safe-area-inset-top));
    padding-top: calc(74px + constant(safe-area-inset-top));
  }

  .iphone-padding-bottom {
    padding-bottom: env(safe-area-inset-bottom);
    padding-bottom: constant(safe-area-inset-bottom);
  }

  .brand-name {
    font-size: 16px;
    font-weight: 700;
    line-height: 17px;
    color: white;
  }
  .brand-id {
    font-size: 10px;
    font-weight: 500;
    line-height: 17px;
    color: white;
  }
</style>
