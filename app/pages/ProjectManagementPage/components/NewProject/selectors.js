import { createSelector } from 'reselect';
import { initialState } from './constants';

const newProjectState = state => state.newProject || initialState;

export const makeInitForm = () =>
  createSelector(
    newProjectState,
    state => state.initForm,
  );
