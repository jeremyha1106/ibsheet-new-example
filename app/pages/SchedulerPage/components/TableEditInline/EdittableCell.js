import React, { useContext, useEffect, useRef, useState } from 'react';
import get from 'lodash/get';
import { Form } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Input, TextArea } from 'components/BasicComponents/AntdComponent';
import { getOverTimeStatus, calcOverTimeHour } from 'utils/formulaHelper';

import { SCHEDULER } from '../../constants';

const EditableContext = React.createContext();

export const EdittableRow = ({ dragable, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EdittableCell = ({
  col,
  record,
  index,
  handleSave,
  children,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
      if (typeof col.onCellFocus === 'function') {
        col.onCellFocus(index);
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    const hours = record[col.dataIndex];
    const isOverTime = getOverTimeStatus(hours, 8);
    const overTimeValue = calcOverTimeHour(hours, 8);
    const currentValue = isOverTime ? overTimeValue : hours;
    const currentHours = get(currentValue, SCHEDULER.HOUR);

    form.setFieldsValue({
      [col.dataIndex]: currentHours,
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      if (values[col.dataIndex]) {
        const hours = Number(values[col.dataIndex]);

        const newValue = {
          [col.dataIndex]: {
            ...record[col.dataIndex],
            hours,
          },
        };

        toggleEdit();
        handleSave({ ...record, ...newValue });
      } else {
        toggleEdit();
      }
    } catch (errInfo) {
      console.error('Save failed:', errInfo);
    }
  };

  const getFormField = (type, maxLength) => {
    switch (type) {
      case 'textarea':
        return <TextArea ref={inputRef} maxLength={maxLength} onBlur={save} />;
      default:
        return (
          <Input
            allowClear={false}
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
          />
        );
    }
  };

  const renderCell = () => {
    if (record.children) return null;

    return editing ? (
      <Form.Item
        className="m-0"
        name={col.dataIndex}
        rules={[
          {
            required: col.isRequired,
            message: (
              <FormattedMessage
                id="common.form.isRequired"
                values={{ field: col.title }}
              />
            ),
          },
        ]}
      >
        {getFormField(col.type, col.maxLength)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap h-30 text-center"
        onClick={toggleEdit}
        role="button" // fix eslint jsx-a11y
        aria-hidden="true" // fix eslint jsx-a11y
      >
        {children}
      </div>
    );
  };

  return <td {...restProps}>{col.editable ? renderCell() : children}</td>;
};

export default EdittableCell;

EdittableCell.defaultProps = {
  col: {},
  record: {},
  handleSave: () => {},
};
