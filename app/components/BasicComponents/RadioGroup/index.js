import React, { forwardRef } from 'react';
import Radio from 'antd/es/radio';
import classNames from 'classnames';
import 'antd/es/radio/style/css';

// eslint-disable-next-line react/prop-types
function RadioGroupComponent({ children, ...props }, ref) {
  return (
    // eslint-disable-next-line react/prop-types
    <Radio.Group className={classNames(props.className)} {...props} ref={ref}>
      {children}
    </Radio.Group>
  );
}

export { Radio };

export default forwardRef(RadioGroupComponent);
