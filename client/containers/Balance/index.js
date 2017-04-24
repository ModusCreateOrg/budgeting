import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getFormattedBalance, getFormattedInflowBalance, getFormattedOutflowBalance } from 'selectors/transactions';

import BalanceItem from 'components/Balance';
import BalancePrefix from 'components/Balance/BalancePrefix';
import BalanceRow from 'components/Balance/BalanceRow';

@connect(state => ({
  balance: getFormattedBalance(state),
  inflow: getFormattedInflowBalance(state),
  outflow: getFormattedOutflowBalance(state),
}))
class Balance extends Component {
  static propTypes = {
    balance: PropTypes.object.isRequired,
    inflow: PropTypes.object.isRequired,
    outflow: PropTypes.object.isRequired,
  };

  render() {
    const { inflow, outflow, balance } = this.props;

    return (
      <BalanceRow>
        <BalanceItem amount={inflow} title="Total Inflow" />
        <BalancePrefix text="-" />
        <BalanceItem amount={outflow} title="Total Outflow" />
        <BalancePrefix text="=" />
        <BalanceItem amount={balance} title="Working Balance" colorize={false} />
      </BalanceRow>
    );
  }
}

export default Balance;
