import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Menu from 'antd/es/menu';
import Dropdown from 'components/BasicComponents/Dropdown';
// TODO: Make new Avatar component in BasicComponents
import Avatar from 'components/BasicComponents/Avatar';

import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { logout, getCurrentUserData } from 'store/user/actions';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
// import ChangePasswordComponent from 'components/ChangePasswordComponent';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'store/user/selectors';
import styles from './style.module.scss';

const ProfileMenu = props => {
  useEffect(() => {
    if (_isEmpty(props.user.userInfo)) {
      props.getCurrentUser();
    }
  }, []);

  const userInfo = get(props.user, 'userInfo', {});
  const originData = {
    email: get(userInfo, 'email', ''),
    name: get(userInfo, 'name', 'Anonymous'),
    role: get(userInfo, 'userRoles[0].name', ''),
    title: get(userInfo, 'title.code', ''),
    userName: get(userInfo, 'username', ''),
  };
  const avatar = get(userInfo, 'avatar', null);

  const onLogout = () => {
    const { history, logoutAction } = props;
    logoutAction({ history });
  };
  const addCount = () => {};

  const renderAvatar = () => (
    <Avatar
      imageClassName="squared"
      src={avatar}
      name={originData.name}
      size={48}
      isRounded={false}
    />
  );

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <strong>
          <FormattedMessage id="topBar.profileMenu.hello" />,{' '}
          {userInfo.name || 'Anonymous'}
        </strong>
        <div>
          <strong>
            <FormattedMessage id="topBar.profileMenu.role" />:{' '}
          </strong>
          {get(userInfo, 'userRoles[0].value', '')}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div>
          <strong>
            <FormattedMessage id="topBar.profileMenu.email" />:{' '}
          </strong>
          {get(userInfo, 'email', '')}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#" data-testid="edit-profile-clicker">
          <i className="fe fe-user mr-2" />
          <FormattedMessage id="topBar.profileMenu.editProfile" />
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a href="#" onClick={onLogout}>
          <i className="fe fe-log-out mr-2" />
          <FormattedMessage id="topBar.profileMenu.logout" />
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']} onVisibleChange={addCount}>
        <div className={styles.dropdown}>{renderAvatar()}</div>
      </Dropdown>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  logoutAction: logout,
  getCurrentUser: getCurrentUserData,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(ProfileMenu);
