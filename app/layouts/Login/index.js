import React from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

import LanguageSelectorContainer from 'containers/LanguageSelectorContainer';
import Layout from 'antd/es/layout';
import 'antd/es/layout/style/css';
import styles from './style.module.scss';

const logoUrl = '/resources/images/logo-inverse.png';

function LoginLayout(props) {
  const intl = useIntl();
  const { children } = props;

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftContainer}>
        <div className={styles.logo}>
          <img src={logoUrl} alt="" />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <Layout.Header className={styles.header}>
          <div className={styles.languageBlock}>
            <div className={`float-right ${styles.language}`}>
              <span className="text-uppercase mr-3">
                {intl.formatMessage({
                  id: 'common.label.language',
                })}
              </span>
              <LanguageSelectorContainer />
            </div>
          </div>
        </Layout.Header>
        <Layout.Content className={styles.content}>{children}</Layout.Content>
        <Layout.Footer>
          <div className={`text-center ${styles.footer}`}>
            <p>
              <FormattedMessage id="login.footer.copyright" />
            </p>
          </div>
        </Layout.Footer>
      </div>
    </div>
  );
}

export default withRouter(LoginLayout);
