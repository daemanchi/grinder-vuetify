import Product from '../api/product';
import * as mutation from '../mutations/product';

const state = {
  productsPage: 1,
  productsMaxPage: 2,
  products: [],
};

const getters = {
  products: state => state.products,
};

const actions  = {
  selectProducts ({ commit }, page) {
    // 상품 목록
    if (page <= state.productsMaxPage) {
      return Product.getProducts(page).then(response => {
        commit(mutation.SELECT_PRODUCTS, { page, response });
      }).catch(err => {
        console.error(err);
      });
    }
  },
};

const mutations = {
  [mutation.SELECT_PRODUCTS] (state, { page, response }) {
    state.productsPage = page;
    page === 1 ? state.products = response.rspBody : state.products.push(...response.rspBody);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
