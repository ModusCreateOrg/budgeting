// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import DetailsView from 'components/DetailsView';

const Error404 = React.lazy(() => import('components/Error404' /* webpackChunkName: "error-msg-404" */));

export class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);

    // Get item data
    const { transactions, categories, match } = this.props;
    const { id } = match.params;

    // Get transaction details, category
    const transaction = (!!transactions && transactions[id]) || null;
    let category = '';

    if (transaction && transaction.categoryId && categories && categories[transaction.categoryId]) {
      category = categories[transaction.categoryId];
    }

    // Calculate total in / outflow

    this.state = {
      transaction,
      category,
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
    const { transaction, category } = this.state;

    return transaction ? <DetailsView transaction={transaction} category={category} /> : <Error404 />;
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default withRouter(connect(mapStateToProps)(DetailsPanel));
