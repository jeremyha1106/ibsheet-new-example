import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Popover from '../Popover';
import style from './style.module.scss';

const STATUS_TYPES = {
  PASSED: 'passed',
  FAILED: 'failed',
  SKIPPED: 'skipped',
  BLOCKED: 'blocked',
  UNTESTED: 'untested',
};
// Resolve Status => Color and Text Created
const statusResolver = status => {
  let stat = '';
  switch (status) {
    case STATUS_TYPES.PASSED:
      stat = 'Passed';
      break;
    case STATUS_TYPES.FAILED:
      stat = 'Failed';
      break;
    case STATUS_TYPES.SKIPPED:
      stat = 'Skipped';
      break;
    case STATUS_TYPES.BLOCKED:
      stat = 'Blocked';
      break;
    case STATUS_TYPES.UNTESTED:
      stat = 'Untested';
      break;
    default:
      stat = '';
      break;
  }
  return (
    <>
      <span
        className={`${style.bigDot}
        ${status ? style[`col${status}`] : ''}`}
      />
      {stat}
    </>
  );
};

function StatusPopOver(props) {
  const { trigger, placement, children, title, rate, size } = props;

  // Status Content List Mapper
  // Data structure gonna be like this
  // NO UPPERCASE
  //  [
  //    {
  //    name: 'passed'
  //    value: 1
  //    },
  //    {
  //    name: 'failed'
  //    value: 1
  //    },
  //    etc
  //  ]
  const dataSourceCreator = () => {
    const dataSource = isEmpty(rate) ? [] : rate;
    return dataSource;
  };

  // Status Content List renderer
  const statusContentRender = () => {
    const dataSource = dataSourceCreator();
    const element = isEmpty(dataSource) ? (
      <div />
    ) : (
      dataSource.map(status => (
        <Row
          className={`${size ? style[`${size}`] : ''}`}
          type="flex"
          justify="space-between"
        >
          <Col span={16}>{statusResolver(status.name)}</Col>
          <Col span={6} className="d-flex justify-content-center">
            {status.value}
          </Col>
        </Row>
      ))
    );
    return element;
  };

  // Render PopOver
  const renderPopOver = () => (
    <Popover
      overlayClassName={style.statPop}
      title={title}
      placement={placement}
      content={statusContentRender()}
      trigger={trigger}
    >
      {children}
    </Popover>
  );
  return renderPopOver();
}

StatusPopOver.defaultProps = {
  rate: [],
  size: 'sm',
};

export default StatusPopOver;
