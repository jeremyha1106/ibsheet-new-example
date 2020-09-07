/* eslint-disable no-console */
import React from 'react';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { Form } from 'antd';
import { useIntl } from 'react-intl';
import { Select } from 'components/BasicComponents/AntdComponent';
import { COMMON_SELECT_TYPES, COMMON_SELECT_MODE } from 'constants/common';
import AutoCompleteSelectContainer from 'containers/AutoCompleteSelectContainer';

import styles from '../../styles.module.scss';
import { SCHEDULER } from '../../constants';
import { billableFilters, projectStatusFilters } from './data';

const { Option } = Select;
dayjs.extend(weekday);
dayjs.extend(localeData);

function ProjectFilterForm() {
  const intl = useIntl();
  const [form] = Form.useForm();

  // TODO
  const handleSubmit = values => {
    console.log('values :', values);
  };

  const onChangeSelect = value => {
    console.log('value :', value);
  };

  const renderOptionItem = (item, index) => {
    const { text, value } = item;
    return (
      <Option key={index} value={value}>
        {intl.formatMessage({
          id: `scheduler.filter.${text}`,
        })}
      </Option>
    );
  };

  const initialValues = {
    [SCHEDULER.BILLABLE_STATUS]: 'all',
    [SCHEDULER.PROJECT_STATUS]: 'all',
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
          id: 'scheduler.label.project',
        })}
        name={SCHEDULER.PROJECT}
      >
        <AutoCompleteSelectContainer
          className={styles.multiSelect}
          selectType={COMMON_SELECT_TYPES.PROJECT}
          placeholder={intl.formatMessage({
            id: 'scheduler.placeholder.selectProject',
          })}
          onSelectChange={onChangeSelect}
          mode={COMMON_SELECT_MODE.MULTIPLE}
        />
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({
          id: 'scheduler.label.billableStatus',
        })}
        name={SCHEDULER.BILLABLE_STATUS}
      >
        <Select renderOnDrawer>{billableFilters.map(renderOptionItem)}</Select>
      </Form.Item>

      <Form.Item
        label={intl.formatMessage({
          id: 'scheduler.label.projectStatus',
        })}
        name={SCHEDULER.PROJECT_STATUS}
      >
        <Select renderOnDrawer>
          {projectStatusFilters.map(renderOptionItem)}
        </Select>
      </Form.Item>
    </Form>
  );
}

export default ProjectFilterForm;
