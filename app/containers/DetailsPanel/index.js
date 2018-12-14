// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import find from 'lodash/find';
import DetailsView from 'components/DetailsView';

const Error404 = React.lazy(() => import('components/Error404' /* webpackChunkName: "error-msg-404" */));

export class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);

    // Get item data
    const { transactions, categories, match } = this.props;
    const { id } = match.params;

    // Get transaction details, category
    const transaction = find(transactions, { id: Number.parseInt(id, 10) });
    let category = '';

    if (transaction && transaction.categoryId && categories && categories[transaction.categoryId]) {
      category = categories[transaction.categoryId];
    }

    // Calculate total in / outflow
    let totalIn = 0;
    let totalOut = 0;
    transactions.map(item => {
      if (item.value > 0) {
        totalIn += item.value;
      } else {
        totalOut += item.value;
      }

      return null;
    });

    this.state = {
      transaction,
      category,
      totalIn,
      totalOut,
    };
  }

  componentDidMount() {
    // Change page title
    this.docTitleOld = document.title;
    document.title = `${this.state.category} - ${(this.state.transaction && this.state.transaction.description) || ''}`;
  }

  componentWillUnmount() {
    document.title = this.docTitleOld;
  }

  render() {
    const { transaction, category, totalIn, totalOut } = this.state;
    const { history } = this.props;

    return transaction ? (
      <DetailsView
        transaction={transaction}
        category={category}
        goBack={history.goBack}
        totalIn={totalIn}
        totalOut={totalOut}
      />
    ) : (
      <Error404 />
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default withRouter(connect(mapStateToProps)(DetailsPanel));
