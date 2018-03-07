// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { TransactionSummary } from 'selectors/transactions';
import { getTransactionsContribution } from 'selectors/transactions';
import formatAmount from 'utils/formatAmount';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

type TransactionDetailsProps = {
  data: TransactionSummary[],
};

class TransactionDetails extends React.Component<TransactionDetailsProps> {
  render() {
    const { data } = this.props;
    const filteredData = data.filter(item => item[0].id === Number(this.props.match.params.id));
    const flattenedData = [].concat([], ...filteredData);
    const amount = formatAmount(flattenedData[0].amount);
    const amountCls = amount.isNegative ? styles.neg : styles.pos;

    return (
      <div>
        <h1>{flattenedData[0].description}</h1>
        <small className={amountCls}>
          {!amount.isNegative ? '+' : ''}
          {amount.text}
        </small>
        <DonutChart data={flattenedData} dataLabel="description" dataKey="id" formatStyle="percent" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: getTransactionsContribution(state),
});

export default connect(mapStateToProps)(TransactionDetails);
