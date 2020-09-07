import React from 'react';
import { getOverTimeStatus, calcPercentage } from 'utils/formulaHelper';

import styles from '../../styles.module.scss';

export default function CustomEvent(props) {
  const { hours, totalHours } = props;
  const isOverTime = getOverTimeStatus(totalHours);
  const percentage = calcPercentage(hours, totalHours);

  const statusBar = isOverTime ? styles.statusBarGray : styles.statusBarGreen;

  return (
    <div className={styles.customEvent}>
      <div className={`${(hours || hours === 0) && statusBar}`}>
        <div
          className="status"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
      <span>{hours}</span>
    </div>
  );
}
