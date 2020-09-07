import React from 'react';
import dayjs from 'dayjs';
import { LeftOutlined, RightOutlined, SwapOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Select,
  DatePicker,
  Checkbox,
} from 'components/BasicComponents/AntdComponent';

import {
  prevMonthAction,
  nextMonthAction,
  currentMonthAction,
} from '../../actions';

function CustomToolbar(props) {
  const { dispatch } = props;

  const onPrevMonth = () => dispatch(prevMonthAction());
  const onNextMonth = () => dispatch(nextMonthAction());

  const onChangeDatePicker = (date, dateString) => {
    dispatch(currentMonthAction(date, dateString));
  };

  const onChangePercentage = e => {
    // eslint-disable-next-line no-console
    console.log(`checked = ${e.target.checked}`, e);
  };

  return (
    <div className="toolbar">
      <div className="left-toolbar">
        <LeftOutlined onClick={onPrevMonth} />
        <DatePicker
          defaultValue={dayjs(new Date())}
          format="MMMM YYYY"
          onChange={onChangeDatePicker}
          picker="month"
        />
        <RightOutlined onClick={onNextMonth} />
      </div>

      <div className="right-toolbar">
        <Button
          className="mr-2"
          type="text"
          onClick={props.onToday}
          icon={<SwapOutlined />}
        >
          <span>
            <FormattedMessage id="scheduler.label.projectView" />
          </span>
        </Button>

        <Checkbox onChange={onChangePercentage}>
          <FormattedMessage id="scheduler.label.percentage" />
        </Checkbox>

        <Select defaultValue="day" bordered={false} style={{ width: 70 }}>
          <Select.Option value="month">
            <FormattedMessage id="scheduler.label.month" />
          </Select.Option>
          <Select.Option value="week">
            <FormattedMessage id="scheduler.label.week" />
          </Select.Option>
          <Select.Option value="day">
            <FormattedMessage id="scheduler.label.day" />
          </Select.Option>
        </Select>
      </div>
    </div>
  );
}

export default CustomToolbar;
