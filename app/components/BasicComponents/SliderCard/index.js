import React from 'react';
import { Carousel } from 'antd';
import styles from './style.module.scss';

function SliderCard(props) {
  const { inverse } = props;
  return (
    <div className={`${styles.card} ${inverse ? styles.inverse : ''}`}>
      <Carousel autoplay>
        <div className={styles.item}>
          <a href="javascript: void(0);" className={styles.body}>
            <div className={styles.icon}>
              <i className="icmn-accessibility" />
            </div>
            <h2>Sales Growth</h2>
            <p>View Report</p>
          </a>
        </div>
        <div className={styles.item}>
          <a href="javascript: void(0);" className={styles.body}>
            <div className={styles.icon}>
              <i className="icmn-download" />
            </div>
            <h2>All Reports</h2>
            <p>Pdf Download</p>
          </a>
        </div>
      </Carousel>
    </div>
  );
}
SliderCard.defaultProps = {
  inverse: false,
};

export default SliderCard;
