// @flow
import React from 'react';
import { connect } from 'react-redux';
import ItemDetails from 'components/ItemDetails';
import { getTransactions, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';
import formatAmount from 'utils/formatAmount';

injectAsyncReducers({
  transactions: transactionReducer,
});

class ItemDetailsContainer extends React.Component<{}> {
  static defaultsProps = {
    transaction: {},
    amount: {},
    balance: {
      inflow: 0,
      outflow: 0,
    },
  };

  componentWillMount() {
    if (this.props.transaction === undefined) {
      this.props.history.push('/budget');
    }
  }

  render() {
    const transaction = { ...this.props.transaction };

    let balance = {
      id: 0,
    };

    if (this.props.amount.isNegative) {
      transaction.value *= -1;

      balance = {
        ...balance,
        description: 'Outflow Difference',
        value: this.props.balance.outflow * -1 - transaction.value,
      };
    } else {
      balance = {
        ...balance,
        description: 'Inflow Difference',
        value: this.props.balance.inflow - transaction.value,
      };
    }

    return (
      <ItemDetails
        transaction={transaction}
        amount={this.props.amount}
        balance={balance}
        history={this.props.history}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const matchId = ownProps.match.params.transactionId ? parseInt(ownProps.match.params.transactionId, 10) : 0;
  const transaction = getTransactions(state).find(trans => trans.id === matchId);
  const amount = transaction ? formatAmount(transaction.value) : {};

  return {
    transaction,
    amount,
    balance: {
      inflow: getInflowBalance(state),
      outflow: getOutflowBalance(state),
    },
  };
};

export default connect(mapStateToProps)(ItemDetailsContainer);
