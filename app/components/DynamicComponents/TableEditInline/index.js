import React from 'react';
import { Table } from 'antd'; // clean UI style not work when import like this 'import Input from 'antd/es/table';'
import EditableCell, { EditableRow } from './EditableCell';
import styles from './style.module.scss';

const EditableTable = ({ columns, data, onChange, ...props }) => {
  const handleSave = row => {
    const newData = [...data];
    const index = newData.findIndex(
      item => row[props.rowKey] === item[props.rowKey],
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    onChange(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const editableColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index,
        col,
        handleSave,
      }),
    };
  });

  return (
    <div className={styles.editInlineTable}>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={editableColumns}
        pagination={false}
        {...props}
      />
    </div>
  );
};

export default EditableTable;
