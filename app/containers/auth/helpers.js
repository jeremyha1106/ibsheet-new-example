/* eslint-disable no-plusplus */
import { SYS_ADMIN_ROLE, NORMAL_USER_ROLE } from 'store/user/constants';
import { SYS_AD_PERMISSIONS, NORMAL_USER_PERMISSIONS } from './permissions';

// Checking permission of a user
export const hasAccessPermission = (userProfile = {}, resource, permission) => {
  if (!userProfile) return false;

  const { roles } = userProfile;
  if (!roles) return false;

  let result;
  if (roles.indexOf(SYS_ADMIN_ROLE) !== -1) {
    result = SYS_AD_PERMISSIONS[`${resource}:${permission}`];
    return result || false;
  }
  if (roles.indexOf(NORMAL_USER_ROLE) !== -1) {
    result = NORMAL_USER_PERMISSIONS[`${resource}:${permission}`];
    return result || false;
  }
  return false;
};

// Checking accessable path of a user
export const hasAccessPath = (menuPaths = {}, path) => {
  // Homepage is allow for access
  if (path && path.pathname === '/') return true;
  const result = menuPaths && menuPaths[path.pathname];
  return result;
};

export const getPermissions = userProfile => {
  if (!userProfile) return {};

  const { roles } = userProfile;
  if (!roles) return {};

  if (roles.indexOf(SYS_ADMIN_ROLE) !== -1) {
    return SYS_AD_PERMISSIONS;
  }
  if (roles.indexOf(NORMAL_USER_ROLE) !== -1) {
    return NORMAL_USER_PERMISSIONS;
  }
  return {};
};

export const hasAccessListPermissions = (
  permissionData,
  resource,
  permissions,
  operator = 'OR',
) => {
  if (
    permissionData === undefined ||
    resource === undefined ||
    permissions === undefined
  ) {
    return false;
  }

  let secRs = false;
  let flag;
  let checkPermissionId;
  let isInitSecRs = false;
  for (let i = 0; i < permissions.length; i++) {
    checkPermissionId = `${resource}:${permissions[i]}`;
    flag = permissionData[checkPermissionId];
    if (flag === undefined) {
      flag = false;
    }

    if (!isInitSecRs) {
      secRs = flag;
      isInitSecRs = true;
    } else if (operator === 'OR') {
      secRs = flag || secRs;
    } else if (operator === 'AND') {
      secRs = flag && secRs;
    }
  }

  return secRs;
};
