import moment from 'moment';

export const createData = count => {
  const company = [
    'Google',
    'Apple',
    'Samsung',
    'LG',
    'Yahoo',
    'Microsoft',
    'Metanet',
    'SK',
    'McDonald',
    'Amazon',
  ];
  const country = [
    'Korea',
    'USA',
    'Vietnam',
    'China',
    'France',
    'Japan',
    'Singapore',
    'Thailand',
    'Cambodia',
    'Taiwan',
  ];

  const data = [];
  for (let i = 0; i < count; i += 1) {
    data.push({
      sCompany: company[Math.floor(Math.random() * 10)],
      sCountry: country[Math.floor(Math.random() * 10)],
      sSaleQuantity: Math.floor(Math.random() * 100000),
      sSaleIncrease: Math.floor(Math.random() * 10000),
      sPrice: Math.floor(Math.random() * 10000000),
      sSatisfaction: Math.floor(Math.random() * (100 - 50 + 1) + 50),
      sDate: moment()
        .format('dd-MM-yyyy')
        .toString(),
    });
  }

  return data;
};
