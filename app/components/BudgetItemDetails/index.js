// @flow
import * as React from 'react';
import cx from 'classnames';
import { formatPercentageAmount } from 'utils/formatAmount';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

type BudgetItemProps = {
  transaction: Object,
  inflowBalance: number,
  outflowBalance: number,
};

class BudgetItemDetails extends React.Component<BudgetItemProps> {
  render() {
    const { transaction, inflowBalance, outflowBalance } = this.props;
    if (!transaction) {
      return <span>Could not find the corresponding budget item</span>;
    }

    const percentageAmount = formatPercentageAmount(transaction.value, inflowBalance, outflowBalance);

    const subtitleClassname = cx([styles.budgetItemDetailsSubtitle], {
      [styles.neg]: percentageAmount.isNegative,
      [styles.pos]: !percentageAmount.isNegative,
    });

    const categoryTotalBudget = percentageAmount.isNegative ? outflowBalance : inflowBalance;
    const remainingBudget = categoryTotalBudget - Math.abs(transaction.value);

    const chartData: Object[] = [
      {
        id: '0',
        value: Math.abs(transaction.value),
        description: transaction.description,
      },
      {
        id: '1',
        value: remainingBudget,
        description: `Rest of the ${percentageAmount.isNegative ? 'Outflow' : 'Inflow'}`,
      },
    ];
    return (
      <div className={styles.budgetItemDetails}>
        <h1 className={styles.budgetItemDetailsTitle}>{transaction.description}</h1>
        <p className={subtitleClassname}>{percentageAmount.text}</p>

        <DonutChart data={chartData} dataLabel="description" dataKey="id" innerRatio={0} />
      </div>
    );
  }
}
export default BudgetItemDetails;
