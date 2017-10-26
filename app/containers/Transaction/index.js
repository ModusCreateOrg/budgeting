import * as React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';

import { getTransactionById } from 'selectors/transactions';
import BudgetDetail from 'containers/BudgetDetail';

import type { TransactionSummary } from 'selectors/transactions';
import {
  getInflowBalance,
  getOutflowBalance,
} from 'selectors/transactions';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

// Transaction props type
type TransactionProps = {
  data: {
    transaction: TransactionSummary,
  },
  totals: {
    inflow: number,
    outflow: number,
  },
};

// Transaction class to export
class Transaction extends React.Component<TransactionProps> {
  
  render() {
    const { data, totals } = this.props;

    return (
      <div>
        <Link to="/budgets">← Back</Link>
        {data.transaction ? (
          <BudgetDetail transaction={data.transaction} totals={totals} />
        ) : (
          <p>Not found</p>
        )}
      </div>
    );
  }
}

// map state to define data transaction by id and total
const mapStateToProps = (state, { budgetId }) => ({
  data: {
    transaction: getTransactionById(budgetId)(state)
  },
  totals: {
    inflow: getInflowBalance(state),
    outflow: Math.abs(getOutflowBalance(state))
  },
});

export default connect(mapStateToProps)(Transaction);