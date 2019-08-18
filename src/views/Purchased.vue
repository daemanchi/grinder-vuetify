<template>
  <v-content class="iphone-padding-top gradient-background">
    <v-toolbar dense flat absolute style="background-color: transparent;">
      <v-spacer></v-spacer>
      <v-btn icon small @click="$router.go(-1)">
        <img src="@/assets/icons/icon-cancel-white@3x.png" alt="close"
             srcset="@/assets/icons/icon-cancel-white.png,
                     @/assets/icons/icon-cancel-white@2x.png 2x,
                     @/assets/icons/icon-cancel-white@3x.png 3x">
      </v-btn>
    </v-toolbar>

    <v-container fluid fill-height px-0>
      <v-layout wrap align-center justify-center>
        <v-flex xs12 class="text-center" style="font-size: 22px; font-weight: 700; color: white;">
          <p style="margin-bottom: 118px;">
            지속가능한<br>
            미래에<br>
            함께해주셔서<br>
            고마워요!
          </p>
          <v-btn block text color="white"
                 style="font-size: 16px; font-weight: 700; margin-bottom: 20px;">
            구매내역 보러가기
          </v-btn>
          <v-btn block text color="white"
                 @click="$router.push({ name: 'Home' })"
                 style="font-size: 16px; font-weight: 700;">
            홈으로
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'Purchased'
  }
</script>

<style lang="scss" scoped>
  .iphone-padding-top {
    padding-top: env(safe-area-inset-top) !important;
    padding-top: constant(safe-area-inset-top) !important;
  }

  .iphone-padding-bottom {
    padding-bottom: 12px !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
    padding-bottom: constant(safe-area-inset-bottom) !important;
  }

  .gradient-background {
    background-image: linear-gradient(to top, rgb(253, 174, 195) 0%, rgb(255, 121, 114) 50%, rgb(255, 243, 73) 100%);
  }
</style>
