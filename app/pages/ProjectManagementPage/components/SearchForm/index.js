import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { Form } from 'antd';
import Input from 'components/BasicComponents/Input';
import Button from 'components/BasicComponents/Button';
import { SearchOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

function SearchFormComponent({
  onSearch,
  className,
  placeholder,
  isResetForm = false,
  ...props
}) {
  const intl = useIntl();
  const [form] = Form.useForm();
  useEffect(() => {
    if (isResetForm) {
      form.resetFields();
    }
  }, [isResetForm]);

  const handleSubmit = val => {
    if (typeof onSearch === 'function') {
      onSearch(val.keyword);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className={styles.searchForm}
      {...props}
    >
      <Form.Item name="keyword" className={classNames(className)}>
        <Input onPressEnter={() => form.submit()} placeholder={placeholder} />
      </Form.Item>
      <Button icon={<SearchOutlined />} htmlType="submit" type="primary">
        {intl.formatMessage({
          id: 'common.button.search',
        })}
      </Button>
    </Form>
  );
}

export default SearchFormComponent;
