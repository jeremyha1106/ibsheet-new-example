import React from 'react';
import PropTypes from 'prop-types';
import InputNumber from 'antd/es/input-number';
import 'antd/es/input-number/style/css';

function NumberComponent(props) {
  return (
    <span>
      <InputNumber {...props} className="w-100" />
    </span>
  );
}

NumberComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  allowClear: PropTypes.bool,
};

NumberComponent.defaultProps = {
  type: null,
  children: '',
  allowClear: true,
};

export default NumberComponent;
