<template>
  <v-content class="iphone-padding-top iphone-padding-bottom">
    <v-container fluid fill-height px-0 pt-12 pb-0>
      <v-layout wrap justify-center>
        <v-form v-model="valid">
          <v-flex xs12 class="px-9 pt-4 text-center">

            <div style="color: white; font-size: 20px; font-weight: 500;" class="mb-10">이름이 뭐예요?</div>

            <v-text-field solo flat label="이름"
                          class="input-round px-4"
                          required
                          :rules="[v => !!v || '']"
                          v-model="name"
                          height="70px"
                          hide-details
                          :style="{ borderColor: valid ? 'rgb(134,248,171)' : 'white' }"
                          background-color="transparent">
            </v-text-field>

          </v-flex>
        </v-form>

        <v-footer padless color="transparent" fixed v-if="valid">
          <v-flex xs12>
            <v-layout row justify-space-between class="mx-5 mb-5">
              <v-btn color="rgb(109,114,120)" fab width="58px" height="58px" @click="$router.back()"></v-btn>
              <v-btn color="rgb(134,248,171)" fab width="58px" height="58px" :to="{ name: 'SignUpBirth' }"></v-btn>
            </v-layout>
          </v-flex>
        </v-footer>

      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SignUpName',
    computed: {
      ...mapGetters('user', [ 'user' ]),
      name: {
        get () {
          return this.user.name;
        },
        set (name) {
          this.setUser({ name });
        }
      }
    },
    data () {
      return {
        valid: false,
      };
    },
    methods: {
      ...mapActions('user', [ 'setUser' ]),
    }
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

  .input-round::v-deep {
    border-radius: 100px;
    border: 2px solid white;
    margin-bottom: 10px !important;
    width: 220px;
    .v-text-field__slot {
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    label {
      top: calc(50% - 15px) !important;
      left: auto !important;
      color: rgba(255,255,255,0.4);
      font-weight: 700;
      font-size: 31px;
      height: 31px;
      line-height: 31px;
    }
    input {
      color: white !important;
      font-weight: 700;
      font-size: 31px;
      text-align: center;
      max-height: unset;
    }
  }

</style>
