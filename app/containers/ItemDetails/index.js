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
    const isPie = true;
    const value = Math.abs(data.value);
    const chartData = [
      {
        id: data.id,
        value: value,
        description: data.description,
      },
      {
        id: data.id + 1,
        value: data.totalBudget - value,
        description: 'Remaining Budget',
      },
    ];

    return (
      <div className={styles.itemDetails}>
        <Link to="/budget">Back to Budget</Link>
        <h2>{data.description}</h2>
        <h3>
          {data.value < 0 ? <span className={styles.red}>-</span> : <span className={styles.green}>+</span>}
          {Math.abs(data.percentage)}%
        </h3>
        <DonutChart key={data.id} isPie={isPie} data={chartData} dataLabel="description" dataKey="id" />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  data: getTransactionContribution(state, parseInt(props.match.params.id, 10)),
});

export default connect(mapStateToProps)(ItemDetails);
