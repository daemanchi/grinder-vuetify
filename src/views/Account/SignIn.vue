<template>
  <v-content class="iphone-padding-top iphone-padding-bottom">
    <v-toolbar dense flat absolute color="transparent">
      <v-btn icon small @click="$router.go(-1)">
        <img src="@/assets/icons/icon-arrow-left@3x.png" alt="arrow-left"
             srcset="@/assets/icons/icon-arrow-left.png,
                     @/assets/icons/icon-arrow-left@2x.png 2x,
                     @/assets/icons/icon-arrow-left@3x.png 3x">
      </v-btn>
    </v-toolbar>

    <v-container fluid fill-height px-0 pt-12 pb-0>
      <v-layout wrap align-center justify-center>
        <v-flex xs12 class="px-9 text-center">
          <div style="color: white; font-size: 16px; font-weight: 500; letter-spacing: -.4px" class="mb-3">다시 오셨군요!</div>

          <v-form v-model="valid">
            <v-text-field solo flat label="EMAIL"
                          class="input-round px-4"
                          required
                          :rules="[v => !!v || '']"
                          v-model="email"
                          height="70px"
                          hide-details
                          background-color="transparent">
            </v-text-field>
            <v-text-field solo flat label="PASSWORD"
                          class="input-round px-4"
                          required
                          type="password"
                          :rules="[v => !!v || '']"
                          v-model="password"
                          height="70px"
                          hide-details
                          background-color="transparent">
            </v-text-field>
          </v-form>

          <v-btn block
                 color="rgb(29,214,146)"
                 :disabled="!valid || loading"
                 :loading="loading"
                 height="70px"
                 @click="submit"
                 style="color: white; font-size: 17px; font-weight: 700; border-radius: 100px;">
            로그인
          </v-btn>

          <v-btn text class="mt-3"
                 color="rgb(255,243,73)"
                 height="32px"
                 style="font-size: 12px; letter-spacing: -.5px;">
            비밀번호를 까먹었어요 ㅠㅠ
          </v-btn>

          <v-layout row justify-center class="social-holder">
            <img src="@/assets/img/login-kakaotalk@3x.png" alt="kakao"
                 srcset="@/assets/img/login-kakaotalk.png,
                         @/assets/img/login-kakaotalk@2x.png 2x,
                         @/assets/img/login-kakaotalk@3x.png 3x">
            <img src="@/assets/img/login-naver@3x.png" alt="naver"
                 srcset="@/assets/img/login-naver.png,
                         @/assets/img/login-naver@2x.png 2x,
                         @/assets/img/login-naver@3x.png 3x">
            <img src="@/assets/img/login-facebook@3x.png" alt="facebook"
                 srcset="@/assets/img/login-facebook.png,
                         @/assets/img/login-facebook@2x.png 2x,
                         @/assets/img/login-facebook@3x.png 3x">
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'SignIn',
    data () {
      return {
        valid: false,
        loading: false,
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions('user', [ 'setAuth', 'setUser', 'selectUser' ]),
      submit () {
        this.selectUser(this.email.split('@')[0]).then(response => {
          console.log(response);
          this.setUser(response.rspBody);
          this.setAuth(true);
          this.$router.push({ name: 'Home' });
        }).catch(err => {
          console.error(err);
        })
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
    label {
      color: rgba(255,255,255,0.4);
      font-weight: 500;
      font-size: 18px;
    }
    input {
      color: white !important;
      font-weight: 500;
      font-size: 18px;
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

  .theme--light.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgb(109,114,120) !important;
    color: white !important;
  }

  .social-holder {
    margin-top: 20px;
    img + img {
      margin-left: 23px;
    }
  }
</style>
