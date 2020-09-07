import { createAction } from 'redux-actions';
import {
  SUBMIT_CREATE_PROJECT,
  SUBMIT_CREATE_PROJECT_FAILURE,
  SUBMIT_CREATE_PROJECT_SUCCESS,
  UPDATE_LAST_ACTION,
} from './constants';

export const submitCreateProject = createAction(SUBMIT_CREATE_PROJECT);
export const submitCreateProjectSuccess = createAction(
  SUBMIT_CREATE_PROJECT_SUCCESS,
);
export const submitCreateProjectFailure = createAction(
  SUBMIT_CREATE_PROJECT_FAILURE,
);

export const updateLastAction = createAction(UPDATE_LAST_ACTION);
