<template>
  <v-content style="background-color: white;" class="iphone-padding-top">
    <v-toolbar dense flat absolute>
      <v-btn icon small @click="$router.go(-1)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid fill-height px-0 pt-12 pb-0>
      <v-layout wrap>
        <v-flex xs12 class="px-5">
          <span class="font-weight-bold" style="font-size: 32px;">장바구니</span>
        </v-flex>

        <v-flex xs12 class="px-6 pt-3 pb-3">
          <v-layout justify-space-between align-center>
            <v-checkbox v-model="checkAll"
                        class="pa-0 ma-0"
                        hide-details
                        on-icon="mdi-check-circle"
                        off-icon="mdi-check-circle-outline"
                        color="rgb(255,121,114)"
                        :label="`전체 선택 (${checked.length} / ${totalProducts.length})`">
            </v-checkbox>
            <v-btn text class="pa-1" style="min-width: 0; height: auto;">선택 삭제</v-btn>
          </v-layout>
        </v-flex>

        <v-flex xs12 class="px-6">
          <v-card v-for="(item, index) of items" :key="index" flat class="mb-6">
            <v-card-title class="pa-0 font-weight-bold text--black" style="font-size: 14px;">
              <span>{{ item.brand.name }}</span>
            </v-card-title>
            <v-divider color="rgba(0,0,0,0.85)"></v-divider>
            <v-card-text class="px-0 pt-3 pb-0 cart-item">
              <template v-for="(product, index) of item.products">

                <v-checkbox :key="index"
                            v-model="checked"
                            :value="product"
                            class="pa-0 ma-0"
                            hide-details
                            color="rgb(255,121,114)"
                            on-icon="mdi-check-circle"
                            off-icon="mdi-check-circle-outline">

                  <template v-slot:label>
                    <v-container fluid class="pa-0">
                      <v-layout>
                        <v-img width="109px" aspect-ratio="1" :src="product.image" style="flex-grow: 0;"></v-img>
                        <div class="pl-4 d-flex flex-column justify-space-between">
                          <div>
                            <div>{{ product.name }}</div>
                            <div>옵션: {{ product.option }}</div>
                          </div>
                          <div>
                            <div>{{ product.price }}원</div>
                            <div>{{ product.finalPrice }}원</div>
                          </div>
                        </div>
                      </v-layout>

                      <v-layout class="py-4">
                        <div>
                          <v-btn text class="cart-item-counter pa-0" @click.stop="product.count !== 1 ? product.count-- : product.count = 1">-</v-btn>
                          <v-btn text disabled class="cart-item-counter pa-0" style="color: initial !important;">{{ product.count }}</v-btn>
                          <v-btn text class="cart-item-counter pa-0" @click.stop="product.count++">+</v-btn>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn rounded depressed dark @click.stop>바로 구매</v-btn>
                      </v-layout>
                    </v-container>
                  </template>
                </v-checkbox>

                <v-divider style="border-style: dashed;" class="pb-4"></v-divider>

              </template>

            </v-card-text>

            <v-card-text class="pa-0 text-right font-weight-light" style="color: black;">
              상품 {{ calculateBrandTotalPrice(item.products) }}원 + 배송비 {{ item.shippingFee }}원 = {{ calculateBrandTotalPrice(item.products) + item.shippingFee }}원
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 class="px-6 py-12 mb-12">
          <v-layout justify-space-between
                    align-center
                    style="line-height: 42px;"
                    v-for="(price, index) of totalPrice" :key="index">
            <span class="font-weight-medium" style="font-size: 14px; color: rgb(109,114,120);">{{ price.name }}</span>
            <span class="font-weight-bold" style="font-size: 20px;" :style="{ color: index === 2 ? 'rgb(255,121,114)' : 'black' }">{{ price.value }}원</span>
          </v-layout>
        </v-flex>

        <v-footer absolute class="pa-0" color="black" height="auto">
          <v-btn block depressed
                 color="black"
                 style="border-radius: 0; color: white; font-size: 20px; height: auto;"
                 class="pt-3 iphone-padding-bottom font-weight-bold fill-height">살래요!</v-btn>
        </v-footer>

      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'Cart',
    computed: {
      checkAll: {
        get () {
          return this.checked.length === this.totalProducts.length;
        },
        set (flag) {
          if (flag) this.checked = this.totalProducts;
          else this.checked = [];
        }
      },
      totalPrice () {
        let price = 0;
        let fee = 0;
        this.items.forEach(brand => {
          if (brand.products.some(el => this.checked.includes(el))) fee += brand.shippingFee;
        });
        this.checked.forEach(el => {
          price += el.finalPrice * el.count;
        });
        return [
          { name: '총 주문 금액', value: price },
          { name: '총 배송비', value: fee },
          { name: '총 결제 금액', value: price + fee },
        ];
      },
      totalProducts () {
        let arr = [];
        this.items.forEach(el => {
          arr.push(...el.products);
        });
        return arr;
      }
    },
    data: () => ({
      checked: [],
      items: [
        {
          brand: { name: '알디프', id: 'Altdif' },
          products: [
            { name: '트라이앵글 티백 샘플러', option: '옵션이름', price: 24000, finalPrice: 12000, count: 1, image: 'https://picsum.photos/id/13/500' },
            { name: '트라이앵글 티백 샘플러2', option: '옵션이름', price: 24000, finalPrice: 12000, count: 1, image: 'https://picsum.photos/id/13/500' },
          ],
          shippingFee: 2500
        },
        {
          brand: { name: '타나크라프트', id: 'Altdif' },
          products: [
            { name: '[신상 할인 50%] 앗 백팩이 정말정말예쁘잖아요!', option: '옵션이름', price: 24000, finalPrice: 12000, count: 1, image: 'https://picsum.photos/id/59/500' },
            { name: '[신상 할인 50%] 백팩', option: '옵션이름', price: 24000, finalPrice: 12000, count: 1, image: 'https://picsum.photos/id/147/500' },
          ],
          shippingFee: 0
        }
      ],
    }),
    mounted () {
      this.checkAll = true;
    },
    methods: {
      ...mapActions([ 'setDark' ]),
      calculateBrandTotalPrice (products) {
        let totalPrice = 0;
        products.forEach(el => {
          totalPrice += el.finalPrice * el.count;
        });
        return totalPrice;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .iphone-padding-top {
    padding-top: env(safe-area-inset-top) !important;
    padding-top: constant(safe-area-inset-top) !important;
  }

  .iphone-padding-bottom {
    padding-bottom: 16px !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
    padding-bottom: constant(safe-area-inset-bottom) !important;
  }

  .cart-item::v-deep {
    .v-input__control {
      flex-grow: 1;
    }
    .v-input__slot {
      align-items: flex-start;
    }
    label {
      width: 100%;
    }
    .cart-item-counter {
      min-width: 36px;
      border: 1px solid rgb(178,178,178);
      border-right: none;
      border-radius: 0;
      &:nth-child(2) {
        width: 37px;
      }
      &:last-of-type {
        border-right: 1px solid rgb(178,178,178);
      }
    }
  }

</style>
