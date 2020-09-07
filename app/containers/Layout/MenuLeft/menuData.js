import React from 'react';
import { ScheduleOutlined, ProjectOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

export const menuData = [
  {
    title: <FormattedMessage id="menu.scheduler" />,
    key: 'scheduler',
    icon: ScheduleOutlined,
    url: '/scheduler',
  },
  {
    title: <FormattedMessage id="menu.project" />,
    key: 'project',
    icon: ProjectOutlined,
    url: '/project-management',
  },
];
