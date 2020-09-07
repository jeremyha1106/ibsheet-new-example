import { notification } from 'antd';
import { intl } from 'utils/formatMessage';

export const SUCCESS_TYPE = 'success';
export const INFO_TYPE = 'info';
export const WARNING_TYPE = 'warning';
export const ERROR_TYPE = 'error';

// only passing messageKey when using notification outside of React life cycle
const showNotification = ({ type, message, messageKey, ...options }) => {
  let formatMsg;
  // parse message for intl
  if (messageKey) {
    const intlIns = intl();
    // with params
    if (messageKey.values) {
      let parseValues = {};
      // parse params for intl
      Object.keys(messageKey.values).map(key => {
        parseValues = {
          ...parseValues,
          [key]: intlIns.formatMessage({ id: messageKey.values[key] }),
        };
        return 0;
      });
      formatMsg = intlIns.formatMessage({ id: messageKey.id }, parseValues);
    } else {
      // without params
      formatMsg = intlIns.formatMessage({ id: messageKey.id });
    }
  }
  return notification[type]({
    ...options,
    message: messageKey ? formatMsg : message,
    duration: 3,
  });
};

export default showNotification;
