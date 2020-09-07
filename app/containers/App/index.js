/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SchedulerPage from 'pages/SchedulerPage';
import ProjectManagementPage from 'pages/ProjectManagementPage';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import LoginPage from 'pages/LoginPage';
import IndexLayout from 'layouts';
import {
  HOME_URI,
  DASHBOARD_URI,
  SIGNIN_URI,
  NOT_FOUND_URI,
  SCHEDULER_URI,
  PROJECT_URI,
} from 'constants/routes';

export default function App() {
  return (
    <IndexLayout>
      <Switch>
        <Route exact path={HOME_URI}>
          <Redirect to={DASHBOARD_URI} />
        </Route>
        <Route exact path={SCHEDULER_URI} component={SchedulerPage} />
        <Route exact path={PROJECT_URI} component={ProjectManagementPage} />
        <Route exact path={SIGNIN_URI} component={LoginPage} />

        <Route path={NOT_FOUND_URI} component={NotFoundPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </IndexLayout>
  );
}
