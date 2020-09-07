import { createSelector } from 'reselect';
import { initialState } from 'store/user/reducer';
import isNull from 'lodash/isNull';
import { SYS_ADMIN_ROLE } from 'store/user/constants';
// Reuse from user selector
import { makeUserProfile, makeUserMenuPaths } from 'store/user/selectors';

const selectUser = state => state.user || initialState;

const makeIsAuthenticated = () =>
  createSelector(
    selectUser,
    user => !isNull(user.profile),
  );

const makeIsSystemAdmin = () =>
  createSelector(
    selectUser,
    user =>
      user.profile.roles && user.profile.roles.indexOf(SYS_ADMIN_ROLE) !== -1,
  );

export {
  makeIsAuthenticated,
  makeIsSystemAdmin,
  makeUserProfile,
  makeUserMenuPaths,
};
