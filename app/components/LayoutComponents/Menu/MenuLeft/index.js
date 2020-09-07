import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import classNames from 'classnames';
import store from 'store';
import { Scrollbars } from 'react-custom-scrollbars';
import { find } from 'lodash';
import { getUserInfo } from 'utils/authHelper';
import get from 'lodash/get';
import { USER_ROLE } from 'store/user/constants';
import style from './style.module.scss';
// I've moved it to the Layout/MenuLeftContainer

// const mapStateToProps = ({ menu, settings, user }) => ({
//   menuData: menu.menuLeftData,
//   isMenuCollapsed: settings.isMenuCollapsed,
//   isMobileView: settings.isMobileView,
//   isMobileMenuOpen: settings.isMobileMenuOpen,
//   isMenuUnfixed: settings.isMenuUnfixed,
//   isMenuShadow: settings.isMenuShadow,
//   leftMenuWidth: settings.leftMenuWidth,
//   menuColor: settings.menuColor,
//   logo: settings.logo,
//   role: user.role,
// });

class MenuLeft extends React.Component {
  state = {
    selectedKeys: store.get('app.menu.selectedKeys') || [],
    openedKeys: store.get('app.menu.openedKeys') || [],
  };

  componentWillMount() {
    this.setSelectedKeys(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isMenuCollapsed && !newProps.isMobileView) {
      this.setState({
        openedKeys: [],
      });
    }
    this.setSelectedKeys(newProps);
  }

  setSelectedKeys = props => {
    const { menuData } = this.props;
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item);
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key));
        }
        return flattenedItems;
      }, []);
    const selectedItem = find(flattenItems(menuData, 'children'), [
      'url',
      props.location.pathname,
    ]);
    this.setState({
      selectedKeys: selectedItem ? [selectedItem.key] : [],
    });
  };

  onCollapse = (value, type) => {
    const { dispatch, isMenuCollapsed } = this.props;
    if (type === 'responsive' && isMenuCollapsed) {
      return;
    }

    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed,
      },
    });

    this.setState({
      openedKeys: [],
    });
  };

  onOpenChange = openedKeys => {
    store.set('app.menu.openedKeys', openedKeys);
    this.setState({
      openedKeys,
    });
  };

  handleClick = e => {
    store.set('app.menu.selectedKeys', [e.key]);
    this.setState({
      selectedKeys: [e.key],
      // openedKeys: e.keyPath,
    });
  };

  handleGetUrl = url => {
    let currentUrl = '';
    switch (typeof url) {
      case 'function':
        currentUrl = '/';
        break;

      default:
        currentUrl = url;
        break;
    }

    return currentUrl;
  };

  generateMenuItems = () => {
    const { menuData = [], role } = this.props;
    let menuDataCLone = menuData;
    const currentUserRole = get(getUserInfo(), 'userRoles');
    if (currentUserRole && currentUserRole[0].code === USER_ROLE.USER) {
      menuDataCLone = menuData.filter(data => data.key !== 'settings');
    }
    const generateItem = item => {
      const { key, title, url, icon, disabled, count } = item;
      const Icon = icon;
      if (item.category) {
        return <Menu.ItemGroup key={Math.random()} title={item.title} />;
      }
      if (item.url) {
        return (
          <Menu.Item key={key} disabled={disabled}>
            {item.target ? (
              <a
                href={() => this.handleGetUrl(url)}
                target={item.target}
                rel="noopener noreferrer"
              >
                <span className={style.title}>{title}</span>
                {count && (
                  <span className="badge badge-success ml-2">{count}</span>
                )}
                {icon && (
                  <Icon className={`${style.icon} icon-collapsed-hidden`} />
                )}
              </a>
            ) : (
              <Link to={() => this.handleGetUrl(url)}>
                <span className={style.title}>{title}</span>
                {count && (
                  <span className="badge badge-success ml-2">{count}</span>
                )}
                {icon && (
                  <Icon className={`${style.icon} icon-collapsed-hidden`} />
                )}
              </Link>
            )}
          </Menu.Item>
        );
      }
      return (
        <Menu.Item key={key} disabled={disabled}>
          <span className={style.title}>{title}</span>
          {count && <span className="badge badge-success ml-2">{count}</span>}
          {icon && <Icon className={`${style.icon} icon-collapsed-hidden`} />}
        </Menu.Item>
      );
    };

    const generateSubmenu = items =>
      items.map(menuItem => {
        if (menuItem.children) {
          const subMenuTitle = (
            <span key={menuItem.key}>
              <span className={style.title}>{menuItem.title}</span>
              {menuItem.count && (
                <span className="badge badge-success ml-2">
                  {menuItem.count}
                </span>
              )}
              {menuItem.icon && (
                <span className={`${menuItem.icon} ${style.icon}`} />
              )}
            </span>
          );
          return (
            <Menu.SubMenu title={subMenuTitle} key={menuItem.key}>
              {generateSubmenu(menuItem.children)}
            </Menu.SubMenu>
          );
        }
        return generateItem(menuItem);
      });
    return menuDataCLone.map(menuItem => {
      if (menuItem.roles && !menuItem.roles.includes(role)) {
        return null;
      }
      if (menuItem.children) {
        const Icon = menuItem.icon;
        const subMenuTitle = (
          <div key={menuItem.key}>
            <span className={style.title}>{menuItem.title}</span>
            {menuItem.count && (
              <span className="badge badge-success ml-2">{menuItem.count}</span>
            )}
            {menuItem.icon && (
              <Icon className={`${style.icon} icon-collapsed-hidden`} />
            )}
          </div>
        );
        return (
          <Menu.SubMenu title={subMenuTitle} key={menuItem.key}>
            {generateSubmenu(menuItem.children)}
          </Menu.SubMenu>
        );
      }
      return generateItem(menuItem);
    });
  };

  render() {
    const { selectedKeys, openedKeys } = this.state;
    const {
      isMobileView,
      isMenuCollapsed,
      menuColor,
      leftMenuWidth,
      isMenuUnfixed,
      isMenuShadow,
    } = this.props;

    const menuCollapsed = {
      width: leftMenuWidth,
      collapsible: false,
      collapsed: false,
      onCollapse: this.onCollapse,
    };
    const menuNotCollapsed = {
      width: leftMenuWidth,
      collapsible: true,
      collapsed: isMenuCollapsed,
      onCollapse: this.onCollapse,
      breakpoint: 'lg',
    };

    const menuSettings = isMobileView ? menuCollapsed : menuNotCollapsed;
    const menu = this.generateMenuItems();

    return (
      <Layout.Sider
        {...menuSettings}
        className={classNames(`${style.menu}`, {
          [style.white]: menuColor === 'white',
          [style.gray]: menuColor === 'gray',
          [style.dark]: menuColor === 'dark',
          [style.unfixed]: isMenuUnfixed,
          [style.shadow]: isMenuShadow,
        })}
      >
        <div
          className={style.menuOuter}
          style={{
            width: isMenuCollapsed && !isMobileView ? 80 : leftMenuWidth,
            height:
              isMobileView || isMenuUnfixed
                ? 'calc(100% - 64px)'
                : 'calc(100% - 110px)',
          }}
        >
          <div className={style.logoContainer}>
            <div className={style.logo}>
              <img
                src="/resources/images/metanet-logo-circle.png"
                className="mr-2"
                alt="MetaTest"
              />
              <div className={style.name}> MetaTest </div>
            </div>
          </div>

          <Scrollbars
            renderThumbVertical={({ ...props }) => (
              <div
                {...props}
                style={{
                  width: '4px',
                  borderRadius: 'inherit',
                  backgroundColor: menuColor === 'dark' ? '#32304b' : '#c5cdd2',
                  left: '1px',
                }}
              />
            )}
            autoHide
          >
            <Menu
              onClick={this.handleClick}
              selectedKeys={selectedKeys}
              openKeys={openedKeys}
              onOpenChange={this.onOpenChange}
              mode="inline"
              className={style.navigation}
              inlineIndent="15"
            >
              {menu}
            </Menu>
          </Scrollbars>
        </div>
      </Layout.Sider>
    );
  }
}

export default MenuLeft;
