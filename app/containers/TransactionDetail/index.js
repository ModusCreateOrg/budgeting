// @flow
import * as React from 'react';
import type { Transaction } from 'modules/transactions';
import TransactionInfo from 'components/TransactionInfo';
import { inflowCategories } from 'modules/defaults';
import { getTransactionById, getInflowBalance, getOutflowBalance } from 'selectors/transactions';
import connect from 'react-redux/es/connect/connect';

type TransactionDetailProps = {
  transaction: Transaction,
  inflow: number,
  outflow: number,
};

export type TransactionGraphData = {
  id: number,
  value: number,
  label: string,
};

class TransactionDetail extends React.Component<TransactionDetailProps> {
  getPercentage = (isInflow, value, inflow, outflow): number => {
    const percentage = (total): number => Math.round(((value * 100) / total) * 100) / 100;
    return isInflow ? percentage(inflow) : percentage(outflow);
  };

  parseGraphData = (isInflow, trans, percentage, inflow, outflow): TransactionGraphData[] => [
    { id: 1, value: Math.abs(trans.value), label: trans.description },
    {
      id: 2,
      value: Math.abs(isInflow ? inflow : outflow) - Math.abs(trans.value),
      label: `Other ${isInflow ? 'income' : 'expenses'}`,
    },
  ];

  render() {
    const { transaction, inflow, outflow } = this.props;
    const isInflow = inflowCategories.includes(transaction.categoryId);
    const percentage = this.getPercentage(isInflow, transaction.value, inflow, outflow);
    const data = this.parseGraphData(isInflow, transaction, percentage, inflow, outflow);
    return <TransactionInfo transaction={transaction} isInflow={isInflow} percentage={percentage} data={data} />;
  }
}

const mapStateToProps = (state, props) => ({
  transaction: getTransactionById(state)(props.match.params.id),
  inflow: getInflowBalance(state),
  outflow: getOutflowBalance(state),
});

export default connect(mapStateToProps)(TransactionDetail);
