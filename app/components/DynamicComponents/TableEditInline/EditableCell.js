import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Form } from 'antd';
import { Input, TextArea } from 'components/BasicComponents/AntdComponent';
import DragableBodyRow from 'components/DynamicComponents/DragableTableRow';

const EditableContext = React.createContext();

export const EditableRow = ({ dragable, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        {dragable ? <DragableBodyRow {...props} /> : <tr {...props} />}
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
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
    form.setFieldsValue({
      [col.dataIndex]: record[col.dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
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

  const renderCell = () =>
    editing ? (
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

  return <td {...restProps}>{col.editable ? renderCell() : children}</td>;
};

export default EditableCell;

EditableCell.defaultProps = {
  col: {},
  record: {},
  handleSave: () => {},
};
