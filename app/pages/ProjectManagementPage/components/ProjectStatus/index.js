import React from 'react';
import { useIntl } from 'react-intl';
import Tag from 'components/BasicComponents/Tag';
import {
  ON_HOLD_PROJECT_STATUS,
  COMPLETED_PROJECT_STATUS,
  INACTIVE_PROJECT_STATUS,
} from '../../constants';

function ProjectStatus(props) {
  const { code } = props;
  const intl = useIntl();
  let text = '';
  switch (code) {
    case ON_HOLD_PROJECT_STATUS:
      text = intl.formatMessage({ id: 'common.status.onHold' });
      break;

    case COMPLETED_PROJECT_STATUS:
      text = intl.formatMessage({ id: 'common.status.completed' });
      break;

    case INACTIVE_PROJECT_STATUS:
      text = intl.formatMessage({ id: 'common.status.inactive' });
      break;

    default:
      text = intl.formatMessage({ id: 'common.status.active' });
      break;
  }

  return <Tag type={text}>{text}</Tag>;
}

export default ProjectStatus;
