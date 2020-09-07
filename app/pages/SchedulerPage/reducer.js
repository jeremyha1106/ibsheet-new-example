import { handleActions } from 'redux-actions';
import dayjs from 'dayjs';

import {
  prevMonthAction,
  nextMonthAction,
  currentMonthAction,
  toggleModal,
  updateFilterConfig,
  setSelectedFilterForm,
} from './actions';

export const initialState = {
  currentMonth: dayjs().month(),
  visibleModal: false,
  selectedFilterForm: 'dateRange',
  filterConfig: {
    dateRange: true,
    projects: false,
    resources: false,
    clients: false,
    allocationStatus: false,
  },
};

const projectManagementReducer = handleActions(
  {
    [prevMonthAction]: state => ({
      ...state,
      currentMonth: state.currentMonth - 1,
    }),

    [nextMonthAction]: state => ({
      ...state,
      currentMonth: state.currentMonth + 1,
    }),

    [currentMonthAction]: state => ({
      ...state,
      currentMonthAction: dayjs().month(),
    }),

    [toggleModal]: (state, action) => ({
      ...state,
      visibleModal: action.payload,
    }),

    [updateFilterConfig]: (state, action) => {
      const { field, value } = action.payload;

      return {
        ...state,
        filterConfig: {
          ...state.filterConfig,
          [field]: value,
        },
      };
    },

    [setSelectedFilterForm]: (state, action) => ({
      ...state,
      selectedFilterForm: action.payload,
    }),
  },
  initialState,
);

export default projectManagementReducer;
