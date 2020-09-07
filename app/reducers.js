/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import menuReducer from 'containers/App/menuReducer';
import schedulerReducer from 'pages/SchedulerPage/reducer';
import userReducer from 'store/user/reducer';
import settingsReducer from 'containers/App/settingsReducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import projectManagementReducer from 'pages/ProjectManagementPage/reducer';
import newProjectReducer from 'pages/ProjectManagementPage/components/NewProject/reducer';
import commonSelectReducer from 'containers/AutoCompleteSelectContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    menu: menuReducer,
    settings: settingsReducer,
    user: userReducer,
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    project: projectManagementReducer,
    newProject: newProjectReducer,
    commonMultiSelect: commonSelectReducer,
    scheduler: schedulerReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
