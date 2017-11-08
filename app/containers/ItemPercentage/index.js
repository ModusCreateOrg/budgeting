// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import { getItemPercentage } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import { getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { withRouter } from 'react-router-dom';
import formatAmount from 'utils/formatAmount';
import styles from './style.scss';

import DonutChart from 'components/DonutChart';

type ItemProps = {
  transactions: Transaction[],
  categories: Object,
};

export class ItemPercentage extends React.Component<ItemProps> {
  static defaultProps = {
    transactions: [],
    categories: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      item: {
        id: 0,
        value: 0,
        description: '',
        categoryId: 0,
      },
    }
  }

  componentWillMount() {
    // Grab the item information based on the page you are looking at in case the user refreshes
    const item = this.props.transactions.filter( (transaction) => {
      return transaction.id == this.props.match.params.id
    })[0];

    (item == undefined) ? this.props.history.push('/budget') : this.setState({item});
  }

  render() {
    const { transactions, categories, match, history, inflow, outflow } = this.props;
    const { item } = this.state;
    let item_percentage = 0;
    let other_total = 0;

    // Format the item value to display
    const amount = formatAmount(this.state.item.value);
    const amountCls = amount.isNegative ? styles.neg : styles.pos;

    // Calculate how much the item is as a percentage of the total (inflow or outflow)
    // use other_total to calulate how much the other items take up as a whole of inflow or outflow.
    amount.isNegative ? item_percentage = (Math.abs(item.value) / outflow) * 100 : item_percentage = ((item.value / inflow) * 100);
    amount.isNegative ? other_total = (outflow - Math.abs(item.value)) : other_total = (inflow - item.value)

    // Send the data for the chart
    const data = [
      { id: 1, value: Math.abs(item.value), description: item.description },
      { id: 2, value: other_total, description: 'Other items'  },
    ];

    return (
      <div>
        <h1>{categories[item.categoryId]}: {item.description}</h1>
        <h2 className={amountCls}>{amount.text} ({item_percentage.toFixed(2)}%)</h2>
        <DonutChart data={data} dataLabel="description" dataKey="id" />
        <button onClick={ () => { history.goBack() } }>Back</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  categories: getCategories(state),
  inflow: getInflowBalance(state),
  outflow: Math.abs(getOutflowBalance(state)),
});

export default withRouter(connect(mapStateToProps)(ItemPercentage));
