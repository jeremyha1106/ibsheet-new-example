import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selector = state => state.commonMultiSelect || initialState;

const selectList = () =>
  createSelector(
    selector,
    state => state.selectList || [],
  );

const selectListLoading = () =>
  createSelector(
    selector,
    state => state.isLoading || false,
  );

export { selectList, selectListLoading };
