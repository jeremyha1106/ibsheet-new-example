import React, { useState } from 'react';
import { Menu, Dropdown, Checkbox } from 'antd';
import get from 'lodash/get';
import Button from 'components/BasicComponents/Button';

import { useIntl } from 'react-intl';
import styles from './style.module.scss';
const CheckboxGroup = Checkbox.Group;

function TableSettingMenu(props) {
  const intl = useIntl();
  const { options, checked, setCheckedColumns, columnsFixed } = props;
  const checkedListDefault = checked;
  const plainOptions = options.map(item => ({
    label: intl.formatMessage({
      id: get(item, 'title.props.id', 'common.table.column.avatar'),
    }),
    value: item.dataIndex,
  }));
  const allColumnsChecked = checked.length === options.length;
  const [checkAll, setCheckAll] = useState(allColumnsChecked);
  const [checkedList, setCheckList] = useState(checkedListDefault);
  const [indeterminate, setIndeterminate] = useState(!allColumnsChecked);
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = flag => {
    setVisible(flag);
  };
  const renderCheckboxOptions = checkboxOptions => {
    const renderedOptions = [];
    checkboxOptions.forEach(option => {
      renderedOptions.push(
        <Menu.Item key={option.value}>
          <Checkbox
            value={option.value}
            disabled={columnsFixed.includes(option.value)}
          >
            {option.label}
          </Checkbox>
        </Menu.Item>,
      );
    });
    return renderedOptions;
  };

  const onChange = checkedItems => {
    setCheckList(checkedItems);
    setIndeterminate(
      !!checkedItems.length && checkedItems.length < plainOptions.length,
    );
    setCheckAll(checkedItems.length === plainOptions.length);
    setCheckedColumns(checkedItems);
  };

  const onCheckAllChange = e => {
    setCheckList(
      e.target.checked ? plainOptions.map(item => item.value) : columnsFixed,
    );
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setCheckedColumns(() => {
      if (e.target.checked) {
        return plainOptions.map(item => item.value);
      }
      return columnsFixed;
    });
  };
  const tableSettingMenu = (
    <div className="ant-menu ant-menu-light ant-menu-root" key="3">
      <Menu className={styles.tableSettingMenu}>
        <Menu.Item>
          <Checkbox
            indeterminate={indeterminate}
            checked={checkAll}
            onChange={onCheckAllChange}
          >
            Check all
          </Checkbox>
        </Menu.Item>
      </Menu>
      <CheckboxGroup value={checkedList} onChange={onChange}>
        <Menu className={styles.tableSettingMenu}>
          <Menu.Divider />
          {renderCheckboxOptions(plainOptions)}
        </Menu>
      </CheckboxGroup>
    </div>
  );
  return (
    <Dropdown
      overlay={tableSettingMenu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      placement="bottomLeft"
      trigger={['click']}
    >
      <Button type="link">
        <i className="fa fa-cog" aria-hidden="true" />
      </Button>
    </Dropdown>
  );
}
export default TableSettingMenu;
