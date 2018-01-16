// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { getTransactionDetails, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import { roundUp, unsign } from 'utils/arithmetic'

import DonutChart from 'components/DonutChart';
import type { TransactionSummary } from '../../selectors/transactions';


type BudgetContributionProps = {
  transaction: TransactionSummary,
  balance: number
};


function getBudgetPercentageData(transaction: TransactionSummary, totalBalance: number): TransactionSummary[] {
  const trans = { ...transaction }
  trans.value = unsign(trans.value / totalBalance) * 100, 1;
  return [trans].concat([
    {
      category: totalBalance > 0 ? "Inflow Sub Balance" : "Outflow Sub Balance",
      categoryId: Math.ceil(Math.random() * 255) + 255,
      value: unsign((unsign(totalBalance) - unsign(transaction.value)) * 100 / totalBalance)
}]
  );
}

class BudgetContribution extends React.Component<BudgetContributionProps> {

  showAsPercentage = (value) => `${roundUp(value, 2)}%`

  render() {
    const { balance, transaction } = this.props;
    const data = getBudgetPercentageData(transaction, balance);
    return <DonutChart data={data} dataLabel="category" dataKey="category" labelFormatter={this.showAsPercentage} />;
  }
}

const mapStateToProps = (state, { match, location }) => {
  const transactionId = Number(match.params.id);
  const transaction = getTransactionDetails(state, transactionId);
  const balance = transaction.value > 0 ? getInflowBalance(state) : getOutflowBalance(state);
  return {
    transaction, balance
  };
};





export default withRouter(connect(mapStateToProps)(BudgetContribution));
