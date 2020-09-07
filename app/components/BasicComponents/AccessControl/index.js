import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
import { useAuth } from 'containers/auth/useAuth';

function AccessControl({ resource, allowPermissions, children }) {
  const { hasAccessPermission, hasAccessListPermissions } = useAuth();
  let hasAccess;
  if (isString(allowPermissions)) {
    hasAccess = hasAccessPermission(resource, allowPermissions);
  } else {
    hasAccess = hasAccessListPermissions(resource, allowPermissions);
  }
  return <>{hasAccess ? <Fragment>{children}</Fragment> : null}</>;
}

AccessControl.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  allowPermissions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  resource: PropTypes.string.isRequired,
};

AccessControl.defaultProps = {
  children: null,
  allowPermissions: [],
};

export default AccessControl;
