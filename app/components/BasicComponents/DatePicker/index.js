import React, { forwardRef } from 'react';
import DatePicker from 'antd/es/date-picker';
import localeUS from 'antd/es/date-picker/locale/en_US';
import 'antd/es/date-picker/style/css';

// eslint-disable-next-line react/prop-types
function DatePickerComponent({ format, ...rest }, ref) {
  return (
    <DatePicker
      locale={localeUS}
      format={format || 'DD-MM-YYYY'}
      {...rest}
      ref={ref}
    />
  );
}

export default forwardRef(DatePickerComponent);
