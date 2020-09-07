import React from 'react';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { DATE_FORMAT, CUSTOM_DATE_FORMAT } from 'constants/common';
import { FormattedMessage } from 'react-intl';

import { SCHEDULER } from './constants';
import CustomAvatar from './components/CustomItem/CustomAvatar';
import CustomEvent from './components/CustomItem/CustomEvent';

const generateDaysInMonth = currentMonth =>
  Array.from(
    {
      length: dayjs()
        .month(currentMonth)
        .daysInMonth(),
    },
    (x, i) => {
      const getWeekend = date =>
        dayjs()
          .month(currentMonth)
          .startOf('month')
          .add(i - 1, 'days')
          .day(date)
          .format(DATE_FORMAT);
      const saturday = getWeekend(6);
      const sunday = getWeekend(7);
      const date = dayjs()
        .month(currentMonth)
        .startOf('month')
        .add(i, 'days');

      return {
        title: date.format(CUSTOM_DATE_FORMAT),
        date: date.format(DATE_FORMAT),
        isWeekend:
          date.format(DATE_FORMAT) === saturday ||
          date.format(DATE_FORMAT) === sunday,
      };
    },
  );

// const generateMonthsInYear = (currentMonth = 2020) =>
//   Array.from(
//     {
//       length: 12,
//     },
//     (x, i) => ({
//       month: dayjs()
//         .year(currentMonth)
//         .startOf('year')
//         .add(i, 'months')
//         .format('MMMM'),
//     }),
//   );

// const generateWeeksInYear = (currentYear = 2020) =>
//   Array.from(
//     {
//       length: 53,
//     },
//     (x, i) => ({
//       month: dayjs()
//         .year(currentYear)
//         .startOf('year')
//         .add(i, 'weeks')
//         .format(`W${i + 1}`),
//     }),
//   );

export const generateColumns = currentMonth => {
  const columns = [
    {
      title: <FormattedMessage id="scheduler.label.resources" />,
      dataIndex: SCHEDULER.NAME,
      key: SCHEDULER.NAME,
      fixed: 'left',
      width: '9%',
      render: (val, record) => {
        const { avatar, name, children } = record;

        if (children) {
          return <span>{name}</span>;
        }

        return <CustomAvatar avatar={avatar} name={name} />;
      },
    },
  ];

  let i;
  for (i = 0; i < generateDaysInMonth(currentMonth).length; i += 1) {
    columns.push({
      title: generateDaysInMonth(currentMonth)[i].title,
      dataIndex: generateDaysInMonth(currentMonth)[i].date,
      key: generateDaysInMonth(currentMonth)[i].date,
      className: generateDaysInMonth(currentMonth)[i].isWeekend
        ? 'ant-grid-weekend'
        : '',
      width: 75,
      align: 'center',
      editable: true,
      render: (val, record) => {
        const hours = get(val, SCHEDULER.HOUR);
        const totalHour = get(val, SCHEDULER.TOTAL_HOUR);

        return (
          !record.children && (
            <CustomEvent hours={hours} totalHours={totalHour} />
          )
        );
      },
    });
  }

  columns.push({
    title: <FormattedMessage id="scheduler.label.total" />,
    dataIndex: SCHEDULER.TOTAL_ROW,
    key: SCHEDULER.TOTAL_ROW,
    align: 'center',
    fixed: 'right',
    width: '3%',
  });

  return columns;
};
