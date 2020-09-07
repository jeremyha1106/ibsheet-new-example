import React from 'react';
import Empty from 'antd/es/empty';
import style from './style.module.scss';

function NoData() {
  return (
    <div className={style.noDataBox}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </div>
  );
}

export default NoData;
