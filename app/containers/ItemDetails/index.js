// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import type { TransactionContribution } from 'selectors/transactions';
import { getTransactionContribution } from 'selectors/transactions';

import DonutChart from 'components/DonutChart';

import styles from './style.scss';

type ItemDetailsProps = {
  data: TransactionContribution,
};

class ItemDetails extends React.Component<ItemDetailsProps> {
  render() {
    const { data } = this.props;

    // Make chart data to show this item and rest transaction amounts
    const donutData = [
      {
        id: data.id,
        value: data.value,
        description: data.description,
      },
      {
        id: data.id + 1,
        value: data.totalTransactionOfFlow - data.value,
        description: 'Others',
      },
    ];

    return (
      <div className={styles.itemDetails}>
        <Link to="/budget">Go Back</Link>
        <h2>{data.description}</h2>
        <h3>
          {data.value < 0 ? <span className={styles.red}>-</span> : <span className={styles.green}>+</span>}
          {data.percentage}%
        </h3>
        <DonutChart data={donutData} dataLabel="description" dataKey="id" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: getTransactionContribution(state, parseInt(props.match.params.itemId, 10)),
});

export default connect(mapStateToProps)(ItemDetails);
