// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransaction, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import { withRouter } from 'react-router-dom';
import BudgetDetailsChart from 'components/BudgetDetailsChart';
import styles from './style.scss';

type BudgetDetailsProps = {
  transaction: Transaction,
};

export const BudgetDetailsContainer = ({ transaction, inflow, outflow, history }: BudgetDetailsProps) => (
  <section>
    <div>
      <button onClick={() => history.push('/')}>Go Back</button>
    </div>
    {transaction ? (
      <BudgetDetailsChart transaction={transaction} flow={{ inflow, outflow }} />
    ) : (
      <div className={styles.notFound}>Budget ID not found</div>
    )}
  </section>
);

const mapStateToProps = (state, { id }) => ({
  transaction: getTransaction(state, id),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default withRouter(connect(mapStateToProps)(BudgetDetailsContainer));
