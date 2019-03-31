import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:4000/',
  timeout: 850,
  headers: {
    authorization: `Bearer ${
      localStorage.getItem('token') ? localStorage.getItem('token') : null
    }`
  }
});

export default Axios;
