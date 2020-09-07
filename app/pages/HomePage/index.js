import React, { useState } from 'react';
import { Divider } from 'antd';
import { Slider } from 'components/BasicComponents/AntdComponent';
import DrawerForm from 'pages/HomePage/components/DrawerForm';
import isEmpty from 'lodash/isEmpty';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [drawerData, setDrawerData] = useState({});
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="d-flex align-items-center pb-2 font-size-24">
          <strong>Dashboard</strong>
        </h5>
        <Divider />
        <div>{!isEmpty(drawerData) && JSON.stringify(drawerData)}</div>
        <Slider
          onClose={() => setShowModal(false)}
          title="Drawer Title"
          visible={showModal}
          maskClosable={false}
          destroyOnClose
        >
          <DrawerForm
            closeModal={() => setShowModal(false)}
            submit={val => setDrawerData(val)}
          />
        </Slider>
      </div>
    </div>
  );
}

export default Dashboard;
