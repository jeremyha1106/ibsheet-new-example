import get from 'lodash/get';

export const sortAlphabet = (a, b, prop) => {
  const nameA = get(a, prop, '').toUpperCase(); // ignore upper and lowercase
  const nameB = get(b, prop, '').toUpperCase(); // ignore upper and lowercase

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};
