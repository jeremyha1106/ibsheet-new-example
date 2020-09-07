import { call, put, takeLatest } from 'redux-saga/effects';
import * as selectApi from 'apis/commonSelectApi';
import { getListDataSuccess, getListDataFailure } from './actions';
import { FETCH_SELECT_DATA } from './constants';

function* getSelectList({ payload }) {
  try {
    const response = yield call(selectApi.getSelectList, payload);

    yield put(getListDataSuccess(response));
  } catch (error) {
    yield put(getListDataFailure(error));
  }
}

export default function* multiSelectSaga() {
  yield takeLatest(FETCH_SELECT_DATA, getSelectList);
}
