<template>
  <v-content>
    <v-toolbar dense flat light>
      <v-btn icon small @click="$router.go(-1)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid fill-height pa-0>
      <v-layout>
        <h1>장바구니</h1>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: "Cart"
  }
</script>

<style scoped>

</style>
