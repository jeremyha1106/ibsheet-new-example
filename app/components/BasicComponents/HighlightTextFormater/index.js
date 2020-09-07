import React from 'react';
import PropTypes from 'prop-types';

const HighlightTextFormater = ({ ...props }) => {
  const onClickHandler = event => {
    props.onClickHandler(props.row, event);
  };
  return (
    <a
      // eslint-disable-next-line no-script-url
      href="javascript:void(0)"
      style={{ textDecoration: 'underline' }}
      onClick={event => onClickHandler(event)}
    >
      {props.value}
    </a>
  );
};

HighlightTextFormater.propTypes = {
  value: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired,
};

export default HighlightTextFormater;
