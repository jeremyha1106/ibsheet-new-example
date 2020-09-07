import React from 'react';
import get from 'lodash/get';
import { useIntl } from 'react-intl';
// Chart
import { Divider } from 'antd';
import PieChart from './PieChart';
import TeamStatisticChart from './TeamStatisticChart';
import ColumnChart from './ColumnChart';

function StaticChartGroup(props) {
  /*
   * Must Create A config object which include :
   * pieChartConfig = customize pie chart config, if you want manual set color sets
   * staticChartConfig = customize static chart config.
   */
  const { pieChartData, statisticChartData, config } = props;
  const intl = useIntl();
  const pieChartConfig = get(config, 'pieChartConfig', {});
  const statisticChartConfig = get(config, 'statisticChartConfig', {});
  const pieChartHeight = get(pieChartConfig, 'config.height', 200);

  // Render ChartGroup
  const renderStaticChartGroup = () => (
    <div className="row">
      <div className="col-5">
        <PieChart
          dataSource={get(pieChartData, 'dataSource', [])}
          labels={pieChartData.labels}
          total={pieChartData.total}
          config={pieChartConfig.config}
          uiConfig={pieChartConfig.uiConfig}
          height={pieChartHeight}
          intl={intl}
        />
      </div>
      <div className="col-7">
        <TeamStatisticChart
          dataSource={get(statisticChartData, 'dataSource', [])}
          options={statisticChartData.options}
          config={statisticChartConfig.config}
          uiConfig={statisticChartConfig.uiConfig}
        />
      </div>
    </div>
  );

  return renderStaticChartGroup();
}

function SummaryChartGroup(props) {
  const intl = useIntl();
  const { pieChartData, columnChartData, config, uuidKey } = props;
  const pieChartConfig = get(config, 'pieChartConfig', {});
  const columnChartConfig = get(config, 'columnChartConfig', {});
  const pieChartHeight = get(pieChartConfig, 'config.height', 200);
  const columnChartHeight = get(columnChartConfig, 'config.height', 300);

  const noPieChartCard = get(pieChartConfig, 'uiConfig.noCard', false);
  const noColumnChartCard = get(columnChartConfig, 'uiConfig.noCard', false);

  const renderDivider =
    noPieChartCard && noColumnChartCard ? (
      <div className="col-1">
        <Divider type="vertical" style={{ height: '90%' }} />
      </div>
    ) : null;

  const renderSummaryChartGroup = () => (
    <div className="row">
      <div className="col-5">
        <PieChart
          dataSource={get(pieChartData, 'dataSource', [])}
          labels={pieChartData.labels}
          total={pieChartData.total}
          config={pieChartConfig.config}
          uiConfig={pieChartConfig.uiConfig}
          height={pieChartHeight}
          intl={intl}
          uuidKey={uuidKey}
        />
      </div>

      {renderDivider}

      <div className={`col-${noPieChartCard && noColumnChartCard ? '6' : '7'}`}>
        <ColumnChart
          dataSource={get(columnChartData, 'dataSource', [])}
          xAxisLabels={columnChartData.xAxisLabels}
          config={columnChartConfig.config}
          uiConfig={columnChartConfig.uiConfig}
          height={columnChartHeight}
          intl={intl}
          uuidKey={uuidKey}
        />
      </div>
    </div>
  );

  return renderSummaryChartGroup();
}

StaticChartGroup.defaultProps = {
  pieChartData: {},
  statisticChartData: {},
  config: {},
};

SummaryChartGroup.defaultProps = {
  pieChartData: {},
  columnChartData: {},
  config: {},
};

export { StaticChartGroup, SummaryChartGroup };
