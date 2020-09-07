import axios from 'axios';
import clone from 'lodash/clone';
import { BASE_API_URL, LOGIN_API } from 'constants/appConfig';
import { SIGNIN_URI } from 'constants/routes';
import * as auth from 'utils/authHelper';
import jwtDecode from 'jwt-decode';
import {
  INVALID_CREDENTIAL_ERR,
  HTTP_AUTHORIZATION_HEADER,
} from 'apis/constants';
import showNotification, {
  ERROR_TYPE,
} from 'components/BasicComponents/Notification';
import errorConverter from 'apis/errorConverter';
import { GET_ACCESS_TOKEN, LOGIN } from 'constants/apiUrl';
import { API_TIMEOUT } from 'constants/common';

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export const loginApiClient = axios.create({
  baseURL: LOGIN_API,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export const downloadClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: API_TIMEOUT,
  responseType: 'blob', // important
});

const requestInterceptors = axiosConfig => {
  const config = clone(axiosConfig);
  if (
    config.url &&
    (config.url.indexOf(LOGIN) !== -1 ||
      config.url.indexOf(GET_ACCESS_TOKEN) !== -1)
  ) {
    // Dont pass token with public API
    return config;
  }
  const token = auth.getAccessToken();
  if (token) {
    config.headers[HTTP_AUTHORIZATION_HEADER] = `Bearer ${token}`;
  }

  return config;
};

// Add a request interceptor
apiClient.interceptors.request.use(
  axiosConfig => requestInterceptors(axiosConfig),
  error => {
    Promise.reject(error);
  },
);

loginApiClient.interceptors.request.use(
  axiosConfig => requestInterceptors(axiosConfig),
  error => {
    Promise.reject(error);
  },
);

const responseError = err => {
  const error = { ...err };
  const originalRequest = error.config;

  if (
    error.response.status === 401 &&
    originalRequest.url &&
    originalRequest.url.indexOf(GET_ACCESS_TOKEN) !== -1
  ) {
    auth.clearUserCredential();
    window.location.href = SIGNIN_URI;
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest.retry) {
    originalRequest.retry = true;
    const refreshToken = auth.getRefreshToken();
    if (refreshToken) {
      return apiClient
        .post(GET_ACCESS_TOKEN, {
          refreshToken,
        })
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            const payload = response.data;
            const { token } = payload;
            const jwtPayload = jwtDecode(token);
            auth.setAccessToken(token, jwtPayload.exp);
            return apiClient(originalRequest);
          }

          if (response.status === 401) {
            auth.clearUserCredential();
            window.location.href = SIGNIN_URI;
          }

          return null;
        });
    }
    if (originalRequest.url && originalRequest.url.indexOf(LOGIN) !== -1) {
      // if url is login - it means that credential is invalid
      error.code = 401;
      error.type = INVALID_CREDENTIAL_ERR;
    }
  } else if (error.response.status === 401) {
    auth.clearUserCredential();
    window.location.href = SIGNIN_URI;
  }
  const convertedError = errorConverter(error);
  showNotification({
    type: ERROR_TYPE,
    messageKey: { id: convertedError.messageKey },
  });
  return Promise.reject(error);
};

// Add a response interceptor
apiClient.interceptors.response.use(
  response => response,
  err => responseError(err),
);

loginApiClient.interceptors.response.use(
  response => response,
  err => responseError(err),
);

export default apiClient;
