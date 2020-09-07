import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import style from './style.module.scss';

const SelectionText = ({ selected, total, text }) => {
  const intl = useIntl();

  return (
    <span className={style.headerText}>
      <strong>
        {intl.formatMessage({ id: text })} {selected} / {total}
      </strong>
    </span>
  );
};

SelectionText.prototype = {
  selected: PropTypes.number,
  total: PropTypes.number,
  text: PropTypes.string,
};

SelectionText.defaultProps = {
  selected: 0,
  total: 0,
  text: 'common.table.showingText',
};

export default SelectionText;
