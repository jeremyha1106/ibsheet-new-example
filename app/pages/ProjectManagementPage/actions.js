/*
 *
 * Project Management actions
 *
 */
import { createAction } from 'redux-actions';
import * as actionType from './constants';

export const fetchProjectList = createAction(actionType.FETCH_PROJECT_LIST);
export const fetchProjectListSuccess = createAction(
  actionType.FETCH_PROJECT_LIST_SUCCESS,
);
export const fetchProjectListFailure = createAction(
  actionType.FETCH_PROJECT_LIST_FAILURE,
);
export const selectProjectItem = createAction(actionType.SELECT_PROJECT_ITEM);

export const changeStatusProject = createAction(
  actionType.CHANGE_STATUS_PROJECT,
);
export const changeStatusProjectSuccess = createAction(
  actionType.CHANGE_STATUS_PROJECT_SUCCESS,
);
export const changeStatusProjectFailure = createAction(
  actionType.CHANGE_STATUS_PROJECT_FAILURE,
);

export const setActiveProject = createAction(actionType.SET_ACTIVE_PROJECT);
export const setActiveProjectSuccess = createAction(
  actionType.SET_ACTIVE_PROJECT_SUCCESS,
);
export const setActiveProjectFailure = createAction(
  actionType.SET_ACTIVE_PROJECT_FAILURE,
);

export const setInactiveProject = createAction(actionType.SET_INACTIVE_PROJECT);
export const setInactiveProjectSuccess = createAction(
  actionType.SET_INACTIVE_PROJECT_SUCCESS,
);
export const setInactiveProjectFailure = createAction(
  actionType.SET_INACTIVE_PROJECT_FAILURE,
);

export const updateLastAction = createAction(actionType.UPDATE_LAST_ACTION);
export const updateSearchStr = createAction(actionType.UPDATE_SEARCH_STR);
export const clearSearchForm = createAction(actionType.CLEAR_SEARCH_FORM);
