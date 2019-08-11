<template>
  <v-content class="iphone-padding-top iphone-padding-bottom">
    <v-container fluid fill-height px-0 pt-12 pb-0>
      <v-layout wrap justify-center>
        <v-flex xs12 class="pt-4 text-center">

          <div style="color: white; font-size: 20px; font-weight: 500;" class="mb-10">언제 태어났어요?!</div>

          <v-form v-model="valid">
            <v-layout row ma-0 justify-center>
              <v-text-field solo flat label="YYYY"
                            class="input-round px-4"
                            required
                            :rules="rules.year"
                            v-model="year"
                            height="70px"
                            hide-details
                            style="width: 130px; margin-right: 10px; flex: 0 0 auto;"
                            :style="{ borderColor: !!year && year.length <= 4 ? 'rgb(134,248,171)' : 'white' }"
                            background-color="transparent">
              </v-text-field>

              <v-text-field solo flat label="MM"
                            class="input-round px-4"
                            required
                            :rules="rules.month"
                            v-model="month"
                            height="70px"
                            hide-details
                            style="width: 90px; margin-right: 10px; flex: 0 0 auto;"
                            :style="{ borderColor: !!month && month.length <= 2 ? 'rgb(134,248,171)' : 'white' }"
                            background-color="transparent">
              </v-text-field>

              <v-text-field solo flat label="DD"
                            class="input-round px-4"
                            required
                            :rules="rules.date"
                            v-model="date"
                            height="70px"
                            hide-details
                            style="width: 90px; flex: 0 0 auto;"
                            :style="{ borderColor: !!date && date.length <= 2 ? 'rgb(134,248,171)' : 'white' }"
                            background-color="transparent">
              </v-text-field>
            </v-layout>
          </v-form>

        </v-flex>

        <v-footer padless color="transparent" fixed v-if="valid">
          <v-flex xs12>
            <v-layout row justify-space-between class="mx-5 mb-5">
              <v-btn color="rgb(109,114,120)" fab width="58px" height="58px" @click="$router.back()"></v-btn>
              <v-btn color="rgb(134,248,171)" fab width="58px" height="58px" :to="{ name: 'SignUpEmailAndPwd' }"></v-btn>
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
    name: 'SignUpBirth',
    computed: {
      ...mapGetters('user', [ 'user' ]),
      year: {
        get () {
          return this.user.birthYear;
        },
        set (year) {
          this.setUser({ birthYear: year });
        }
      },
      month: {
        get () {
          return this.user.birthMonth;
        },
        set (month) {
          this.setUser({ birthMonth: month });
        }
      },
      date: {
        get () {
          return this.user.birthDate;
        },
        set (date) {
          this.setUser({ birthDate: date });
        }
      }
    },
    data () {
      return {
        valid: false,
        rules: {
          year: [v => !!v || '', v => v.length <= 4 || ''],
          month: [v => !!v || '', v => v.length <= 2 || ''],
          date: [v => !!v || '', v => v.length <= 2 || ''],
        }
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
    width: 220px;
    .v-input__slot {
      padding: 0 !important;
    }
    .v-text-field__slot {
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    label {
      text-overflow: unset;
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
