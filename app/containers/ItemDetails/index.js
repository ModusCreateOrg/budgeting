// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { TransactionSummary } from 'selectors/transactions';

import { sortTransactions, getOutflowByCategoryName } from 'selectors/transactions';

type SpendingProps = {
  data: TransactionSummary[],
};

class ItemDetails extends React.Component<SpendingProps> {
  render() {
    return (<div></div>);
  }
}

const mapStateToProps = state => ({
  data: sortTransactions(getOutflowByCategoryName(state)),
});

export default connect(mapStateToProps)(ItemDetails);
