import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const getProjectState = state => state.project || initialState;

export const getProjectList = createSelector(
  getProjectState,
  projectState => projectState.projectList || [],
);

export const getProjectLoading = createSelector(
  getProjectState,
  projectState => projectState.isLoading || false,
);

export const getPagingConfig = createSelector(
  getProjectState,
  projectState => projectState.pagingConfig || {},
);

export const getLastAction = createSelector(
  getProjectState,
  projectState => projectState.lastAction || '',
);

export const getProjectItem = createSelector(
  getProjectState,
  projectState => projectState.projectItem || {},
);

export const getSeachStr = createSelector(
  getProjectState,
  projectState => projectState.searchStr || '',
);

export const getResetSearchForm = createSelector(
  getProjectState,
  projectState => projectState.isResetSearchForm || false,
);
