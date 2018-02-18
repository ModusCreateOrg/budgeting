// @flow
import * as React from 'react';
import { formatPercent } from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import type { ContributionMapping } from 'selectors/transaction';
import styles from './style.scss';
import { connect } from 'react-redux';
import { getTransaction, getFlowShareForTransactionFormatted, getFlowShareForTransactionMapped } from 'selectors/transactions'
import { withRouter } from 'react-router-dom';
import DonutChart from 'components/DonutChart';

const Sign = ({ value }) => {
  return value > 0 ? (<span className={styles.pos}> + </span>) : (<span className={styles.neg}> - </span>)
}


type BudgetItemDetailsProps = {
  transaction: Transaction,
  contribution: String,
  contributionMapped: ContributionMapping[]
}

export const BudgetItemDetails = ({ transaction, contribution, contributionMapped }): BudgetItemDetailsProps => {
  return (
    <section>
      <h1>{transaction.description}</h1>
      <h4 className={styles.contribution}>
        Contribution: <Sign value={transaction.value} /> {contribution}
      </h4>
      <DonutChart data={contributionMapped} dataLabel="label" dataKey="key" />
    </section>
  );
};

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransaction(state, ownProps),
  contribution: getFlowShareForTransactionFormatted(state, ownProps),
  contributionMapped: getFlowShareForTransactionMapped(state, ownProps)
});

export default withRouter(connect(mapStateToProps)(BudgetItemDetails));
