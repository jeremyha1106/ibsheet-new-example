import React from 'react';
import PropTypes from 'prop-types';
import { CloseCircleOutlined } from '@ant-design/icons';

const DeleteColumn = ({ ...props }) => {
  const onDelete = () => {
    props.onDelete(props.row);
  };
  return (
    // eslint-disable-next-line ,jsx-a11y/no-static-element-interactions
    <a onClick={onDelete}>
      <CloseCircleOutlined />
    </a>
  );
};

DeleteColumn.propTypes = {
  row: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteColumn;
