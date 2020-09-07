import { call, put, takeLatest } from 'redux-saga/effects';
import showNotification, {
  SUCCESS_TYPE,
} from 'components/BasicComponents/Notification';
import * as projectAPIs from 'apis/projectApis';
import * as actionFire from './actions';
import * as actions from './constants';

function* getProjectSaga(action) {
  const { payload } = action;

  try {
    yield put(actionFire.updateLastAction(''));

    const response = yield call(projectAPIs.getProjectList, payload);

    yield put(actionFire.fetchProjectListSuccess(response));
    yield put(actionFire.updateLastAction(actions.FETCH_PROJECT_LIST_SUCCESS));
  } catch (error) {
    console.error(error);
    yield put(actionFire.fetchProjectListFailure(error));
    yield put(actionFire.updateLastAction(actions.FETCH_PROJECT_LIST_FAILURE));
  }
}

function* setActiveProjectSaga(action) {
  const { payload } = action;

  try {
    yield put(actionFire.updateLastAction(''));
    yield call(projectAPIs.setActiveProject, payload);

    showNotification({
      type: SUCCESS_TYPE,
      messageKey: {
        id: 'notification.update.success',
        values: { name: 'projectManagement.label.project' },
      },
    });
    yield put(actionFire.updateLastAction(actions.SET_ACTIVE_PROJECT_SUCCESS));
  } catch (error) {
    console.error(error);
  }
}

function* setInactiveProjectSaga(action) {
  const { payload } = action;

  try {
    yield put(actionFire.updateLastAction(''));
    yield call(projectAPIs.setInactiveProject, payload);

    showNotification({
      type: SUCCESS_TYPE,
      messageKey: {
        id: 'notification.update.success',
        values: { name: 'projectManagement.label.project' },
      },
    });
    yield put(
      actionFire.updateLastAction(actions.SET_INACTIVE_PROJECT_SUCCESS),
    );
  } catch (error) {
    console.error(error);
  }
}

export default function* projectManagementSaga() {
  yield takeLatest(actions.FETCH_PROJECT_LIST, getProjectSaga);
  yield takeLatest(actions.SET_ACTIVE_PROJECT, setActiveProjectSaga);
  yield takeLatest(actions.SET_INACTIVE_PROJECT, setInactiveProjectSaga);
}
