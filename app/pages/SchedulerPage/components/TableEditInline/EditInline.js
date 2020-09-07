import React from 'react';
import dayjs from 'dayjs';
import flatten from 'lodash/flatten';
import sumBy from 'lodash/sumBy';
import get from 'lodash/get';
import { Table } from 'antd';
import { DATE_FORMAT } from 'constants/common';
import { FormattedMessage } from 'react-intl';

import EdittableCell, { EdittableRow } from './EdittableCell';
import { SCHEDULER } from '../../constants';
import styles from '../../styles.module.scss';

const EditableTable = ({ columns, data, onChange, currentMonth, ...props }) => {
  const handleSave = row => {
    const newData = [...data];
    const index = newData.findIndex(
      item => row[props.rowKey] === item[props.rowKey],
    );

    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
    } else {
      let rowIdx = -1;
      let childrenIdx = -1;

      newData.map((item, idx) => {
        if (
          item.children &&
          item.children.some(
            chItem => row[props.rowKey] === chItem[props.rowKey],
          )
        ) {
          rowIdx = idx;
          childrenIdx = item.children.findIndex(
            chItem => row[props.rowKey] === chItem[props.rowKey],
          );
        }

        return 0;
      });

      if (rowIdx > -1 && childrenIdx > -1) {
        const item = newData[rowIdx].children[childrenIdx];
        newData[rowIdx].children.splice(childrenIdx, 1, {
          ...item,
          ...row,
        });
      }
    }

    onChange(newData);
  };

  const components = {
    body: {
      row: EdittableRow,
      cell: EdittableCell,
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

  // handle calculate total of each cell
  const sumByCol = (dataIndex, pageData) => {
    const flatChild = flatten(pageData.map(item => item.children || []));
    return sumBy(flatChild, item => get(item[dataIndex], SCHEDULER.HOUR)) || '';
  };

  const getWeekend = (date, index) =>
    dayjs()
      .month(currentMonth)
      .startOf('month')
      .add(index - 2, 'days')
      .day(date)
      .format(DATE_FORMAT);

  const renderSummaryRow = pageData => (
    <Table.Summary.Row>
      <Table.Summary.Cell index={0}>
        <FormattedMessage id="scheduler.label.total" />
      </Table.Summary.Cell>
      {editableColumns.map((col, index) => {
        const saturday = getWeekend(6, index);
        const sunday = getWeekend(7, index);
        const isWeekend =
          col.dataIndex === saturday || col.dataIndex === sunday;

        if (index > 0 && index < editableColumns.length) {
          if (index === editableColumns.length - 1) {
            return (
              <Table.Summary.Cell
                className={isWeekend && 'ant-grid-weekend'}
                index={index}
              />
            );
          }
          return (
            <Table.Summary.Cell
              className={isWeekend && 'ant-grid-weekend'}
              index={index}
            >
              <div>{sumByCol(col.dataIndex, pageData)}</div>
            </Table.Summary.Cell>
          );
        }
        return null;
      })}
    </Table.Summary.Row>
  );

  return (
    <div className={styles.editInlineTable}>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={editableColumns}
        pagination={false}
        summary={renderSummaryRow}
        {...props}
      />
    </div>
  );
};

export default EditableTable;
