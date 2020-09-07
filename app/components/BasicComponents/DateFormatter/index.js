import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { ISO_DATE_FORMART } from 'constants/common';

const DateFormatter = ({ value, pattern }) => (
  <>{value && <div>{moment(value).format(pattern)}</div>}</>
);

DateFormatter.propTypes = {
  value: PropTypes.any,
  pattern: PropTypes.string,
};

DateFormatter.defaultProps = {
  value: null,
  pattern: 'DD-MM-YYYY',
};

export default DateFormatter;
