import axios from 'axios';

export default {
  postUsersSignUp (userId, password, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/users/signUp`, {
        user: {
          userId,
          password,
          payload
        }
      }).then((response) => {
        if (response.data) resolve(response.data);
        reject(response);
      }).catch(reject);
    });
  },
  getUserProfile (userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/${userId}/profile`).then((response) => {
        if (response.data) resolve(response.data);
        reject(response);
      }).catch(reject);
    });
  }
}
