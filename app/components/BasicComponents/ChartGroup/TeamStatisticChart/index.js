import React from 'react';
import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Chart from 'react-apexcharts';
import { FormattedMessage, useIntl } from 'react-intl';
import DynamicTable from 'components/DynamicComponents/DynamicTable';
import Avatar from 'components/BasicComponents/Avatar';
import Tooltip from 'antd/es/tooltip';
import { teamStatisticChartConfig } from '../chart.config';
import style from '../style.module.scss';

const UNASSIGNED_USER = 'Unassigned';
function TeamStatisticsChart(props) {
  const { dataSource, uiConfig, config, height, uuidKey } = props;
  const showCount = get(uiConfig, 'showCount', false);
  const noCard = get(uiConfig, 'noCard', false);
  const colors = get(config, 'colors', []);
  const intl = useIntl();
  const columns = [
    {
      title: '',
      dataIndex: 'user',
      key: 'user',
      align: 'center',
      width: '10%',
      render: user => {
        const matchesStr = user.name.match(/\b(\w)/g);
        const letterAvatar = matchesStr
          .join()
          .replace(',', '')
          .substr(0, 2);

        const renderUserAvatar = user.avatar ? (
          <Avatar src={user.avatar} size="small" />
        ) : (
          <span className={style.avatar}>{letterAvatar}</span>
        );

        return (
          <Tooltip title={user.name} placement="left">
            {user.name !== UNASSIGNED_USER ? (
              renderUserAvatar
            ) : (
              <i className={`fa fa-user-circle ${style.avatarDefault}`} />
            )}
          </Tooltip>
        );
      },
    },
    {
      dataIndex: 'dataChart',
      key: 'dataChart',
      className: style.noPadding,
      render: data => (_isEmpty(data) ? null : renderChartBar(data)),
    },
  ];

  const renderChartHeader = userCount => {
    if (showCount) {
      return (
        <div>
          <h5>
            <FormattedMessage id="testExecutionView.label.teamStatistic" />
          </h5>
          <span>
            {userCount > 1 ? `${userCount} users` : `${userCount} user`}
          </span>
        </div>
      );
    }

    return null;
  };
  const renderChartBar = data => {
    const chartOptions = teamStatisticChartConfig(data, colors);
    if (!_isEmpty(data)) {
      return (
        <Chart
          options={chartOptions.options}
          series={data}
          type="bar"
          height={height}
          key={uuidKey}
        />
      );
    }
    return intl.formatMessage({ id: 'common.label.nodata' });
  };
  const renderChartTable = () => {
    if (noCard) {
      return (
        <div>
          {renderChartHeader(dataSource.length)}
          <DynamicTable
            rowKey="user.username"
            dataSource={dataSource}
            columns={columns}
            pagination={{
              pageSize: 3,
              hideOnSinglePage: true,
            }}
            hiddenHeader
          />
        </div>
      );
    }

    return (
      <div className={`${style.rowHeight} ${style.pieChart} card`}>
        <h5 className="card-header">{renderChartHeader(dataSource.length)}</h5>
        <div className="card-body">
          <DynamicTable
            rowKey="user.username"
            dataSource={dataSource}
            columns={columns}
            pagination={{
              pageSize: 3,
              hideOnSinglePage: true,
            }}
            hiddenHeader
          />
        </div>
      </div>
    );
  };
  return renderChartTable();
}

TeamStatisticsChart.defaultProps = {
  uiConfig: {},
  config: {},
  height: 60,
};
export default TeamStatisticsChart;
