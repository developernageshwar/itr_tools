import { postRequest } from './api';

export const loginAPI = (email, password) => {
  return postRequest('/login', { email, password });
};

export const registerAPI = (userData) => {
  return postRequest('/index', userData);
};
