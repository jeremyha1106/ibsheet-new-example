import React from 'react';
import Input from 'antd/es/input';
import 'antd/es/input/style/css';

function EmailComponent(props) {
  return <Input {...props} type="email" />;
}

EmailComponent.propTypes = {};

EmailComponent.defaultProps = {
  allowClear: true,
};

export default EmailComponent;
