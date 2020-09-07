import React, { useRef } from 'react';
import { Col, Row, Switch, Form } from 'antd';
import { useIntl } from 'react-intl';
import {
  Button,
  TextArea,
  Select,
  Input,
} from 'components/BasicComponents/AntdComponent';
import { SaveOutlined } from '@ant-design/icons';
import StepEditTable from './StepEditTable';
import styles from './drawerForm.module.scss';

const { Option } = Select;

const DrawerForm = props => {
  const intl = useIntl();
  const stepTableRef = useRef();

  const onSubmit = values => {
    props.submit({ ...values, steps: stepTableRef.current.onSave() });
    props.closeModal();
  };

  return (
    <Form
      className={styles.form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{ field5: true, steps: [] }}
    >
      <div className={styles.formBody}>
        <Form.Item
          label="Field 1"
          name="field1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Field 2"
              name="field2"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Field 3"
              name="field3"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select renderOnDrawer>
                <Option value="select1">Select 1</Option>
                <Option value="select2">Select 2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Field 4" name="field4">
          <TextArea />
        </Form.Item>

        <Form.Item label="Field 5" name="field5" valuePropName="checked">
          <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        </Form.Item>

        <Form.Item label="Edit inline table" name="steps">
          <StepEditTable ref={stepTableRef} />
        </Form.Item>
      </div>

      {/* BUTTON REGION */}
      <div className={styles.formFooter}>
        <Button
          type="primary"
          htmlType="submit"
          className="mr-2"
          icon={<SaveOutlined />}
          data-testid="create_test_case_btn"
        >
          {intl.formatMessage({
            id: 'common.button.save',
          })}
        </Button>
        <Button data-testid="cancel_btn" onClick={props.closeModal}>
          {intl.formatMessage({
            id: 'common.button.cancel',
          })}
        </Button>
      </div>
    </Form>
  );
};
export default DrawerForm;
