import React, { forwardRef } from 'react';
import Modal from 'antd/es/modal';
import 'antd/es/modal/style/css';
import classNames from 'classnames';

const { confirm } = Modal;

// Confirmation Modal
export function showConfirm(options, onOk, onCancel) {
  confirm({
    ...options,
    onOk,
    onCancel,
  });
}

// Normal modal with title , body and cancel/ok buttons
function NormalModal(props, ref) {
  // eslint-disable-next-line react/prop-types
  return (
    <Modal {...props} className={classNames(props.className)} ref={ref}>
      {props.children}
    </Modal>
  );
}
export default forwardRef(NormalModal);
