import { all } from 'redux-saga/effects';
import saga from 'store/user/saga';
import projectManagementSaga from 'pages/ProjectManagementPage/saga';
import newProjectSaga from 'pages/ProjectManagementPage/components/NewProject/saga';
import multiSelectSaga from 'containers/AutoCompleteSelectContainer/saga';

export default function* rootSaga() {
  yield all([
    saga(),
    projectManagementSaga(),
    newProjectSaga(),
    multiSelectSaga(),
  ]);
}
