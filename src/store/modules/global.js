import * as mutation from '../mutations/global';

const state = {
  tab: 'tour',
  tabs: [
    { value: 'tour', text: '둘러보기' },
    { value: 'collection', text: '모아보기' }
  ],
  transition: 'profile-in-transition',
};

const getters = {
  tab: state => state.tab,
  tabs: state => state.tabs,
  transition: state => state.transition,
};

const actions = {
  selectTab ({ commit }, tab) { // 홈 화면 탭
    commit(mutation.SELECT_TAB, tab);
  },
  setTransition ({ commit }, transition) { // 라우터 트랜지션
    commit(mutation.SET_TRANSITION, transition);
  }
};

const mutations = {
  [mutation.SELECT_TAB] (state, tab) {
    state.tab = tab;
  },
  [mutation.SET_TRANSITION] (state, transition) {
    state.transition = transition;
    return Promise.resolve();
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
