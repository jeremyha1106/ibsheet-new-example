import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Spinner from 'components/BasicComponents/Spinner';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import { makeSelectLoading } from './selectors';

const key = 'appLoading';

export function LoadingContainer({ isLoading, children }) {
  useInjectReducer({ key, reducer });
  return <Spinner spinning={isLoading}>{children}</Spinner>;
}

LoadingContainer.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

LoadingContainer.defaultProps = {
  isLoading: false,
  children: null,
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(LoadingContainer);
