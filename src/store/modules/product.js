import Product from '../api/product';
import * as mutation from '../mutations/product';

const state = {
  productsMaxPage: 2,
  products: [],
  currentProductIndex: 1,
};

const getters = {
  products: state => state.products,
  currentProductIndex: state => state.currentProductIndex,
};

const actions  = {
  // 상품 목록
  selectProducts ({ commit }, page) {
    if (page <= state.productsMaxPage) {
      return Product.getProducts(page).then(response => {
        response.rspBody.products.forEach(el => {
          el.payload = JSON.parse(el.payload);
        });
        commit(mutation.SELECT_PRODUCTS, { page, response });
      }).catch(err => {
        console.error(err);
      });
    }
  },
  toggleLikeProduct ({ commit }, { productSeq, requestUserId }) {
    return Product.postProductSeqLike(productSeq, requestUserId).then(response => {
      console.log(response);
      commit(mutation.TOGGLE_LIKE_PRODUCT, response);
    }).catch(err => {
      console.error(err);
    })
  }
};

const mutations = {
  [mutation.SELECT_PRODUCTS] (state, { page, response }) {
    state.productsMaxPage = response.rspBody.maxPage;
    state.productsPage = page;
    page === 1 ? state.products = response.rspBody.products : state.products.push(...response.rspBody.products);
  },
  [mutation.TOGGLE_LIKE_PRODUCT] (state, response) {
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
