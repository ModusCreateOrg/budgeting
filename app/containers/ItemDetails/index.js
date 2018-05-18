// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import GoBack from 'components/GoBack';
import DonutChart from 'components/DonutChart';
import ItemDetailsTitle from 'components/ItemDetailsTitle';
import transactionReducer from 'modules/transactions';
import { getTransactions, getTransactionById, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { injectAsyncReducers } from 'store';
import styles from './style.scss';

injectAsyncReducers({
  transactions: transactionReducer,
});

type ItemDetailsProps = {
  transactions: [],
  inflows: Number,
  outflows: Number,
  inflowTransactions: [],
  outflowTransactions: [],
};

class ItemDetails extends React.Component<ItemDetailsProps> {
  getPercentage = (value, total): Number => Number((value * 100 / total).toFixed(2));
  isNegative = (transaction): Boolean => Math.sign(transaction.value) === -1;
  fillDonusData = (transaction, percentage, isNegative): Array => [
    {
      description: transaction.description,
      key: 1,
      value: percentage,
      percentage: true,
    },
    {
      description: isNegative ? 'Other Outflows' : 'Other Inflows',
      key: 2,
      value: 100 - percentage,
      percentage: true,
    },
  ];

  render() {
    const { transactions, inflows, outflows, history } = this.props;

    const id = Number(this.props.match.params.id);
    const transaction = getTransactionById(transactions, id);
    if (transaction) {
      const isNegative = this.isNegative(transaction);

      const percentage = isNegative
        ? this.getPercentage(transaction.value, outflows)
        : this.getPercentage(transaction.value, inflows);

      const donusData = this.fillDonusData(transaction, percentage, isNegative);
      const description = `It's ${percentage} % of the ${isNegative ? 'Outflows' : 'Inflows'}`;

      return (
        <section className={styles.boxItemDetail}>
          <GoBack text="← Back" goBack={history.goBack} />
          <ItemDetailsTitle title={transaction.description} subtitle={description} type={isNegative} />
          <DonutChart data={donusData} dataLabel="description" dataKey="key" />
        </section>
      );
    }

    return <div> There is no transaction with the following id: {id}</div>;
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflows: getInflowBalance(state),
  outflows: getOutflowBalance(state),
});

export default connect(mapStateToProps)(ItemDetails);
