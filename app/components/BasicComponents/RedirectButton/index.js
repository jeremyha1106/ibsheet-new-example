import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'components/BasicComponents/Button';
import classNames from 'classnames';
import style from './style.module.scss';

function RedirectButton({ type, children, url, className, ...props }) {
  const htmlType = type === 'primary' ? 'submit' : 'button';

  return (
    <Link className={classNames(style.link)} to={url}>
      <Button type={type} htmlType={htmlType} {...props} className={className}>
        {children}
      </Button>
    </Link>
  );
}

RedirectButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

RedirectButton.defaultProps = {
  type: null,
  children: '',
  disabled: false,
  className: '',
};

export default RedirectButton;
