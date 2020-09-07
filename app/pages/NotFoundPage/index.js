import React from 'react';
import Result from 'antd/es/result';
import 'antd/es/result/style/css';
import Button from 'components/BasicComponents/Button';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIGNIN_URI } from 'constants/routes';
import style from './style.module.scss';

function NotFoundPage() {
  const intl = useIntl();
  return (
    <div className={style.page}>
      <div className={style.item}>
        <Result
          status="404"
          title="404"
          subTitle={intl.formatMessage({ id: '404.subTitle' })}
          extra={
            <Button type="primary">
              <Link to={SIGNIN_URI}>
                <FormattedMessage id="404.label.button" />
              </Link>
            </Button>
          }
        />
      </div>
    </div>
  );
}

export default NotFoundPage;
