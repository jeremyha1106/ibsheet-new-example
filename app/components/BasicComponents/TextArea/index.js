import React, { forwardRef } from 'react';
import { Input } from 'antd';
import classNames from 'classnames';

const { TextArea } = Input;

// eslint-disable-next-line react/prop-types
const TextAreaComponent = forwardRef(({ ...props }, ref) => (
  <TextArea
    rows={3}
    {...props}
    // eslint-disable-next-line react/prop-types
    className={classNames(props.className)}
    ref={ref}
  />
));

export default TextAreaComponent;
