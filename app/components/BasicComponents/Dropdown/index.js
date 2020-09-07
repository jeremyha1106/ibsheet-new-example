import React from 'react';
import Dropdown from 'antd/es/dropdown';

function DropdownComponent({ children, overlay, trigger, ...props }) {
  return (
    <Dropdown overlay={overlay} trigger={trigger} {...props}>
      {children}
    </Dropdown>
  );
}

export default DropdownComponent;
