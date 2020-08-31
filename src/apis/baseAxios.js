import axios from 'axios';
import Cookies from 'universal-cookie';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.validateStatus = (status) => {
  return status >= 200 && status < 500; // default
};
axios.interceptors.response.use(undefined, (error) => {
  switch (error.response.status) {
    default:
      break;
  }
  return Promise.reject(error);
});

export default axios;

export const getAuthConfig = () => {
  const cookies = new Cookies();
  const token = cookies.get('Authorization');
  return { headers: { Authorization: token } };
};
