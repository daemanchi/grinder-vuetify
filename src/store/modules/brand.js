import Brand from '../api/brand';

const state = {

};

const getters = {

};

const actions = {
  selectBrand (context, brandId) {
    return Brand.getBrandsProfile(brandId);
  }
};

const mutations = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
