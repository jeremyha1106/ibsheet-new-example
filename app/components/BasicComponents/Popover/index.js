import React from 'react';
import Popover from 'antd/es/popover';
import PropTypes from 'prop-types';
import 'antd/es/popover/style';

const PopoverComponent = ({
  content = '',
  title = '',
  trigger = 'hover',
  children = '',
  placement = 'top',
  ...restProps
}) => (
  <Popover
    placement={placement}
    content={content}
    title={title}
    trigger={trigger}
    {...restProps}
  >
    {children}
  </Popover>
);

PopoverComponent.prototype = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placement: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  trigger: PropTypes.string,
};

export default PopoverComponent;
