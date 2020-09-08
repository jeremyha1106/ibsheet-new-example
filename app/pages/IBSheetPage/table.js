import React from 'react';
import loader from '@ibsheet/loader';

loader.config({
  registry: [
    {
      name: 'ibsheet',
      // baseUrl: 'https://www.ibsheet.com/ibsheet8/customer-sample/assets/ibsheet/',
      baseUrl: '/ibsheet',
      locales: ['ko', 'en'],
      plugins: ['excel', 'common'],
    },
  ],
});

export const Table = ({ id, el, data, options }) => {
  React.useEffect(() => {
    loader.createSheet({
      id,
      el,
      options,
      data,
    });

    return () => loader.removeSheet(id);
  }, [id, el, data, options]);

  return (
    <div style={{ height: '100%' }}>
      <div id={el} style={{ height: '100%' }} />
    </div>
  );
};
