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
    percentToHighlight: 20
  };

  render(props) {
    const {percentToHightlight, size} = this.props;
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
