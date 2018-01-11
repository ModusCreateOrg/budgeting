// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import type { TransactionItemContribution } from 'selectors/transactions';
import { getTransactionItemContribution } from 'selectors/transactions';
import DonutChart from 'components/DonutChart';

import styles from './style.scss';

type ItemDetailsProps = {
  data: TransactionItemContribution,
};

class ItemDetails extends React.Component<ItemDetailsProps> {
  render() {
    const { data } = this.props;
    const donutChartData = [
      {
        id: data.id,
        value: data.value,
        description: data.description,
      },
      {
        id: data.id + 100,
        value: data.totalTransactionOfSelectedFlow - data.value,
        description: 'Other Transactions',
      },
    ];

    return (
      <div className={styles.itemDetails}>
        <Link to="/budget">Back to List</Link>
        <h2>{data.description}</h2>
        <h3>
          {data.value < 0 ? <span className={styles.red}>-</span> : <span className={styles.green}>+</span>}
          {data.percentage}%
        </h3>
        <DonutChart data={donutChartData} dataKey="id" dataLabel="description" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: getTransactionItemContribution(state, parseInt(props.match.params.itemId, 10)),
});

export default connect(mapStateToProps)(ItemDetails);
