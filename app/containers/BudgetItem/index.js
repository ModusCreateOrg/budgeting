// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import transactionReducer from 'modules/transactions';
import categoryReducer from 'modules/categories';
import { injectAsyncReducers } from 'store';
import { getInflowBalance } from 'selectors/transactions';
import BudgetItemDetails from 'components/BudgetItemDetails';

// inject reducers that might not have been originally there
injectAsyncReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});

type BudgetItemProps = {
  id: number,
  transactions: any,
};

export class BudgetItem extends React.Component<BudgetItemProps> {
  static defaultItem = {
    key: 'key-none',
    description: '',
    value: 0,
  };

  componentWillMount() {
    this.updateChartVariables();
  }

  componentWillReceiveProps(newProps: BarProps) {
    const { id } = newProps;
    const old = this.props;

    if (old.id !== id) {
      this.updateChartVariables();
    }
  }

  data: Array<any>;
  info: {
    id: 0,
    title: '',
    percentage: 0,
    isNegative: false,
  };

  updateChartVariables = () => {
    const { id, transactions } = this.props;
    const budget = getInflowBalance({
      transactions: transactions,
    });
    let transaction = transactions.filter(todo => todo.id === Number(id));
    transaction =
      transaction.map(datum => ({
        key: `key-${datum.id}`,
        description: datum.description,
        value: datum.value,
      }))[0] || this.defaultItem;
    const isNegative = transaction.value < 0;
    this.info = {
      id: transaction.id,
      title: transaction.description,
      percentage: Math.abs(transaction.value) * 100 / budget,
      isNegative: isNegative,
    };
    transaction.value = Math.abs(transaction.value);
    this.data = [
      transaction,
      {
        key: 'key-total',
        description: 'Remaining Budget',
        value: budget - transaction.value,
      },
    ];
  };
  render() {
    const { data, info } = this;

    return <BudgetItemDetails data={data} info={info} />;
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions,
});

export default connect(mapStateToProps)(BudgetItem);
