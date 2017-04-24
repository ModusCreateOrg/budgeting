import React, { Component, PropTypes } from 'react';

import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

class Xaxis extends Component {

  static propTypes = {
    transform: PropTypes.string,
    labelColor: PropTypes.string,
    valueColor: PropTypes.string,
    data: PropTypes.object.isRequired,
    xScale: PropTypes.func.isRequired,
  };

  static defaultProps = {
    labelColor: '#000',
    valueColor: '#999',
    transform: '',
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
    const { data } = this.props;

    this.dataKeys = Object.keys(data);

    this.totals = this.dataKeys.reduce((totals, key) => {
      totals[key] = formatAmount(data[key].reduce((total, datum) => total + datum.value, 0));
      return totals;
    }, {});
  }

  render() {
    const { dataKeys, totals } = this;
    const { transform, labelColor, valueColor, xScale } = this.props;

    return (
      <g className={styles.xAxis} transform={transform}>

        {dataKeys.map((key, idx) => (
          <g key={key} transform={`translate(${xScale(idx) + xScale.bandwidth() / 2}, 0)`}>
            <line stroke={labelColor} y2="6" x1="0.5" x2="0.5" />
            <text fill={labelColor} y="9" x="0.5" dy="0.8em">{key.toUpperCase()}</text>
            <text className={styles.value} fill={valueColor} y="35" x="0.5" dy="0.6em">{totals[key].text}</text>
          </g>
        ))}

      </g>
    );

  };

}

export default Xaxis;
