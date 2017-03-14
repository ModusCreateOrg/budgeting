import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  getFormattedBalance,
  getFormattedInflowBalance,
  getFormattedOutflowBalance
} from 'modules/transactions';

import BalanceItem from 'components/Balance';
import BalanceRow from 'components/Balance/BalanceRow';

@connect(
  state => ({
    balance: getFormattedBalance(state),
    inflow: getFormattedInflowBalance(state),
    outflow: getFormattedOutflowBalance(state)    
  })
)
class Balance extends Component {
  static propTypes = {
    balance: PropTypes.object.isRequired,
    inflow: PropTypes.object.isRequired,
    outflow: PropTypes.object.isRequired
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
