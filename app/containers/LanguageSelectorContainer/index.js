import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { createStructuredSelector } from 'reselect';
import LanguageSelector from 'components/LayoutComponents/TopBar/LanguageSelector';
import * as locate from 'utils/locateServices';

function LanguageSelectorContainer(props) {
  const onChangeLang = value => {
    props.changeLocale(value.key);
    locate.setLanguage(value.key);
  };

  useEffect(() => {
    const value = locate.getLanguage();
    if (value) {
      props.changeLocale(value);
    }
  });

  return <LanguageSelector locale={props.locale} onChangeLang={onChangeLang} />;
}

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

const mapDisPatchToProps = {
  changeLocale,
};

export default connect(
  mapStateToProps,
  mapDisPatchToProps,
)(LanguageSelectorContainer);
