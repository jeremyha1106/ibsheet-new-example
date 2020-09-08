/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import MenuLeftContainer from 'containers/Layout/MenuLeft';
import * as auth from 'utils/authHelper';
import MenuTop from './MenuTop';
import style from './style.module.scss';

const mapStateToProps = ({ settings }) => ({
  menuLayoutType: settings.menuLayoutType,
  isMobileMenuOpen: settings.isMobileMenuOpen,
  isMobileView: settings.isMobileView,
  leftMenuWidth: settings.leftMenuWidth,
});

class Menu extends React.PureComponent {
  touchStartPrev = 0;

  touchStartLocked = false;

  componentDidMount() {
    // mobile menu touch slide opener
    const unify = e => (e.changedTouches ? e.changedTouches[0] : e);
    document.addEventListener(
      'touchstart',
      e => {
        const x = unify(e).clientX;
        this.touchStartPrev = x;
        this.touchStartLocked = x > 70;
      },
      { passive: false },
    );
    document.addEventListener(
      'touchmove',
      e => {
        const x = unify(e).clientX;
        const prev = this.touchStartPrev;
        if (x - prev > 50 && !this.touchStartLocked) {
          this.toggleMobileMenu();
          this.touchStartLocked = true;
        }
      },
      { passive: false },
    );
  }

  toggleMobileMenu = () => {
    const { dispatch, isMobileMenuOpen } = this.props;
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMobileMenuOpen',
        value: !isMobileMenuOpen,
      },
    });
  };

  render() {
    const {
      isMobileMenuOpen,
      isMobileView,
      menuLayoutType,
      leftMenuWidth,
    } = this.props;
    const isAccessDashboard = auth.getAccessDashboard();

    const MenuView = () => {
      if (isMobileView) {
        return (
          <div>
            <div className={style.handler} onClick={this.toggleMobileMenu}>
              <div className={style.handlerIcon} />
            </div>
            <Drawer
              closable={false}
              visible={isMobileMenuOpen}
              placement="left"
              className={style.mobileMenu}
              onClose={this.toggleMobileMenu}
              maskClosable
              getContainer={null}
              width={leftMenuWidth}
            >
              <MenuLeftContainer />
            </Drawer>
          </div>
        );
      }
      if (menuLayoutType === 'top') {
        return <MenuTop />;
      }
      if (menuLayoutType === 'nomenu') {
        return null;
      }
      return <MenuLeftContainer />;
    };

    return MenuView();
  }
}

export default connect(mapStateToProps)(Menu);
