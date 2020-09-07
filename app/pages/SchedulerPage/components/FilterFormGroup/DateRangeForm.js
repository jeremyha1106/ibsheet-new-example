/* eslint-disable no-console */
import React from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import {
  DATE_PICKER_TYPE,
  ISO_DATE_FORMART,
  YEAR_FORMAT,
} from 'constants/common';
import { DatePicker, Select } from 'components/BasicComponents/AntdComponent';

import { SCHEDULER } from '../../constants';
import { modeViewFilters } from './data';

const { Option } = Select;
// use extend for datepicker
dayjs.extend(weekday);
dayjs.extend(localeData);

function DateRangeForm() {
  const intl = useIntl();
  const [form] = Form.useForm();

  // TODO
  const handleSubmit = values => {
    console.log('values :', values);
  };

  // TODO or remove if don't use this func
  const onChangeYear = (date, dateString) => {
    console.log('date :', date, dateString);
  };

  // TODO or remove if don't use this func
  const onChangeStartDate = (date, dateString) => {
    console.log('date :', date, dateString);
  };

  // TODO or remove if don't use this func
  const onChangeEndDate = (date, dateString) => {
    console.log('date :', date, dateString);
  };

  const renderOptionItem = (item, index) => {
    const { text, value } = item;
    return (
      <Option key={index} value={value}>
        {intl.formatMessage({
          id: `scheduler.label.${text}`,
        })}
      </Option>
    );
  };

  const initialValues = {
    [SCHEDULER.MODE]: 'day',
    [SCHEDULER.YEAR]: dayjs(new Date()),
    [SCHEDULER.START_DATE]: dayjs(new Date()),
    [SCHEDULER.END_DATE]: dayjs(new Date()),
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item
        label={intl.formatMessage({
          id: 'scheduler.filter.selectYear',
        })}
        name={SCHEDULER.YEAR}
      >
        <DatePicker
          picker={DATE_PICKER_TYPE.YEAR}
          onChange={onChangeYear}
          format={YEAR_FORMAT}
        />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({
          id: 'scheduler.filter.calendarView',
        })}
        name={SCHEDULER.MODE}
      >
        <Select renderOnDrawer>{modeViewFilters.map(renderOptionItem)}</Select>
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({
          id: 'scheduler.filter.startDate',
        })}
        name={SCHEDULER.START_DATE}
      >
        <DatePicker onChange={onChangeStartDate} format={ISO_DATE_FORMART} />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({
          id: 'scheduler.filter.endDate',
        })}
        name={SCHEDULER.END_DATE}
      >
        <DatePicker onChange={onChangeEndDate} format={ISO_DATE_FORMART} />
      </Form.Item>
    </Form>
  );
}

export default DateRangeForm;
