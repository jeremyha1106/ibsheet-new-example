import React, { useState } from 'react';
import TableSettingMenu from './TableSettingMenu';

function TableSetting(props) {
  const { totalColumns, showedColumns, setColumns, columnsFixed } = props;
  const [checkedColumns, setCheckedColumns] = useState(
    showedColumns.map(col => col.dataIndex),
  );

  const onSetCheckedColumns = cols => {
    setCheckedColumns(cols);
    // Set which columns gonna be show
    setColumns(cols);
  };

  return (
    <TableSettingMenu
      options={totalColumns}
      checked={checkedColumns}
      setCheckedColumns={onSetCheckedColumns}
      columnsFixed={columnsFixed}
    />
  );
}

export default TableSetting;
