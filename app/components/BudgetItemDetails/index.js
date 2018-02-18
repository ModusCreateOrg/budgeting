// @flow
import * as React from 'react';
import { formatPercent } from 'utils/formatAmount';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import styles from './style.scss';
import { connect } from 'react-redux';
import { getTransaction, getFlowShareByTransaction } from 'selectors/transactions'
import { withRouter } from 'react-router-dom';



const BudgetGridRow = ({ transaction, share }) => {
  const percent = formatPercent(share.percent);
  return (
    <section>
      <h1>{transaction.description}</h1>
      <h3>Contribution:</h3>
    </section>
  );
};

const mapStateToProps = (state, ownProps) => ({
  transaction: getTransaction(state, ownProps),
  share: getFlowShareByTransaction(state, ownProps)
});

export default withRouter(connect(mapStateToProps)(BudgetGridRow));
