import { createAction } from 'redux-actions';
import * as actionType from './constants';

export const login = createAction(actionType.LOGIN);

export const loginSuccess = createAction(actionType.LOGIN_SUCCESS);

export const loginFailed = createAction(actionType.LOGIN_FAILED);

export const logout = createAction(actionType.LOGOUT);

export const logoutSuccess = createAction(actionType.LOGOUT_SUCCESS);

export const logoutFailed = createAction(actionType.LOGOUT_FAILED);

export const setUserProfile = createAction(actionType.SET_USER_PROFILE);

export const setProjectInfo = createAction(actionType.SET_PROJECT_INFO);

export const setMenuPaths = createAction(actionType.SET_MENU_PATHS);

export const loadAuthInfoFromStorage = createAction(
  actionType.LOAD_AUTH_INFO_FROM_STORAGE,
);

export const clearAppState = createAction(actionType.CLEAR_APP_STATE);

export const getCurrentUserData = createAction(
  actionType.GET_CURRENT_USER_DATA,
);
export const getCurrentUserDataSuccess = createAction(
  actionType.GET_CURRENT_USER_DATA_SUCCESS,
);
export const getCurrentUserDataFailure = createAction(
  actionType.GET_CURRENT_USER_DATA_FAILURE,
);

export const fetchUserListAssign = createAction(
  actionType.FETCH_USER_LIST_ASSIGN,
);
export const fetchUserListAssignSuccess = createAction(
  actionType.FETCH_USER_LIST_ASSIGN_SUCCESS,
);
export const fetchUserListAssignFailure = createAction(
  actionType.FETCH_USER_LIST_ASSIGN_FAILURE,
);

export const fetchUserList = createAction(actionType.FETCH_USER_LIST);
export const fetchUserListSuccess = createAction(
  actionType.FETCH_USER_LIST_SUCCESS,
);
export const fetchUserListFailure = createAction(
  actionType.FETCH_USER_LIST_FAILURE,
);
export const resetListUserAssign = createAction(actionType.RESET_LIST_ASSIGNEE);

export const changePassword = createAction(actionType.CHANGE_PASSWORD);
export const updatePassword = createAction(actionType.UPDATE_PASSWORD);
