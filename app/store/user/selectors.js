import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUser = state => state.user || initialState;

const makeSelectUser = () =>
  createSelector(
    selectUser,
    user => user,
  );

const makeSelectUserProfile = () =>
  createSelector(
    selectUser,
    user => user.profile,
  );

const makeSelectRoles = () =>
  createSelector(
    selectUser,
    user => user.profile && user.profile.roles,
  );

const selectLoginResult = state =>
  (state.user && state.user.loginResult) || initialState.loginResult;

const makeUserProfile = () =>
  createSelector(
    selectUser,
    user => user.profile,
  );

const makeUserMenuPaths = () =>
  createSelector(
    selectUser,
    user => user.menuPaths,
  );

const makeUserProject = () =>
  createSelector(
    selectUser,
    user => user.projectInfo,
  );

const makeSelectLoginLoading = () =>
  createSelector(
    selectLoginResult,
    loginResult => loginResult.loading,
  );

const makeSelectLoginError = () =>
  createSelector(
    selectLoginResult,
    loginResult => loginResult.error,
  );

const makeCurrentUserData = createSelector(
  selectUser,
  userState => userState.userInfo || {},
);

export const getUserList = createSelector(
  selectUser,
  state => state.listUser || [],
);

export const getUserListAssign = createSelector(
  selectUser,
  state => state.listUserAssign || [],
);

export const getTotalCountUser = createSelector(
  selectUser,
  state => state.totalCountUser || 0,
);

export const getIsLoading = createSelector(
  selectUser,
  state => state.isLoading || false,
);

export {
  makeSelectUser,
  makeSelectRoles,
  makeSelectUserProfile,
  makeSelectLoginLoading,
  makeUserProfile,
  makeUserProject,
  makeSelectLoginError,
  makeUserMenuPaths,
  makeCurrentUserData,
};
