/*
 *
 * Scheduler actions
 *
 */
import { createAction } from 'redux-actions';

import * as actionsType from './constants';

export const prevMonthAction = createAction(actionsType.PREV_MONTH_ACTION);
export const nextMonthAction = createAction(actionsType.NEXT_MONTH_ACTION);
export const currentMonthAction = createAction(
  actionsType.CURRENT_MONTH_ACTION,
);

export const toggleModal = createAction(actionsType.TOGGLE_MODAL);
export const setSelectedFilterForm = createAction(
  actionsType.SET_SELECTED_FILTER_FORM,
);
export const updateFilterConfig = createAction(
  actionsType.UPDATE_FILTER_CONFIG,
);
