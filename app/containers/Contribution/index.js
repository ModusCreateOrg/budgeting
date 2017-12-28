// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import type { Transaction } from 'modules/transactions';
import type { Categories } from 'modules/categories';
import { getAbsoluteBalance, getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import { injectAsyncReducers } from 'store';
import ContributionDetail from 'components/ContributionDetail';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type ContributionContainerProps = {
  transactions: Transaction,
  categories: Categories,
  absoluteBalance: number,
};

class ContributionContainer extends React.Component<ContributionContainerProps> {
  render() {
    const { match, transactions, categories, absoluteBalance } = this.props;
    const transaction = transactions.filter(t => t.id === parseInt(match.params.id, 10))[0];

    return (
      <section>
        <Link to="/contribution">Back</Link>
        {transaction ? (
          <ContributionDetail transaction={transaction} categories={categories} absoluteBalance={absoluteBalance} />
        ) : (
          <p>Transaction Not Found</p>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  absoluteBalance: getAbsoluteBalance(state),
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default withRouter(connect(mapStateToProps)(ContributionContainer));
