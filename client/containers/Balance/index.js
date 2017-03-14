import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  getBalance,
  getInflowBalance,
  getOutflowBalance
} from 'modules/transactions';

import BalanceItem from 'components/Balance';
import BalanceRow from 'components/Balance/BalanceRow';

@connect(
  state => ({
    balance: getBalance(state),
    inflow: getInflowBalance(state),
    outflow: getOutflowBalance(state)    
  })
)
class Balance extends Component {
  static propTypes = {
    balance: PropTypes.string.isRequired,
    inflow: PropTypes.string.isRequired,
    outflow: PropTypes.string.isRequired
  }

  render() {
    const { inflow, outflow, balance } = this.props;

    return (
      <BalanceRow>
        <BalanceItem amount={inflow} title="Total Inflow" />
        <BalanceItem amount={outflow} title="Total Outflow" symbol="-" />
        <BalanceItem amount={balance} title="Working Balance" symbol="=" colorize={false} />
      </BalanceRow>
    );
  }
}

export default Balance;
