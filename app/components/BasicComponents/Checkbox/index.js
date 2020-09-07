import React, { forwardRef } from 'react';
import Checkbox from 'antd/es/checkbox';
import 'antd/es/checkbox/style/css';

// eslint-disable-next-line react/prop-types
function CheckboxComponent({ children, ...props }, ref) {
  return (
    <Checkbox {...props} ref={ref}>
      {children}
    </Checkbox>
  );
}

export default forwardRef(CheckboxComponent);
