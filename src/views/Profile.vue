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
      <v-img class="fixed-background" :src="profile.cardImage" width="100vw" height="100vh">
        <v-card :style="{ width: user.userId === $route.params.id ? '100%' : undefined }"
                style="padding: 0 16px 22px 27px; background-color: transparent; position: absolute; bottom: 154px; box-shadow: none;">
          <v-avatar v-if="$route.name.includes('User')" size="60px" style="margin-bottom: 10px; box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);">
            <v-img :src="profile.profileImage" width="60px" height="60px"></v-img>
          </v-avatar>
          <div style="height: 36px; display: flex;" class="mb-2 align-center justify-space-between">
            <span style="font-size: 24px; font-weight: 700; color: white;">{{ $route.name.includes('User') ? '@' : '' }}{{ profile.name }}</span>
            <img src="@/assets/icons/icon-settings@3x.png" alt="settings" style="margin-right: 13px;" v-if="user.userId === $route.params.id"
                 srcset="@/assets/icons/icon-settings.png,
                         @/assets/icons/icon-settings@2x.png 2x,
                         @/assets/icons/icon-settings@3x.png 3x">
          </div>
          <div style="color: white; height: 20px; line-height: 20px; display: flex;" class="align-center">
            <span style="font-size: 14px; font-weight: 500; margin-right: 7px;">{{ profile.productLikesCount }}</span><span style="font-size: 12px; opacity: 0.65;">좋아요</span>
            <span style="font-size: 14px; font-weight: 500; margin: 0 7px 0 20px;">{{ profile.followerCount }}</span><span style="font-size: 12px; opacity: 0.65;">팔로워</span>
            <span v-if="$route.name.includes('User')" style="font-size: 14px; font-weight: 500; margin: 0 7px 0 20px;">{{ profile.followingCount }}</span>
            <span v-if="$route.name.includes('User')" style="font-size: 12px; opacity: 0.65;">팔로잉</span>
          </div>
          <div style="font-size: 10px; color: white; white-space: pre-wrap; margin-top: 14px;">
            <span v-for="(tag, index) of profile.tags" :key="index">#{{ tag }} </span>
            <p class="ma-0">{{ $route.name.includes('User') ? user.introduce : profile.introduce }}</p>
          </div>
          <div></div>
        </v-card>

        <v-card class="content-card">
          <template v-if="$route.name.includes('Brand')">
            <v-tabs v-model="tab" hide-slider background-color="black" centered>
              <v-tab v-for="tab in tabs"
                     :key="tab.value"
                     :ripple="false"
                     :href="`#${tab.value}`">
                <span style="font-size: 18px; font-weight: 700;">{{ profile[tab.value].length }}</span>
                <span style="font-size: 12px; font-weight: 500;">{{ tab.text }}</span>
              </v-tab>

              <v-tab-item value="products">

                <v-container fluid grid-list-md px-2 class="iphone-padding-bottom" style="background-color: black">
                  <v-layout row wrap>

                    <v-flex xs6 v-for="(product, index) of profile.products" :key="index">
                      <v-img :aspect-ratio="173/314"
                             :src="product.image"
                             style="border-radius: 16px;">
                      </v-img>
                    </v-flex>

                  </v-layout>
                </v-container>

              </v-tab-item>

              <v-tab-item value="reviews">

                <v-container fluid grid-list-md px-2 class="iphone-padding-bottom" style="background-color: black">
                  <v-layout row wrap>

                    <v-flex xs6 v-for="(review, index) of profile.reviews" :key="index">
                      <v-img :aspect-ratio="173/314"
                             :src="review.image"
                             style="border-radius: 16px;">
                      </v-img>
                    </v-flex>

                  </v-layout>
                </v-container>

              </v-tab-item>

            </v-tabs>
          </template>

          <template v-else>
            <v-tabs v-model="userTab" hide-slider background-color="black" centered>
              <v-tab v-for="tab in userTabs"
                     :key="tab.value"
                     :ripple="false"
                     :href="`#${tab.value}`">
                <span>{{ tab.text }}</span>
              </v-tab>

              <v-tab-item value="wishes">

                <v-container fluid grid-list-md px-2 class="iphone-padding-bottom" style="background-color: black">
                  <v-layout row wrap>

                    <v-flex xs6 v-for="(product, index) of profile.wishes" :key="index">
                      <v-img :aspect-ratio="173/314"
                             :src="product.image"
                             style="border-radius: 16px;">
                      </v-img>
                    </v-flex>

                  </v-layout>
                </v-container>

              </v-tab-item>

              <v-tab-item value="purchases">

                <v-container fluid grid-list-md px-2 class="iphone-padding-bottom" style="background-color: black">
                  <v-layout row wrap>

                    <v-flex xs6 v-for="(review, index) of profile.purchases" :key="index">
                      <v-img :aspect-ratio="173/314"
                             :src="review.image"
                             style="border-radius: 16px;">
                      </v-img>
                    </v-flex>

                  </v-layout>
                </v-container>

              </v-tab-item>

              <v-tab-item value="reviews">

                <v-container fluid grid-list-md px-2 class="iphone-padding-bottom" style="background-color: black">
                  <v-layout row wrap>

                    <v-flex xs6 v-for="(review, index) of profile.reviews" :key="index">
                      <v-img :aspect-ratio="173/314"
                             :src="review.image"
                             style="border-radius: 16px;">
                      </v-img>
                    </v-flex>

                  </v-layout>
                </v-container>

              </v-tab-item>

            </v-tabs>
          </template>
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
      ...mapGetters('brand', [ 'brands' ]),
    },
    data: () => ({
      profile: {
        name: '',
        profileImage: '',
        cardImage: '',
        introduce: '',
        follow: false,
        productLikesCount: 0,
        followerCount: 0,
        followingCount: 0,
        tags: [],
        products: [],
        reviews: [],
        wishes: [],
        purchases: [],
      },
      tab: 'products',
      userTab: 'wishes',
      tabs: [
        { value: 'products', text: '상품' },
        { value: 'reviews', text: '리뷰' },
      ],
      userTabs: [
        { value: 'wishes', text: '찜목록' },
        { value: 'purchases', text: '구매했어요' },
        { value: 'reviews', text: '내 리뷰' },
      ],
    }),
    created () {
      if (this.$route.name.includes('User')) {
        Object.assign(this.profile, this.user);
      } else {
        let brand = this.brands.find(el => {
          return el.brandId === this.$route.params.id;
        });
        Object.assign(this.profile, brand);
      }
    },
    methods: {
      ...mapActions('user', [ 'selectUser' ]),
    }
  }
</script>

<style lang="scss" scoped>
  .v-tabs::v-deep {
    .v-tabs-bar {
      height: auto;
      padding-top: 18px;
      padding-bottom: 27px;
    }
  }
  .v-tab::v-deep {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: white !important;
    background-color: black;

    &:before {
      background-color: black;
    }
  }

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
