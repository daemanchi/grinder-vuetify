import axios from 'axios';

export default {
  getComments (productId, pageNum) {
    return new Promise((resolve, reject) => {
      axios.get(`/comments`, {
        params: {
          productId,
          limit: 10,
          pageNum,
        }
      }).then((response) => {
        if (response.data) resolve(response.data);
        reject(response);
      }).catch(reject);
    });
  },
  postComment (parentSeq, userSeq, commentText) {
    return new Promise((resolve, reject) => {
      axios.post(`/comments`, {
        comment: {
          parentSeq,
          payload: JSON.stringify({comment: commentText}),
          userSeq,
        }
      }).then((response) => {
        if (response.data) resolve(response.data);
        reject(response);
      }).catch(reject);
    });
  },
}
