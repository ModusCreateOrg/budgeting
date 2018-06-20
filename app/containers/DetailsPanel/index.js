// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions,getTransactionById, getInflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import styles from './style.scss';
import type { Transaction } from 'modules/transactions';
import BudgetPercentage from '../../components/BudgetPercentage';
import BackButton from '../../components/BackButton';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type DetailsPanelProps = {
  transactions: Transaction[],
  transaction : Transaction,
  categories: Object,
  inflow: number
};

export class DetailsPanel extends React.Component<DetailsPanelProps> {
  static defaultProps = {
    transactions: [],
    transaction : {},
    categories: {},
    inflow: 1
  };
  
  render() {
    const { transactions, transaction, categories, inflow } = this.props;
    console.log(this.props)
    return (
      <div>
      <h1>
        {transaction.description}
      </h1>
        <BudgetPercentage transaction={transaction} inflows={inflow} />
        <BackButton />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  transactions: getTransactions(state),
  transaction : getTransactionById(ownProps.match.params.id,state),
  categories: getCategories(state),
  inflow: getInflowBalance(state),
});

export default connect(mapStateToProps)(DetailsPanel);
