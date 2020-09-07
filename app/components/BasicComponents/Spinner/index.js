import React from 'react';
import Spin from 'antd/es/spin';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'antd/es/spin/style/css';

function Spinner({ children, ...props }) {
  return (
    <Spin {...props} className={classNames(props.className)}>
      {children}
    </Spin>
  );
}

Spinner.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
};

Spinner.defaultProps = {
  children: null,
  className: '',
};

export default Spinner;
