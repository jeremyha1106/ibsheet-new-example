/* eslint-disable no-nested-ternary */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SIGNIN_URI } from 'constants/routes';
import { useAuth } from 'containers/auth/useAuth';
import { useIntl } from 'react-intl';

// Protect the private url which allow the allowed/permission user
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, hasAccessPath } = useAuth() || {};
  const intl = useIntl();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && hasAccessPath(props.location) ? (
          <Component {...props} />
        ) : !isAuthenticated ? (
          <Redirect
            to={{
              pathname: SIGNIN_URI,
              state: { from: props.location },
            }}
          />
        ) : (
          <div>{intl.formatMessage({ id: 'error.common.accessDenied' })}</div>
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.any.isRequired,
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;
