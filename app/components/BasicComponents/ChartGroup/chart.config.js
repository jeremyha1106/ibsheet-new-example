/* eslint-disable indent */ // can't resolve conflict of eslint and prettier
import isEmpty from 'lodash/isEmpty';
import truncate from 'lodash/truncate';
import parseInt from 'lodash/parseInt';

//* Pie Char Input Model
// {
// dataSet,
// plotOptions,
// dataLabels
// colors,
// state,
// legend,
//* }

const pieChartConfig = (intl, dataSet = {}, config = {}) => {
  const {
    colors = [],
    dataLabels = {},
    plotOptions = {},
    states = {},
    legend = {},
    tooltip = {},
    ...rest
  } = config;
  const { data = [], label = [] } = dataSet;
  return {
    series: data,
    options: {
      // Disable animations by default for performance
      chart: {
        animations: {
          enabled: false,
        },
      },
      // pie chart config info
      plotOptions: isEmpty(plotOptions)
        ? getDefaultPlotOptions(dataSet, intl)
        : plotOptions,
      labels: label,
      dataLabels: isEmpty(dataLabels) ? getDefaultDataLabels() : dataLabels,
      colors: isEmpty(colors) ? getDefaultRandomColors(label.length) : colors,
      states: isEmpty(states) ? getDefaultState() : states,
      legend: isEmpty(legend) ? getDefaultLegend(dataSet) : legend,
      tooltip: isEmpty(tooltip) ? getDefaultToolTip(dataSet) : tooltip,
      ...rest,
    },
  };
};
// TEAM_STATISTIC
const teamStatisticChartConfig = (dataSource = [], colors) => {
  const config = {
    // Hard set by default for speed coding
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        animations: {
          enabled: false,
        },
        stackType: '100%',
        toolbar: {
          show: false,
        },
        parentHeightOffset: 0,
      },
      colors: isEmpty(colors)
        ? getDefaultRandomColors(dataSource.length)
        : colors,
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'darken',
            value: 0.7,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: ['Test suite'],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        show: false,
      },
    },
  };
  return config;
};
// COLUMN CHART CONFIG
const columnChartConfig = (
  dataSource = [],
  xAxisLabels = [],
  colors,
  haveAnimation,
  onSelectChartItem = () => {},
  isNull = false,
) => {
  const yAxisOpttion = isNull
    ? {
        show: true,
        tickAmount: 2,
        min: 0,
        max: 2,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          formatter(val) {
            return parseInt(val);
          },
        },
      }
    : {
        show: true,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          formatter(val) {
            return parseInt(val);
          },
        },
      };
  const config = {
    options: {
      chart: {
        stacked: true,
        animations: {
          enabled: haveAnimation,
        },
        redrawOnParentResize: true,
        toolbar: {
          show: false,
        },
        parentHeightOffset: 0,
        events: {
          dataPointSelection(event, chartContext, configChart) {
            onSelectChartItem(configChart);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: isEmpty(colors)
        ? getDefaultRandomColors(dataSource.length)
        : colors,
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'darken',
            value: 0.7,
          },
        },
      },
      xaxis: {
        categories: xAxisLabels,
        labels: {
          show: true,
          formatter: value => truncate(value, { length: 15 }),
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: yAxisOpttion,
      tooltip: {
        theme: 'dark',
        x: {
          formatter: value => truncate(value, { length: value.length }),
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        height: 50,
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
        },
      },
    },
  };
  return config;
};

// DEFAULT VALUE FOR CHART CONFIG
const getDefaultPlotOptions = (dataSet, intl) => ({
  pie: {
    donut: {
      size: '65%',
      labels: {
        show: true,
        total: {
          show: true,
          showAlways: true,
          fontSize: '22px',
          fontFamily: 'Mukta',
          color: '#0e0b20',
          label: intl.formatMessage({
            id: 'testExecutionView.label.total',
          }),
          formatter() {
            return dataSet.total;
          },
        },
      },
    },
  },
});

const getDefaultDataLabels = () => ({
  enabled: false,
});
const getDefaultRandomColors = colorsCount => {
  const colorArr = [];
  // Rand color in case no color input
  for (let i = 0; i < colorsCount; i += 1) {
    colorArr.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }
  return colorArr;
};
const getDefaultState = () => ({
  normal: {
    filter: {
      type: 'none',
      value: 0,
    },
  },
  hover: {
    filter: {
      type: 'darken',
      value: 0.7,
    },
  },
});
const getDefaultLegend = () => ({
  position: 'right',
  horizontalAlign: 'center',
  formatter(seriesName, opts) {
    return [
      `<span>${seriesName}</span>`,
      '',
      `<span class="ml-4">${opts.w.globals.series[opts.seriesIndex]}</span>`,
    ];
  },
});

const getDefaultToolTip = () => ({
  custom({ series, seriesIndex, w }) {
    const {
      config: { labels },
    } = w;
    const labelValue = labels[seriesIndex];
    const total = series.reduce((acc, curr) => acc + curr, 0);

    const mapping = {};
    labels.forEach((label, index) => {
      if (series[index] === 0) return; // Skip 0
      mapping[label] = series[index];
    });

    const keys = Object.keys(mapping); // May or may not inclue 'Skipped'
    if (keys.includes('Skipped')) {
      keys.push(keys.splice(keys.indexOf('Skipped'), 1)[0]); // Move 'Skipped' to last position
    }
    let percentValue = 0;
    if (total > 0) {
      // If last element
      if (labelValue === keys[keys.length - 1]) {
        const othersTotal = keys
          .filter(item => item !== labelValue)
          .reduce(
            (acc, currLabel) =>
              acc + parseFloat(((mapping[currLabel] * 100) / total).toFixed(1)),
            0,
          );
        percentValue = parseFloat((100 - othersTotal).toFixed(1));
      } else {
        percentValue = parseFloat(
          ((mapping[labelValue] * 100) / total).toFixed(1),
        );
      }
    }
    return `<div class="py-2 px-3">${percentValue}% ${labelValue}</div>`;
  },
});

export { pieChartConfig, teamStatisticChartConfig, columnChartConfig };
