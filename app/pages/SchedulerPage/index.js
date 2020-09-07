import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import EditableTable from './components/TableEditInline/EditInline';

import mockData from './mockData';
import GroupActions from './components/HeaderActions/GroupActions';
import CustomToolbar from './components/HeaderActions/CustomToolbar';
import { selectCurrentMonth } from './selectors';
import { generateColumns } from './columns';

import 'antd/es/popconfirm/style/css';

const Scheduler = () => {
  const [data, setData] = useState(mockData);
  const [cols, setCols] = useState([]);
  const dispatch = useDispatch();

  const currentMonth = useSelector(selectCurrentMonth);

  // handle set data after changes
  // need refactor later
  const onChange = pData => {
    setData(pData);
  };

  useEffect(() => {
    setCols(generateColumns(currentMonth));
  }, [currentMonth]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="d-flex align-items-center pb-2 font-size-24">
          <strong>
            <FormattedMessage id="menu.scheduler" />
          </strong>
        </h5>

        <div>
          <GroupActions />

          <CustomToolbar dispatch={dispatch} />

          <EditableTable
            columns={cols}
            data={data}
            currentMonth={currentMonth}
            onChange={onChange}
            onRow={(record, index) => ({
              index,
              record,
            })}
            defaultExpandAllRows
            rowKey="id"
            scroll={{ x: 'max-content', y: '50vh' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
