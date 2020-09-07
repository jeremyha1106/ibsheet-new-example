import React from 'react';
import { connect } from 'react-redux';
import TopBar from 'components/LayoutComponents/TopBar';

function TopBarContainer() {
  return <TopBar />;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBarContainer);
