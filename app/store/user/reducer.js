import { handleActions } from 'redux-actions';

import {
  login,
  loginSuccess,
  loginFailed,
  setUserProfile,
  setProjectInfo,
  setMenuPaths,
  getCurrentUserDataSuccess,
  clearAppState,
  fetchUserListAssign,
  fetchUserListAssignFailure,
  fetchUserListAssignSuccess,
  fetchUserList,
  fetchUserListFailure,
  fetchUserListSuccess,
  resetListUserAssign,
} from './actions';

export const initialState = {
  loginResult: {
    loading: false,
    error: null,
  },
  tokenInfo: null,
  profile: null,
  projectInfo: null,
  menuPaths: null,
  userInfo: {},
  listUser: [],
  totalCountUser: 0,
  isLoading: false,
};

const userReducer = handleActions(
  {
    [login]: state => ({
      ...state,
      loginResult: {
        ...state.loginResult,
        loading: true,
        error: null,
      },
    }),

    [loginSuccess]: (state, action) => ({
      ...state,
      loginResult: {
        ...state.loginResult,
        loading: false,
      },
      tokenInfo: action.payload,
    }),

    [loginFailed]: (state, action) => ({
      ...state,
      loginResult: {
        ...state.loginResult,
        loading: false,
        error: action.payload,
      },
      tokenInfo: null,
    }),

    [setUserProfile]: (state, action) => ({
      ...state,
      profile: action.payload,
    }),

    [setProjectInfo]: (state, action) => ({
      ...state,
      projectInfo: action.payload,
    }),

    [setMenuPaths]: (state, action) => ({
      ...state,
      menuPaths: action.payload,
    }),

    [getCurrentUserDataSuccess]: (state, action) => {
      const { payload: userInfo } = action;
      return {
        ...state,
        userInfo,
      };
    },
    [clearAppState]: () => initialState,

    [fetchUserListAssign]: state => ({
      ...state,
      isLoading: true,
      errorMsg: '',
    }),

    [fetchUserListAssignSuccess]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listUserAssign: payload,
        isLoading: false,
        errorMsg: '',
      };
    },

    [fetchUserListAssignFailure]: (state, action) => {
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    },

    [fetchUserList]: state => ({
      ...state,
      isLoading: true,
      errorMsg: '',
    }),

    [fetchUserListSuccess]: (state, action) => {
      const { content, totalElements } = action.payload;
      return {
        ...state,
        listUser: content,
        totalCountUser: totalElements,
        isLoading: false,
        errorMsg: '',
      };
    },

    [fetchUserListFailure]: (state, action) => {
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    },

    [resetListUserAssign]: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        listUserAssign: payload,
      };
    },
  },

  initialState,
);

export default userReducer;
