<template>
  <v-content>
    <v-container fluid pa-0>

      <div class="swiper-container" style="background-color: black; width: 100vw; height: 100vh;">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <v-img :src="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
                   width="100vw" height="100vh" @click="playVideo"></v-img>
            <!--        <youtube v-show="!loading" :width="playerWidth"-->
            <!--                 :height="playerHeight"-->
            <!--                 :video-id="videoId"-->
            <!--                 :player-vars="playerOptions"-->
            <!--                 ref="player"-->
            <!--                 @ready="onReadyVideo"-->
            <!--                 @ended="playVideo"-->
            <!--                 @paused="loading = true"-->
            <!--                 @playing="onPlayingVideo"-->
            <!--                 :style="{ marginTop: '-60px', marginLeft: -(playerWidth / 2 - screenWidth / 2) + 'px' }"-->
            <!--        ></youtube>-->
            <!--        <iframe :src="`http://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&enablejsapi=1&origin=${playerOptions.origin}&rel=0&modestbranding=1&controls=0`"-->
            <!--                frameborder="0"-->
            <!--                :width="playerWidth"-->
            <!--                :height="playerHeight"-->
            <!--                :style="{ marginTop: '-60px', marginLeft: -(playerWidth / 2 - screenWidth / 2) + 'px' }">-->
            <!--        </iframe>-->
          </div>
          <div class="swiper-slide">
            <v-img :src="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
                   width="100vw" height="100vh" @click="playVideo"></v-img>

          </div>
          <div class="swiper-slide">
            <v-img :src="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
                   width="100vw" height="100vh" @click="playVideo"></v-img>

          </div>
        </div>
      </div>

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

    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ProductActionsHolder from '@/components/ProductActionsHolder';

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css';

  export default {
    name: 'Tour',
    components: { ProductActionsHolder },
    computed: {
      ...mapGetters('product', [ 'products', 'currentProductIndex' ]),
      player () {
        return this.$refs.player.player;
      },
    },
    data: () => ({
      loading: true,
      videoId: '0_43v4p7Td0',
      videoDuration: 0,
      playerOptions: {
        autoplay: 1,
        playsinline: 1,
        enablejsapi: 1,
        // origin: window.location.origin,
        rel: 0,
        modestbranding: 1,
        controls: 0,
      },
      screenWidth: window.innerWidth,
      playerWidth: (window.innerHeight + 120) * 16 / 9,
      playerHeight: window.innerHeight + 120,
      productInfo: {
        title: '트라이앵글 티백 샘플러',
        price: 12000,
        description: '티 퍼퓸 브랜드 알디프의 트라이앵글 티 샘플러 11종',
        tags: [ '크루얼티프리', '비건', '친환경용기', '시험기간' ],
        like: false,
        brandProfileImage: require('@/assets/img/dummy-1.jpeg'),
        comments: [
          { userName: '이재봉', text: '알록달록하네' },
          { userName: '고유라', text: '너무너무완전대박 길다란 댓글을 이렇게 열심히 달아봤는데 이것도 이쁘게 나오게 해주세요 힝구' },
          { userName: '김수연', text: '이거 먹어봤는데 이 맛이 제일 맛있음' },
          { userName: '박상욱', text: '리뷰 보니까 더 사고 싶다' },
          { userName: '전성우', text: '애인 사줘야지' },
          { userName: '그리피스', text: '빨리 배달해주세요 현기증나요' },
        ],
      },
      isOpenComments: false,
      commentInput: '',
      swiper: null,
    }),
    created () {
      this.selectProducts(1).then(() => {
        console.log(this.products);
        this.swiper = new Swiper ('.swiper-container', {
          // Optional parameters
          direction: 'vertical',
        });
        this.selectComments({ productId: this.products[0].seq, pageNum: 1 }).then(response => {
          console.log(response);
        });
      });
    },
    watch: {
      videoDuration (duration) {
        console.log(duration);
      },
      isActive (flag) {
        if (!flag) this.stopVideo();
        else this.playVideo();
      }
    },
    methods: {
      ...mapActions('product', [ 'selectProducts', 'toggleLikeProduct' ]),
      ...mapActions('comment', [ 'selectComments' ]),
      onReadyVideo () {
        if (this.isActive) {
          this.playVideo();
          this.loading = false;
          this.player.getDuration().then(response => {
            this.videoDuration = response - 1;
          });
        }
      },
      togglePlayVideo () {
        this.player.getPlayerState().then(state => {
          if (state === 1) this.stopVideo();
          else this.playVideo();
        });
      },
      stopVideo () {
        this.loading = true;
        this.player.pauseVideo();
      },
      playVideo () {
        this.player.playVideo();
        this.loading = false;
      },
      onPlayingVideo () {
        this.loading = false;
        // console.log('playing...');
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
</style>
