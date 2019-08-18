<template>
  <v-content>
    <v-toolbar dense flat absolute color="transparent" class="iphone-padding">
      <v-btn v-if="$route.name.includes('Brand')" icon small @click="$router.go(-1)">
        <img src="@/assets/icons/icon-arrow-down@3x.png" alt="close"
             srcset="@/assets/icons/icon-arrow-down.png,
                     @/assets/icons/icon-arrow-down@2x.png 2x,
                     @/assets/icons/icon-arrow-down@3x.png 3x">
      </v-btn>
      <v-btn v-if="user.userId === $route.params.id" icon small>
        <img src="@/assets/icons/icon-bell@3x.png" alt="alarm"
             srcset="@/assets/icons/icon-bell.png,
                     @/assets/icons/icon-bell@2x.png 2x,
                     @/assets/icons/icon-bell@3x.png 3x">
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="$route.name.includes('User')" icon small @click="$router.go(-1)">
        <img src="@/assets/icons/icon-cancel-white@3x.png" alt="close"
             srcset="@/assets/icons/icon-cancel-white.png,
                     @/assets/icons/icon-cancel-white@2x.png 2x,
                     @/assets/icons/icon-cancel-white@3x.png 3x">
      </v-btn>
    </v-toolbar>

    <v-container fluid fill-height pa-0>
      <v-img class="fixed-background" :src="BackgroundImage" width="100vw" height="100vh">
        <v-card :style="{ width: user.userId === $route.params.id ? '100%' : undefined }"
                style="padding: 0 16px 22px 27px; background-color: transparent; position: absolute; bottom: 154px; box-shadow: none;">
          <v-avatar v-if="$route.name.includes('User')" size="60px" style="margin-bottom: 10px; box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);">
            <v-img :src="profileImage" width="60px" height="60px"></v-img>
          </v-avatar>
          <div style="height: 36px; display: flex;" class="mb-2 align-center justify-space-between">
            <span style="font-size: 24px; font-weight: 700; color: white;">{{ $route.name.includes('User') ? '@' : '' }}{{ name }}</span>
            <img src="" alt="setting" style="margin-right: 13px;" v-if="user.userId === $route.params.id"
                 srcset="">
          </div>
          <div style="color: white; height: 20px; line-height: 20px; display: flex;" class="align-center">
            <span style="font-size: 14px; font-weight: 500; margin-right: 7px;">{{ productLikesCount }}</span><span style="font-size: 12px; opacity: 0.65;">좋아요</span>
            <span style="font-size: 14px; font-weight: 500; margin: 0 7px 0 20px;">{{ followerCount }}</span><span style="font-size: 12px; opacity: 0.65;">팔로워</span>
            <span v-if="$route.name.includes('User')" style="font-size: 14px; font-weight: 500; margin: 0 7px 0 20px;">{{ followingCount }}</span>
            <span v-if="$route.name.includes('User')" style="font-size: 12px; opacity: 0.65;">팔로잉</span>
          </div>
          <div style="font-size: 10px; color: white; white-space: pre-wrap; margin-top: 14px;">
            <span v-for="(tag, index) of tags" :key="index">#{{ tag }} </span>
            <p class="ma-0">{{ $route.name.includes('User') ? user.introduce : introduce }}</p>
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

              <v-container fluid grid-list-md px-2 class="iphone-padding-bottom" style="background-color: black">
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

              <v-container fluid grid-list-md px-2 class="iphone-padding-bottom" style="background-color: black">
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
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Profile',
    props: [ 'id' ],
    computed: {
      ...mapGetters('user', [ 'user' ]),
    },
    data: () => ({
      name: '알디프',
      BackgroundImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg',
      profileImage: 'https://picsum.photos/id/82/100',
      productLikesCount: 0,
      followerCount: 0,
      followingCount: 0,
      tags: [ '크루얼티프리', '비건', '친환경용기' ],
      introduce: '티소믈리에가 만든 황홀한 티와\n차 향이 나는 드레스퍼퓸을 만나볼 수 있습니다.',
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
    created () {
      if (this.$route.name.includes('User')) {
        this.selectUser(this.$route.params.id).then(response => {
          console.log(response);
          this.name = JSON.parse(response.rspBody.userInfo.payload).name;
          this.followerCount = response.rspBody.followerCount;
          this.followingCount = response.rspBody.followingCount;
          this.productLikesCount = response.rspBody.productLikesCount;
        });
      } else {
        this.selectBrand(this.$route.params.id).then(response => {
          console.log(response);
        });
      }
    },
    methods: {
      ...mapActions('user', [ 'selectUser' ]),
      ...mapActions('brand', [ 'selectBrand' ]),
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
  .iphone-padding-top {
    padding-top: env(safe-area-inset-top) !important;
    padding-top: constant(safe-area-inset-top) !important;
  }

  .iphone-padding-bottom {
    padding-bottom: env(safe-area-inset-bottom) !important;
    padding-bottom: constant(safe-area-inset-bottom) !important;
  }

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
