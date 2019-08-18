<template>
  <v-content>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>

    <v-toolbar dense flat absolute color="transparent" class="iphone-padding" style="z-index: 2;">
      <v-btn icon small @click="$router.go(-1)">
        <img src="@/assets/icons/icon-arrow-left@3x.png" alt="close"
             srcset="@/assets/icons/icon-arrow-left.png,
                     @/assets/icons/icon-arrow-left@2x.png 2x,
                     @/assets/icons/icon-arrow-left@3x.png 3x">
      </v-btn>
    </v-toolbar>

    <div class="swiper-container-h">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(review, index) of reviews" :key="index">
          <v-container fluid pa-0 style="height: 100vh; background-color: black;">
            <v-img :src="review.reviewImage" class="fill-height">

              <transition name="slide-y-transition">
                <div class="review-text-holder">
                  <v-layout row align-center mx-0 mt-0 pa-0 style="margin-bottom: 15px;">
                    <v-avatar size="30px"
                              style="border: 2px solid white; box-shadow: 0 8px 13px 0 rgba(0,0,0,0.25)">
                      <v-img style="width: 28px; height: 28px;" :src="review.user.profileImage" aspect-ratio="1"></v-img>
                    </v-avatar>
                    <div style="margin-left: 13px; font-size: 14px; font-weight: 500;">{{ review.user.name }}</div>
                    <div style="margin-left: 20px; display: flex; align-items: center;">
                      <img src="@/assets/icons/icon-star-active@3x.png" alt="O" v-for="n of review.rate" :key="n"
                           style="width: 17px; height: auto;"
                           srcset="@/assets/icons/icon-star-active.png,
                           @/assets/icons/icon-star-active@2x.png 2x,
                           @/assets/icons/icon-star-active@3x.png 3x">
                      <img src="@/assets/icons/icon-star-inactive@3x.png" alt="O" v-for="n of (5 - review.rate)" :key="review.rate + n"
                           style="width: 17px; height: auto;"
                           srcset="@/assets/icons/icon-star-inactive.png,
                           @/assets/icons/icon-star-inactive@2x.png 2x,
                           @/assets/icons/icon-star-inactive@3x.png 3x">
                    </div>
                  </v-layout>
                  <div style="white-space: pre-wrap; font-size: 14px; font-weight: 500;">
                    <p class="mb-0">{{ review.reviewText }}</p>
                  </div>
                </div>
              </transition>

              <transition name="slide-y-reverse-transition">
                <v-footer absolute v-if="isOpenComments" class="pa-0 comments-holder" color="white">
                  <v-layout column>
                    <div @click="isOpenComments = false">
                      <div style="margin: 13px auto; width: 50px; height: 3px; background-color: rgba(0,0,0,0.1);"></div>
                    </div>
                    <v-sheet class="scroll-wrapper" color="white" tile style="max-height: 70vh; overflow-y: scroll; overflow-x: hidden;">
                      <v-layout v-for="(comment, index2) of review.comments" :key="index2"
                                row align-start justify-space-between class="ma-0"
                                style="padding: 10px 15px 20px 16px;">
                        <v-avatar size="31px"
                                  style="border: 1px solid rgb(151,151,151);">
                          <v-img :src="comment.user.profileImage" aspect-ratio="1"></v-img>
                        </v-avatar>
                        <v-flex style="max-width: calc(100vw - 101px)">
                          <div style="font-size: 12px; font-weight: 700;">{{ comment.user.name }}</div>
                          <div style="font-size: 12px; font-weight: 500;">{{ comment.comment }}</div>
                        </v-flex>
                        <v-btn icon width="20px" height="20px">
                          like
                        </v-btn>
                      </v-layout>
                    </v-sheet>

                    <v-text-field solo flat placeholder="나의 첫 댓글은?"
                                  ref="commentInput"
                                  height="38px" hide-details
                                  @keydown.enter="createComment"
                                  v-model="commentInput">
                    </v-text-field>
                  </v-layout>
                </v-footer>
              </transition>

              <ReviewActionsHolder :likeStatus="review.like"
                                   :isOpenComments="isOpenComments"
                                   @like="review.like = !review.like"
                                   @share:toggle="isOpenShare = !isOpenShare"
                                   @comment:toggle="isOpenComments = !isOpenComments" />
            </v-img>
          </v-container>
        </div>
      </div>
    </div>
  </v-content>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css';

  import ReviewActionsHolder from '@/components/ReviewActionsHolder';

  export default {
    name: 'Reviews',
    components: { ReviewActionsHolder },
    data () {
      return {
        isOpenShare: false,
        isOpenComments: false,
        commentInput: '',
        reviews: [
          {
            user: { name: '김수연', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' },
            rate: 4,
            reviewImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg',
            reviewText: '그냥 일단 드셔보세요\n우주먹는 맛 절대 후회안함 단골 2년째',
            like: false,
            comments: [
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
            ]
          },
          {
            user: { name: '김수연', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' },
            rate: 4,
            reviewImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg',
            reviewText: '그냥 일단 드셔보세요\n우주먹는 맛 절대 후회안함 단골 2년째',
            like: false,
            comments: [
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
            ]
          },
          {
            user: { name: '김수연', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' },
            rate: 5,
            reviewImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg',
            reviewText: '그냥 일단 드셔보세요\n우주먹는 맛 절대 후회안함 단골 2년째',
            like: false,
            comments: [
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
            ]
          },
          {
            user: { name: '김수연', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' },
            rate: 5,
            reviewImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg',
            reviewText: '그냥 일단 드셔보세요\n우주먹는 맛 절대 후회안함 단골 2년째',
            like: false,
            comments: [
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
            ]
          },
          {
            user: { name: '김수연', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' },
            rate: 5,
            reviewImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg',
            reviewText: '그냥 일단 드셔보세요\n우주먹는 맛 절대 후회안함 단골 2년째',
            like: false,
            comments: [
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
              { user: { name: '방이동불주먹', profileImage: 'https://i3.ytimg.com/vi/0_43v4p7Td0/maxresdefault.jpg' }, comment: '이거 먹고 불면증 완치 됐음 저 리뷰도 남겼으니까 프로필 ㄱㄱ', like: false },
            ]
          },
        ]
      };
    },
    mounted () {
      // let root = this;
      this.swiper = new Swiper(`.swiper-container-h`, {
        // Optional parameters
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
        },
      });
    },
  }
</script>

<style lang="scss" scoped>
  .swiper-pagination::v-deep {
    display: flex;
    height: 2px;
    width: 100%;
    padding: 0 8px;
    .swiper-pagination-bullet {
      background: white;
      display: flex;
      width: auto;
      height: 2px;
      border-radius: unset;
      flex: 1 1 auto;
    }
    .swiper-pagination-bullet + .swiper-pagination-bullet {
      margin-left: 3px;
    }
    .swiper-pagination-bullet-active {
      background: white;
    }
  }

  .iphone-padding {
    padding-top: env(safe-area-inset-top);
    padding-top: constant(safe-area-inset-top);
    &::v-deep .v-toolbar__content {
      padding: 10px 24px;
    }
  }

  .swiper-slide {
    color: white;
  }

  .review-text-holder {
    position: absolute;
    bottom: 0;
    left: 0;
    max-width: calc(100vw - 64px);

    margin-left: 20px;
    margin-bottom: 18px;
    margin-bottom: calc(18px + constant(safe-area-inset-bottom));
    margin-bottom: calc(18px + env(safe-area-inset-bottom));
  }
</style>
