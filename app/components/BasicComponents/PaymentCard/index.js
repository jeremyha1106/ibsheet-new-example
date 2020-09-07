import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

function PaymentCard(props) {
  const [requestState, setRequestState] = useState({
    icon: props.icon,
    name: props.name,
    number: props.number,
    type: props.type,
    sum: props.sum,
    footer: props.footer,
  });

  useEffect(() => {
    setRequestState();
  }, []);

  const { icon, name, number, type, footer, sum } = requestState;

  return (
    <a
      href="javascript: void(0);"
      className={`card card--withShadow ${styles.paymentCard}`}
    >
      {sum && <span className={styles.sum}>{sum}</span>}
      {icon && (
        <div className={styles.icon}>
          <i className={icon} />
        </div>
      )}
      {name && <span className={styles.name}>{name}</span>}
      {number && <span className={styles.number}>{number}</span>}
      {type && <span className={styles.type}>{type}</span>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </a>
  );
}
export default PaymentCard;
