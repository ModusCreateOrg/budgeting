// @flow
import * as React from 'react';
import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import { scaleOrdinal } from 'd3';
import categoryReducer from 'modules/categories';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTransactionById, getOutflowBalance, getInflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import TransactionDetail from 'components/TransactionDetail';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

type TransactionDetailProps = {
  transaction: Transaction,
  totalBalance: number,
  categories: Object,
  isPositive: boolean,
};

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

export class TransactionDetails extends React.Component<TransactionDetailProps> {
  static defaultProps = {
    transaction: [],
  };

  getDetailPercentage = () => {
    const { totalBalance, transaction: { value } } = this.props;
    return `${parseFloat(Math.abs(value / totalBalance) * 100).toFixed(2)} %`;
  };

  renderPieChart() {
    const { totalBalance, transaction: { value, description }, isPositive } = this.props;

    /* Green for Positive and Red for Negative */
    const colorRange = isPositive ? ['#189c2d', '#006011', '#5BC46D'] : ['#eb2a2a', '#9b0000', '#FF7D7D'];

    /* Set innerRatio to height and create pie chart */
    const settings = {
      height: 250,
      innerRatio: 250,
      color: scaleOrdinal(colorRange).domain([0, 1]),
    };

    const data = [
      {
        label: description,
        value: Math.abs(value),
        id: 1,
      },
      {
        label: `Other ${isPositive ? 'Inflows' : 'Outflows'}`,
        value: Math.abs(totalBalance - value),
        id: 2,
      },
    ];

    /* Set innerRatio to height and create pie chart */
    return <DonutChart data={data} dataLabel="label" dataKey="id" {...settings} />;
  }

  render() {
    const { transaction, categories, isPositive } = this.props;
    const { description, categoryId } = transaction;

    const transactionDetail = {
      description,
      category: categories[parseInt(categoryId, 10)],
      percentage: this.getDetailPercentage(),
      isPositive,
    };

    if (!Object.keys(transaction).length) {
      return (
        <div className={styles.transactionDetails}>
          <Link to={`/budget`}>Back</Link>
          <p>No transaction found.</p>
        </div>
      );
    }

    return (
      <div className={styles.transactionDetails}>
        <Link to={`/budget`}>Back</Link>
        <TransactionDetail {...transactionDetail} />
        {this.renderPieChart()}
      </div>
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const transaction = getTransactionById(state, parseInt(params.id, 10)) || {};
  const isPositive = transaction.value > 0;
  const totalBalance = Math.abs(isPositive ? getInflowBalance(state) : getOutflowBalance(state));
  return {
    transaction,
    totalBalance,
    isPositive,
    categories: getCategories(state),
  };
};

export default connect(mapStateToProps)(TransactionDetails);
