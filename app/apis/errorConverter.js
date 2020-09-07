const parseValidationError = validationErrors => {
  if (validationErrors == null || validationErrors.length > 0) {
    return 'error.api.genericBadRequestError';
  }

  return null;
};

const parseBusinessError = businessErrors => {
  if (!businessErrors || businessErrors.length === 0) {
    return 'error.common.internal.server';
  }

  return businessErrors.map(error => error.messageKey);
};

const errorConverter = apiError => {
  const err = {};

  if (apiError.response) {
    const { status, data } = apiError.response;
    if (status >= 400 && status <= 499) {
      // bad request
      if (data.validationErrors) {
        // validation error
        err.messageKey = parseValidationError(data.validationErrors);
      } else if (data.httpStatus === 403 || data.httpStatus === 400) {
        err.messageKey = data.messageKey;
      } else {
        // business error
        err.messageKey = parseBusinessError(data.errors);
      }
    } else if (status >= 500 && status <= 599) {
      // server failed to fulfill request
      err.messageKey = parseBusinessError(data.errors);
    }
  } else if (apiError.message === 'Network Error') {
    err.messageKey = 'error.api.networkError';
  }

  return err;
};

export default errorConverter;
