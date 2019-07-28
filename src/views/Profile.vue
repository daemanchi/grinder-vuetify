<template>
  <v-content>
    <v-toolbar dense flat absolute color="transparent">
      <v-btn icon small @click="close">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn icon small>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon small @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid fill-height pa-0>
      <v-img class="fixed-background" :src="BackgroundImage" width="100vw" height="100vh">
        <v-card class="pl-4 pr-3 pb-4"
                style="background-color: transparent; position: absolute; bottom: 154px; box-shadow: none;">
          <v-avatar size="60px">
            <v-img :src="profileImage" width="60px" height="60px"></v-img>
          </v-avatar>
          <h3>{{ name }}</h3>
          <div>
            <span>{{ likeCount }} 좋아요</span>
            <span>{{ followerCount }} 팔로워</span>
            <span>{{ followingCount }} 팔로잉</span>
          </div>
          <div style="font-size: 10px; white-space: pre-wrap">
            <span v-for="(tag, index) of tags" :key="index">#{{ tag }} </span>
            <p>{{ summary }}</p>
          </div>
          <div></div>
        </v-card>

        <v-card class="content-card">
          <v-tabs v-model="tab" hide-slider background-color="black" centered>
            <v-tab v-for="tab in tabs"
                   :key="tab.value"
                   :ripple="false"
                   :href="`#${tab.value}`">
              {{ tab.count }}
              {{ tab.text }}
            </v-tab>

            <v-tab-item value="products">

              <v-container fluid grid-list-md px-2 style="background-color: black">
                <v-layout row wrap>

                  <v-flex xs6 v-for="(product, index) of products" :key="index">
                    <v-img :aspect-ratio="173/314"
                           :src="product.image"
                           style="border-radius: 16px;">
                      <v-layout column align-center pt-5>
                        <h3>{{ product.name }}</h3>
                        <span>@{{ product.id }}</span>
                      </v-layout>
                    </v-img>
                  </v-flex>

                </v-layout>
              </v-container>

            </v-tab-item>

            <v-tab-item value="reviews">

              <v-container fluid grid-list-md px-2 style="background-color: black">
                <v-layout row wrap>

                  <v-flex xs6 v-for="(review, index) of reviews" :key="index">
                    <v-img :aspect-ratio="173/314"
                           :src="review.image"
                           style="border-radius: 16px;">
                      <v-layout column align-center pt-5>
                        <h3>{{ review.name }}</h3>
                        <span>@{{ review.id }}</span>
                      </v-layout>
                    </v-img>
                  </v-flex>

                </v-layout>
              </v-container>

            </v-tab-item>

          </v-tabs>
        </v-card>

      </v-img>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Profile',
    props: [ 'id' ],
    data: () => ({
      name: '알디프',
      BackgroundImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg',
      profileImage: 'https://picsum.photos/id/82/100',
      likeCount: 13250,
      followerCount: 2473,
      followingCount: 192,
      tags: [ '크루얼티프리', '비건', '친환경용기' ],
      summary: '티소믈리에가 만든 황홀한 티와\n차 향이 나는 드레스퍼퓸을 만나볼 수 있습니다.',
      tab: 'products',
      tabs: [
        { value: 'products', text: '상품', count: 23 },
        { value: 'reviews', text: '리뷰', count: 1728 },
      ],
      userTabs: [
        { value: 'wishes', text: '찜목록' },
        { value: 'purchases', text: '구매했어요' },
        { value: 'reviews', text: '내 리뷰' },
      ],
      products: [
        { name: '알디프', id: 'Altdif', image: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' },
        { name: '톤28', id: 'toun28', image: 'https://picsum.photos/id/230/500' },
        { name: '잇츠베러푸드', id: 'eatsbetter', image: 'https://picsum.photos/id/120/500' },
        { name: '타나크라프', id: 'tanacraft', image: 'https://picsum.photos/id/502/500' },
        { name: '알디프', id: 'Altdif', image: 'https://picsum.photos/id/80/500' },
        { name: '톤28', id: 'toun28', image: 'https://picsum.photos/id/23/500' },
        { name: '잇츠베러푸드', id: 'eatsbetter', image: 'https://picsum.photos/id/76/500' },
        { name: '타나크라프', id: 'tanacraft', image: 'https://picsum.photos/id/42/500' },
      ],
      reviews: [
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
      close () {
        this.setTransition('profile-out-transition').then(() => {
          this.$router.go(-1);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-card {
    background-color: black !important;
    color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    width: 100%;
    min-height: 154px;

    position: absolute;
    top: calc(100vh - 154px);
    box-shadow: none;
  }

  .fixed-background::v-deep {
    overflow-y: scroll;
    & > .v-image__image {
      position: fixed;
      z-index: 0;
    }
    & > .v-responsive__content {

    }
  }
</style>
