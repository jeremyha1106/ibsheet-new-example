import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'antd/es/drawer';
import 'antd/es/drawer/style/css';
import classNames from 'classnames';
import * as styles from './syles.module.scss';

function SliderComponent({ children, ...props }) {
  return (
    <Drawer className={classNames(styles.slider, props.className)} {...props}>
      {children}
    </Drawer>
  );
}

SliderComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  mask: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  visible: PropTypes.bool,
  placement: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.number,
};

SliderComponent.defaultProps = {
  children: null,
  mask: true,
  placement: 'right',
  visible: false,
  title: '',
  width: 800,
};

export default SliderComponent;
