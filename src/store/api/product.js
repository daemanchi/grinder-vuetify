import axios from 'axios';

export default {
  getProducts (pageNum) {
    return new Promise((resolve, reject) => {
      axios.get(`/products`, {
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
