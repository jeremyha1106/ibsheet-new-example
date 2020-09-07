import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Modal, Button } from 'components/BasicComponents/AntdComponent';
import CustomTab from '../CustomTab';
import FormFilterGroup from '../FilterFormGroup';

import { toggleModal } from '../../actions';
import { selectVisibleModal } from '../../selectors';
import styles from '../../styles.module.scss';

function SearchFilterModal(props) {
  const { isLoading = false } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const visible = useSelector(selectVisibleModal);

  const handleCancel = () => {
    dispatch(toggleModal(false));
  };

  const handleOk = () => {
    // TODO, waiting for API so just use toggleModal for now
    dispatch(toggleModal(false));
  };

  const renderFooterAction = () => [
    <Button key="back" onClick={handleCancel}>
      {intl.formatMessage({
        id: 'common.button.cancel',
      })}
    </Button>,
    <Button key="submit" type="primary" loading={isLoading} onClick={handleOk}>
      {intl.formatMessage({
        id: 'common.button.submit',
      })}
    </Button>,
  ];

  return (
    <Modal
      visible={visible}
      title={intl.formatMessage({
        id: 'scheduler.label.currentFilters',
      })}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={renderFooterAction()}
      className={styles.modal}
    >
      <div className={styles.formFilterWrapper}>
        <FormFilterGroup />

        <CustomTab />
      </div>
    </Modal>
  );
}

export default SearchFilterModal;
