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
                         @comment:touchstart="allowSwipe = false"
                         @comment:touchend="allowSwipe = true"
                         @follow="productInfo.brand.follow = !productInfo.brand.follow"
                         @reading="allowSwipe = false"
                         @playing="allowSwipe = true" />
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
        name: '트라이앵글 티백 샘플러',
        price: 12000,
        introduce: '티 퍼퓸 브랜드 알디프의 트라이앵글 티 샘플러 11종',
        tags: [ '크루얼티프리', '비건', '친환경용기', '시험기간' ],
        seasoningPoints: [
          '알디프의 모든 차를 맛볼 수 있어요!',
          '가방에 쏙 챙겨 다니다 쉬는시간에 꺼내 먹어요',
          '티백마다 카페인이 얼마나 들었는지 적혀 있어요!',
        ],
        like: false,
        brand: {
          name: '알디프',
          brandId: 'Aldif',
          profileImage: require('@/assets/img/dummy-2.jpeg'),
          introduce: '티소믈리에가 만든 황홀한 티와 차 향이 나는 드레스퍼퓸을 만나볼 수 있습니다.',
          follow: false,
        },
        comments: [
          { userName: '이재봉', text: '알록달록하네' },
          { userName: '고유라', text: '너무너무완전대박 길다란 댓글을 이렇게 열심히 달아봤는데 이것도 이쁘게 나오게 해주세요 힝구' },
          { userName: '김수연', text: '이거 먹어봤는데 이 맛이 제일 맛있음' },
          { userName: '박상욱', text: '리뷰 보니까 더 사고 싶다' },
          { userName: '전성우', text: '애인 사줘야지' },
          { userName: '그리피스', text: '빨리 배달해주세요 현기증나요' },
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
      },
      swiper: null,
      allowSwipe: true,
    }),
    async created () {
      await this.selectProducts(1).then(() => {
        console.log(this.products);
      });
    },
    mounted () {
      this.swiper = new Swiper('.swiper-container-v', {
        // Optional parameters
        direction: 'vertical',
      });
    },
    watch: {
      allowSwipe (flag) {
        this.swiper.allowTouchMove = flag;
      }
    },
    methods: {
      ...mapActions('product', [ 'selectProducts' ]),
    }
  }
</script>
