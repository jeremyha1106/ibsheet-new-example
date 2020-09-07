import Popconfirm from 'antd/es/popconfirm';
import { FormattedMessage } from 'react-intl';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';

const columns = ({ onDeleteRow, markRowFocus }) => [
  {
    title: 'No.',
    dataIndex: 'idx',
    width: '8%',
    align: 'center',
  },
  {
    title: 'Steps',
    editable: true,
    onCellFocus: markRowFocus,
    type: 'textarea',
    dataIndex: 'testAction',
    width: '41%',
    align: 'center',
    maxLength: 1000,
  },
  {
    title: 'Results',
    editable: true,
    onCellFocus: markRowFocus,
    type: 'textarea',
    dataIndex: 'expectedResult',
    width: '41%',
    align: 'center',
    maxLength: 1000,
  },
  {
    title: 'Action',
    width: '10%',
    align: 'center',
    render: row => (
      <Popconfirm
        title="Delete?"
        onConfirm={() => onDeleteRow(row)}
        okText={<FormattedMessage id="common.button.yes" />}
        cancelText={<FormattedMessage id="common.button.no" />}
        getPopupContainer={trigger => trigger.parentNode}
        placement="left"
      >
        <DeleteOutlined style={{ color: '#DC143C' }} />
      </Popconfirm>
    ),
  },
];
export default columns;
