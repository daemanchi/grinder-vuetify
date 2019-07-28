<template>
  <v-content>
    <v-container fluid grid-list-md px-2 style="height:100vh; overflow: scroll; padding-top: 54px;">
      <v-layout row wrap>

        <v-flex xs6 v-for="(brand, index) of brands" :key="index">
          <v-img :aspect-ratio="173/314"
                 :src="brand.image"
                 style="border-radius: 16px;"
                 @click="openBrandProfile(brand.id)"
          >
            <v-layout column align-center pt-5>
              <h3>{{ brand.name }}</h3>
              <span>@{{ brand.id }}</span>
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
        { name: '톤28', id: 'toun28', image: 'https://picsum.photos/id/230/500' },
        { name: '잇츠베러푸드', id: 'eatsbetter', image: 'https://picsum.photos/id/120/500' },
        { name: '타나크라프', id: 'tanacraft', image: 'https://picsum.photos/id/502/500' },
        { name: '알디프', id: 'Altdif', image: 'https://picsum.photos/id/80/500' },
        { name: '톤28', id: 'toun28', image: 'https://picsum.photos/id/23/500' },
        { name: '잇츠베러푸드', id: 'eatsbetter', image: 'https://picsum.photos/id/76/500' },
        { name: '타나크라프', id: 'tanacraft', image: 'https://picsum.photos/id/42/500' },
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

<style scoped>

</style>
