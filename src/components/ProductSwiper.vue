<template>
  <div class="swiper-slide">
    <div :class="`swiper-container-h-${seq}`" style="background-color: black; width: 100vw; height: 100vh;">

      <!-- thumbnail & player -->
      <v-img style="position: absolute;" :src="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
             width="100vw" height="100vh">
        <iframe :src="`http://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&enablejsapi=1&origin=${origin}&rel=0&modestbranding=1&controls=0`"
                frameborder="0"
                type="text/html"
                v-show="!loading"
                @load="onIframeLoad"
                :id="`player-${seq}`"
                :width="playerWidth"
                :height="playerHeight"
                :style="{ marginTop: '-60px', marginLeft: -(playerWidth / 2 - screenWidth / 2) + 'px' }">
        </iframe>
      </v-img>

      <!-- icons holder -->
      <ProductActionsHolder ref="iconsHolder"
                            :isEnd="isEnd"
                            :likeStatus="likeStatus"
                            :isOpenComments="isOpenComments"
                            :brandProfileImageSrc="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
                            @like="like"
                            @click:profile="$router.push({ name: 'BrandProfile', params: { id: 'brandId' } })"
                            @share:toggle="toggleShare"
                            @comment:toggle="showComments" />

      <!-- product name holder -->
      <transition name="slide-y-transition">
        <div class="product-name-holder" ref="productNameHolder" v-show="!isOpenComments && !isEnd">
          <div class="product-name">{{ productInfo.name }}</div>
          <div class="product-tags">
            <span v-for="(tag, index) of productInfo.tags" :key="index">#{{ tag }} </span>
          </div>
        </div>
      </transition>

      <!-- comments & comment input holder -->
      <transition name="slide-y-reverse-transition">
        <v-footer absolute v-if="isOpenComments" class="pa-0 comments-holder" color="transparent">
          <v-layout column>
            <v-sheet class="scroll-wrapper" color="transparent" tile>
              <div class="comment-wrapper" ref="commentList">
                <div v-for="(comment, index2) of productInfo.comments" :key="index2">
                  <span class="comment-name">{{ comment.userName }}: </span>
                  <span class="comment-text">{{ comment.text }}</span>
                </div>
              </div>
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

      <!-- share icons holder -->
      <transition name="slide-y-reverse-transition">
        <v-footer absolute v-if="isOpenShare" class="px-0 share-icons-holder" color="white" ref="shareIconsHolder">
          <v-layout column align-center justify-center>
            <v-layout row class="share-row">
              <img src="@/assets/img/share-instagram@3x.png" alt="instagram"
                   srcset="@/assets/img/share-instagram.png,
                     @/assets/img/share-instagram@2x.png 2x,
                     @/assets/img/share-instagram@3x.png 3x">
              <img src="@/assets/img/share-stories@3x.png" alt="story"
                   srcset="@/assets/img/share-stories.png,
                     @/assets/img/share-stories@2x.png 2x,
                     @/assets/img/share-stories@3x.png 3x">
              <img src="@/assets/img/share-twitter@3x.png" alt="twitter"
                   srcset="@/assets/img/share-twitter.png,
                     @/assets/img/share-twitter@2x.png 2x,
                     @/assets/img/share-twitter@3x.png 3x">
              <img src="@/assets/img/share-snapchat@3x.png" alt="snapchat"
                   srcset="@/assets/img/share-snapchat.png,
                     @/assets/img/share-snapchat@2x.png 2x,
                     @/assets/img/share-snapchat@3x.png 3x">
              <img src="@/assets/img/share-kakaotalk@3x.png" alt="kakao"
                   srcset="@/assets/img/share-kakaotalk.png,
                     @/assets/img/share-kakaotalk@2x.png 2x,
                     @/assets/img/share-kakaotalk@3x.png 3x">
            </v-layout>

            <v-layout row class="share-row">
              <img src="@/assets/img/share-facebook@3x.png" alt="facebokk"
                   srcset="@/assets/img/share-facebook.png,
                     @/assets/img/share-facebook@2x.png 2x,
                     @/assets/img/share-facebook@3x.png 3x">
              <img src="@/assets/img/share-messenger@3x.png" alt="messenger"
                   srcset="@/assets/img/share-messenger.png,
                     @/assets/img/share-messenger@2x.png 2x,
                     @/assets/img/share-messenger@3x.png 3x">
              <img src="@/assets/img/share-sms@3x.png" alt="sms"
                   srcset="@/assets/img/share-sms.png,
                     @/assets/img/share-sms@2x.png 2x,
                     @/assets/img/share-sms@3x.png 3x">
              <img src="@/assets/img/share-link@3x.png" alt="link"
                   srcset="@/assets/img/share-link.png,
                     @/assets/img/share-link@2x.png 2x,
                     @/assets/img/share-link@3x.png 3x">
              <img src="@/assets/img/share-more@3x.png" alt="more"
                   srcset="@/assets/img/share-more.png,
                     @/assets/img/share-more@2x.png 2x,
                     @/assets/img/share-more@3x.png 3x">
            </v-layout>
          </v-layout>
        </v-footer>
      </transition>

      <!-- contents -->
      <div class="swiper-wrapper">
        <!-- video playing -->
        <div class="swiper-slide" @click="togglePlayVideo"></div>

        <!-- product detail -->
        <div class="swiper-slide" style="overflow-y: scroll;">
          <div class="background-gradient">
            <v-container pa-0>
              <v-toolbar dense flat absolute color="transparent" class="iphone-padding">
                <v-btn icon small @click="slidePrevious">
                  <img src="@/assets/icons/icon-arrow-left@3x.png" alt="back"
                       srcset="@/assets/icons/icon-arrow-left.png,
                     @/assets/icons/icon-arrow-left@2x.png 2x,
                     @/assets/icons/icon-arrow-left@3x.png 3x">
                </v-btn>
              </v-toolbar>

              <v-layout wrap pt-12>
                <v-flex xs12 class="text-center" style="margin-top: 33vh;">
                  <div style="font-size: 20px; font-weight: 700; line-height: 32px;">{{ productInfo.name }}</div>
                  <div style="font-size: 24px; font-weight: 700; line-height: 32px; margin-bottom: 13px;">{{ productInfo.price }}원</div>
                  <div style="font-size: 12px; font-weight: 500; line-height: 18px; opacity: 0.8">
                    <p class="ma-0">{{ productInfo.introduce }}</p>
                    <span v-for="(tag, index) of productInfo.tags" :key="index">#{{ tag }} </span>
                  </div>
                </v-flex>

                <v-flex xs12 class="px-5 pt-9">
                  <div class="section-heading">시즈닝 포인트</div>
                  <div v-for="(point, index) of productInfo.seasoningPoints" :key="index">
                    <span style="font-size: 12px; line-height: 30px; font-weight: 700;">{{ point }}</span>
                  </div>
                </v-flex>

                <v-flex xs12 class="pt-9" style="overflow-y: hidden; height: 293px;">
                  <div class="section-heading px-5">꿀팁 가득 리뷰를 둘러보자</div>
                  <div style="display: flex; white-space: nowrap; height: 310px; overflow-x: scroll; padding-left: 20px; padding-right: 10px;"
                       @touchstart="swiper.allowTouchMove = false"
                       @touchend="swiper.allowTouchMove = true">
                    <div style="display: inline-block; margin-right: 10px;" v-for="(review, index) of productInfo.reviews" :key="index">
                      <v-img width="134px" @click="$router.push({ name: 'Reviews' })"
                             :aspect-ratio="134/243"
                             :src="review.image"
                             style="border-radius: 16px;">
                      </v-img>
                    </div>
                  </div>
                </v-flex>

                <v-flex xs12 class="px-5 pt-9 brand-holder">
                  <div class="section-heading">이 제품을 파는 브랜드는?</div>
                  <v-list-item class="pa-0 ma-0">
                    <v-list-item-avatar size="120px" class="my-0 mr-5">
                      <v-img :src="productInfo.brand.profileImage"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content style="color: white;">
                      <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">{{ productInfo.brand.name }}</div>
                      <div style="font-size: 12px; font-weight: 500; line-height: 18px; margin-bottom: 10px;">{{ productInfo.brand.introduce }}</div>
                      <v-btn :outlined="!productInfo.brand.follow"
                             rounded
                             :color="productInfo.brand.follow ? 'rgb(88,130,248)' : 'white'"
                             width="90px"
                             height="33px"
                             @click="$emit('follow')"
                             style="flex: 0 0 auto; box-sizing: border-box; border-radius: 16px; font-size: 12px; font-weight: 500;"
                             :style="{ color: productInfo.brand.follow ? 'white' : undefined }"
                             class="pa-0">
                        {{ productInfo.brand.follow ? '팔로잉' : '팔로우' }}
                      </v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-flex>

                <!-- buy buttons -->
                <transition name="slide-y-reverse-transition">
                  <v-footer v-if="isEnd" fixed class="pa-0" color="white" width="100%"
                            style="left: unset; right: unset;" height="auto">
                    <v-layout row mx-0 mt-3 px-0 pt-0 align-center class="buttons-holder-padding">
                      <v-flex xs6 class="text-center">
                        <v-btn text
                               color="rgba(0,0,0,0.85)"
                               @click="$router.push({ name: 'Cart' })"
                               style="font-size: 18px; font-weight: 700; letter-spacing: normal;"
                               class="pa-0">장바구니</v-btn>
                      </v-flex>
                      <v-flex xs6 class="text-center">
                        <v-btn text
                               color="rgba(0,0,0,0.85)"
                               @click="$router.push({ name: 'Purchased' })"
                               style="font-size: 18px; font-weight: 700; letter-spacing: normal;"
                               class="pa-0">바로구매</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-footer>
                </transition>
              </v-layout>

            </v-container>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css';

  import { mapActions } from 'vuex';
  import ProductActionsHolder from '@/components/ProductActionsHolder';

  export default {
    name: 'ProductSwiper',
    components: { ProductActionsHolder },
    props: [ 'seq', 'videoId', 'origin', 'productInfo' ],
    data () {
      return {
        loading: true,
        swiper: null,
        ytPlayer: null,
        screenWidth: window.innerWidth,
        playerWidth: (window.innerHeight + 120) * 16 / 9,
        playerHeight: window.innerHeight + 120,
        isOpenComments: false,
        isOpenShare: false,
        commentInput: '',
        likeStatus: false,
        isEnd: false,
      };
    },
    mounted () {
      let root = this;
      this.swiper = new Swiper(`.swiper-container-h-${root.seq}`, {
        // Optional parameters
        direction: 'horizontal',
        on: {
          slideChange () {
            root.isEnd = this.isEnd;
            this.isEnd ? root.$emit('reading', 'reading') : root.$emit('playing', 'playing');
          },
        }
      });
    },
    watch: {
      isEnd (flag) {
        this.$nextTick(() => {
          if (flag) {
            this.toggleAppBar(false);
            this.isOpenComments = false;
            this.isOpenShare = false;
            this.$refs.iconsHolder.$el.style.transform = `translateY(-60vh)`;
            this.$refs.productNameHolder.style.transform = 'none';
          } else {
            this.toggleAppBar(true);
            this.$refs.iconsHolder.$el.style.transform = `none`;
          }
        });
      }
    },
    methods: {
      ...mapActions([ 'toggleAppBar' ]),
      ...mapActions('product', [ 'toggleLikeProduct' ]),
      onIframeLoad () {
        this.ytPlayer = new this.$YT.Player(`player-${this.seq}`, {
          videoId: this.videoId,
          events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange
          }
        });
        this.loading = false;
      },
      onPlayerReady (event) {
        console.log(`player-${this.seq} ready`, event.target);
      },
      togglePlayVideo () {
        console.log('togglePlayVideo');
        if (this.ytPlayer.getPlayerState() !== 1) this.ytPlayer.playVideo();
        else this.ytPlayer.pauseVideo();
      },
      onPlayerStateChange (event) {
        console.log('state changed', event);
      },
      like () {
        this.likeStatus = !this.likeStatus;
      },
      toggleShare () {
        this.isOpenComments = false;
        this.isOpenShare = !this.isOpenShare;
        if (this.isOpenShare) {
          this.$nextTick(() => {
            this.$refs.iconsHolder.$el.style.transform = `translateY(-${this.$refs.shareIconsHolder.$el.offsetHeight + 50}px)`;
            this.$refs.productNameHolder.style.transform = `translateY(-${this.$refs.shareIconsHolder.$el.offsetHeight + 50}px)`;
          });
        } else {
          this.$refs.iconsHolder.$el.style.transform = 'none';
          this.$refs.productNameHolder.style.transform = 'none';
        }
      },
      showComments () {
        this.isOpenShare = false;
        this.isOpenComments = !this.isOpenComments;
        if (this.isOpenComments) {
          this.$nextTick(() => {
            this.$refs.iconsHolder.$el.style.transform = `translateY(-${this.$refs.commentList.offsetHeight + 48}px)`;
          });
        } else {
          this.$refs.iconsHolder.$el.style.transform = 'none';
          this.$refs.productNameHolder.style.transform = 'none';
        }
      },
      createComment () {
        if (this.commentInput !== '') {
          this.productInfo.comments.push({ userName: '당신', text: this.commentInput });
          this.$nextTick(() => {
            this.$refs.commentList.scrollTo(0, this.$refs.commentList.scrollHeight);
            this.commentInput = '';
          });
        }
      },
      slidePrevious () {
        this.swiper.slidePrev();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-name-holder {
    z-index: 2;
    margin-left: 20px;
    margin-bottom: 18px;
    margin-bottom: calc(18px + constant(safe-area-inset-bottom));
    margin-bottom: calc(18px + env(safe-area-inset-bottom));

    position: absolute;
    bottom: 0;
    left: 0;
    max-width: calc(100vw - 64px);
    .product-name {
      padding-top: 7px;
      padding-bottom: 7px;
      color: white;
      font-size: 20px;
      line-height: 26px;
      font-weight: 700;
    }
    .product-tags {
      color: white;
      font-size: 12px;
      line-height: 20px;
      font-weight: 500;
    }
  }
  .comments-holder {
    &::v-deep .v-input {
      background-color: white;
      border-radius: 0;

      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
    &::v-deep .v-input__control {
      min-height: 0 !important;
    }
    &::v-deep input {
      font-size: 14px;
      font-weight: 500;
    }
    .scroll-wrapper {
      box-sizing: border-box;
      width: 100vw;
      max-height: 120px;
      padding-left: 20px;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .comment-wrapper {
      width: 100vw;
      max-height: 120px;
      line-height: 20px;
      padding-right: 40px;
      overflow-y: scroll;
      overflow-x: hidden;

      .comment-name {
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        color: white;
      }
      .comment-text {
        font-size: 12px;
        font-weight: 500;
        line-height: 20px;
        color: white;
      }
    }
  }

  .share-icons-holder {
    padding-top: 31px;
    padding-bottom: 31px;
    padding-bottom: calc(20px + constant(safe-area-inset-bottom));
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
  }
  .share-row {
    &:first-of-type {
      margin-bottom: 14px;
    }
    & > img + img {
      margin-left: 14px;
    }
  }

  .background-gradient {
    color: white;
    min-height: 100vh;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0) 25vh, rgba(0,0,0,0.1) 33vh, rgba(0,0,0,1) 55vh);
  }

  .section-heading {
    font-size: 14px;
    line-height: 32px;
    font-weight: 700;
    color: white;
    margin-bottom: 10px;
  }

  .iphone-padding {
    padding-top: env(safe-area-inset-top);
    padding-top: constant(safe-area-inset-top);
    &::v-deep .v-toolbar__content {
      padding: 10px 24px;
    }
  }

  .buttons-holder-padding {
    padding-bottom: 13px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .brand-holder {
    padding-bottoom: 80px;
    padding-bottom: calc(80px + constant(safe-area-inset-bottom));
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
  }
</style>
