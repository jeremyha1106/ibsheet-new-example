import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { login, clearAppState } from 'store/user/actions';
import { FIELDS } from 'apis/userApi';
import { makeSelectLoginLoading } from 'store/user/selectors';
import LoginFormComponent from '../../components/LayoutComponents/Login';
import styles from './style.module.scss';

function LoginFormContainer({
  loginAction,
  history,
  loading,
  clearAppStateAction,
}) {
  // useInjectSaga({
  //   key,
  //   saga,
  // });

  useEffect(() => {
    clearAppStateAction();
  }, []);

  const handleSubmit = values => {
    loginAction({
      [FIELDS.LOGIN_ID]: values.username,
      [FIELDS.PASSWORD]: values.password,
      [FIELDS.REMEMBER_ME]: values.isRemember,
      history,
    });
  };

  return (
    <div className={`${styles.wrap}`}>
      <div className={styles.block}>
        <div className="row">
          <div className="col-xl-12">
            <div className={styles.inner}>
              <div className={styles.form}>
                <h4 className={styles.title}>
                  <strong>MetaPlan</strong>
                </h4>
                <br />
                <LoginFormComponent onSubmit={handleSubmit} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginFormContainer.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  clearAppStateAction: PropTypes.func.isRequired,
};

LoginFormContainer.defaultProps = {
  loading: false,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoginLoading(),
});

const mapDispatchToProps = {
  loginAction: login,
  clearAppStateAction: clearAppState,
};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhance(LoginFormContainer);
