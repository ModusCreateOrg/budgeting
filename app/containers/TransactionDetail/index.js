// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getCurrentTransaction, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import calculatePercentage from 'utils/calculatePercentage';
import NavLink from 'components/NavLink';
import DonutChart from 'components/DonutChart';
import type { TransactionSummary } from 'selector/transactions';
import styles from './style.scss';

type TransactionProps = {
  currentTransaction: Transaction,
  totalInflow: number,
  totalOutflow: number,
};

export class TransactionDetail extends React.Component<TransactionProps> {
  render() {
    const { currentTransaction, totalInflow, totalOutflow } = this.props;
    if (!currentTransaction) {
      return (
        <div className={styles.transactionDetail}>
          <h2>Invalid Transaction</h2>
          <NavLink to="/budget" label="Back" styles={styles} />
        </div>
      );
    }

    const isNegative = currentTransaction.value < 0;
    const totalValue = isNegative ? totalOutflow : totalInflow;
    const percentage = calculatePercentage(currentTransaction.value, totalValue);
    const percentageStyle = isNegative ? styles.neg : styles.pos;
    const data: TransactionSummary[] = [
      {
        categoryId: '0',
        value: Math.abs(currentTransaction.value),
        category: currentTransaction.description,
      },
      {
        categoryId: '1',
        value: Math.abs(totalValue) - Math.abs(currentTransaction.value),
        category: 'Other items',
      },
    ];
    return (
      <div className={styles.transactionDetail}>
        <h1>{currentTransaction.description}</h1>
        <h2 className={percentageStyle}>{percentage.formattedText}</h2>
        <DonutChart data={data} innerRatio="9999" dataLabel="category" dataKey="categoryId" />
        <NavLink to="/budget" label="Back" styles={styles} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTransaction: getCurrentTransaction(state),
  totalInflow: getInflowBalance(state),
  totalOutflow: getOutflowBalance(state),
});

export default connect(mapStateToProps)(TransactionDetail);
