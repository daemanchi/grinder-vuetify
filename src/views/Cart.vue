<template>
  <v-content style="background-color: white;">
    <v-toolbar dense flat absolute>
      <v-btn icon small @click="$router.go(-1)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid fill-height pa-0>
<!--      <v-layout>-->
<!--        <h1>장바구니</h1>-->
<!--      </v-layout>-->
<!--      <v-checkbox v-model="checkAll" label="전체 선택"></v-checkbox>-->
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
          return this.checked.length === this.items.length;
        },
        set (flag) {
          if (flag) this.checked = this.items;
          else this.checked = [];
        }
      },
      totalPrice () {
        return { price: 0, shippingFee: 0 };
      }
    },
    data: () => ({
      checked: [],
      items: [
        {
          brand: { name: '알디프', id: 'Altdif' },
          products: [
            { name: '트라이앵글 티백 샘플러', option: '옵션이름', price: 24000, finalPrice: 12000, count: 1 }
          ],
          shippingFee: 2500
        },
        {
          brand: { name: '타나크라프트', id: 'Altdif' },
          products: [
            { name: '[신상 할인 50%] 앗 백팩이 정말정말예쁘잖아요!', option: '옵션이름', price: 24000, finalPrice: 12000, count: 1 },
            { name: '[신상 할인 50%] 백팩', option: '옵션이름', price: 24000, finalPrice: 12000, count: 1 },
          ],
          shippingFee: 0
        }
      ],
    }),
    created () {
      this.$vuetify.theme.dark = false;
    },
    destroyed () {
      this.$vuetify.theme.dark = true;
    },
    methods: {
      ...mapActions([
        'setDark'
      ]),
    }
  }
</script>

<style lang="scss" scoped>

</style>
