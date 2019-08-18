<template>
  <v-content class="iphone-padding-top iphone-padding-bottom">
    <v-container fluid fill-height px-0 pt-12 pb-0>
      <v-layout wrap align-center justify-center>
        <v-flex xs12 class="px-9 text-center">

          <v-btn text block
                 :to="{ name: 'SignUpName' }"
                 color="white"
                 height="60px"
                 class="mb-4"
                 style="font-size: 36px; font-weight: 700;">
            시작하기
          </v-btn>

          <v-btn text block
                 :to="{ name: 'SignIn' }"
                 color="white"
                 height="30px"
                 style="font-weight: 500; font-size: 16px;">
            계정이 있어요!
          </v-btn>

        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'Start',
  }
</script>

<style lang="scss" scoped>
  .iphone-padding-top {
    padding-top: env(safe-area-inset-top) !important;
    padding-top: constant(safe-area-inset-top) !important;
  }

  .iphone-padding-bottom {
    padding-bottom: env(safe-area-inset-bottom) !important;
    padding-bottom: constant(safe-area-inset-bottom) !important;
  }
</style>
