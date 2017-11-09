// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { getCategories } from 'selectors/categories';
import type { Transaction } from 'modules/transactions';
import formatAmount from 'utils/formatAmount';
import DonutChart from 'components/DonutChart';
import styles from './style.scss';

type ItemProps = {
  transactions: Transaction[],
  categories: Object,
};

export class ItemPercentage extends React.Component<ItemProps> {
  static defaultProps = {
    transactions: [],
    categories: {},
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
    };
  }

  componentWillMount() {
    // Grab the item information based on the page you are looking at in case the user refreshes
    const item = this.props.transactions.filter(
      transaction => transaction.id === parseInt(this.props.match.params.id, 10)
    )[0];    

    if (item === undefined) {
      this.props.history.push('/budget');
    } else {
      this.setState({ item });
    }
  }

  render() {
    const { categories, history, inflow, outflow } = this.props;
    const { item } = this.state;
    let itemPercentage = 0;
    let otherTotal = 0;

    // Format the item value to display
    const amount = formatAmount(this.state.item.value);
    const amountCls = amount.isNegative ? styles.neg : styles.pos;

    // Calculate how much the item is as a percentage of the total (inflow or outflow)
    // use otherTotal to calulate how much the other items take up as a whole of inflow or outflow.
    itemPercentage = amount.isNegative ? Math.abs(item.value) / outflow * 100 : item.value / inflow * 100;
    otherTotal = amount.isNegative ? outflow - Math.abs(item.value) : inflow - item.value;

    // Send the data for the chart
    const data = [
      {
        id: 1,
        value: Math.abs(item.value),
        description: item.description,
      },
      {
        id: 2,
        value: otherTotal,
        description: 'Other items',
      },
    ];

    return (
      <div>
        <h1>
          {categories[item.categoryId]}: {item.description}
        </h1>
        <h2 className={amountCls}>
          {amount.text} ({itemPercentage.toFixed(2)}%)
        </h2>
        <DonutChart data={data} dataLabel="description" dataKey="id" />
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </button>
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
