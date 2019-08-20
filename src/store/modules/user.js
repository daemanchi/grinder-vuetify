import User from '../api/user';
import * as mutation from '../mutations/user';

const state = {
  auth: true,
  user: {
    seq: 1,
    userId: 'seasonee',
    name: '시즈니',
    email: 'seasoning.official@seasoning.tv',
    password: '',
    introduce: '더 편한 가치소비, 더 나은 세상',
    birthYear: '',
    birthMonth: '',
    birthDate: '',
    profileImage: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/seasonee.jpg',
    cardImage: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-craftlink-2.png',
    productLikesCount: 23,
    followerCount: 21,
    followingCount: 10,
    reviews: [
      { userName: '김수연', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
      { userName: '시즈니', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-aldif-3.gif' },
      { userName: '고유라', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-1.png' },
      { userName: '진저', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
    ],
    wishes: [
      { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
      { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
      { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
      { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
      { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
    ],
    purchases: [
      { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
      { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
      { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
      { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
      { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
    ],
  }
};

const getters = {
  auth: state => state.auth,
  user: state => state.user,
};

const actions = {
  setAuth ({ commit }, flag) {
    commit(mutation.SET_AUTH, flag);
  },
  setUser ({ commit }, user) {
    commit(mutation.SET_USER, user);
  },
  signUpWithEmail (context, { userId, password, email, name, birthYear, birthMonth, birthDate }) {
    let payload = {
      email,
      name,
      birthYear,
      birthMonth,
      birthDate,
    };
    return User.postUsersSignUp(userId, password, JSON.stringify(payload));
  },
  selectUser (context, userId) {
    return User.getUserProfile(userId);
  }
};

const mutations = {
  [mutation.SET_AUTH] (state, flag) {
    state.auth = flag;
  },
  [mutation.SET_USER] (state, rspBody) {
    Object.assign(state.user, rspBody);
    if (rspBody.userInfo) {
      Object.assign(state.user, rspBody.userInfo);
      if (rspBody.userInfo.payload) Object.assign(state.user, JSON.parse(rspBody.userInfo.payload));
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
