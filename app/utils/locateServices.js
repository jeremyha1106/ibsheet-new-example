const locLang = 'locate';
export const getLanguage = () => localStorage.getItem(locLang);
export const setLanguage = value => {
  localStorage.setItem(locLang, value);
};
