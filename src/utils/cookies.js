import Cookies from 'js-cookie';

export const setAuthToken = (token) => {
  // Set cookie for 7 days, secure, and samesite strict
  Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'strict' });
};

export const getAuthToken = () => {
  return Cookies.get('auth_token');
};

export const removeAuthToken = () => {
  Cookies.remove('auth_token');
};

export const setUserData = (userData) => {
  Cookies.set('user_data', JSON.stringify(userData), { expires: 7, secure: true, sameSite: 'strict' });
};

export const getUserData = () => {
  const data = Cookies.get('user_data');
  return data ? JSON.parse(data) : null;
};

export const removeUserData = () => {
  Cookies.remove('user_data');
};
