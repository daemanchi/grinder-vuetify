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
      productLikesCount: 124,
      followerCount: 68,
      followingCount: 0,
      tags: [ '빅데이터', '피부균형', '유기농', '가볍고순한', '친환경' ],
      products: [
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      ],
      reviews: [
        { userName: '김수연', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
        { userName: '시즈니', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-aldif-3.gif' },
        { userName: '고유라', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-1.png' },
        { userName: '진저', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
      ]
    },
    {
      name: '알디프',
      brandId: 'Altdif',
      profileImage: 'https://yt3.ggpht.com/a/AGF-l7_aOhed5UntRntavWJfy_VrdiTDqL7udPh30Q=s288-c-k-c0xffffffff-no-rj-mo',
      cardImage: 'https://i3.ytimg.com/vi/T_pC1tlNKic/maxresdefault.jpg',
      introduce: '작은 습관의 변화를 통해 삶의 변화를 이끄는\n감각적인 Tea & Life Style Brand',
      follow: false,
      productLikesCount: 340,
      followerCount: 49,
      followingCount: 0,
      tags: [ '크루얼티프리', '비건', '친환경용기' ],
      products: [
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      ],
      reviews: [
        { userName: '김수연', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
        { userName: '시즈니', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-aldif-3.gif' },
        { userName: '고유라', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-1.png' },
        { userName: '진저', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
      ]
    },
    {
      name: '잇츠베러',
      brandId: 'EatsBetter',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfuHmvcIBY9o7V5KUK6m8GXuM4ZblEsR06m26CRdAAXEzfQLi',
      cardImage: 'https://i3.ytimg.com/vi/1lBy8hyc330/maxresdefault.jpg',
      introduce: '지속가능하고 균형잡힌,\n건강한 식습관을 위해',
      follow: false,
      productLikesCount: 193,
      followerCount: 58,
      followingCount: 89,
      tags: [ '크루얼티프리', '비건', '친환경용기' ],
      products: [
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      ],
      reviews: [
        { userName: '김수연', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-eatsbetter-2.png' },
        { userName: '시즈니', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-eatsbetter-1.png' },
        { userName: '고유라', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-1.png' },
        { userName: '진저', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
      ]
    },
    {
      name: '톤28',
      brandId: 'toun28',
      profileImage: 'https://images.seoulstore.com/channels/5cb875ef0c7f69532f8b9c40a766ca06.jpg',
      cardImage: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg',
      introduce: '당신과 환경을 위한 바를거리 운동',
      follow: false,
      productLikesCount: 124,
      followerCount: 49,
      followingCount: 0,
      tags: [ '빅데이터', '피부균형', '유기농', '가볍고순한', '친환경' ],
      products: [
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      ],
      reviews: [
        { userName: '김수연', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
        { userName: '시즈니', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-aldif-3.gif' },
        { userName: '고유라', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-1.png' },
        { userName: '진저', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
      ]
    },
    {
      name: '알디프',
      brandId: 'Altdif',
      profileImage: 'https://yt3.ggpht.com/a/AGF-l7_aOhed5UntRntavWJfy_VrdiTDqL7udPh30Q=s288-c-k-c0xffffffff-no-rj-mo',
      cardImage: 'https://i3.ytimg.com/vi/T_pC1tlNKic/maxresdefault.jpg',
      introduce: '작은 습관의 변화를 통해 삶의 변화를 이끄는\n감각적인 Tea & Life Style Brand',
      follow: false,
      productLikesCount: 0,
      followerCount: 0,
      followingCount: 0,
      tags: [ '크루얼티프리', '비건', '친환경용기' ],
      products: [
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      ],
      reviews: [
        { userName: '김수연', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
        { userName: '시즈니', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-aldif-3.gif' },
        { userName: '고유라', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-1.png' },
        { userName: '진저', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
      ]
    },
    {
      name: '잇츠베러',
      brandId: 'EatsBetter',
      profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfuHmvcIBY9o7V5KUK6m8GXuM4ZblEsR06m26CRdAAXEzfQLi',
      cardImage: 'https://i3.ytimg.com/vi/1lBy8hyc330/maxresdefault.jpg',
      introduce: '지속가능하고 균형잡힌,\n건강한 식습관을 위해',
      follow: false,
      productLikesCount: 0,
      followerCount: 0,
      followingCount: 0,
      tags: [ '크루얼티프리', '비건', '친환경용기' ],
      products: [
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
        { videoId: 'mqx4HE8Zuk4', image: 'https://i3.ytimg.com/vi/mqx4HE8Zuk4/maxresdefault.jpg' },
        { videoId: '7f8ALfNp-po', image: 'https://i3.ytimg.com/vi/7f8ALfNp-po/maxresdefault.jpg' },
        { videoId: 'soZd5tADi0E', image: 'https://i3.ytimg.com/vi/soZd5tADi0E/maxresdefault.jpg' },
      ],
      reviews: [
        { userName: '김수연', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-eatsbetter-2.png' },
        { userName: '시즈니', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-eatsbetter-1.png' },
        { userName: '고유라', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-1.png' },
        { userName: '진저', image: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/review-altdif-2.png' },
      ]
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
