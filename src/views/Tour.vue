<template>
  <v-content>
    <v-container fluid pa-0>

      <!-- videos -->
      <div class="swiper-container-v" style="background-color: black; width: 100vw; height: 100vh;">
        <div class="swiper-wrapper">
          <ProductSwiper v-for="n of 3" :key="n"
                         :seq="n"
                         :videoId="videoId"
                         :origin="origin"
                         :productInfo="productInfo"
                         @reading="onSwiperChanged($event)"
                         @playing="onSwiperChanged($event)" />
        </div>
      </div>

    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import ProductSwiper from "@/components/ProductSwiper";

  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css';

  export default {
    name: 'Tour',
    components: { ProductSwiper },
    computed: {
      ...mapGetters('product', [ 'products', 'currentProductIndex' ]),
    },
    data: () => ({
      loading: true,
      videoId: '0_43v4p7Td0',
      origin: window.location.origin,
      videoDuration: 0,
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
      swiper: null,
    }),
    created () {
      this.selectProducts(1).then(() => {
        console.log(this.products);
        this.swiper = new Swiper('.swiper-container-v', {
          // Optional parameters
          direction: 'vertical',
        });
      });
    },
    methods: {
      ...mapActions('product', [ 'selectProducts' ]),
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
      onSwiperChanged (event) {
        console.log(event);
      },
    }
  }
</script>
