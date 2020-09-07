/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  hasAccessPath,
  hasAccessPermission,
  getPermissions,
  hasAccessListPermissions,
} from './helpers';

import {
  makeIsAuthenticated,
  makeIsSystemAdmin,
  makeUserProfile,
  makeUserMenuPaths,
} from './selectors';

// Using HOC to pass auth info to component
export default function withAuth(WrappedComponent) {
  const AuthComponent = ({
    userProfile,
    isAuthenticated,
    isSystemAdmin,
    menuPaths,
    ...rest
  }) => (
    <WrappedComponent
      isAuthenticated={isAuthenticated}
      isSystemAdmin={isSystemAdmin}
      hasAccessPath={hasAccessPath.bind(this, menuPaths)}
      hasAccessPermission={hasAccessPermission.bind(this, userProfile)}
      hasAccessListPermissions={hasAccessListPermissions.bind(
        this,
        getPermissions(userProfile),
      )}
      {...rest}
    />
  );

  AuthComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
    isSystemAdmin: PropTypes.bool,
    userProfile: PropTypes.object,
    menuPaths: PropTypes.object,
  };

  AuthComponent.defaultProps = {
    isAuthenticated: false,
    isSystemAdmin: false,
    userProfile: {},
    menuPaths: new Map(),
  };

  const mapStateToProps = createStructuredSelector({
    isAuthenticated: makeIsAuthenticated(),
    isSystemAdmin: makeIsSystemAdmin(),
    userProfile: makeUserProfile(),
    menuPaths: makeUserMenuPaths(),
  });

  return connect(mapStateToProps)(AuthComponent);
}
