import { handleActions } from 'redux-actions';
import {
  getListData,
  getListDataSuccess,
  getListDataFailure,
  clearListData,
} from './actions';
import { INITIAL_STATE } from './constants';

export const initialState = INITIAL_STATE;

const multiSelectReducer = handleActions(
  {
    [getListData]: state => ({
      ...state,
      isLoading: true,
    }),
    [getListDataSuccess]: (state, action) => ({
      ...state,
      isLoading: false,
      selectList: action.payload,
    }),
    [getListDataFailure]: state => ({
      ...state,
      isLoading: false,
    }),
    [clearListData]: state => ({
      ...state,
      selectList: [],
    }),
  },
  initialState,
);

export default multiSelectReducer;
