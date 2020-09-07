import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import TopBarContainer from 'containers/TopBarContainer';
import Menu from 'components/LayoutComponents/Menu';
import Footer from 'components/LayoutComponents/Footer';
import Breadcrumbs from 'components/LayoutComponents/Breadcrumbs';

const mapStateToProps = ({ settings }) => ({
  isContentMaxWidth: settings.isContentMaxWidth,
  isAppMaxWidth: settings.isAppMaxWidth,
  isGrayBackground: settings.isGrayBackground,
  isSquaredBorders: settings.isSquaredBorders,
  isCardShadow: settings.isCardShadow,
  isBorderless: settings.isBorderless,
  isTopbarFixed: settings.isTopbarFixed,
  isGrayTopbar: settings.isGrayTopbar,
});

class MainLayout extends React.PureComponent {
  render() {
    const {
      children,
      isContentMaxWidth,
      isAppMaxWidth,
      isGrayBackground,
      isSquaredBorders,
      isCardShadow,
      isBorderless,
      isTopbarFixed,
      isGrayTopbar,
    } = this.props;

    return (
      <div>
        <Layout
          className={classNames({
            cui__layout__contentMaxWidth: isContentMaxWidth,
            cui__layout__appMaxWidth: isAppMaxWidth,
            cui__layout__slateGrayBackground: isGrayBackground,
            cui__layout__squaredBorders: isSquaredBorders,
            cui__layout__cardsShadow: isCardShadow,
            cui__layout__borderless: isBorderless,
          })}
        >
          <Menu />
          <Layout>
            <Layout.Header
              className={classNames('cui__layout__header', {
                cui__layout__fixedHeader: isTopbarFixed,
                cui__layout__headerGray: isGrayTopbar,
              })}
            >
              <TopBarContainer />
            </Layout.Header>
            {/* <BackTop />
        <Menu />
        <Layout>
          <Layout.Header>
            <TopBar />
          </Layout.Header>
          <Layout.Content style={{ height: '100%', position: 'relative' }}> */}
            <Breadcrumbs />
            <Layout.Content
              style={{ height: '100%', position: 'relative' }}
              className={classNames({
                cui__layout__slateGrayBackground: isGrayBackground,
              })}
            >
              <div className="cui__utils__content">{children}</div>
            </Layout.Content>
            <Layout.Footer>
              <Footer />
            </Layout.Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(MainLayout));
