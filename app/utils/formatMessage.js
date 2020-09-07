import { createIntl, createIntlCache } from 'react-intl';
import { translationMessages, DEFAULT_LOCALE } from 'i18n';
import { flattenMessages } from 'containers/LanguageProvider';

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

// this util func help use react-intl outside react component
export const intl = () => {
  const locale = localStorage.getItem('locale') || DEFAULT_LOCALE;
  return createIntl(
    {
      locale,
      messages: flattenMessages(translationMessages[locale]),
    },
    cache,
  );
};
