import React, { Component, PropTypes } from 'react';

import {
  max,
  scaleBand,
  scaleLinear,
  scaleSequential,
  interpolateMagma
} from 'd3';

import Bar from './Bar';
import Xaxis from './Xaxis';
import Legend from 'components/Legend';
import Chart from 'components/Chart'
import styles from './styles.scss';


class StackedChart extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    dataValue: PropTypes.string,
    dataLabel: PropTypes.string.isRequired,
    dataKey: PropTypes.string.isRequired,
    data: PropTypes.shape({
      inflow: PropTypes.array,
      outflow: PropTypes.array
    }).isRequired,
  };

  static defaultProps = {
    width: 300,
    height: 500,
    dataValue: 'value'
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

  barPadding = 0.15;
  chartPadding = 10;
  color = {
    inflow: scaleLinear().range(['#003300', '#009966']),
    outflow: scaleSequential().interpolator(interpolateMagma),
  }

  getTotalValue = (total, datum) => (total + datum.value);

  updateChartVariables = () => {
    const { width, height, data } = this.props;
    const { color, barPadding, chartPadding } = this;
    
    this.dataKeys = Object.keys(data);
    const totals = this.dataKeys.map(key => data[key].reduce(this.getTotalValue, 0));

    this.xScale = scaleBand().rangeRound([0, width - chartPadding * 2]).paddingInner(barPadding);
    this.xScale.domain([0, this.dataKeys.length - 1]);

    this.yScale = scaleLinear().rangeRound([height - chartPadding * 4, 0]);
    this.yScale.domain([max(totals), 0]);

    this.colorFn = this.dataKeys.reduce((colorFn, key) => {
      colorFn[key] = color[key].domain([0, data[key].length]);
      return colorFn;
    }, {});

    this.boxLength = width + (chartPadding * 2);
    this.boxHeight = height + (chartPadding * 2);
  }

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
            className={styles.xAxis}
            transform={`translate(0, ${yScale.range()[0] + chartPadding / 2})`}
            data={data}
            xScale={xScale}
          />
        </Chart>

        <Legend color={colorFn.outflow} data={data.outflow} {...{ dataValue, dataLabel, dataKey }} />
      </div>
    );
  }

}


export default StackedChart;
