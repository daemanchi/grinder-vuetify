<template>
  <div class="swiper-slide">
    <div class="swiper-container-h" style="background-color: black; width: 100vw; height: 100vh;">

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
                            :likeStatus="false"
                            :isOpenComments="isOpenComments"
                            :brandProfileImageSrc="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
                            @like="like"
                            @comment:open="showComments" />

      <!-- product name holder -->
      <transition name="slide-y-transition">
        <div class="product-name-holder" ref="productNameHolder" v-if="!isOpenComments">
          <div class="product-name">{{ productInfo.title }}</div>
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

      <div class="swiper-wrapper">
        <div class="swiper-slide" @click="togglePlayVideo">
          <!-- video playing -->
        </div>

        <div class="swiper-slide">
          <!-- product detail -->
          <!-- todo: 손가락 따라서... 트랜지션 -->
          <div class="gradient-holder"></div>
          <div></div>
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
        commentInput: '',
      };
    },
    mounted () {
      let root = this;
      this.swiper = new Swiper(`.swiper-container-h`, {
        // Optional parameters
        direction: 'horizontal',
        on: {
          slideChange () {
            this.isEnd ? root.$emit('reading', 'reading') : root.$emit('playing', 'playing');
          },
          sliderMove (event) {
            // console.log('sliderMove', event);
            console.log(event.touches[0].pageX);
          }
        }
      });
    },
    methods: {
      ...mapActions('product', [ 'toggleLikeProduct' ]),
      onIframeLoad () {
        this.loading = false;
        this.ytPlayer = new this.$YT.Player(`player-${this.seq}`, {
          videoId: this.videoId,
          events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange
          }
        });
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
        this.productInfo.likeStatus = !this.productInfo.likeStatus;
      },
      showComments () {
        this.isOpenComments = !this.isOpenComments;
        if (this.isOpenComments) {
          this.$nextTick(() => {
            this.$refs.iconsHolder.$el.style.transform = `translateY(-${this.$refs.commentList.offsetHeight + 48}px)`;
          });
        } else {
          this.$refs.iconsHolder.$el.style.transform = 'none';
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

  .gradient-holder {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,1) 50%);
  }
</style>
