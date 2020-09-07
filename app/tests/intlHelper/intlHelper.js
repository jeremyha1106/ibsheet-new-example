import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount, shallow } from 'enzyme';
import { flattenMessages } from 'containers/LanguageProvider';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from 'utils/history';
import { translationMessages } from 'i18n';
import configureStore from '../../configureStore';

const initialState = {};
const store = configureStore(initialState, history);

export function WrapIntlProvider(props) {
  const { children, haveRouter = false, locale = 'en' } = props;

  return (
    <Provider store={store}>
      <IntlProvider
        locale={locale}
        key={locale}
        messages={flattenMessages(translationMessages[locale])}
      >
        {haveRouter ? <Router history={history}>{children}</Router> : children}
      </IntlProvider>
    </Provider>
  );
}
export function mountWithIntl(node, locale, haveRouter) {
  return mount(node, {
    wrappingComponent: WrapIntlProvider,
    wrappingComponentProps: {
      haveRouter,
      locale,
    },
  });
}
export function shallowWithIntl(node, locale, haveRouter) {
  return shallow(node, {
    wrappingComponent: WrapIntlProvider,
    wrappingComponentProps: {
      haveRouter,
      locale,
    },
  });
}
