import { LOGIN, LOGOUT, GET_CURRENT_USER } from 'constants/apiUrl';
import * as auth from 'utils/authHelper';
import { loginApiClient as apiClient } from './apiClient';

export const FIELDS = {
  LOGIN_ID: 'username',
  PASSWORD: 'password',

  ACCESS_TOKEN: 'token',
  ACCESS_TOKEN_EXPIRE_IN: 'expiresIn',
  REFRESH_TOKEN: 'refreshToken',
  REFRESH_TOKEN_EXPIRE_IN: 'refreshExpiresIn',

  JWT_USER: 'userInfo',
  JWT_PROJECT: 'lastProject',

  USER_ID: 'userId',
};

export const login = params =>
  apiClient
    .post(LOGIN, {
      [FIELDS.LOGIN_ID]: params[FIELDS.LOGIN_ID],
      [FIELDS.PASSWORD]: params[FIELDS.PASSWORD],
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(err) {
      console.error('Error login', err);
      throw err;
    });

export const logout = () => {
  const refreshToken = auth.getRefreshToken();
  return apiClient
    .post(LOGOUT, { refreshToken })
    .then(function(response) {
      return response.data;
    })
    .catch(function(err) {
      console.error('Error logout', err);
      throw err;
    });
};

export const getCurrentUser = () =>
  apiClient
    .get(GET_CURRENT_USER)
    .then(response => response.data)
    .catch(err => {
      console.error('Error get current user:', err);
      throw err;
    });
