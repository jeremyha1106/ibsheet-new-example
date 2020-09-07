import React from 'react';
import get from 'lodash/get';
import Chart from 'react-apexcharts';
import isEmpty from 'lodash/isEmpty';
import NoData from 'containers/NoData';
import { columnChartConfig } from '../chart.config';
import style from '../style.module.scss';

function ColumnChart(props) {
  const {
    xAxisLabels,
    dataSource,
    config,
    uiConfig,
    height,
    width,
    uuidKey,
    onSelectChartItem,
  } = props;
  const noCard = get(uiConfig, 'noCard', false);
  const colors = get(config, 'colors', []);
  const haveAnimation = get(config, 'animation', false);
  const haveHeader = get(uiConfig, 'haveHeader', false);
  const headerTitle = get(uiConfig, 'headerTitle', '');
  const hasChartSubtitle = get(uiConfig, 'hasChartSubtitle', false);
  const headerSubtitle = get(uiConfig, 'headerSubtitle', '');

  const isShouldRenderChart = !isEmpty(dataSource) && !isEmpty(xAxisLabels);

  const checkNullValue = value => value < 2;

  const checkItem = item => {
    const data = get(item, 'data', []);
    return data.every(checkNullValue);
  };

  const isNull = dataSource.every(checkItem);

  // Create config object
  const chartConfig = columnChartConfig(
    dataSource,
    xAxisLabels,
    colors,
    haveAnimation,
    onSelectChartItem,
    isNull,
  );

  // Render Phase
  const renderChartHeader = () =>
    haveHeader ? (
      <div className="kit__utils__heading mb-8">
        <h5>{headerTitle}</h5>
        {hasChartSubtitle && <span>{headerSubtitle}</span>}
      </div>
    ) : null;

  const renderChart = () => {
    if (noCard) {
      return (
        <div className={style.chartWrap}>
          {renderChartHeader()}

          {isShouldRenderChart ? (
            <div className={style.columnChart}>
              <Chart
                height={height}
                width={width}
                series={dataSource}
                key={uuidKey}
                {...chartConfig}
                type="bar"
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
            <div className={style.columnChart}>
              <Chart
                height={height}
                width={width}
                series={dataSource}
                key={uuidKey}
                {...chartConfig}
                type="bar"
              />
            </div>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    );
  };
  return renderChart();
}
ColumnChart.defaultProps = {
  xAxisLabels: [],
  dataSource: [],
  chartTitle: '',
  uiConfig: {},
  config: {},
  height: 'auto',
};
export default ColumnChart;
