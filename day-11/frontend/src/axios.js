import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sheryians-backend-z7p9.onrender.com/api',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
export default instance;
