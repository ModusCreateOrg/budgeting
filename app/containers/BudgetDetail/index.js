// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import formatAmount from 'utils/formatAmount';
import formatPercentage from 'utils/formatPercentage';
import { getCategoryById } from 'selectors/categories';
import type { TransactionSummary } from 'selectors/transactions';
import { getPercentageInInflowOutflowByAmount } from 'selectors/transactions';
import PieChart from 'components/PieChart';
import styles from './style.scss';

// Budget Detail props type
type BudgetDetailProps = {
  transaction: TransactionSummary,
  percetage: number,
  total: object,
  category: string,
};

// class to export budgetdetail
class BudgetDetail extends React.Component<BudgetDetailProps> {
  // defined propTypes requireds & types
  static propTypes = {
    transaction: PropTypes.object.isRequired,
    percentage: PropTypes.number.isRequired,
    totals: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
  };

  // funct to defined data to piechart
  getChartData() {
    const { transaction, percentage } = this.props;
    const { isNegative } = formatAmount(transaction.value);
    const chartData = [
      {
        transaction: transaction.description,
        transactionId: transaction.id,
        value: Math.abs(percentage * 100),
        color: isNegative ? '#EB2A2A' : '#189C2D',
      },
      { transaction: 'Total', transactionId: 'total', value: 100 - Math.abs(percentage * 100), color: '#D1C3C0' },
    ];
    return chartData;
  }

  render() {
    const { transaction, category, percentage, totals } = this.props;
    const { text, isNegative } = formatAmount(transaction.value);
    const outflow = formatAmount(totals.outflow);
    const inflow = formatAmount(totals.inflow);
    const formattedPercentage = formatPercentage(percentage);
    const colorPercentage = isNegative ? styles.negative : styles.positive;
    const chart = this.getChartData();

    return (
      <section>
        <div>
          <h1>
            {transaction.description} (<small className={colorPercentage}>{text}</small>)
          </h1>
          <h4>Category:</h4>
          <p>{category}</p>
          <h4>Detail:</h4>
          <p>
            Total {isNegative ? 'Outflow' : 'Inflow'}:
            <span className={colorPercentage}> {isNegative ? `- ${outflow.text}` : inflow.text}</span>
          </p>
          <h4>Percentage:</h4>
          <p>
            <span className={colorPercentage}>{formattedPercentage}</span> of {isNegative ? 'Outflow' : 'Inflow'}
          </p>
        </div>
        <div className="chartContent">
          <PieChart data={chart || []} dataKey="transactionId" />
        </div>
      </section>
    );
  }
}

// map state to define data
const mapStateToProps = (state, { transaction: { value, categoryId } }) => ({
  percentage: getPercentageInInflowOutflowByAmount(value)(state),
  category: getCategoryById(categoryId)(state),
});

export default connect(mapStateToProps)(BudgetDetail);
