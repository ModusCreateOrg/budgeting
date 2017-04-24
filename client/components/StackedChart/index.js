import React, { Component, PropTypes } from 'react';
import Legend from 'components/Legend';
import Chart from 'components/Chart';
import { max, scaleBand, scaleLinear, scaleOrdinal, schemeCategory20 } from 'd3';
import { shuffle } from 'utils/array';
import Bar from './Bar';
import Xaxis from './Xaxis';
import styles from './styles.scss';

const outflowScheme = shuffle(schemeCategory20);
const inflowScheme = outflowScheme.splice(0, 2);

class StackedChart extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dataValue: PropTypes.string,
    dataLabel: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    data: PropTypes.shape({
      inflow: PropTypes.array,
      outflow: PropTypes.array,
    }).isRequired,
  };

  static defaultProps = {
    width: 300,
    height: 500,
    dataValue: 'value',
  };

  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps({ data }) {
    const old = this.props;

    if (old.data !== data) {
      this.updateChartVariables();
    }
  }

  getTotalValue = (total, datum) => total + datum.value;

  updateChartVariables = () => {
    const { width, height, data } = this.props;
    const { color, barPadding, chartPadding, bottomPadding } = this;

    this.dataKeys = Object.keys(data);
    const totals = this.dataKeys.map(key => data[key].reduce(this.getTotalValue, 0));

    this.xScale = scaleBand().rangeRound([0, width - chartPadding * 2]).paddingInner(barPadding);
    this.xScale.domain([0, this.dataKeys.length - 1]);

    this.yScale = scaleLinear().rangeRound([height - (chartPadding * 2) - bottomPadding, 0]);
    this.yScale.domain([max(totals), 0]);

    this.colorFn = this.dataKeys.reduce((colorFn, key) => {
      colorFn[key] = color[key].domain([0, data[key].length]);
      return colorFn;
    }, {});

    this.boxLength = width + chartPadding * 2;
    this.boxHeight = height + chartPadding * 2;
  };

  barPadding = 0.15;
  bottomPadding = 40;
  chartPadding = 10;

  color = {
    inflow: scaleLinear().range(inflowScheme),
    outflow: scaleOrdinal(outflowScheme),
  };

  render() {
    const { xScale, yScale, colorFn, dataKeys, boxLength, boxHeight, chartPadding } = this;
    const { data, dataKey, dataLabel, dataValue } = this.props;

    return (
      <div className={styles.stackedChart}>
        <Chart
          width={boxLength}
          height={boxHeight}
          padding={chartPadding}
          transform={`translate(${chartPadding},${chartPadding})`}
        >
          {dataKeys.map((key, idx) => (
            <Bar
              key={key}
              data={data[key]}
              yScale={yScale}
              colorFn={colorFn[key]}
              width={xScale.bandwidth()}
              transform={`translate(${xScale(idx)}, 0)`}
            />
          ))}

          <Xaxis
            transform={`translate(0, ${yScale.range()[0] + chartPadding / 3})`}
            data={data}
            xScale={xScale}
          />
        </Chart>

        <Legend color={colorFn.outflow} reverse={true} data={data.outflow} {...{ dataValue, dataLabel, dataKey }} />
      </div>
    );
  }
}

export default StackedChart;
