import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import styles from './style.module.scss';

export default function TotalItem({ total, text }) {
  const intl = useIntl();

  return (
    <span className={classNames(styles.headerText)}>
      <strong>
        {intl.formatMessage({ id: text })}: {total}
      </strong>
    </span>
  );
}

TotalItem.propTypes = {
  total: PropTypes.number,
  text: PropTypes.string,
};

TotalItem.defaultProps = {
  total: 0,
  text: 'common.table.showingText',
};
