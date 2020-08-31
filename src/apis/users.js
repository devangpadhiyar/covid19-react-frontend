import axios, { getAuthConfig } from './baseAxios';

export const getUserDetails = async () => {
  const response = await axios.get('/users/user-details', getAuthConfig());
  return response;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post('/users/signin', { email, password });
  return response;
};

export const registerUser = async ({
  email,
  firstName,
  lastName,
  password,
  password2,
  country,
}) => {
  const response = await axios.post('/users/signup', {
    email,
    firstName,
    lastName,
    password,
    password2,
    country,
  });
  return response;
};
