import { handleActions } from 'redux-actions';
import { PAGE_SIZE_DEFAULT } from 'constants/common';
import {
  fetchProjectList,
  fetchProjectListSuccess,
  fetchProjectListFailure,
  selectProjectItem,
  updateLastAction,
  updateSearchStr,
  clearSearchForm,
} from './actions';

export const initialState = {
  projectList: [],
  lastAction: '',
  isLoading: false,
  errorMsg: '',
  projectItem: {},
  pagingConfig: {
    pageNum: 0, // pageNum save by server
    itemPerPage: PAGE_SIZE_DEFAULT,
    totalCount: 0,
    sortBy: '',
    direction: '',
    searchCriteria: '',
  },
  sortingConfig: {
    sortBy: '',
    direction: 'ASC',
  },
  searchStr: '',
  isResetSearchForm: false,
};

const projectReducer = handleActions(
  {
    [selectProjectItem]: (state, action) => ({
      ...state,
      projectItem: action.payload,
    }),

    [fetchProjectList]: state => ({
      ...state,
      isLoading: true,
      errorMsg: '',
    }),

    [fetchProjectListSuccess]: (state, action) => {
      const { content: projectList, totalElements, pageable } = action.payload;
      return {
        ...state,
        projectList,
        pagingConfig: {
          ...state.pagingConfig,
          totalCount: totalElements,
          pageNum: pageable.pageNumber,
        },
        isLoading: false,
        errorMsg: '',
      };
    },

    [fetchProjectListFailure]: (state, action) => {
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    },

    [updateLastAction]: (state, action) => ({
      ...state,
      lastAction: action.payload,
    }),

    [updateSearchStr]: (state, action) => ({
      ...state,
      searchStr: action.payload,
      isResetSearchForm: false,
    }),

    [clearSearchForm]: (state, action) => ({
      ...state,
      isResetSearchForm: action.payload,
    }),
  },

  initialState,
);

export default projectReducer;
