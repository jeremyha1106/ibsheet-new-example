import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Result from 'antd/es/result';
import 'antd/es/result/style/css';
import Button from 'components/BasicComponents/Button';
import * as auth from 'utils/authHelper';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIGNIN_URI } from 'constants/routes';
import { logout } from 'store/user/actions';
import style from './style.module.scss';

function NotAccessPage(props) {
  const history = useHistory();
  const intl = useIntl();
  const isAccessDashboard = auth.getAccessDashboard();

  const onLogout = () => {
    props.logout({ history });
  };

  useEffect(() => {
    // can not access this page when user have active project
    if (isAccessDashboard === 'true') {
      history.push(SIGNIN_URI);
    }
  }, []);

  return (
    isAccessDashboard === 'false' && (
      <div className={style.page}>
        <div className={style.item}>
          <Result
            status="403"
            title="403"
            subTitle={intl.formatMessage({ id: '403.subTitle' })}
            extra={
              <Button type="primary" onClick={onLogout}>
                <FormattedMessage id="403.label.button" />
              </Button>
            }
          />
        </div>
      </div>
    )
  );
}

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(NotAccessPage);
