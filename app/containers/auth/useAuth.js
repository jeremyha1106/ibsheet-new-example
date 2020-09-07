import React, { useContext, createContext } from 'react';
// import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import { SYS_ADMIN_ROLE } from 'store/user/constants';
import { initialState } from 'store/user/reducer';
import { loadAuthInfoFromStorage } from 'store/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from 'utils/authHelper';
import {
  hasAccessPath,
  hasAccessPermission,
  getPermissions,
  hasAccessListPermissions,
} from './helpers';

// Using HOOK to pass the auth info
const authContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  // TODO: currently we can not register global saga at configureStore.js. So add here for temporary
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    isSystemAdmin,
    userProfile,
    menuPaths,
  } = useSelector(state => {
    const user = state.user || initialState;
    return {
      isAuthenticated: !isNull(user.profile),
      isSystemAdmin:
        !isNull(user.profile) &&
        !isNull(user.profile.roles) &&
        user.profile.roles.indexOf(SYS_ADMIN_ROLE) !== -1,
      userProfile: user.profile,
      menuPaths: user.menuPaths,
    };
  });

  // If can not get user info from app state , trying to get from cookie and localstorage
  if (!isAuthenticated && getAccessToken()) {
    dispatch(loadAuthInfoFromStorage());
    return <></>;
  }

  const auth = {
    isAuthenticated,
    isSystemAdmin,
    hasAccessPermission: hasAccessPermission.bind(this, userProfile),
    hasAccessPath: hasAccessPath.bind(this, menuPaths),
    hasAccessListPermissions: hasAccessListPermissions.bind(
      this,
      getPermissions(userProfile),
    ),
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
