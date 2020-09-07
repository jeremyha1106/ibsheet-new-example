import { createSelector } from 'reselect';
import dayjs from 'dayjs';

import { initialState } from './reducer';

const selectScheduler = state => state.scheduler || initialState;

export const selectCurrentMonth = createSelector(
  selectScheduler,
  schedulerState => schedulerState.currentMonth || dayjs().month(),
);

export const selectVisibleModal = createSelector(
  selectScheduler,
  schedulerState => schedulerState.visibleModal || false,
);

export const selectFilterConfig = createSelector(
  selectScheduler,
  schedulerState => schedulerState.filterConfig || {},
);

export const selectSelectedFilterForm = createSelector(
  selectScheduler,
  schedulerState => schedulerState.selectedFilterForm || '',
);
