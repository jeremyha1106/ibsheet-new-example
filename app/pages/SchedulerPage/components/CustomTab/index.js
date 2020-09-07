import React from 'react';
import get from 'lodash/get';
import { List } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from 'components/BasicComponents/Checkbox';

import { setSelectedFilterForm, updateFilterConfig } from '../../actions';
import { selectFilterConfig, selectSelectedFilterForm } from '../../selectors';
import styles from '../../styles.module.scss';

function CustomTab() {
  const dispatch = useDispatch();
  const filterConfig = useSelector(selectFilterConfig);
  const selectedFilterForm = useSelector(selectSelectedFilterForm);

  const data = [
    {
      title: <FormattedMessage id="scheduler.label.dateRange" />,
      name: 'dateRange',
      checked: filterConfig.dateRange,
    },
    {
      title: <FormattedMessage id="scheduler.label.projects" />,
      name: 'projects',
      checked: filterConfig.projects,
    },
    // will handle this tab in sprint 2
    // {
    //   title: 'Resources',
    //   name: 'resources',
    //   checked: filterConfig.resources,
    // },
    // {
    //   title: 'Clients',
    //   name: 'clients',
    //   checked: filterConfig.clients,
    // },
    // {
    //   title: 'Allocation status',
    //   name: 'allocationStatus',
    //   checked: filterConfig.allocationStatus,
    // },
  ];

  const onChangeFilter = e => {
    const field = get(e, 'target.name', '');
    const value = get(e, 'target.checked', false);

    dispatch(updateFilterConfig({ field, value }));
  };

  const onRenderFilterForm = fieldName => {
    dispatch(setSelectedFilterForm(fieldName));
  };

  const renderTabItem = item => (
    <div className={styles.tabPane}>
      <span
        onClick={() => onRenderFilterForm(item.name)}
        role="button"
        tabIndex={0}
      >
        {item.title}
      </span>
      <Checkbox
        className="ml-2"
        name={item.name}
        checked={item.checked}
        onChange={onChangeFilter}
      />
    </div>
  );

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      className={styles.list}
      renderItem={item => (
        <List.Item
          className={`${item.name === selectedFilterForm && 'tab-active'}`}
        >
          <List.Item.Meta title={renderTabItem(item)} />
        </List.Item>
      )}
    />
  );
}

export default CustomTab;
