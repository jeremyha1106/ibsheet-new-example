import React, { forwardRef } from 'react';
import Select from 'antd/es/select';
import classNames from 'classnames';
import 'antd/es/select/style/css';

// eslint-disable-next-line react/prop-types
// forwardRef don't allow Proptypes
const SelectComponent = forwardRef(
  ({ children, renderOnDrawer, ...props }, ref) => {
    // fix issue option list moving when scroll on drawer, modal
    const renderContainer = !renderOnDrawer
      ? () => document.body
      : trigger => trigger.parentNode;
    return (
      // eslint-disable-next-line react/prop-types
      <Select
        {...props}
        className={classNames(props.className)}
        ref={ref}
        getPopupContainer={renderContainer}
      >
        {children}
      </Select>
    );
  },
);

const { Option } = Select;

SelectComponent.Option = Option;

export default SelectComponent;

SelectComponent.defaultProps = {
  renderOnDrawer: false,
};
