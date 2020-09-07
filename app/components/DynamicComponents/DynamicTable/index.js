import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import TotalItem from './TotalItem';
import SelectionText from './SelectionText';
import style from './style.module.scss';

function DynamicTable(props) {
  const {
    columns,
    dataSource,
    hiddenHeader,
    showTotal,
    hasSelection,
    totalCount,
  } = props;
  const [colState, setColState] = useState(columns);
  const [curTotalItems, setCurTotalItems] = useState(0);

  useEffect(() => {
    setCurTotalItems(totalCount);
  }, [props.totalCount]);

  const getDatasources = () => {
    if (!dataSource || !dataSource.length) return null; // check null to return empty message

    return dataSource;
  };

  useEffect(() => {
    // re-update column when column props is changed
    setColState(columns);
  }, [columns]);

  const onTableChange = (pagination, filters, sorter, extra) => {
    setCurTotalItems(extra.currentDataSource.length);

    if (props.onChange) {
      props.onChange();
    }
  };

  let text;
  if (showTotal) {
    text = hasSelection ? (
      <SelectionText
        selected={props.selected}
        total={props.totalCount}
        text={props.totalText}
      />
    ) : (
      <TotalItem total={curTotalItems} text={props.totalText} />
    );
  }

  return (
    <div className={`${style.table} ${hiddenHeader && style.hiddenHeader}`}>
      {text}
      <Table
        columns={colState}
        dataSource={getDatasources()}
        onChange={onTableChange}
        {...props}
      />
    </div>
  );
}

DynamicTable.defaultProps = {
  showTotal: false,
  hasSelection: false,
};

export default DynamicTable;
