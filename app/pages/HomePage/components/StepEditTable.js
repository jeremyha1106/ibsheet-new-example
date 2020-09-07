import React, { forwardRef, useState, useImperativeHandle } from 'react';
import EditableTable from 'components/DynamicComponents/TableEditInline';
import Button from 'components/BasicComponents/Button';
import 'antd/es/popconfirm/style/css';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { PlusOutlined } from '@ant-design/icons';
import columns from './StepEditTableCols';

const initData = {
  idx: 1,
  testAction: '',
  expectedResult: '',
};

const StepEditTable = forwardRef((props, ref) => {
  // get data when trigger from the outside
  useImperativeHandle(ref, () => ({
    onSave: () => data,
    newEditTestCase: rows => {
      setData(rows);
      setLastIdx(rows.length);
    },
    resetData: () => {
      setData([initData]);
      setLastIdx(1);
    },
  }));

  const [data, setData] = useState([initData]);
  const [lastIdx, setLastIdx] = useState(1);

  const onChange = pData => {
    setData(pData.map(d => ({ ...d, isFocus: false })));
  };

  const onAddRow = () => {
    setData([...data, { ...initData, idx: lastIdx + 1 }]);
    setLastIdx(lastIdx + 1);
  };

  const onDeleteRow = row => {
    if (data.length === 1) {
      setData([initData]);
      // update last idx for upcoming data
      setLastIdx(1);
    }
    if (data.length > 1) {
      // delete selected data and correct the remain idx
      const newData = data.filter(d => d.idx !== row.idx);
      setData(newData.map((d, index) => ({ ...d, idx: index + 1 })));

      // update last idx for upcoming data
      setLastIdx(lastIdx - 1);
    }
  };

  // mark row is focus to prevent drag when user editing textarea
  const markRowFocus = index => {
    const focusRow = { ...data[index], isFocus: true };
    const copyData = [...data];

    copyData.splice(index, 1, focusRow);
    setData(copyData);
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const copyData = [...data];

    copyData.splice(hoverIndex, 0, ...copyData.splice(dragIndex, 1));
    setData(copyData.map((d, index) => ({ ...d, idx: index + 1 })));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <EditableTable
        columns={columns({ onDeleteRow, markRowFocus })}
        data={data}
        onChange={onChange}
        footer={() => (
          <Button
            type="dashed"
            onClick={onAddRow}
            block
            icon={<PlusOutlined />}
          >
            Add
          </Button>
        )}
        onRow={(record, index) => ({
          index,
          record,
          moveRow,
          dragable: true,
        })}
        className="drag-table"
        rowKey="idx"
      />
    </DndProvider>
  );
});

export default StepEditTable;
