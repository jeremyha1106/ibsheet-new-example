import React, { forwardRef } from 'react';
import { Input } from 'antd';
import TextArea from '../TextArea';

const InputComponent = forwardRef(({ allowClear = true, ...props }, ref) => (
  <Input {...props} ref={ref} allowClear={allowClear} />
));

const { Search, Group, Password } = Input;

InputComponent.Search = Search;
InputComponent.Group = Group;
InputComponent.Password = Password;
InputComponent.TextArea = TextArea;

export default InputComponent;
