import React from 'react';
import Sparkline from '@rowno/sparkline';
import style from './style.module.scss';

function ChartCard(props) {
  const { chartProps, title, amount } = props;
  return (
    <div className={`card ${style.card}`}>
      {chartProps && (
        <div className={style.chart}>
          <Sparkline {...chartProps} />
        </div>
      )}
      {amount && <div className={style.amount}>{amount}</div>}
      {title && <div className={style.title}>{title}</div>}
    </div>
  );
}

export default ChartCard;
