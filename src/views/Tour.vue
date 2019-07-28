<template>
  <v-content>
    <v-container fluid pa-0>
      <v-img :src="`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`"
             width="100vw" height="100vh">
        <youtube :width="playerWidth"
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

      <!-- product name holder -->

      <!-- TODO: swiper, 여기 method, loading thumbnail 정리하기 -->
      <!-- TODO: 스와이프 움직임 따라 왓다리 갓다리 & 그라데이션 -->
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'Tour',
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
    computed: {
      player () {
        return this.$refs.player.player;
      },
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
      onReadyVideo () {
        if (this.isActive) {
          this.playVideo();
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
      },
      onPlayingVideo () {
        this.loading = false;
        // console.log('playing...');
      },
    }
  }
</script>

<style scoped>

</style>
