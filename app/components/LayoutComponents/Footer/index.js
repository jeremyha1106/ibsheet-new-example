/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import style from './style.module.scss';

class Footer extends React.Component {
  render() {
    return (
      <div className={style.footer}>
        <div className={style.footerInner}>
          <a
            href="http://www.metanet.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className={style.logo}
          >
            MetaTest
            <img src="/resources/images/metanet-logo-circle.png" className="" />
          </a>
          <br />
          <p className="mb-0">
            Copyright © 2020 Metanet |{' '}
            <a
              href="http://www.metanet.co.kr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
