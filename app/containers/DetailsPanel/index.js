// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';

const Error404 = React.lazy(() => import('components/Error404' /* webpackChunkName: "error-msg-404" */));

export class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);

    // Get item data
    const { id } = this.props.match.params;

    this.state = {
      id,
      transaction: null,
    };
  }

  render() {
    const { id, transaction } = this.state;

    return transaction ? <div>{id}</div> : <Error404 />;
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
});

export default withRouter(connect(mapStateToProps)(DetailsPanel));
