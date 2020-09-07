import { createAction } from 'redux-actions';
import {
  FETCH_SELECT_DATA,
  FETCH_SELECT_DATA_SUCCESS,
  FETCH_SELECT_DATA_FAILURE,
  CLEAR_LIST_DATA,
} from './constants';

export const getListData = createAction(FETCH_SELECT_DATA);
export const getListDataSuccess = createAction(FETCH_SELECT_DATA_SUCCESS);
export const getListDataFailure = createAction(FETCH_SELECT_DATA_FAILURE);

export const clearListData = createAction(CLEAR_LIST_DATA);
