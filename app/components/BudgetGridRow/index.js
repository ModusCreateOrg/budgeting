// @flow
import * as React from 'react';
import formatAmount, { formatPercent } from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';
import { connect } from 'react-redux';
import { getFlowShareByTransaction } from 'selectors/transactions'
import { withRouter } from 'react-router-dom';
import type { History, Match } from 'react-router-dom';

type BudgetGridRowProps = {
  transaction: Transaction,
  categories: Categories,
  share: {
    flowTotal: Number,
    percent: Number,
  },
  history: History,
  match: Match,
};

const BudgetGridRow = ({ transaction, categories, share, history, match }: BudgetGridRowProps) => {
  const amount = formatAmount(transaction.value);
  const amountCls = amount.isNegative ? styles.neg : styles.pos;
  const { id, categoryId, description } = transaction;
  const category = categories[categoryId];
  const percent = formatPercent(share.percent);

  const onClick = () => {
    console.log(match);
    console.log(`/budget/item-details/${id}`);
    history.push(`/budget/item-details/${id}`);
  }

  return (
    <tr key={id} onClick={onClick}>
      <td>
        <div className={styles.cellLabel}>Category</div>
        <div className={styles.cellContent}>{category}</div>
      </td>
      <td>
        <div className={styles.cellLabel}>Description</div>
        <div className={styles.cellContent}>{description}</div>
      </td>
      <td>
        <div className={styles.cellLabel}>Contribution</div>
        <div className={styles.cellContent}>{percent}</div>
      </td>
      <td className={amountCls}>
        <div className={styles.cellLabel}>Amount</div>
        <div className={styles.cellContent}>{amount.text}</div>
      </td>
    </tr>
  );
};

const mapStateToProps = (state, ownProps) => ({
  share: getFlowShareByTransaction(state, ownProps),
});

export default withRouter(connect(mapStateToProps)(BudgetGridRow));
