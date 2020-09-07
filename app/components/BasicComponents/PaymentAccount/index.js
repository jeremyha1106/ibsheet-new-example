import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

function PaymentAccount(props) {
  const [requestState, setRequestState] = useState({
    icon: props.icon,
    number: props.number,
    sum: props.sum,
    footer: props.footer,
  });

  useEffect(() => {
    setRequestState();
  }, []);

  const { icon, number, footer, sum } = requestState;

  return (
    <a
      href="javascript: void(0)"
      className={`card card--withShadow ${styles.account}`}
    >
      {icon && (
        <div className={styles.icon}>
          <i className={icon} />
        </div>
      )}
      {number && <span className={styles.number}>{number}</span>}
      {sum && <span className={styles.sum}>{sum}</span>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </a>
  );
}

export default PaymentAccount;
