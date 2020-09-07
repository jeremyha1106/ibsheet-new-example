import React from 'react';
import { Button } from 'antd';

function ButtonComponent({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}

export default ButtonComponent;
