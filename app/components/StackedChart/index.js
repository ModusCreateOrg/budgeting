import React, { Component, PropTypes } from 'react';
import Legend from 'components/Legend';
import Chart from 'components/Chart';
import { max, scaleBand, scaleLinear, scaleOrdinal, schemeCategory20 } from 'd3';
import { shuffle } from 'utils/array';
import Bar from './Bar';
import Xaxis from './Xaxis';
import styles from './styles.scss';

const outflowScheme = shuffle([...schemeCategory20.slice(0, 4), ...schemeCategory20.slice(5)]);
const inflowScheme = ['#2ca02c']; // inflow always green

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
    totals: PropTypes.shape({
      inflow: PropTypes.number,
      outflow: PropTypes.number,
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

  updateChartVariables = () => {
    const { width, height, data, totals } = this.props;
    const { color, barPadding, chartPadding, bottomPadding } = this;

    this.dataKeys = Object.keys(data);

    this.xScale = scaleBand().rangeRound([0, width - chartPadding * 2]).paddingInner(barPadding);
    this.xScale.domain([0, this.dataKeys.length - 1]);

    this.yScale = scaleLinear().rangeRound([height - (chartPadding * 2) - bottomPadding, 0]);
    this.yScale.domain([max([totals.inflow, totals.outflow]), 0]);

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
    inflow: scaleOrdinal(inflowScheme),
    outflow: scaleOrdinal(outflowScheme),
  };

  render() {
    const { xScale, yScale, colorFn, dataKeys, boxLength, boxHeight, chartPadding } = this;
    const { data, totals, dataKey, dataLabel, dataValue } = this.props;

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
            totals={totals}
            xScale={xScale}
          />
        </Chart>

        <Legend color={colorFn.outflow} reverse={true} data={data.outflow} {...{ dataValue, dataLabel, dataKey }} />
      </div>
    );
  }
}

export default StackedChart;
