// @flow

import * as React from 'react';
import styles from './styles.scss';

class PieChart extends React.Component<PieChartProps> {
  static defaultProps = {
    percentToHighlight: 0,
    size: 200,
  };

  render() {
    let animationDelay = PieChart.defaultProps.percentToHighlight;
    const { size, percentToHightlight } = Object.assign(PieChart.defaultProps, this.props);
    if (!percentToHightlight || typeof parseFloat(percentToHightlight, 10) === 'number') {
      animationDelay = percentToHightlight;
    }
    return (
      <div
        className={styles.pie}
        style={{
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          animationDelay: `-${animationDelay}s`,
        }}
      />
    );
  }
}

export default PieChart;
