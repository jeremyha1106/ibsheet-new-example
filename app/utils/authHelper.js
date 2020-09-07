import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER_INFO,
  PROJECT_INFO,
  PROJECT_ITEM,
  MENU,
  DASHBOARD_ACCESS,
} from 'constants/common';
import cookies from './cookies';

export const clearUserCredential = () => {
  clearAccessToken();
  clearRefreshToken();
  clearUserInfo();
  clearProjectInfo();
  clearUserMenuPaths();
  clearAccessDashboard();
  clearProjectItem();
};

// setItem
export const setAccessToken = (accessToken, accessTokenExpiresIn) => {
  cookies.setItem(ACCESS_TOKEN, accessToken, accessTokenExpiresIn);
};

export const setRefreshToken = refreshToken => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const setUserInfo = userInfo => {
  localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
};

export const setProjectInfo = projectInfo => {
  localStorage.setItem(PROJECT_INFO, JSON.stringify(projectInfo));
};

export const setProjectItem = projectItem => {
  localStorage.setItem(PROJECT_ITEM, JSON.stringify(projectItem));
};

export const setUserMenuPaths = menuPaths => {
  localStorage.setItem(MENU, JSON.stringify(menuPaths));
};

export const setAccessDashboard = isAccess => {
  localStorage.setItem(DASHBOARD_ACCESS, isAccess);
};

// getItem
export const getAccessToken = () => cookies.getItem(ACCESS_TOKEN);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO);
  if (userInfo) {
    return JSON.parse(userInfo);
  }

  return null;
};

export const getProjectInfo = () => {
  const userProjectInfo = localStorage.getItem(PROJECT_INFO);
  if (userProjectInfo) {
    return JSON.parse(userProjectInfo);
  }

  return null;
};

export const getProjectItem = () => {
  const projectItem = localStorage.getItem(PROJECT_ITEM);
  if (projectItem) {
    return JSON.parse(projectItem);
  }

  return null;
};

export const getUserMenuPaths = () => {
  const userMenuPaths = localStorage.getItem(MENU);
  if (userMenuPaths) {
    return JSON.parse(userMenuPaths);
  }

  return null;
};

export const getAccessDashboard = () => localStorage.getItem(DASHBOARD_ACCESS);

// another action
export const clearAccessToken = () => {
  cookies.removeItem(ACCESS_TOKEN);
};

export const clearRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN);
};

export const clearUserInfo = () => {
  localStorage.removeItem(USER_INFO);
};

export const clearProjectInfo = () => {
  localStorage.removeItem(PROJECT_INFO);
};

export const clearProjectItem = () => {
  localStorage.removeItem(PROJECT_ITEM);
};

export const clearUserMenuPaths = () => {
  localStorage.removeItem(MENU);
};

export const clearAccessDashboard = () => {
  localStorage.removeItem(DASHBOARD_ACCESS);
};
