import { createAction } from 'redux-actions';
import * as actionType from './constants';

export const showLoading = createAction(actionType.SHOW_APP_LOADING);

export const stopLoading = createAction(actionType.STOP_APP_LOADING);
