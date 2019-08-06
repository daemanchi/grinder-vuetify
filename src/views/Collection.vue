<template>
  <v-content style="background-color: black;">
    <v-container fluid grid-list-md px-2
                 class="iphone-padding-top iphone-padding-bottom"
                 style="height:100vh; overflow: scroll;">
      <v-layout row wrap>

        <v-flex xs6 v-for="(brand, index) of brands" :key="index">
          <v-img :aspect-ratio="173/314"
                 :src="brand.image"
                 style="border-radius: 16px;"
                 @click="openBrandProfile(brand.id)">
            <v-layout column align-center pt-5>
              <div class="brand-name">{{ brand.name }}</div>
              <div class="brand-id">@{{ brand.id }}</div>
            </v-layout>
          </v-img>
        </v-flex>

      </v-layout>
    </v-container>
    </v-content>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Collection',
    data: () => ({
      brands: [
        { name: '알디프', id: 'Altdif', image: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' },
        { name: '톤28', id: 'toun28', image: require('@/assets/img/dummy-1.jpeg') },
        { name: '잇츠베러푸드', id: 'eatsbetter', image: require('@/assets/img/dummy-2.jpeg') },
        { name: '타나크라프트', id: 'tanacraft', image: require('@/assets/img/dummy-3.jpeg') },
        { name: '알디프', id: 'Altdif', image: require('@/assets/img/dummy-4.jpeg') },
        { name: '톤28', id: 'toun28', image: require('@/assets/img/dummy-5.jpeg') },
        { name: '잇츠베러푸드', id: 'eatsbetter', image: require('@/assets/img/dummy-6.jpeg') },
        { name: '타나크라프트', id: 'tanacraft', image: require('@/assets/img/dummy-1.jpeg') },
      ]
    }),
    methods: {
      ...mapActions([ 'setTransition' ]),
      openBrandProfile (id) {
        this.setTransition('profile-in-transition');
        this.$router.push({ name: 'Profile', params: { id: id } });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .iphone-padding-top {
    padding-top: 44px;
    padding-top: calc(44px + env(safe-area-inset-top));
    padding-top: calc(44px + constant(safe-area-inset-top));
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
