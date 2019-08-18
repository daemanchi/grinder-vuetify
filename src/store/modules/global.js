import * as mutation from '../mutations/global';

const state = {
  tab: 'tour',
  tabs: [
    { value: 'tour', text: '둘러보기' },
    { value: 'collection', text: '모아보기' }
  ],
  appBar: true,
};

const getters = {
  tab: state => state.tab,
  tabs: state => state.tabs,
  appBar: state => state.appBar,
};

const actions = {
  selectTab ({ commit }, tab) { // 홈 화면 탭
    commit(mutation.SELECT_TAB, tab);
  },
  toggleAppBar ({ commit }, flag) {
    commit(mutation.TOGGLE_APP_BAR, flag);
  }
};

const mutations = {
  [mutation.SELECT_TAB] (state, tab) {
    state.tab = tab;
  },
  [mutation.TOGGLE_APP_BAR] (state, flag) {
    state.appBar = flag;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
