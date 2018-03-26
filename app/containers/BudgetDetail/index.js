// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import transactionReducer from 'modules/transactions';
import styles from './style.scss';
import { getInflowBalance, getOutflowBalance, getTransactionById } from '../../selectors/transactions';
import { injectAsyncReducers } from '../../store';
import BudgetDetailSubtitle from '../../components/BudgetDetailSubtitle';
import BudgetDetailChart from '../../components/BudgetDetailChart';

injectAsyncReducers({
  transactions: transactionReducer,
});

type BudgetDetailProps = {
  transactions: Transaction[],
  inflows: Number,
  outflows: Number,
};

export class BudgetDetail extends React.Component<BudgetDetailProps> {
  render() {
    const { transactions, inflows, outflows } = this.props;
    const id = Number(this.props.match.params.id);
    const transaction = getTransactionById(transactions, id);
    return (
      <div>
        <Link to="/budget" className={styles.navLink}>
          Back
        </Link>
        <h1 className={styles.header}>{transaction.description}</h1>
        <BudgetDetailSubtitle amount={transaction.value} totalInflow={inflows} totalOutflow={outflows} />
        <BudgetDetailChart
          amount={transaction.value}
          totalInflow={inflows}
          totalOutflow={outflows}
          description={transaction.description}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflows: getInflowBalance(state),
  outflows: getOutflowBalance(state),
});

export default connect(mapStateToProps)(BudgetDetail);
