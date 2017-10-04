import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from 'modules/transactions';
import transactionReducer from 'modules/transactions';
import { getTransactions, getInflowBalance } from 'selectors/transactions';
import { injectAsyncReducers } from 'store';
import type { Transaction } from 'modules/transactions';
import ItemBlock from 'components/ItemBlock';

type ItemDetaildProps = {
  transactions: Transaction[],
  transaction: Transaction,
  id: Number,
  getTransaction: Function,
  inflowBalance: Number
};

injectAsyncReducers({
  transactions: transactionReducer
});

class ItemDetails extends React.Component<ItemDetaildProps> {
  
  constructor(props) {
    super(props);
    this.state = this.props;
  }
  
  componentWillMount() {
    this.setState({transaction: {}});
    this.props.getTransaction(this.props.id);
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.transactions.length < this.props.transactions.length) {
      this.setState({transactions: this.props.transactions, transaction: nextProps.transactions[0], inflowBalance: this.props.inflowBalance});
    }
  }
  
  render () {
    const {inflowBalance, transaction} = this.state;

    return (
     <ItemBlock transaction={transaction} inflowBalance={inflowBalance}></ItemBlock>
    );
  }
}

const mapStateToProps = state => ({
  transactions: getTransactions(state),
  inflowBalance: getInflowBalance(state)
});

const mapDispatchToProps = {
  getTransaction: actions.getTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
