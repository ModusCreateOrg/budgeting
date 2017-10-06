// @flow

import * as React from 'react';
import Legend from 'components/Legend';
import Chart from 'components/Chart';
import type { TransactionSummary } from 'selectors/transactions';
import { arc, pie, scaleOrdinal, schemeCategory20 } from 'd3';
import { shuffle } from 'utils/array';
import styles from './styles.scss';

class PieChart extends React.Component<PieChartProps> {
  static defaultProps = {
    percentToHighlight: 0,
    size: 200
  };

  render(props) {
    let percentToHightlight = null;
    const {size} = Object.assign(PieChart.defaultProps, this.props);
    if(!percentToHightlight || !Number.isInteger(parseInt(percentToHightlight))) {
      percentToHightlight = PieChart.defaultProps.percentToHighlight;
    }
    return (
      <div className={styles.pie} style={{
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        animationDelay: `-${percentToHightlight}s`
      }}>
      </div>
    );
  }
}

export default PieChart;
