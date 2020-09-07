import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

function PaymentTransaction(props) {
  const [requestState, setRequestState] = useState({
    income: props.income,
    amount: props.amount,
    info: props.info,
    footer: props.footer,
  });

  useEffect(() => {
    setRequestState();
  }, []);

  const { income, amount, footer, info } = requestState;

  return (
    <a
      href="javascript: void(0);"
      className={`${styles.paymentTransaction} card card--withShadow ${
        income ? styles.income : ''
      }`}
    >
      <div className={styles.icon}>
        <i className={income ? 'lnr lnr-arrow-left' : 'lnr lnr-arrow-right'} />
      </div>
      {amount && (
        <div>
          <span className={styles.amount}>{amount}</span>
          {info && <sup className={styles.info}>{info}</sup>}
        </div>
      )}
      {footer && <div className={styles.footer}>{footer}</div>}
    </a>
  );
}

export default PaymentTransaction;
