<template>
  <v-content class="iphone-padding-top iphone-padding-bottom">
    <v-container fluid fill-height px-0 pt-12 pb-0>
      <v-layout wrap justify-center>
        <v-form v-model="valid">
          <v-flex xs12 class="px-9 pt-4 text-center">

            <div style="color: white; font-size: 20px; font-weight: 500;" class="mb-10">이메일만 적으면 끝!</div>

            <v-text-field solo flat label="이메일"
                          class="input-round px-4"
                          required
                          :rules="[v => !!v || '', v => v.includes('@') || '']"
                          v-model="email"
                          height="70px"
                          hide-details
                          :style="{ borderColor: email && email.includes('@') ? 'rgb(134,248,171)' : 'white' }"
                          background-color="transparent">
            </v-text-field>

            <v-text-field solo flat label="비밀번호"
                          class="input-round px-4"
                          required
                          type="password"
                          :rules="[v => !!v || '']"
                          v-model="password"
                          height="70px"
                          hide-details
                          :style="{ borderColor: password ? 'rgb(134,248,171)' : 'white' }"
                          background-color="transparent">
            </v-text-field>

            <v-text-field solo flat label="비밀번호 확인"
                          class="input-round px-4"
                          required
                          type="password"
                          :rules="[v => !!v || '', v => v === password || '']"
                          v-model="passwordConfirm"
                          height="70px"
                          hide-details
                          :style="{ borderColor: valid ? 'rgb(134,248,171)' : password ? 'rgb(255,121,114)' : 'white' }"
                          background-color="transparent">
            </v-text-field>

          </v-flex>
        </v-form>

        <v-footer padless color="transparent" fixed v-if="email && password">
          <v-flex xs12>
            <v-layout row justify-end class="mx-5 mb-5">
              <v-btn color="rgb(109,114,120)" :style="{ backgroundImage: valid ? `linear-gradient( to bottom, rgb(253,174,195), rgb(255,121,114), rgb(255,243,73))` : 'none' }" fab width="58px" height="58px" @click="submit"></v-btn>
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
    name: 'SignUpEmailAndPwd',
    computed: {
      ...mapGetters('user', [ 'user' ]),
      email: {
        get () {
          return this.user.email;
        },
        set (email) {
          this.setUser({ email });
        }
      },
      password: {
        get () {
          return this.user.password;
        },
        set (password) {
          this.setUser({ password });
        }
      }
    },
    data () {
      return {
        valid: false,
        passwordConfirm: '',
      };
    },
    methods: {
      ...mapActions('user', [ 'setUser', 'signUpWithEmail', 'setAuth' ]),
      submit () {
        if (!this.valid) return false;
        else {
          this.signUpWithEmail({
            userId: this.email.split('@')[0],
            email: this.email,
            password: this.password,
            name: this.user.name,
            birthYear: this.user.birthYear,
            birthMonth: this.user.birthMonth,
            birthDate: this.user.birthDate,
          }).then(response => {
            // console.log(response);
            this.setUser(response.rspBody);
            this.setAuth(true);
            this.$router.push({ name: 'Home' })
          }).catch(err => {
            console.error(err);
          });
        }
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
    padding-bottom: env(safe-area-inset-bottom) !important;
    padding-bottom: constant(safe-area-inset-bottom) !important;
  }

  .input-round::v-deep {
    border-radius: 100px;
    border: 2px solid white;
    margin-bottom: 10px !important;
    width: 300px;
    .v-text-field__slot {
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    label {
      /*top: calc(50% - 15px) !important;*/
      /*left: auto !important;*/
      color: rgba(255,255,255,0.4);
      font-weight: 700;
      font-size: 18px;
      /*height: 31px;*/
      /*line-height: 31px;*/
    }
    input {
      color: white !important;
      font-weight: 700;
      font-size: 18px;
      /*text-align: center;*/
      max-height: unset;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      background-color: black !important;
      color: white !important;
      font-weight: 700;
      font-size: 18px;
      /*text-align: center;*/
      max-height: unset;
      /*border: 1px solid green;*/
      -webkit-text-fill-color: white;
      -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    }
  }

</style>
