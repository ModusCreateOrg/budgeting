// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactionById, getInflowPercentage, getOutflowPercentage } from 'selectors/transactions';
import type { Transaction } from 'modules/transactions';
import { withRouter } from 'react-router-dom';
import ItemTitle from 'components/ItemTitle';
import formatAmount from 'utils/formatAmount';
import DonutChart from 'components/DonutChart';

type BudgetGridProps = {
  trx: Transaction,
  data: data,
};

export class ItemDetail extends React.Component<BudgetGridProps> {
  static defaultProps = {
    trx: {},
    data: {},
  };

  render() {
    const { trx, data } = this.props;
    return (
      <section>
        <button onClick={this.props.history.goBack}>
          Back
        </button>
        <ItemTitle transaction={trx} />
        <DonutChart data={data} dataLabel="transaction" dataKey="percentage" />
      </section>
    );
  }
}

const mapStateToProps = (state, auxProps) => {
  const transaction = getTransactionById(state, Number(auxProps.match.params.id));
  const amount = formatAmount(transaction.value);

  let data;
  if (amount.isNegative){
    data = getOutflowPercentage(state);
  } else {
    data = getInflowPercentage(state);
  }

  return {
    trx: transaction,
    data: data,
  };
};

export default withRouter(connect(mapStateToProps)(ItemDetail));
