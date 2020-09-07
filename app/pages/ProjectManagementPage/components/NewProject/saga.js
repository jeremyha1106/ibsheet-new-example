import { call, put, takeLatest } from 'redux-saga/effects';
import * as projectAPIs from 'apis/projectApis';
import showNotification, {
  SUCCESS_TYPE,
} from 'components/BasicComponents/Notification';
import { push } from 'connected-react-router';
import { SETTING_PROJECT_URI } from 'constants/routes';
import * as actionFire from './actions';
import * as actions from './constants';

const getRequestClient = type => {
  switch (type) {
    case actions.SUBMIT_CREATE_PROJECT:
      return projectAPIs.createProject;
    default:
      return {};
  }
};

function* notificationHandler(actionType) {
  switch (actionType) {
    case actions.SUBMIT_CREATE_PROJECT:
      showNotification({
        type: SUCCESS_TYPE,
        messageKey: {
          id: 'notification.created.success',
          params: { name: 'projectManagement.label.project' },
        },
      });
      yield put(push(`${SETTING_PROJECT_URI}`));
      break;
    default:
      break;
  }
}

function* responseHandler(action, successAction, response) {
  switch (action.type) {
    default:
      if (successAction !== null) {
        yield put(successAction(response));
      }
      break;
  }
}

export function* functionSaga(successAction, failAction, action) {
  const { type, payload } = action;
  try {
    yield put(actionFire.updateLastAction(''));
    const response = yield call(getRequestClient(type), payload);

    yield call(responseHandler, action, successAction, response);
    yield call(notificationHandler, type);
    yield put(actionFire.updateLastAction(successAction().type));
  } catch (error) {
    console.error(error);
    yield put(failAction(error));
    yield put(actionFire.updateLastAction(failAction().type));
  }
}

export default function* newProjectSaga() {
  yield takeLatest(
    actions.SUBMIT_CREATE_PROJECT,
    functionSaga,
    actionFire.submitCreateProjectSuccess,
    actionFire.submitCreateProjectFailure,
  );
}
