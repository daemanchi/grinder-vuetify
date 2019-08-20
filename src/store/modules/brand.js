import Brand from '../api/brand';

const state = {
  brands: [
    {
      name: '톤28',
      brandId: 'toun28',
      profileImage: 'https://images.seoulstore.com/channels/5cb875ef0c7f69532f8b9c40a766ca06.jpg',
      cardImage: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg',
      introduce: '당신과 환경을 위한 바를거리 운동',
      follow: false,
    },
    {
      name: '알디프',
      brandId: 'Altdif',
      profileImage: 'https://yt3.ggpht.com/a/AGF-l7_aOhed5UntRntavWJfy_VrdiTDqL7udPh30Q=s288-c-k-c0xffffffff-no-rj-mo',
      cardImage: 'https://i3.ytimg.com/vi/T_pC1tlNKic/maxresdefault.jpg',
      introduce: '작은 습관의 변화를 통해 삶의 변화를 이끄는\n감각적인 Tea & Life Style Brand',
      follow: false,
    },
    {
      name: '잇츠베러',
      brandId: 'EatsBetter',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfuHmvcIBY9o7V5KUK6m8GXuM4ZblEsR06m26CRdAAXEzfQLi',
      cardImage: 'https://i3.ytimg.com/vi/1lBy8hyc330/maxresdefault.jpg',
      introduce: '지속가능하고 균형잡힌,\n건강한 식습관을 위해',
      follow: false,
    },
    {
      name: '톤28',
      brandId: 'toun28',
      profileImage: 'https://images.seoulstore.com/channels/5cb875ef0c7f69532f8b9c40a766ca06.jpg',
      cardImage: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg',
      introduce: '당신과 환경을 위한 바를거리 운동',
      follow: false,
    },
    {
      name: '알디프',
      brandId: 'Altdif',
      profileImage: 'https://yt3.ggpht.com/a/AGF-l7_aOhed5UntRntavWJfy_VrdiTDqL7udPh30Q=s288-c-k-c0xffffffff-no-rj-mo',
      cardImage: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg',
      introduce: '작은 습관의 변화를 통해 삶의 변화를 이끄는\n감각적인 Tea & Life Style Brand',
      follow: false,
    },
    {
      name: '잇츠베러',
      brandId: 'EatsBetter',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfuHmvcIBY9o7V5KUK6m8GXuM4ZblEsR06m26CRdAAXEzfQLi',
      cardImage: 'https://i3.ytimg.com/vi/OOG6sqBaQp4/maxresdefault.jpg',
      introduce: '지속가능하고 균형잡힌,\n건강한 식습관을 위해',
      follow: false,
    },
  ]
};

const getters = {
  brands: state => state.brands
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
