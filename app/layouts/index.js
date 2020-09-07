import React, { Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';

import {
  SIGNIN_URI,
  SCHEDULER_URI,
  NOT_ACCESS_URI,
  UPDATE_PASSWORD_URL,
} from 'constants/routes';

import Loader from 'components/LayoutComponents/Loader';
import * as auth from 'utils/authHelper';
import { USER_STATUS } from 'store/user/constants';

import PublicLayout from './Public';
import LoginLayout from './Login';
import MainLayout from './Main';

const Layouts = {
  public: PublicLayout,
  login: LoginLayout,
  main: MainLayout,
  updatePassword: LoginLayout,
};

class IndexLayout extends React.PureComponent {
  previousPath = '';

  componentDidUpdate(prevProps) {
    const currLocation = this.props.location;
    const prevLocation = prevProps.location;
    if (currLocation !== prevLocation) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      children,
      location: { pathname, search },
      user,
    } = this.props;

    // NProgress Management
    const currentPath = pathname + search;
    if (currentPath !== this.previousPath) {
      NProgress.start();
    }

    setTimeout(() => {
      NProgress.done();
      this.previousPath = currentPath;
    }, 200);

    // Layout Rendering
    const getLayout = () => {
      if (/^\/sign-in(?=\/|$)/i.test(pathname)) {
        return 'login';
      }

      if (/^\/update-password(?=\/|$)/i.test(pathname)) {
        return 'updatePassword';
      }
      return 'main';
    };
    const Container = Layouts[getLayout()];
    const isUserAuthorized = auth.getAccessToken() || auth.getRefreshToken();
    const isUserLoading = user.loading;
    const isLoginLayout = getLayout() === 'login';
    const userInfo = auth.getUserInfo();
    const isAccessDashboard = auth.getAccessDashboard();
    const statusUser = get(userInfo, 'status.code', '');

    // eslint-disable-next-line no-unused-vars
    const BootstrappedLayout = () => {
      // show loader when user in check authorization process, not authorized yet and not on login pages
      if (isUserLoading && !isUserAuthorized && !isLoginLayout) {
        return <Loader />;
      }
      // redirect to login page if current is not login page and user not authorized
      if (!isLoginLayout && !isUserAuthorized) {
        return <Redirect to={{ pathname: SIGNIN_URI }} />;
      }
      // redirect to main dashboard when user on login page and authorized
      if (isLoginLayout && isUserAuthorized) {
        // redirect to update password page because the status of user is inactive
        if (statusUser === USER_STATUS.INACTIVE) {
          return <Redirect to={UPDATE_PASSWORD_URL} />;
        }

        // redirect to 403 can not acess page because the user don't have any project
        if (isAccessDashboard === 'false') {
          return <Redirect to={NOT_ACCESS_URI} />;
        }

        return <Redirect to={`${SCHEDULER_URI}`} />;
      }

      return <Container>{children}</Container>;
    };

    return (
      <Fragment>
        <FormattedMessage id="common.title.template">
          {title => <Helmet title={title} titleTemplate={title} />}
        </FormattedMessage>
        {BootstrappedLayout()}
      </Fragment>
    );
  }
}

export default withRouter(connect(({ user }) => ({ user }))(IndexLayout));
