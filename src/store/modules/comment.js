import Comment from '../api/comment';
import * as mutation from '../mutations/comment';

const state = {};

const getters = {};

const actions = {
  selectComments (context, { productId, pageNum }) {
    return Comment.getComments(productId, pageNum)
  },
  createComment (context, { parentSeq, userSeq, commentText }) {
    return Comment.postComment(parentSeq, userSeq, commentText);
  },
};

const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
