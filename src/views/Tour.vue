<template>
  <v-content>
    <v-container fluid pa-0>
      <v-img :src="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
             width="100vw" height="100vh" @click="playVideo">
        <youtube v-show="!loading" :width="playerWidth"
                 :height="playerHeight"
                 :video-id="videoId"
                 :player-vars="playerOptions"
                 ref="player"
                 @ready="onReadyVideo"
                 @ended="playVideo"
                 @paused="loading = true"
                 @playing="onPlayingVideo"
                 :style="{ marginTop: '-60px', marginLeft: -(playerWidth / 2 - screenWidth / 2) + 'px' }"
        ></youtube>
      </v-img>

      <!-- icons holder -->
      <div class="icons-holder" ref="iconsHolder">
        <img v-if="productInfo.likeStatus"
             style="display: block; margin-bottom: 15px;"
             alt="like"
             @click.stop="like"
             src="@/assets/icons/icon-heart-filled@3x.png"
             srcset="@/assets/icons/icon-heart-filled.png, @/assets/icons/icon-heart-filled@2x.png 2x, @/assets/icons/icon-heart-filled@3x.png 3x" />
        <img v-else
             style="display: block; margin-bottom: 15px;"
             alt="like"
             @click.stop="like"
             src="@/assets/icons/icon-heart-outlined@3x.png"
             srcset="@/assets/icons/icon-heart-outlined.png, @/assets/icons/icon-heart-outlined@2x.png 2x, @/assets/icons/icon-heart-outlined@3x.png 3x" />
        <div style="width: 32px; height: 32px; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
          <v-avatar size="28px"
                    style="border: 2px solid white; box-shadow: 0 0 6px rgba(0,0,0,0.1)">
            <v-img style="width: 24px; height: 24px;" :src="productInfo.brandProfileImage" aspect-ratio="1"></v-img>
          </v-avatar>
        </div>
        <img style="display: block; margin-bottom: 15px;"
             alt="share"
             src="@/assets/icons/icon-share@3x.png"
             srcset="@/assets/icons/icon-share.png, @/assets/icons/icon-share@2x.png 2x, @/assets/icons/icon-share@3x.png 3x" />
        <img v-if="isOpenComments"
             @click.stop="showComments"
             style="display: block;"
             src="@/assets/icons/icon-comment-filled@3x.png" alt="comment"
             srcset="@/assets/icons/icon-comment-filled.png, @/assets/icons/icon-comment-filled@2x.png 2x, @/assets/icons/icon-comment-filled@3x.png 3x" />
        <img v-else
             @click.stop="showComments"
             style="display: block;"
             src="@/assets/icons/icon-comment-outlined@3x.png" alt="comment"
             srcset="@/assets/icons/icon-comment-outlined.png, @/assets/icons/icon-comment-outlined@2x.png 2x, @/assets/icons/icon-comment-outlined@3x.png 3x" />
      </div>

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

  export default {
    name: 'Tour',
    computed: {
      ...mapGetters('product', [ 'products' ]),
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
        origin: window.location.origin,
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
        introduce: '티 퍼퓸 브랜드 알디프의 트라이앵글 티 샘플러 11종',
        tags: [ '크루얼티프리', '비건', '친환경용기', '시험기간' ],
        likeStatus: false,
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
    }),
    created () {
      this.selectProducts(1);
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
      ...mapActions('product', [ 'selectProducts' ]),
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
            this.$refs.iconsHolder.style.transform = `translateY(-${this.$refs.commentList.offsetHeight + 28}px)`;
          });
        } else {
          this.$refs.iconsHolder.style.transform = 'none';
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
  .icons-holder {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 15px;
    margin-bottom: 18px;
    margin-bottom: calc(18px + constant(safe-area-inset-bottom));
    margin-bottom: calc(18px + env(safe-area-inset-bottom));

    transition: all .3s ease;
  }
  .product-name-holder {
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
