// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { TransactionSummary } from 'selectors/transactions';
import { sortTransactions, getOutflowByCategoryName, getTransactionsContribution } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';

type TransactionDetailsProps = {
  data: TransactionSummary[],
};

class TransactionDetails extends React.Component<TransactionDetailsProps> {
  render() {
    const { data } = this.props;

    const filteredData = data.filter(item => item[0].id === Number(this.props.match.params.id));
    const flattenedData = [].concat([], ...filteredData);

    return <DonutChart data={flattenedData} dataLabel="description" dataKey="id" formatStyle="percent" />;
  }
}

const mapStateToProps = state => ({
  data: getTransactionsContribution(state),
});

export default connect(mapStateToProps)(TransactionDetails);
