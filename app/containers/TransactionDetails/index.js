// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Transaction } from 'modules/transactions';
import PieChart from 'components/PieChart';
import { getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import styles from './style.scss';

type TransactionDetailsProps = {
  transaction: Transaction,
  totalInflow: number,
  totalOutflow: number,
};

class TransactionDetails extends React.Component<TransactionDetailsProps> {
  render() {
    const { value, description } = this.props.transaction;
    const total = value > 0 ? this.props.totalInflow : this.props.totalOutflow;
    const percentage = +(value / total * 100).toFixed(2);
    const chartData = [
      {
        value: Math.abs(value),
        name: description,
      },
      {
        value: Math.abs(total - value),
        name: `Remaining ${value > 0 ? ' Inflow' : ' Outflow'}`,
      },
    ];
    return (
      <div>
        <h1>{description}</h1>
        <p>
          <span className={value > 0 ? styles.green : styles.red} />
          {percentage}%
        </p>
        <PieChart data={chartData} dataLabel="name" dataKey="name" dataValue="value" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalInflow: getInflowBalance(state),
  totalOutflow: getOutflowBalance(state),
});

export default connect(mapStateToProps)(TransactionDetails);
