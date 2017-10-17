import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import formatAmount from 'utils/formatAmount';
import formatPercent from 'utils/formatPercent';
import { getCategoryById } from 'selectors/categories';
import {
  getPercentageInInflowOutflowByAmount,
  getRemainingInflowByAmount,
  getRemainingOutflowByAmount,
} from 'selectors/transactions';
import PieChart from 'components/PieChart';
import styles from './style.scss';

@connect((state, { transaction: { value, categoryId } }) => ({
  percentage: getPercentageInInflowOutflowByAmount(value)(state),
  inflowRemaining: getRemainingInflowByAmount(value)(state),
  outflowRemaining: getRemainingOutflowByAmount(value)(state),
  category: getCategoryById(categoryId)(state),
}))
export default class TransactionDetails extends PureComponent {
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    percentage: PropTypes.number.isRequired,
    inflowRemaining: PropTypes.number.isRequired,
    outflowRemaining: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  };

  getChartData() {
    const { transaction: { value }, inflowRemaining, outflowRemaining } = this.props;

    return [
      {
        label: formatAmount(value).text,
        value: Math.abs(value),
        fill: value > 0 ? '#189c2d' : '#eb2a2a',
      },
      {
        label: formatAmount(inflowRemaining).text,
        value: inflowRemaining,
        fill: '#056b16',
      },
      {
        label: formatAmount(outflowRemaining).text,
        value: Math.abs(outflowRemaining),
        fill: '#cc1414',
      },
    ];
  }

  render() {
    const { transaction, category, percentage } = this.props;
    const { text, isNegative } = formatAmount(transaction.value);
    const formattedPercentage = formatPercent(percentage);
    const colorClassName = isNegative ? styles.neg : styles.pos;

    return (
      <div>
        <div>
          <h1>
            {transaction.description} (<small>{text}</small>)
          </h1>
          <h5
            style={{
              margin: 0,
            }}
          >
            Category:
          </h5>
          <p
            style={{
              marginTop: 5,
            }}
          >
            {category}
          </p>
          <h5
            style={{
              margin: 0,
            }}
          >
            Percentage:
          </h5>
          <p
            style={{
              marginTop: 5,
            }}
          >
            <span className={colorClassName}>{formattedPercentage}</span> of {isNegative ? 'Outflow' : 'Inflow'}
          </p>
        </div>
        <div className={styles.chartContainer}>
          <PieChart data={this.getChartData()} />
        </div>
      </div>
    );
  }
}
