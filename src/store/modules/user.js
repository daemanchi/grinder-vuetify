import User from '../api/user';
import * as mutation from '../mutations/user';

const state = {
  auth: true,
  user: {
    seq: 7, //temp
    userId: 'testuser', //temp
    name: '',
    email: '',
    password: '',
    introduce: '',
    birthYear: '',
    birthMonth: '',
    birthDate: '',
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
  [mutation.SET_USER] (state, user) {
    Object.assign(state.user, user);
    if (user.payload) Object.assign(state.user, JSON.parse(user.payload));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
