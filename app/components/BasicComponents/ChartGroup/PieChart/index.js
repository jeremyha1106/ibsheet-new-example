import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import Chart from 'react-apexcharts';
import NoData from 'containers/NoData';
import style from '../style.module.scss';
import { pieChartConfig } from '../chart.config';

function PieChart(props) {
  const {
    uiConfig,
    dataSource,
    labels,
    total,
    config,
    intl,
    height,
    uuidKey,
  } = props;
  const noCard = get(uiConfig, 'noCard', false);
  const haveHeader = get(uiConfig, 'haveHeader', false);
  const headerTitle = get(uiConfig, 'headerTitle', '');
  const hasChartSubtitle = get(uiConfig, 'hasChartSubtitle', false);
  const headerSubtitle = get(uiConfig, 'headerSubtitle', '');

  const dataSet = {
    data: dataSource,
    label: labels,
    total,
  };

  // Not render Chart if no data input ==> UX Reason
  const isShouldRenderChart =
    dataSet.total || (!isEmpty(dataSource) && total > 0);
  // Render  Chart Header Or Not

  const renderChartHeader = () =>
    haveHeader ? (
      <div className="kit__utils__heading mb-8">
        <h5>{headerTitle}</h5>
        {hasChartSubtitle && <span>{headerSubtitle}</span>}
      </div>
    ) : null;

  // Create Chart Config
  const chartConfig = pieChartConfig(intl, dataSet, config);

  // Render Chart
  const renderChart = () => {
    if (noCard) {
      return (
        <div>
          {renderChartHeader()}

          {isShouldRenderChart ? (
            <div className={style.pieChart}>
              <Chart
                {...chartConfig}
                type="donut"
                height={height}
                key={uuidKey}
              />
            </div>
          ) : (
            <NoData />
          )}
        </div>
      );
    }

    return (
      <div className={`${style.rowHeight} card mb-0`}>
        <div className="card-body">
          {renderChartHeader()}

          {isShouldRenderChart ? (
            <div className={style.pieChart}>
              <Chart
                {...chartConfig}
                type="donut"
                height={height}
                key={uuidKey}
              />
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    );
  };
  // Render Phase
  return renderChart();
}

PieChart.defaultProps = {
  uiConfig: {},
  config: {},
  height: 200,
};

export default PieChart;
