import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoading = state => state.appLoading || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectLoading,
    appLoading => appLoading.isLoading,
  );

export { selectLoading, makeSelectLoading };
