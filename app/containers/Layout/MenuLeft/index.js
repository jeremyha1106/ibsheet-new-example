import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MenuLeft from 'components/LayoutComponents/Menu/MenuLeft';
import { makeCurrentUserData } from 'store/user/selectors';
import * as auth from 'utils/authHelper';
import { menuData } from './menuData';

function MenuLeftContainer(props) {
  const { location, dispatch } = props;
  const projectInfo = auth.getProjectInfo();

  const menuLeftData = menuData.map(item => {
    const newItem = { ...item };

    if (projectInfo) {
      Object.keys(item).forEach(key => {
        // pass projectId to redirect to correct url
        if (typeof item[key] === 'function') {
          newItem[key] = item[key](projectInfo.id);
        }
      });
    }
    return newItem;
  });

  return (
    <MenuLeft
      menuData={menuLeftData}
      location={location}
      dispatch={dispatch}
      {...props}
    />
  );
}

const mapStateToProps = state => ({
  isMenuCollapsed: state.settings.isMenuCollapsed,
  isMobileView: state.settings.isMobileView,
  isMobileMenuOpen: state.settings.isMobileMenuOpen,
  isMenuUnfixed: state.settings.isMenuUnfixed,
  isMenuShadow: state.settings.isMenuShadow,
  leftMenuWidth: state.settings.leftMenuWidth,
  menuColor: state.settings.menuColor,
  logo: state.settings.logo,
  role: state.user.role,
  userInfo: makeCurrentUserData(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(MenuLeftContainer),
);
