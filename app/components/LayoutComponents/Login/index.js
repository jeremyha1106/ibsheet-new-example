import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { FORGOT_URL } from 'constants/routes';
import { Form } from 'antd';
import { Input, Button } from 'components/BasicComponents/AntdComponent';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

function LoginFormComponent({ onSubmit, loading }) {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState(); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const handleSubmit = values => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      onFinish={handleSubmit}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="login.form.invalid.field"
                values={{
                  field: intl.formatMessage({
                    id: 'common.form.field.label.username',
                  }),
                }}
              />
            ),
          },
        ]}
      >
        <Input
          className={styles.heightFormInput}
          size="default"
          prefix={<UserOutlined />}
          placeholder={intl.formatMessage({
            id: 'common.form.field.label.username',
          })}
          maxLength={30}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="login.form.invalid.field"
                values={{
                  field: intl.formatMessage({
                    id: 'common.form.field.label.password',
                  }),
                }}
              />
            ),
          },
        ]}
      >
        <Input
          className={styles.heightFormInput}
          size="default"
          prefix={<LockOutlined />}
          type="password"
          placeholder={intl.formatMessage({
            id: 'common.form.field.label.password',
          })}
          maxLength={20}
          disabled={loading}
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            className={`${
              styles.heightFormInput
            } font-weight-bold text-capitalize`}
            type="primary"
            block
            htmlType="submit"
            size="large"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
            loading={loading}
          >
            <span className="font-size-18">
              {intl.formatMessage({
                id: 'common.button.login',
              })}
            </span>
          </Button>
        )}
      </Form.Item>
      <Form.Item className="mb-0">
        <Link to={FORGOT_URL}>
          {intl.formatMessage({
            id: 'common.form.field.label.forgotPassword',
          })}
        </Link>
      </Form.Item>
    </Form>
  );
}

LoginFormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LoginFormComponent.defaultProps = {
  loading: false,
};

export default LoginFormComponent;
