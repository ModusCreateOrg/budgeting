// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import formatPercentage from 'utils/formatPercentage';
import type { Transaction } from 'modules/transactions';
import { getTransactions, getTotalBudget } from 'selectors/transactions';
import styles from './style.scss';


type TransactionBudgetHeaderProps = {
  transactions: Transaction[],
  totalBudget: number,
  transactionId: number,
};

const TransactionBudgetHeader = ({ transactions, totalBudget, transactionId }: TransactionBudgetHeaderProps) => {

  const transaction = transactions.find(t => t.id == transactionId);
  const percent = formatPercentage(transaction.value / totalBudget * 100, false);
  const percentCls = percent.isNegative ? styles.neg : styles.pos;

  return (
    <div>
      <h3>{transaction.description}</h3>
      <h4>Percent of total budget: <span className={percentCls}>{percent.text}</span></h4>
    </div>
   )
  };

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  totalBudget: getTotalBudget(state)
});

export default connect(mapStateToProps)(TransactionBudgetHeader);