import { SHOW_APP_LOADING, STOP_APP_LOADING, INITIAL_STATE } from './constants';

export const initialState = INITIAL_STATE;

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_APP_LOADING:
      return { ...state, isLoading: true };
    case STOP_APP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default LoadingReducer;
