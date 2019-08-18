import axios from 'axios';

export default {
  getBrandsProfile (brandId) {
    return new Promise((resolve, reject) => {
      axios.get(`/brands/${brandId}/profile`).then((response) => {
        if (response.data) resolve(response.data);
        reject(response);
      }).catch(reject);
    });
  }
}
