import axios from 'axios';

export default {
  getReviews (pageNum) {
    return new Promise((resolve, reject) => {
      axios.get(`/reviews`, {
        params: {
          limit: 3,
          pageNum,
        }
      }).then((response) => {
        if (response.data) resolve(response.data);
        reject(response);
      }).catch(reject);
    });
  }
}
