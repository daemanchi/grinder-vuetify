import Product from '../api/product';
import * as mutation from '../mutations/product';

const state = {
  productsMaxPage: 2,
  products: [
    {
      // done
      videoId: '7f8ALfNp-po',
      name: '건강한 씻을거리',
      price: 11000,
      introduce: '20,000명 이상의 피부 빅데이터를 분석하여 만든\n무방부제, 무계면활성제 저온숙성 고체형 씻을거리입니다.\n피부타입과 피부고민을 고려하여 25종으로 세분화하였습니다.',
      tags: [ '무방부제', '무계면활성제', '빅데이터' ],
      seasoningPoints: [
        '먹거리 원료로 1,000시간 숙성했어요',
        '색소를 사용하지 않고 빚어냈어요',
        '피부타입, 피부고민에 따라 골라 쓸 수 있어요',
      ],
      like: false,
      brand: {
        name: '톤28',
        brandId: 'toun28',
        profileImage: 'https://images.seoulstore.com/channels/5cb875ef0c7f69532f8b9c40a766ca06.jpg',
        introduce: '당신과 환경을 위한 바를거리 운동',
        follow: false,
      },
      comments: [
        { userName: '이재봉', text: '성분이 어떤지 궁금하네요' },
        { userName: '고유라', text: '설거지용으로 하나 쓰고있는데 손에 자극이 안 가서 좋아용' },
        { userName: '김수연', text: '저 이거 케일 써봤는데 향이 특이하고 강하더라구여' },
        { userName: '박상욱', text: '리뷰 보니까 더 사고 싶다' },
        { userName: '전성우', text: '애인 사줘야지' },
        { userName: '김사라', text: '빨리 배달해주세요 현기증나요' },
      ],
      reviews: [
      ]
    },
    {
      // done
      videoId: 'T_pC1tlNKic',
      name: '트라이앵글 티백 샘플러',
      price: 11000,
      introduce: '알디프의 모든 차를 맛볼 수 있는 샘플러입니다.\n알디프와 함께 나만의 차 취향을 찾아보세요.',
      tags: [ '선물', '휴식', '취향', '이야기가있는차' ],
      seasoningPoints: [
        'FSC 인증 식품지로 만든 케이스에 담겨 있어요',
        '차 설명서가 동봉되어 있어서 맛있게 즐길 수 있어요',
        '온도와 시간, 카페인 함량이 표기되어 있어요',
      ],
      like: false,
      brand: {
        name: '알디프',
        brandId: 'Altdif',
        profileImage: 'https://seasoning.s3.ap-northeast-2.amazonaws.com/aldif.jpg',
        introduce: '작은 습관의 변화를 통해 삶의 변화를 이끄는 감각적인 Tea & Life Style Brand',
        follow: false,
      },
      comments: [
        { userName: '박상욱', text: '리뷰 보니까 더 사고 싶다' },
        { userName: '이재봉', text: '알록달록하네' },
        { userName: '고유라', text: '선물해주려고 샀는데 까고보니 내가 갖구 싶어서 하나 더 삼' },
        { userName: '김사라', text: '빨리 배달해주세요 현기증나요' },
        { userName: '김수연', text: '스페이스 오디티 드셔보세여 개짱이에여' },
        { userName: '전성우', text: '애인 사줘야지' },
      ],
      reviews: [
      ]
    },
    {
      // done
      videoId: 'mqx4HE8Zuk4',
      name: 'pH 균형제',
      price: 28700,
      introduce: '기초 전, 유기농 히비스커스 꽃수와 아미노산, 썬 솔트 등\n최적의 성분 비율로 만든 균형제로\n피부의 pH와 영양 균형을 단단히 맞춰주세요.',
      tags: [ '피부균형', '유기농', '가볍고순한' ],
      seasoningPoints: [
        '트러블이 있는 피부에도 사용할 수 있어요',
        '진한 붉은 색이지만 피부에 착색되지 않아서 걱정없어요',
        '끈적임이 없어서 더운 날씨에도 좋아요',
      ],
      like: false,
      brand: {
        name: '톤28',
        brandId: 'toun28',
        profileImage: 'https://images.seoulstore.com/channels/5cb875ef0c7f69532f8b9c40a766ca06.jpg',
        introduce: '당신과 환경을 위한 바를거리 운동',
        follow: false,
      },
      comments: [
        { userName: '이재봉', text: '배송 개빨라여' },
        { userName: '고유라', text: '토너가 찐 히비스커스 색이네 개신기함' },
        { userName: '김수연', text: '이거 진짜 순한가여?' },
      ],
      reviews: [
      ]
    },
    {
      // done
      videoId: '1lBy8hyc330',
      name: '잇츠베러크래커 3종 세트',
      price: 9000,
      introduce: '우리밀로 구운 건강한 한끼 크래커!\n간식으로도 먹기 좋고, 가벼운 한끼 식사에도 적합합니다.',
      tags: [ '튀기지않은', '순식물성', '비건' ],
      seasoningPoints: [
        '영국채식협회에서 비건인증을 받았어요',
        '튀기지 않고 오븐에 구워서 건강한 간식으로 제격이에요',
        '3가지 모두 뚜렷한 개성이 있는 맛을 즐길 수 있어요',
      ],
      like: false,
      brand: {
        name: '잇츠베러',
        brandId: 'EatsBetter',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfuHmvcIBY9o7V5KUK6m8GXuM4ZblEsR06m26CRdAAXEzfQLi',
        introduce: '지속가능하고 균형잡힌,\n건강한 식습관을 위해',
        follow: false,
      },
      comments: [
        { userName: '고유라', text: '헐 비건인증 상품 찾기 힘든데' },
        { userName: '전성우', text: '비건인데 맛있나여?? 드셔보신분들 빨리빨리 말좀해주세요 저 사고싶은데 맛없으면 어떡하나 두려움' },
        { userName: '박상욱', text: '세봉지밖에 안 산게 후회되는 맛... 또살려고 또켰어요' },
      ],
      reviews: [
      ]
    },
    {
      // done
      videoId: 'soZd5tADi0E',
      name: '정기구독키트',
      price: 50000,
      introduce: '남들이 좋다고 하는 화장품이 나에게도 좋은 화장품일까요?\n단 하나뿐인 당신만을 위한 바를거리',
      tags: [ '전성분공개', '정확한진단', '친환경' ],
      seasoningPoints: [
        '친환경 종이 패키지를 사용했어요',
        '환경 변화에 따라 다른 성분의 바를거리가 28일 주기로 배송되어요',
        '프리미엄 제철원료의 좋은 성분만으로 만들어요',
      ],
      like: false,
      brand: {
        name: '톤28',
        brandId: 'toun28',
        profileImage: 'https://images.seoulstore.com/channels/5cb875ef0c7f69532f8b9c40a766ca06.jpg',
        introduce: '당신과 환경을 위한 바를거리 운동',
        follow: false,
      },
      comments: [
        { userName: '전성우', text: '구독하는 중인데 친절하게 잘 봐주셔서 좋았어요' },
        { userName: '고유라', text: '이거 구독하면 제 피부에서도 광 나나요' },
        { userName: '박상욱', text: '패키지가 종이인게 마음에 드네요!' },
        { userName: '김수연', text: '빨리 배달해주세요 현기증나요' },
      ],
      reviews: [
      ]
    },
    {
      // done
      videoId: 'OOG6sqBaQp4',
      name: '잇츠베러 마요미들 3종 세트',
      price: 12100,
      introduce: '계란을 넣지 않아 콜레스테롤이 0%!\n순식물성으로만 이루어져 있어 칼로리와 지방함량이 낮아\n안심하고 드실 수 있는 착한마요에요.',
      tags: [ 'NO콜레스테롤', '비건', '낮은칼로리', '다양한맛' ],
      seasoningPoints: [
        '휴대가 간편한 파우치 형태로, 가볍게 즐길 수 있어요',
        '지방 함량이 낮아서 걱정없이 먹을 수 있어요',
        '국내 최초이자 유일의 영국채식협회 비건인증 마요 제품이에요',
      ],
      like: false,
      brand: {
        name: '잇츠베러',
        brandId: 'EatsBetter',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfuHmvcIBY9o7V5KUK6m8GXuM4ZblEsR06m26CRdAAXEzfQLi',
        introduce: '지속가능하고 균형잡힌,\n건강한 식습관을 위해',
        follow: false,
      },
      comments: [
        { userName: '전성우', text: '마요네즈가 어케 비건이지 대박신기' },
        { userName: '김사라', text: '마요미 기요미' },
        { userName: '박상욱', text: '리뷰 보니까 더 사고 싶다' },
      ],
      reviews: [
      ]
    },
  ],
};

const getters = {
  products: state => state.products,
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
