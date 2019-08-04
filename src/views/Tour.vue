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
      <div class="icons-holder mr-4 mb-4">
        <v-icon class="d-block mb-3" style="margin: auto;" size="32px">mdi-heart-outline</v-icon>
        <v-avatar class="d-block mb-3" size="26px" style="margin: auto; border: 2px solid white"></v-avatar>
        <v-icon class="d-block mb-3" style="margin: auto;" size="32px">mdi-share-variant</v-icon>
        <v-icon class="d-block" style="margin: auto;" size="32px">mdi-message-outline</v-icon>
      </div>

      <!-- product name holder -->
      <div class="product-name-holder pr-4 ml-4 mb-4">
        <h3 style="margin-bottom: 10px; font-size: 20px;">{{ productInfo.title }}</h3>
        <p class="mb-0" style="font-size: 12px;">
          <span v-for="(tag, index) of productInfo.tags" :key="index">#{{ tag }} </span>
        </p>
      </div>

      <!-- TODO: swiper, 여기 method, loading thumbnail 정리하기 -->
      <!-- TODO: 스와이프 움직임 따라 왓다리 갓다리 & 그라데이션 -->
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
        tags: [ '크루얼티프리', '비건', '친환경용기', '시험기간' ]
      }
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
    }
  }
</script>

<style lang="scss" scoped>
  .icons-holder {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .product-name-holder {
    position: absolute;
    bottom: 0;
    left: 0;
    max-width: calc(100vw - 64px);
  }
</style>
