import { handleActions } from 'redux-actions';
import {
  submitCreateProject,
  submitCreateProjectFailure,
  submitCreateProjectSuccess,
} from './actions';
import { initialState } from './constants';

const newProjectReducer = handleActions(
  {
    [submitCreateProject]: state => ({
      ...state,
      isLoading: true,
      errorMsg: '',
    }),

    [submitCreateProjectSuccess]: (state, action) => {
      const { status } = action.payload;
      return {
        ...state,
        status,
        isLoading: false,
        errorMsg: '',
      };
    },

    [submitCreateProjectFailure]: (state, action) => {
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLoading: false,
        errorMsg,
      };
    },
  },
  initialState,
);

export default newProjectReducer;
