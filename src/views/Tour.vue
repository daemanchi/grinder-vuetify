<template>
  <v-content>
    <v-container fluid pa-0>

      <!-- videos -->
      <div class="swiper-container-v" style="background-color: black; width: 100vw; height: 100vh;">
        <div class="swiper-wrapper">
          <ProductSwiper v-for="(product, index) of products" :key="index"
                         :seq="index"
                         :videoId="product.videoId"
                         :origin="origin"
                         :productInfo="product"
                         @comment:touchstart="allowSwipe = false"
                         @comment:touchend="allowSwipe = true"
                         @follow="product.brand.follow = !product.brand.follow"
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
      ...mapGetters('product', [ 'products' ]),
    },
    data: () => ({
      loading: true,
      origin: window.location.origin,
      videoDuration: 0,
      swiper: null,
      allowSwipe: true,
    }),
    created () {
      // await this.selectProducts(1).then(() => {
      //   console.log(this.products);
      // });
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
