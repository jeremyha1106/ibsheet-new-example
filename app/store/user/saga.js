import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-dom';
import history from 'utils/history';
import { SIGNIN_URI } from 'constants/routes';
import jwtDecode from 'jwt-decode';
import * as auth from 'utils/authHelper';
import * as userApis from 'apis/userApi';
import { get } from 'lodash';
import {
  LOGIN,
  LOGOUT,
  LOAD_AUTH_INFO_FROM_STORAGE,
  GET_CURRENT_USER_DATA,
  USER_STATUS,
} from './constants';
import {
  setUserProfile,
  setProjectInfo,
  loginSuccess,
  loginFailed,
  clearAppState,
  getCurrentUserDataSuccess,
} from './actions';
const { FIELDS } = userApis;

export function* loginSaga(action) {
  try {
    const response = yield call(userApis.login, action.payload);
    if (response.resultCode === 'OK' || response.token) {
      // TO DO Check Auth with Remember me
      const body = response;
      const tokenInfo = {
        accessToken: body[FIELDS.ACCESS_TOKEN],
        accessTokenExpiresIn: body[FIELDS.ACCESS_TOKEN_EXPIRE_IN],
        refreshToken: body[FIELDS.REFRESH_TOKEN],
        refreshTokenExpiresIn: body[FIELDS.REFRESH_TOKEN_EXPIRE_IN],
      };

      const jwtPayload = jwtDecode(tokenInfo.accessToken);

      // set token to cookie
      auth.setAccessToken(tokenInfo.accessToken, jwtPayload.exp);

      // TO DO Check Auth with Remember me
      // store refresh token
      if (tokenInfo.refreshToken) {
        auth.setRefreshToken(tokenInfo.refreshToken);
      }

      const userDataResponse = yield call(userApis.getCurrentUser);

      auth.setAccessDashboard(true);

      yield put(getCurrentUserDataSuccess(userDataResponse));

      yield put(loginSuccess(tokenInfo));
      const statusUser = get(userDataResponse, 'status.code');
      if (statusUser === USER_STATUS.DELETED) {
        auth.clearUserCredential();
        yield put(clearAppState());
        yield put(push(SIGNIN_URI));
      }
    }
  } catch (error) {
    yield put(loginFailed(error));
  }
}

export function* logoutSaga(action) {
  try {
    const response = yield call(userApis.logout, action.payload);
    if (response.resultCode === 'OK' || response === '') {
      auth.clearUserCredential();

      // clear app state
      yield put(clearAppState());

      // redirect to sign in page
      history.push(SIGNIN_URI);
    }
  } catch (error) {
    // force clear credential even logout failed
    auth.clearUserCredential();
    // yield put(logoutFailed(convertedError));

    // redirect to sign in page
    history.push(SIGNIN_URI);
  }
}

export function* handleCurrentUserData() {
  try {
    const response = yield call(userApis.getCurrentUser);
    if (response) {
      const lastProject = get(response, 'lastProject', auth.getProjectInfo());

      // set user info to localStorage
      auth.setUserInfo(response);
      // set project info to localStorage
      auth.setProjectInfo(lastProject);

      yield put(getCurrentUserDataSuccess(response));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* loadAuthInfoFromStorageSaga() {
  const userInfo = auth.getUserInfo();
  if (userInfo) {
    // set user profile
    yield put(setUserProfile(userInfo));
  }

  const projectInfo = auth.getProjectInfo();
  if (projectInfo) {
    // set user project
    yield put(setProjectInfo(projectInfo));
  }
}

export default function* userSagasWatcher() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(LOAD_AUTH_INFO_FROM_STORAGE, loadAuthInfoFromStorageSaga);
  yield takeLatest(GET_CURRENT_USER_DATA, handleCurrentUserData);
}
